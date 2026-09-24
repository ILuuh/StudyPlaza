import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { useAppTheme } from '../../../hooks/use-theme-context';
import { createStyles } from './styles';
import { useAuth } from '../../../contexts/AuthContext';

export default function Profile() {
  const { user, signOut } = useAuth();
  const { theme } = useAppTheme();  
  const styles = createStyles(theme);
   
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* CABEÇALHO DO PERFIL */}
      <View style={styles.headerCard}>
        <View style={styles.avatarContainer}>
          <FontAwesome6 name="user" size={36} color={theme.corFonteSecundaria} />
        </View>
        <View style={styles.infoBasica}>
          <Text style={styles.nome}>{user?.nome || user?.email}</Text>
          <Text style={styles.username}>{user?.email}</Text>
        </View>
      </View>

      {/* NAVEGAÇÃO INTERNA (TABS DO PERFIL) */}
      <View style={styles.navContainer}>
        <View style={styles.navItemActive}>
          <FontAwesome6 name="sliders" size={16} color={theme.roxoPrincipal} />
          <Text style={styles.navItemTextActive}>Configurações</Text>
        </View>
      </View>

      {/* CONTEÚDO: CONFIGURAÇÕES DA CONTA */}
      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>Configurações da Conta</Text>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Nome Completo</Text>
          <Text style={styles.fieldValue}>{user?.nome}</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>E-mail</Text>
          <Text style={styles.fieldValue}>{user?.email}</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Profissão</Text>
          <Text style={styles.fieldValue}>{user?.tipo_usuario}</Text>
        </View>
      </View>

      {/* BOTÃO SAIR */}
      <TouchableOpacity style={styles.logoutBtn}>
        <FontAwesome6 name="right-from-bracket" size={16} color="#ef4444" />
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>

      <View style={{ height: 40 }} />
    </ScrollView>
  );
}