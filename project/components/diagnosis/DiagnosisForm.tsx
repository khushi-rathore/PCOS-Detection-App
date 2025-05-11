import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { theme } from '@/constants/theme';

const diagnosisSchema = Yup.object().shape({
  age: Yup.number()
    .required('Age is required')
    .min(12, 'Age must be at least 12')
    .max(60, 'Age must be less than 60'),
  weight: Yup.number()
    .required('Weight is required')
    .positive('Weight must be positive'),
  bmi: Yup.number()
    .required('BMI is required')
    .positive('BMI must be positive'),
  cycles: Yup.string()
    .required('Information about menstrual cycles is required'),
  hairGrowth: Yup.string()
    .required('Information about hair growth is required'),
  skinDarkening: Yup.string()
    .required('Information about skin darkening is required'),
  hairLoss: Yup.string()
    .required('Information about hair loss is required'),
  weightGain: Yup.string()
    .required('Information about weight gain is required'),
  fatigue: Yup.string()
    .required('Information about fatigue is required'),
  moodSwings: Yup.string()
    .required('Information about mood swings is required'),
});

const initialValues = {
  age: '',
  weight: '',
  bmi: '',
  cycles: '',
  hairGrowth: '',
  skinDarkening: '',
  hairLoss: '',
  weightGain: '',
  fatigue: '',
  moodSwings: '',
};

