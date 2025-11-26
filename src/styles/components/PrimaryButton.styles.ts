import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  button: {
    marginTop: 24,
    borderRadius: 24,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    backgroundColor: colors.primaryMuted,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapper: {
    marginRight: 8,
  },
  label: {
    color: colors.textOnPrimary,
    fontSize: 16,
    fontWeight: '600',
  },
});


