import React from 'react';
import { 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { router } from 'expo-router';
import { FontAwesome6 } from '@expo/vector-icons';

import { useAppTheme } from '../../../hooks/use-theme-context';
import Logo from '../../../assets/images/Logo.svg';

// Importa os estilos que separamos
import { createStyles } from './styles';

export default function Dashboard() {
  const { theme, toggleTheme } = useAppTheme();
  
  // Chama a função importada passando o tema atual
  const styles = createStyles(theme);

  // Dados mockados baseados no seu HTML
  const gruposRecomendados = [
    {
      id: 1,
      titulo: 'Front-end colaborativo',
      situacao: 'Online',
      iconeSituacao: 'signal',
      descricao: 'Estudos semanais focados em React, acessibilidade e boas práticas de UI. Compartilhe códigos e revise projetos em conjunto.',
      membros: '24 membros',
      horario: 'Encontros às terças',
      extra: 'Português',
      iconeExtra: 'language',
    },
    {
      id: 2,
      titulo: 'Preparatório ENEM Redação',
      situacao: 'Presencial',
      iconeSituacao: 'people-line',
      descricao: 'Grupo com correção coletiva de redações, simulados mensais e materiais comentados por professores convidados.',
      membros: '18 membros',
      horario: 'Sábados de manhã',
      extra: 'Centro Educacional SP',
      iconeExtra: 'location-dot',
    },
    {
      id: 3,
      titulo: 'Conversação em Inglês',
      situacao: 'Híbrido',
      iconeSituacao: 'globe',
      descricao: 'Prática guiada de conversação com tutores convidados e desafios temáticos quinzenais para destravar o inglês.',
      membros: '30 membros',
      horario: 'Quartas à noite',
      extra: 'Inglês / Português',
      iconeExtra: 'language',
    }
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* CABEÇALHO */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Logo width={28} height={28} />
          <Text style={styles.headerTitle}>Study Plaza</Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
            <FontAwesome6 name="moon" size={20} color={theme.corFonte} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => {/* Ir para perfil */}}>
            <FontAwesome6 name="circle-user" size={24} color={theme.corFonte} />
          </TouchableOpacity>
        </View>
      </View>

      {/* HERO SECTION */}
      <View style={styles.heroCard}>
        <View style={styles.badgeAtivos}>
          <Text style={styles.badgeText}>+180 grupos ativos</Text>
        </View>

        <Text style={styles.heroTitle}>Encontre o grupo ideal para evoluir nos estudos</Text>

        <Text style={styles.heroDescription}>
          Explore temas, participe de comunidades engajadas, compartilhe materiais e estude com colegas que têm os mesmos objetivos que você.
        </Text>

        <View style={styles.heroButtonsContainer}>
          <TouchableOpacity style={styles.btnPrimaryHero}>
            <Text style={styles.btnPrimaryHeroText}>Ir para o painel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnSecondaryHero}>
            <Text style={styles.btnSecondaryHeroText}>Descobrir grupos</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* LISTA DE GRUPOS RECOMENDADOS */}
      <View style={styles.sectionContainer}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Grupos recomendados</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {gruposRecomendados.map((grupo) => (
          <View key={grupo.id} style={styles.cardGrupo}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{grupo.titulo}</Text>
              <View style={styles.badgeSituacao}>
                <FontAwesome6 name={grupo.iconeSituacao as any} size={10} color={theme.roxoPrincipal} />
                <Text style={styles.badgeSituacaoText}>{grupo.situacao}</Text>
              </View>
            </View>

            <Text style={styles.cardDescription}>{grupo.descricao}</Text>

            <View style={styles.cardDetails}>
              <View style={styles.detailRow}>
                <FontAwesome6 name="user-group" size={14} color={theme.corFonteSecundaria} />
                <Text style={styles.detailText}>{grupo.membros}</Text>
              </View>
              <View style={styles.detailRow}>
                <FontAwesome6 name="calendar" size={14} color={theme.corFonteSecundaria} />
                <Text style={styles.detailText}>{grupo.horario}</Text>
              </View>
              <View style={styles.detailRow}>
                <FontAwesome6 name={grupo.iconeExtra as any} size={14} color={theme.corFonteSecundaria} />
                <Text style={styles.detailText}>{grupo.extra}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.btnParticipar}>
              <Text style={styles.btnParticiparText}>Participar</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* CTA: CRIAR PRÓPRIO GRUPO */}
      <View style={styles.ctaCard}>
        <Text style={styles.ctaTitle}>Pronto para criar seu próprio grupo?</Text>
        <Text style={styles.ctaDescription}>
          Organize sua turma, personalize regras, convide novos membros e acompanhe tudo no painel em tempo real.
        </Text>
        <TouchableOpacity style={styles.btnCta}>
          <Text style={styles.btnCtaText}>Começar agora</Text>
        </TouchableOpacity>
      </View>

      {/* FOOTER BÁSICO */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 Study Plaza - Todos os direitos reservados.</Text>
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
}