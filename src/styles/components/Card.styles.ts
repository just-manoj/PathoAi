import { StyleSheet } from 'react-native';

import { colors } from '../../theme/colors';

export const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    backgroundColor: colors.cardBackground,
    paddingVertical: 16,
    paddingHorizontal: 18,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
});


