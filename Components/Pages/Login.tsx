import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, { useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'


const Login = () => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const isEmail = (v: string) => /.+@+.\..+/.test(v)
  const isPhone = (v: string) => /^\+?[0-9]{7,15}$/.test(v)

  const canSubmit = useMemo(() => {
    const idOk = isEmail(identifier) || isPhone(identifier)
    return idOk && password.length >= 6
  }, [identifier, password])

  const handleSubmit = () => {
    if (!canSubmit) {
      Alert.alert('Invalid details', 'Enter a valid email/phone and a 6+ char password.')
      return
    }
    Alert.alert('Logged in', `Welcome: ${identifier}`)
  }

  const navigation = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.subtitle}>Enter your credentials to continue</Text>

        <Text style={styles.label}>Email or Phone</Text>
        <TextInput
          value={identifier}
          onChangeText={setIdentifier}
          placeholder="you@example.com or +911234567890"
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, identifier !== '' && !(isEmail(identifier) || isPhone(identifier)) && styles.inputError]}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="••••••••"
            secureTextEntry={!showPassword}
            style={[styles.input, styles.passwordInput, password !== '' && password.length < 6 && styles.inputError]}
          />
          <Pressable onPress={() => setShowPassword(p => !p)} style={styles.showBtn}>
            <Text style={styles.showBtnText}>{showPassword ? 'Hide' : 'Show'}</Text>
          </Pressable>
        </View>

        <Pressable onPress={handleSubmit} disabled={!canSubmit} style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}>
          <Text style={styles.submitText}>Sign in</Text>
        </Pressable>

        <View style={styles.footerRow}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('SignIn' as never)}>
            <Text style={styles.footerLink}> Sign up</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Login

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    marginTop: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#666',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginTop: 12,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  inputError: {
    borderColor: '#ff7675',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
  },
  showBtn: {
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  showBtnText: {
    color: '#333',
    fontWeight: '600',
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: '#1e90ff',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#a0c6f7',
  },
  submitText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  footerText: {
    color: '#666',
  },
  footerLink: {
    color: '#1e90ff',
    fontWeight: '600',
  },
})