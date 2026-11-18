import { useState, useRef, useEffect, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  ScrollViewInstance,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Image,
} from "react-native";

import { FontAwesome6 } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { useAppTheme } from "../../../hooks/use-theme-context";
import { useAuth } from "../../../contexts/AuthContext";

import Logo from "@/assets/images/Logo_Fundo_Roxa.png";

import api from "@/services/api";
import { createStyles } from "@/styles/tabs/dash";

// ==========================================
// TIPAGENS
// ==========================================

interface IGrupo {
  id: number;
  nome: string;
  descricao: string;
  criado_por: number;
  data_criacao?: string;
  total_membros: number;
}

interface IGrupoAPI {
  id: number;
  iduser: number;
  name?: string;
  description?: string;
  created_by?: string;
  actived?: boolean | number;
}

interface IMembro {
  id_usuario: number;
  nome: string;
  email?: string;
  papel?: string;
}

interface IMembroAPI {
  iduser?: number;
  id?: number;
  name?: string;
  login?: string;
  role?: string;
  actived?: boolean | number;
}

interface IParticipacaoAPI {
  idgrupo: number;
  iduser: number;
  role?: string;
  ativo?: boolean | number;
}

interface ITotalMembrosAPI {
  idgrupo: number;
  quantMembros: number | string;
}

// ==========================================
// FUNÇÕES AUXILIARES
// ==========================================

function extrairDados<T>(response: any): T {
  return response.data?.data ?? response.data;
}

function estaAtivo(valor: boolean | number | undefined): boolean {
  if (valor === undefined) return true;

  return valor === true || Number(valor) === 1;
}

function normalizarGrupo(grupo: IGrupoAPI): IGrupo {
  return {
    id: Number(grupo.id),
    nome: grupo.name ?? "Grupo sem nome",
    descricao: grupo.description ?? "Sem descrição disponível.",
    criado_por: Number(grupo.iduser),
    data_criacao: grupo.created_by,
    total_membros: 0,
  };
}

function normalizarMembro(membro: IMembroAPI): IMembro {
  return {
    id_usuario: Number(membro.iduser ?? membro.id ?? 0),
    nome: membro.name ?? "Usuário",
    email: membro.login,
    papel: membro.role,
  };
}

// ==========================================
// DASHBOARD
// ==========================================