export function DiagnosisForm({ onSubmit, onGetDiagnosis }) {
  const handleCalculateBMI = (values, setFieldValue) => {
    if (values.weight && values.height) {
      // BMI = weight (kg) / (height (m))^2
      const heightInMeters = Number(values.height) / 100;
      const bmi = (Number(values.weight) / (heightInMeters * heightInMeters)).toFixed(1);
      setFieldValue('bmi', bmi);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={diagnosisSchema}
      onSubmit={onSubmit}
    >
      {({ handleChange, handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
        <View style={styles.formContainer}>
          <View style={styles.formGroup}>
            <Text style={styles.label}>Age</Text>
            <TextInput
              style={[
                styles.input,
                touched.age && errors.age && styles.inputError
              ]}
              onChangeText={handleChange('age')}
              onBlur={handleBlur('age')}
              value={values.age}
              keyboardType="numeric"
              placeholder="Enter your age"
              placeholderTextColor={theme.colors.gray[400]}
            />
            {touched.age && errors.age && (
              <Text style={styles.errorText}>{errors.age}</Text>
            )}
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Weight (kg)</Text>
              <TextInput
                style={[
                  styles.input,
                  touched.weight && errors.weight && styles.inputError
                ]}
                onChangeText={(text) => {
                  handleChange('weight')(text);
                  // After setting weight, try to calculate BMI
                  setTimeout(() => {
                    handleCalculateBMI({ ...values, weight: text }, setFieldValue);
                  }, 100);
                }}
                onBlur={handleBlur('weight')}
                value={values.weight}
                keyboardType="numeric"
                placeholder="Enter weight"
                placeholderTextColor={theme.colors.gray[400]}
              />
              {touched.weight && errors.weight && (
                <Text style={styles.errorText}>{errors.weight}</Text>
              )}
            </View>

            <View style={[styles.formGroup, styles.halfWidth]}>
              <Text style={styles.label}>Height (cm)</Text>
              <TextInput
                style={styles.input}
                onChangeText={(text) => {
                  setFieldValue('height', text);
                  // After setting height, try to calculate BMI
                  setTimeout(() => {
                    handleCalculateBMI({ ...values, height: text }, setFieldValue);
                  }, 100);
                }}
                value={values.height}
                keyboardType="numeric"
                placeholder="Enter height"
                placeholderTextColor={theme.colors.gray[400]}
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>BMI</Text>
            <TextInput
              style={[
                styles.input,
                touched.bmi && errors.bmi && styles.inputError
              ]}
              onChangeText={handleChange('bmi')}
              onBlur={handleBlur('bmi')}
              value={values.bmi}
              keyboardType="numeric"
              placeholder="Enter BMI"
              placeholderTextColor={theme.colors.gray[400]}
              editable={false}
            />
            {touched.bmi && errors.bmi && (
              <Text style={styles.errorText}>{errors.bmi}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Menstrual Cycles</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  values.cycles === 'regular' && styles.selectedOption
                ]}
                onPress={() => setFieldValue('cycles', 'regular')}
              >
                <Text
                  style={[
                    styles.optionText,
                    values.cycles === 'regular' && styles.selectedOptionText
                  ]}
                >
                  Regular
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  values.cycles === 'irregular' && styles.selectedOption
                ]}
                onPress={() => setFieldValue('cycles', 'irregular')}
              >
                <Text
                  style={[
                    styles.optionText,
                    values.cycles === 'irregular' && styles.selectedOptionText
                  ]}
                >
                  Irregular
                </Text>
              </TouchableOpacity>
            </View>
            {touched.cycles && errors.cycles && (
              <Text style={styles.errorText}>{errors.cycles}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Excessive Hair Growth</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  values.hairGrowth === 'yes' && styles.selectedOption
                ]}
                onPress={() => setFieldValue('hairGrowth', 'yes')}
              >
                <Text
                  style={[
                    styles.optionText,
                    values.hairGrowth === 'yes' && styles.selectedOptionText
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  values.hairGrowth === 'no' && styles.selectedOption
                ]}
                onPress={() => setFieldValue('hairGrowth', 'no')}
              >
                <Text
                  style={[
                    styles.optionText,
                    values.hairGrowth === 'no' && styles.selectedOptionText
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
            {touched.hairGrowth && errors.hairGrowth && (
              <Text style={styles.errorText}>{errors.hairGrowth}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Skin Darkening</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  values.skinDarkening === 'yes' && styles.selectedOption
                ]}
                onPress={() => setFieldValue('skinDarkening', 'yes')}
              >
                <Text
                  style={[
                    styles.optionText,
                    values.skinDarkening === 'yes' && styles.selectedOptionText
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  values.skinDarkening === 'no' && styles.selectedOption
                ]}
                onPress={() => setFieldValue('skinDarkening', 'no')}
              >
                <Text
                  style={[
                    styles.optionText,
                    values.skinDarkening === 'no' && styles.selectedOptionText
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
            {touched.skinDarkening && errors.skinDarkening && (
              <Text style={styles.errorText}>{errors.skinDarkening}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Hair Loss</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  values.hairLoss === 'yes' && styles.selectedOption
                ]}
                onPress={() => setFieldValue('hairLoss', 'yes')}
              >
                <Text
                  style={[
                    styles.optionText,
                    values.hairLoss === 'yes' && styles.selectedOptionText
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  values.hairLoss === 'no' && styles.selectedOption
                ]}
                onPress={() => setFieldValue('hairLoss', 'no')}
              >
                <Text
                  style={[
                    styles.optionText,
                    values.hairLoss === 'no' && styles.selectedOptionText
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
            {touched.hairLoss && errors.hairLoss && (
              <Text style={styles.errorText}>{errors.hairLoss}</Text>
            )}
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Weight Gain</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  values.weightGain === 'yes' && styles.selectedOption
                ]}
                onPress={() => setFieldValue('weightGain', 'yes')}
              >
                <Text
                  style={[
                    styles.optionText,
                    values.weightGain === 'yes' && styles.selectedOptionText
                  ]}
                >
                  Yes
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.optionButton,
                  values.weightGain === 'no' && styles.selectedOption
                ]}
                onPress={() => setFieldValue('weightGain', 'no')}
              >
                <Text
                  style={[
                    styles.optionText,
                    values.weightGain === 'no' && styles.selectedOptionText
                  ]}
                >
                  No
                </Text>
              </TouchableOpacity>
            </View>
            {touched.weightGain && errors.weightGain && (
              <Text style={styles.errorText}>{errors.weightGain}</Text>
            )}
          </View>

          <TouchableOpacity 
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Continue to Image Upload</Text>
          </TouchableOpacity>

          
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 16,
  },
  formGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: theme.colors.gray[800],
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: theme.colors.gray[900],
    fontFamily: 'Inter-Regular',
  },
  inputError: {
    borderColor: theme.colors.error[500],
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: theme.colors.error[500],
    marginTop: 4,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: theme.colors.gray[300],
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 12,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary[600],
    borderColor: theme.colors.primary[600],
  },
  optionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: theme.colors.gray[700],
  },
  selectedOptionText: {
    color: 'white',
    fontFamily: 'Inter-Medium',
  },
  submitButton: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 28,
    alignItems: 'center',
    alignSelf: 'center', // center the button
    marginTop: 16,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    minWidth: 160, // optional: keeps button from being too small
  },
  submitButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.black,
  },
  nextButton: {
    backgroundColor: theme.colors.primary[200],
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 28,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    minWidth: 120,
  },
  nextButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.black,
  },
  getDiagnosisButton: {
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 28,
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 16,
    shadowColor: '#00000010',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    minWidth: 160,
  },
  getDiagnosisButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: theme.colors.black,
  },
});