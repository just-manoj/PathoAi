import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  required: {
    color: colors.textError,
  },
  input: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.inputBorder,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#244B68',
    backgroundColor: colors.cardBackground,
  },
  multiline: {
    minHeight: 84,
    textAlignVertical: 'top',
  },
});