export default function Dashboard() {
  const { theme, toggleTheme } = useAppTheme();
  const { user } = useAuth();

  const userId = user?.id;

  const router = useRouter();
  const styles = createStyles(theme);

  const scrollViewRef = useRef<ScrollViewInstance | null>(null);

  const [gruposSectionY, setGruposSectionY] = useState(0);

  // Grupos
  const [grupos, setGrupos] = useState<IGrupo[]>([]);
  const [loading, setLoading] = useState(true);

  // Participações do usuário
  const [participacoes, setParticipacoes] = useState<IParticipacaoAPI[]>([]);

  // Criação de grupo
  const [modalVisible, setModalVisible] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  // Gerenciamento de membros
  const [modalMembrosVisible, setModalMembrosVisible] = useState(false);
  const [grupoGerenciado, setGrupoGerenciado] = useState<IGrupo | null>(null);

  const [membros, setMembros] = useState<IMembro[]>([]);
  const [loadingMembros, setLoadingMembros] = useState(false);

  // ==========================================
  // CARREGAR DADOS
  // ==========================================

  const carregarGrupos = useCallback(async () => {
    try {
      setLoading(true);

      const [resGrupos, resTotais] = await Promise.all([
        api.get("/grupos"),
        api.get("/usuariosgrupos/totalMembros"),
      ]);

      const dadosGrupos = extrairDados<IGrupoAPI[]>(resGrupos);
      const dadosTotais = extrairDados<ITotalMembrosAPI[]>(resTotais);

      if (!Array.isArray(dadosGrupos)) {
        throw new Error("Formato de grupos inválido.");
      }

      const totais = new Map<number, number>();

      if (Array.isArray(dadosTotais)) {
        dadosTotais.forEach((item) => {
          totais.set(Number(item.idgrupo), Number(item.quantMembros ?? 0));
        });
      }

      const gruposFormatados = dadosGrupos
        .filter((grupo) => estaAtivo(grupo.actived))
        .map((grupo) => {
          const grupoFormatado = normalizarGrupo(grupo);

          return {
            ...grupoFormatado,
            total_membros: totais.get(grupoFormatado.id) ?? 0,
          };
        });

      setGrupos(gruposFormatados);
    } catch (error: any) {
      console.log(
        "Erro ao carregar grupos:",
        error.response?.data ?? error.message,
      );

      Alert.alert("Erro", "Não foi possível carregar os grupos.");

      setGrupos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const carregarParticipacoes = useCallback(async () => {
    if (!userId) {
      setParticipacoes([]);
      return;
    }

    try {
      const response = await api.get(`/usuariosgrupos/user/${userId}`);

      const dados = extrairDados<IParticipacaoAPI[]>(response);

      setParticipacoes(Array.isArray(dados) ? dados : []);
    } catch (error: any) {
      console.log(
        "Erro ao carregar participações:",
        error.response?.data ?? error.message,
      );

      setParticipacoes([]);
    }
  }, [userId]);

  const atualizarDashboard = useCallback(async () => {
    await Promise.all([carregarGrupos(), carregarParticipacoes()]);
  }, [carregarGrupos, carregarParticipacoes]);

  useEffect(() => {
    const carregarDados = async () => {
      await Promise.all([carregarGrupos(), carregarParticipacoes()]);
    };

    carregarDados();
  }, [carregarGrupos, carregarParticipacoes]);

  // ==========================================
  // VERIFICAR PARTICIPAÇÃO E ADMINISTRAÇÃO
  // ==========================================

  const obterParticipacao = (grupoId: number) => {
    return participacoes.find(
      (item) => Number(item.idgrupo) === Number(grupoId),
    );
  };

  const usuarioParticipa = (grupoId: number) => {
    const participacao = obterParticipacao(grupoId);

    return participacao !== undefined && estaAtivo(participacao.ativo);
  };

  const usuarioEhAdmin = (grupo: IGrupo) => {
    const participacao = obterParticipacao(grupo.id);

    return (
      Number(grupo.criado_por) === Number(userId) ||
      (usuarioParticipa(grupo.id) &&
        participacao?.role?.toLowerCase() === "admin")
    );
  };

  // ==========================================
  // ROLAR ATÉ OS GRUPOS
  // ==========================================

  const handleScrollToGrupos = () => {
    scrollViewRef.current?.scrollTo({
      y: gruposSectionY,
      animated: true,
    });
  };

  // ==========================================
  // PARTICIPAR DE UM GRUPO
  // ==========================================

  const handleParticipar = (grupo: IGrupo) => {
    if (!user?.id) {
      Alert.alert("Atenção", "Você precisa estar logado.");
      return;
    }

    const participacao = obterParticipacao(grupo.id);

    if (usuarioParticipa(grupo.id)) {
      Alert.alert("Aviso", "Você já participa deste grupo.");
      return;
    }

    Alert.alert(
      "Participar do grupo",
      `Deseja entrar no grupo "${grupo.nome}"?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Confirmar",
          onPress: async () => {
            try {
              if (participacao) {
                // Reativa um vínculo que já existe.
                await api.put(`/usuariosgrupos/${userId}/${grupo.id}`, {
                  actived: true,
                });
              } else {
                // Cria um novo vínculo.
                await api.post("/usuariosgrupos", {
                  iduser: userId,
                  idgrupo: grupo.id,
                  role: "Membro",
                });
              }

              Alert.alert("Sucesso", `Você entrou no grupo "${grupo.nome}"!`);

              await atualizarDashboard();
            } catch (error: any) {
              console.log(
                "Erro ao participar:",
                error.response?.data ?? error.message,
              );

              Alert.alert(
                "Erro",
                error.response?.data?.Error ??
                  "Não foi possível participar do grupo.",
              );
            }
          },
        },
      ],
    );
  };

  // ==========================================
  // EXCLUIR GRUPO
  // ==========================================

  const handleExcluirGrupo = (grupo: IGrupo) => {
    if (!userId) return;

    if (Number(grupo.criado_por) !== Number(userId)) {
      Alert.alert(
        "Acesso negado",
        "Somente o criador pode excluir este grupo.",
      );
      return;
    }

    Alert.alert("Excluir grupo", `Deseja realmente excluir "${grupo.nome}"?`, [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            await api.delete(`/grupos/${grupo.id}`);

            Alert.alert("Sucesso", "Grupo excluído com sucesso!");

            setModalMembrosVisible(false);
            await atualizarDashboard();
          } catch (error: any) {
            console.log(
              "Erro ao excluir grupo:",
              error.response?.data ?? error.message,
            );

            Alert.alert(
              "Erro",
              error.response?.data?.Error ??
                "Não foi possível excluir o grupo.",
            );
          }
        },
      },
    ]);
  };

  // ==========================================
  // CRIAR GRUPO
  // ==========================================

  const handleCriarGrupo = async () => {
    if (!nome.trim() || !descricao.trim()) {
      Alert.alert("Atenção", "Preencha o nome e a descrição do grupo.");
      return;
    }

    if (nome.trim().length > 50) {
      Alert.alert(
        "Atenção",
        "O nome do grupo deve ter no máximo 50 caracteres.",
      );
      return;
    }

    if (descricao.trim().length > 300) {
      Alert.alert("Atenção", "A descrição deve ter no máximo 300 caracteres.");
      return;
    }

    if (!user?.id) {
      Alert.alert("Atenção", "Você precisa estar logado.");
      return;
    }

    try {
      setSubmitting(true);

      await api.post("/grupos", {
        name: nome.trim(),
        description: descricao.trim(),
        iduser: userId,
      });

      setModalVisible(false);
      setNome("");
      setDescricao("");

      await atualizarDashboard();

      Alert.alert("Sucesso", "Seu grupo foi criado com sucesso!");
    } catch (error: any) {
      console.log(
        "Erro ao criar grupo:",
        error.response?.data ?? error.message,
      );

      Alert.alert(
        "Erro",
        error.response?.data?.Error ?? "Não foi possível criar o grupo.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  // ==========================================
  // CARREGAR MEMBROS
  // ==========================================

  const abrirModalMembros = async (grupo: IGrupo) => {
    if (!usuarioEhAdmin(grupo)) {
      Alert.alert(
        "Acesso negado",
        "Somente administradores podem gerenciar os membros.",
      );
      return;
    }

    setGrupoGerenciado(grupo);
    setMembros([]);
    setModalMembrosVisible(true);
    setLoadingMembros(true);

    try {
      const response = await api.get(`/usuariosgrupos/membros/${grupo.id}`);

      const dados = extrairDados<IMembroAPI[]>(response);

      if (!Array.isArray(dados)) {
        throw new Error("Formato de membros inválido.");
      }

      const membrosFormatados = dados
        .filter((membro) => estaAtivo(membro.actived))
        .map(normalizarMembro);

      setMembros(membrosFormatados);
    } catch (error: any) {
      console.log(
        "Erro ao carregar membros:",
        error.response?.data ?? error.message,
      );

      Alert.alert("Erro", "Não foi possível carregar os membros do grupo.");
    } finally {
      setLoadingMembros(false);
    }
  };

  // ==========================================
  // REMOVER MEMBRO
  // ==========================================

  const removerMembro = (membro: IMembro) => {
    if (!grupoGerenciado || !user?.id) return;

    if (membro.id_usuario === Number(userId)) {
      Alert.alert(
        "Atenção",
        "Você não pode remover a si mesmo por esta opção.",
      );
      return;
    }

    if (membro.papel?.toLowerCase() === "admin") {
      Alert.alert(
        "Atenção",
        "Não é permitido remover outro administrador por esta opção.",
      );
      return;
    }

    if (!usuarioEhAdmin(grupoGerenciado)) {
      Alert.alert(
        "Acesso negado",
        "Você não possui permissão para remover membros.",
      );
      return;
    }

    Alert.alert(
      "Remover membro",
      `Deseja realmente remover ${membro.nome} do grupo?`,
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(
                `/usuariosgrupos/deletemembro/${membro.id_usuario}/${grupoGerenciado.id}`,
              );

              setMembros((anteriores) =>
                anteriores.filter(
                  (item) => item.id_usuario !== membro.id_usuario,
                ),
              );

              await atualizarDashboard();

              Alert.alert("Sucesso", "Membro removido com sucesso!");
            } catch (error: any) {
              console.log(
                "Erro ao remover membro:",
                error.response?.data ?? error.message,
              );

              Alert.alert(
                "Erro",
                error.response?.data?.Error ??
                  "Não foi possível remover o membro.",
              );
            }
          },
        },
      ],
    );
  };

  // ==========================================
  // RENDERIZAÇÃO
  // ==========================================

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* HEADER */}

      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={Logo}
            style={{
              width: 28,
              height: 28,
              resizeMode: "contain",
            }}
          />

          <Text style={styles.headerTitle}>Study Plaza</Text>
        </View>

        <View style={styles.headerActions}>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
            <FontAwesome6
              name="moon"
              size={20}
              color={theme.corFonte || "#333"}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push("/(tabs)/profile/" as any)}
          >
            <FontAwesome6
              name="circle-user"
              size={24}
              color={theme.corFonte || "#333"}
            />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO */}

        <View style={styles.heroCard}>
          <View style={styles.badgeAtivos}>
            <Text style={styles.badgeText}>+{grupos.length} grupos ativos</Text>
          </View>

          <Text style={styles.heroTitle}>
            Encontre o grupo ideal para evoluir nos estudos
          </Text>

          <Text style={styles.heroDescription}>
            Explore temas, participe de comunidades engajadas, compartilhe
            materiais e estude com colegas que têm os mesmos objetivos que você.
          </Text>

          <View style={styles.heroButtonsContainer}>
            <TouchableOpacity
              style={styles.btnPrimaryHero}
              onPress={() => router.push("/(tabs)/cursos" as any)}
            >
              <Text style={styles.btnPrimaryHeroText}>Acessar cursos</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnSecondaryHero}
              onPress={handleScrollToGrupos}
            >
              <Text style={styles.btnSecondaryHeroText}>Descobrir grupos</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* GRUPOS */}

        <View
          style={styles.sectionContainer}
          onLayout={(event) => {
            setGruposSectionY(event.nativeEvent.layout.y);
          }}
        >
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionTitle}>Grupos recomendados</Text>

            <TouchableOpacity onPress={handleScrollToGrupos}>
              <Text style={styles.seeAllText}>Ver todos</Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <ActivityIndicator
              size="large"
              color={theme.roxoPrincipal}
              style={{ marginVertical: 20 }}
            />
          ) : grupos.length === 0 ? (
            <Text
              style={{
                color: theme.corFonteSecundaria,
                textAlign: "center",
                marginVertical: 25,
              }}
            >
              Nenhum grupo encontrado. Que tal criar o primeiro?
            </Text>
          ) : (
            grupos.map((grupo) => {
              const ehAdmin = usuarioEhAdmin(grupo);
              const participa = usuarioParticipa(grupo.id);

              return (
                <View key={grupo.id} style={styles.cardGrupo}>
                  <View style={styles.cardHeader}>
                    <Text style={styles.cardTitle}>{grupo.nome}</Text>

                    <View style={styles.badgeSituacao}>
                      <FontAwesome6
                        name="globe"
                        size={10}
                        color={theme.roxoPrincipal}
                      />

                      <Text style={styles.badgeSituacaoText}>Público</Text>
                    </View>
                  </View>

                  <Text style={styles.cardDescription}>{grupo.descricao}</Text>

                  <View style={styles.cardDetails}>
                    <View style={styles.detailRow}>
                      <FontAwesome6
                        name="user-group"
                        size={14}
                        color={theme.corFonteSecundaria}
                      />

                      <Text style={styles.detailText}>
                        {grupo.total_membros} membro(s)
                      </Text>
                    </View>

                    <View style={styles.detailRow}>
                      <FontAwesome6
                        name="user"
                        size={14}
                        color={theme.corFonteSecundaria}
                      />

                      <Text style={styles.detailText}>
                        {grupo.criado_por === Number(user?.id)
                          ? "Por: Você"
                          : `Criador: Usuário #${grupo.criado_por}`}
                      </Text>
                    </View>
                  </View>

                  {/* AÇÕES */}

                  {ehAdmin ? (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                      }}
                    >
                      <TouchableOpacity
                        style={[
                          styles.btnParticipar,
                          {
                            flex: 1,
                            backgroundColor: theme.roxoPrincipal,
                          },
                        ]}
                        onPress={() => abrirModalMembros(grupo)}
                      >
                        <FontAwesome6
                          name="users-gear"
                          size={12}
                          color="#FFF"
                          style={{ marginRight: 6 }}
                        />

                        <Text
                          style={[styles.btnParticiparText, { color: "#FFF" }]}
                        >
                          Membros
                        </Text>
                      </TouchableOpacity>

                      {grupo.criado_por === Number(user?.id) && (
                        <TouchableOpacity
                          style={[
                            styles.btnParticipar,
                            {
                              flex: 1,
                              backgroundColor: "#DC2626",
                            },
                          ]}
                          onPress={() => handleExcluirGrupo(grupo)}
                        >
                          <FontAwesome6
                            name="trash-can"
                            size={12}
                            color="#FFF"
                            style={{ marginRight: 6 }}
                          />

                          <Text
                            style={[
                              styles.btnParticiparText,
                              { color: "#FFF" },
                            ]}
                          >
                            Excluir
                          </Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  ) : (
                    <TouchableOpacity
                      style={[
                        styles.btnParticipar,
                        participa && {
                          backgroundColor: theme.corBorda,
                        },
                      ]}
                      disabled={participa}
                      onPress={() => handleParticipar(grupo)}
                    >
                      <Text style={styles.btnParticiparText}>
                        {participa ? "Já participa" : "Participar"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              );
            })
          )}
        </View>

        {/* CRIAR GRUPO */}

        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>
            Pronto para criar seu próprio grupo?
          </Text>

          <Text style={styles.ctaDescription}>
            Organize sua turma, convide novos membros e acompanhe tudo no
            painel.
          </Text>

          <TouchableOpacity
            style={styles.btnCta}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.btnCtaText}>Começar agora</Text>
          </TouchableOpacity>
        </View>

        {/* FOOTER */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 Study Plaza - Todos os direitos reservados.
          </Text>
        </View>

        <View style={{ height: 30 }} />
      </ScrollView>

      {/* ====================================== */}
      {/* MODAL: CRIAR GRUPO */}
      {/* ====================================== */}

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.corFundo || "#FFF",
              borderRadius: 16,
              padding: 20,
              elevation: 5,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: theme.corFonte,
                }}
              >
                Criar Novo Grupo
              </Text>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <FontAwesome6
                  name="xmark"
                  size={20}
                  color={theme.corFonteSecundaria}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: theme.corFonte,
                marginBottom: 4,
              }}
            >
              Nome do Grupo *
            </Text>

            <TextInput
              placeholder="Ex: Grupo de Estudos React Native"
              placeholderTextColor="#9CA3AF"
              value={nome}
              onChangeText={setNome}
              maxLength={50}
              style={{
                borderWidth: 1,
                borderColor: theme.corBorda,
                borderRadius: 8,
                padding: 10,
                color: theme.corFonte,
                marginBottom: 12,
              }}
            />

            <Text
              style={{
                fontSize: 14,
                fontWeight: "600",
                color: theme.corFonte,
                marginBottom: 4,
              }}
            >
              Descrição *
            </Text>

            <TextInput
              placeholder="Descreva o foco e os objetivos do grupo..."
              placeholderTextColor="#9CA3AF"
              multiline
              numberOfLines={3}
              maxLength={300}
              value={descricao}
              onChangeText={setDescricao}
              style={{
                borderWidth: 1,
                borderColor: theme.corBorda,
                borderRadius: 8,
                padding: 10,
                color: theme.corFonte,
                textAlignVertical: "top",
                marginBottom: 20,
              }}
            />

            <View
              style={{
                flexDirection: "row",
                gap: 12,
              }}
            >
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                disabled={submitting}
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: theme.corBorda,
                }}
              >
                <Text
                  style={{
                    color: theme.corFonte,
                    fontWeight: "600",
                  }}
                >
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                disabled={submitting}
                onPress={handleCriarGrupo}
                style={{
                  flex: 1,
                  backgroundColor: theme.roxoPrincipal,
                  paddingVertical: 12,
                  borderRadius: 8,
                  alignItems: "center",
                  justifyContent: "center",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? (
                  <ActivityIndicator color="#FFF" size="small" />
                ) : (
                  <Text
                    style={{
                      color: "#FFF",
                      fontWeight: "bold",
                    }}
                  >
                    Cadastrar Grupo
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* ====================================== */}
      {/* MODAL: GERENCIAR MEMBROS */}
      {/* ====================================== */}

      <Modal
        animationType="fade"
        transparent
        visible={modalMembrosVisible}
        onRequestClose={() => setModalMembrosVisible(false)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.5)",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <View
            style={{
              backgroundColor: theme.corFundo || "#FFF",
              borderRadius: 16,
              padding: 20,
              maxHeight: "80%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: theme.corFonte,
                }}
              >
                Gerenciar Membros
              </Text>

              <TouchableOpacity onPress={() => setModalMembrosVisible(false)}>
                <FontAwesome6
                  name="xmark"
                  size={20}
                  color={theme.corFonteSecundaria}
                />
              </TouchableOpacity>
            </View>

            <Text
              style={{
                color: theme.corFonteSecundaria,
                marginBottom: 15,
              }}
            >
              Grupo: {grupoGerenciado?.nome}
            </Text>

            {loadingMembros ? (
              <ActivityIndicator
                color={theme.roxoPrincipal}
                style={{ marginVertical: 30 }}
              />
            ) : membros.length === 0 ? (
              <Text
                style={{
                  color: theme.corFonte,
                  textAlign: "center",
                  marginVertical: 20,
                }}
              >
                Nenhum membro encontrado neste grupo.
              </Text>
            ) : (
              <FlatList
                data={membros}
                keyExtractor={(item) => item.id_usuario.toString()}
                renderItem={({ item }) => {
                  const ehProprioUsuario = item.id_usuario === Number(user?.id);

                  const ehOutroAdmin = item.papel?.toLowerCase() === "admin";

                  return (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingVertical: 12,
                        borderBottomWidth: 1,
                        borderColor: theme.corBorda,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            color: theme.corFonte,
                            fontWeight: "600",
                          }}
                        >
                          {item.nome}
                          {ehProprioUsuario ? " (Você)" : ""}
                        </Text>

                        {item.email && (
                          <Text
                            style={{
                              color: theme.corFonteSecundaria,
                              fontSize: 12,
                            }}
                          >
                            {item.email}
                          </Text>
                        )}

                        {item.papel && (
                          <Text
                            style={{
                              color: theme.corFonteSecundaria,
                              fontSize: 11,
                            }}
                          >
                            {item.papel}
                          </Text>
                        )}
                      </View>

                      {!ehProprioUsuario && !ehOutroAdmin && (
                        <TouchableOpacity
                          onPress={() => removerMembro(item)}
                          style={{
                            padding: 8,
                            backgroundColor: "#FEE2E2",
                            borderRadius: 6,
                          }}
                        >
                          <FontAwesome6
                            name="user-xmark"
                            size={14}
                            color="#EF4444"
                          />
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                }}
              />
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
