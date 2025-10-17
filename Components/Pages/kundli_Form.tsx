import { StyleSheet, Text, View, TextInput, ScrollView, Pressable, Alert } from 'react-native'
import React, { useMemo, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const kundli_Form = () => {
  const [fullName, setFullName] = useState('')
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | ''>('')
  const [dob, setDob] = useState('')
  const [tob, setTob] = useState('')
  const [pob, setPob] = useState('')
  const [timezone, setTimezone] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [notes, setNotes] = useState('')

  const isValidDate = (value: string) => /^(0[1-9]|[12]\d|3[01])-(0[1-9]|1[0-2])-(\d{4})$/.test(value)
  const isValidTime = (value: string) => /^([01]\d|2[0-3]):([0-5]\d)$/.test(value)
  const isValidTz = (value: string) => /^(?:[+-](?:0\d|1[0-2])):(?:[0-5]\d)$/.test(value)
  const isValidLat = (value: string) => value === '' || /^-?([0-8]?\d(\.\d+)?|90(\.0+)?)$/.test(value)
  const isValidLon = (value: string) => value === '' || /^-?((?:1?[0-7]?\d)(\.\d+)?|180(\.0+)?)$/.test(value)

  const canSubmit = useMemo(() => {
    const timezoneOk = timezone === '' || isValidTz(timezone)
    return (
      fullName.trim().length > 0 &&
      gender !== '' &&
      isValidDate(dob) &&
      isValidTime(tob) &&
      pob.trim().length > 0 &&
      timezoneOk &&
      isValidLat(latitude) &&
      isValidLon(longitude)
    )
  }, [fullName, gender, dob, tob, pob, timezone, latitude, longitude])

  const formatDateInput = (value: string) => {
    const digits = value.replace(/[^0-9]/g, '')
    const dd = digits.slice(0, 2)
    const mm = digits.slice(2, 4)
    const yyyy = digits.slice(4, 8)
    let out = dd
    if (mm) out += `-${mm}`
    if (yyyy) out += `-${yyyy}`
    return out
  }

  const formatTimeInput = (value: string) => {
    const digits = value.replace(/[^0-9]/g, '')
    const hh = digits.slice(0, 2)
    const mm = digits.slice(2, 4)
    let out = hh
    if (mm) out += `:${mm}`
    return out
  }

  const useToday = () => {
    const d = new Date()
    const y = d.getFullYear()
    const m = `${d.getMonth() + 1}`.padStart(2, '0')
    const day = `${d.getDate()}`.padStart(2, '0')
    setDob(`${day}-${m}-${y}`)
  }

  const useNow = () => {
    const d = new Date()
    const h = `${d.getHours()}`.padStart(2, '0')
    const m = `${d.getMinutes()}`.padStart(2, '0')
    setTob(`${h}:${m}`)
  }

  const handleSubmit = () => {
    if (!canSubmit) {
      Alert.alert('Incomplete or invalid', 'Please fix highlighted fields before submitting.')
      return
    }
    const payload = {
      fullName,
      gender,
      dateOfBirth: dob,
      timeOfBirth: tob,
      placeOfBirth: pob,
      timezone,
      latitude: latitude ? Number(latitude) : undefined,
      longitude: longitude ? Number(longitude) : undefined,
      notes: notes || undefined,
    }
    Alert.alert('Kundli details captured', JSON.stringify(payload, null, 2))
  }

  const InputLabel = ({ label, required }: { label: string, required?: boolean }) => (
    <Text style={styles.label}>{label}{required ? ' *' : ''}</Text>
  )

  const Choice = ({ value, selected, onPress }: { value: 'Male' | 'Female' | 'Other', selected: boolean, onPress: () => void }) => (
    <Pressable onPress={onPress} style={[styles.choice, selected && styles.choiceSelected]}>
      <Text style={[styles.choiceText, selected && styles.choiceTextSelected]}>{value}</Text>
    </Pressable>
  )

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.header}>
          <Text style={styles.title}>Kundli Details</Text>
          <Text style={styles.subtitle}>Enter your birth details to generate your kundli</Text>
        </View>

        <View style={styles.card}>
          <InputLabel label="Full Name" required />
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            placeholder="Enter full name"
            style={[styles.input, fullName.trim() === '' && styles.inputError]}
          />

          <InputLabel label="Gender" required />
          <View style={styles.row}>
            <Choice value="Male" selected={gender === 'Male'} onPress={() => setGender('Male')} />
            <Choice value="Female" selected={gender === 'Female'} onPress={() => setGender('Female')} />
            <Choice value="Other" selected={gender === 'Other'} onPress={() => setGender('Other')} />
          </View>

          <InputLabel label="Date of Birth (DD-MM-YYYY)" required />
          <TextInput
            value={dob}
            onChangeText={(v) => setDob(formatDateInput(v))}
            placeholder="14-08-1995"
            keyboardType="numbers-and-punctuation"
            style={[styles.input, (dob === '' || !isValidDate(dob)) && styles.inputError]}
          />
          <Text style={styles.helper}>Type digits only; it auto-formats as DD-MM-YYYY.</Text>
          <View style={styles.row}>
            <Pressable style={styles.chip} onPress={useToday}><Text style={styles.chipText}>Today</Text></Pressable>
          </View>

          <InputLabel label="Time of Birth (24h HH:MM)" required />
          <TextInput
            value={tob}
            onChangeText={(v) => setTob(formatTimeInput(v))}
            placeholder="14:45"
            keyboardType="numbers-and-punctuation"
            style={[styles.input, (tob === '' || !isValidTime(tob)) && styles.inputError]}
          />
          <Text style={styles.helper}>Type digits only; it auto-formats as HH:MM (24h).</Text>
          <View style={styles.row}>
            <Pressable style={styles.chip} onPress={useNow}><Text style={styles.chipText}>Now</Text></Pressable>
            <Pressable style={styles.chip} onPress={() => setTob('06:00')}><Text style={styles.chipText}>06:00</Text></Pressable>
            <Pressable style={styles.chip} onPress={() => setTob('12:00')}><Text style={styles.chipText}>12:00</Text></Pressable>
          </View>
        </View>

        <View style={styles.card}>
          <InputLabel label="Place of Birth (City, Country)" required />
          <TextInput
            value={pob}
            onChangeText={setPob}
            placeholder="Mumbai, India"
            style={[styles.input, pob.trim() === '' && styles.inputError]}
          />

          <InputLabel label="Timezone (e.g. +05:30)"  />
          <TextInput
            value={timezone}
            onChangeText={setTimezone}
            placeholder="+05:30"
            keyboardType="numbers-and-punctuation"
            autoCapitalize="none"
            style={[styles.input, (timezone !== '' && !isValidTz(timezone)) && styles.inputError]}
          />

          <InputLabel label="Latitude (optional)" />
          <TextInput
            value={latitude}
            onChangeText={setLatitude}
            placeholder="19.0760"
            keyboardType="numbers-and-punctuation"
            style={[styles.input, !isValidLat(latitude) && styles.inputError]}
          />

          <InputLabel label="Longitude (optional)" />
          <TextInput
            value={longitude}
            onChangeText={setLongitude}
            placeholder="72.8777"
            keyboardType="numbers-and-punctuation"
            style={[styles.input, !isValidLon(longitude) && styles.inputError]}
          />

          <InputLabel label="Additional Notes (optional)" />
          <TextInput
            value={notes}
            onChangeText={setNotes}
            placeholder="Any extra info"
            style={[styles.input, styles.multiline]}
            multiline
            numberOfLines={3}
          />
        </View>

        <Pressable
          onPress={handleSubmit}
          disabled={!canSubmit}
          style={[styles.submitButton, !canSubmit && styles.submitButtonDisabled]}
        >
          <Text style={styles.submitText}>Submit</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  )
}

export default kundli_Form

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
    gap: 10,
  },
  header: {
    marginBottom: 8,
  },
  helper: {
    color: '#666',
    fontSize: 12,
    marginTop: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#666',
    fontSize: 13,
  },
  label: {
    fontSize: 14,
    marginTop: 8,
    marginBottom: 4,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 12,
    marginTop: 10,
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
  row: {
    flexDirection: 'row',
    gap: 8,
  },
  choice: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  choiceSelected: {
    backgroundColor: '#1e90ff',
    borderColor: '#1e90ff',
  },
  choiceText: {
    color: '#333',
  },
  choiceTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: 'white',
  },
  chipText: {
    fontSize: 12,
    color: '#333',
  },
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: 16,
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
})