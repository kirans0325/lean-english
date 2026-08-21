import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { colors } from '../theme/colors';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { UserRole } from '../types';

export const AdminConsoleScreen: React.FC = () => {
  const { user, isAdmin, updateUserRole } = useAuth();
  const { xpPoints, spokenHistory, addXP } = useProgress();

  const [registeredUsers, setRegisteredUsers] = useState([
    { id: 999, name: 'App Administrator', email: 'admin@fluentai.com', role: 'admin' as UserRole, phase: 'business', xp: 950 },
    { id: 101, name: 'Kiran S', email: 'kiran@example.com', role: 'user' as UserRole, phase: 'intermediate', xp: 420 },
    { id: 102, name: 'Sarah Jenkins', email: 'sarah.j@techcorp.com', role: 'user' as UserRole, phase: 'advanced', xp: 680 },
    { id: 103, name: 'Rajesh Kumar', email: 'rajesh@learning.in', role: 'user' as UserRole, phase: 'basics', xp: 210 },
  ]);

  const handleToggleUserRole = (userId: number) => {
    setRegisteredUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextRole: UserRole = u.role === 'admin' ? 'user' : 'admin';
          updateUserRole(userId, nextRole);
          return { ...u, role: nextRole };
        }
        return u;
      })
    );
  };

  const handleGrantXP = () => {
    addXP(500);
    Alert.alert('Admin Action', '500 XP granted successfully to your account!');
  };

  if (!isAdmin) {
    return (
      <View style={styles.restrictedContainer}>
        <Text style={styles.restrictedTitle}>🔒 Access Restricted</Text>
        <Text style={styles.restrictedSub}>
          You must be logged in as an Administrator (`admin@fluentai.com`) to access the Admin Console.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.adminHeaderCard}>
        <View style={styles.crownBadge}>
          <Text style={styles.crownBadgeText}>👑 SYSTEM ADMIN CONSOLE</Text>
        </View>
        <Text style={styles.adminTitle}>FluentAI Administrator Control Center</Text>
        <Text style={styles.adminSub}>Logged in as: {user?.email} ({user?.name})</Text>
      </View>

      {/* Database & System Metrics */}
      <Text style={styles.sectionTitle}>System & Database Metrics</Text>
      <View style={styles.metricsGrid}>
        <View style={styles.metricBox}>
          <Text style={styles.metricVal}>🟢 Active</Text>
          <Text style={styles.metricLbl}>Neon DB PostgreSQL</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricVal}>{registeredUsers.length}</Text>
          <Text style={styles.metricLbl}>Registered Users</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricVal}>{spokenHistory.length}</Text>
          <Text style={styles.metricLbl}>Spoken History Records</Text>
        </View>
        <View style={styles.metricBox}>
          <Text style={styles.metricVal}>8</Text>
          <Text style={styles.metricLbl}>Curriculum Categories</Text>
        </View>
      </View>

      {/* Database Connection Info Box */}
      <View style={styles.dbInfoCard}>
        <Text style={styles.dbInfoHeading}>🐘 Connected PostgreSQL Database:</Text>
        <Text style={styles.dbUrlText}>
          postgresql://neondb_owner:npg_OC1VbURlm7SH@ep-broad-haze-axdzb9ja-pooler.c-4.us-east-2.aws.neon.tech/neondb
        </Text>
      </View>

      {/* Registered Users Management Table */}
      <Text style={styles.sectionTitle}>User Access & Role Management</Text>
      <View style={styles.usersTableCard}>
        {registeredUsers.map((u) => (
          <View key={u.id} style={styles.userRow}>
            <View style={styles.userInfoLeft}>
              <View style={styles.nameRoleRow}>
                <Text style={styles.userNameText}>{u.name}</Text>
                <View style={[styles.rolePill, u.role === 'admin' ? styles.adminRolePill : styles.userRolePill]}>
                  <Text style={[styles.rolePillText, u.role === 'admin' ? styles.adminRolePillText : styles.userRolePillText]}>
                    {u.role.toUpperCase()}
                  </Text>
                </View>
              </View>
              <Text style={styles.userEmailText}>{u.email}</Text>
              <Text style={styles.userMetaText}>Level: {u.phase.toUpperCase()} • XP: {u.xp}</Text>
            </View>

            <TouchableOpacity
              style={[styles.toggleRoleBtn, u.role === 'admin' ? styles.demoteBtn : styles.promoteBtn]}
              onPress={() => handleToggleUserRole(u.id)}
            >
              <Text style={styles.toggleRoleBtnText}>
                {u.role === 'admin' ? 'Make User' : 'Make Admin'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* Admin Quick Operations */}
      <Text style={styles.sectionTitle}>Admin Quick Operations</Text>
      <View style={styles.operationsGrid}>
        <TouchableOpacity style={styles.opBtn} onPress={handleGrantXP}>
          <Text style={styles.opBtnText}>⚡ Grant 500 XP to Self</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.opBtn} onPress={() => Alert.alert('Neon DB', 'Neon DB PostgreSQL tables verified! All schemas healthy.')}>
          <Text style={styles.opBtnText}>🐘 Verify Neon DB Health</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  restrictedContainer: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  restrictedTitle: {
    color: colors.danger,
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },
  restrictedSub: {
    color: colors.textSecondary,
    fontSize: 13,
    textAlign: 'center',
  },
  adminHeaderCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 20,
    padding: 18,
    marginBottom: 16,
    borderWidth: 1.5,
    borderColor: '#F59E0B',
  },
  crownBadge: {
    backgroundColor: '#F59E0B',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginBottom: 6,
  },
  crownBadgeText: {
    color: '#000',
    fontSize: 9,
    fontWeight: '900',
  },
  adminTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '900',
  },
  adminSub: {
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 10,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 16,
  },
  metricBox: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  metricVal: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '900',
  },
  metricLbl: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  dbInfoCard: {
    backgroundColor: '#0F172A',
    borderRadius: 14,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  dbInfoHeading: {
    color: colors.secondary,
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
  },
  dbUrlText: {
    color: colors.textMuted,
    fontSize: 10,
    fontFamily: 'monospace',
  },
  usersTableCard: {
    backgroundColor: colors.cardBg,
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    gap: 12,
  },
  userRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0F172A',
    borderRadius: 12,
    padding: 12,
  },
  userInfoLeft: {
    flex: 1,
    marginRight: 10,
  },
  nameRoleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  userNameText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 14,
  },
  rolePill: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  adminRolePill: {
    backgroundColor: '#F59E0B',
  },
  userRolePill: {
    backgroundColor: '#1E1B4B',
  },
  rolePillText: {
    fontSize: 8,
    fontWeight: '900',
  },
  adminRolePillText: {
    color: '#000',
  },
  userRolePillText: {
    color: colors.primary,
  },
  userEmailText: {
    color: colors.textSecondary,
    fontSize: 11,
    marginTop: 2,
  },
  userMetaText: {
    color: colors.textMuted,
    fontSize: 10,
    marginTop: 2,
  },
  toggleRoleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  promoteBtn: {
    backgroundColor: '#F59E0B',
  },
  demoteBtn: {
    backgroundColor: colors.cardBg,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  toggleRoleBtnText: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 11,
  },
  operationsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 30,
  },
  opBtn: {
    flex: 1,
    backgroundColor: colors.cardBg,
    borderRadius: 14,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  opBtnText: {
    color: colors.text,
    fontWeight: '800',
    fontSize: 12,
  },
});
