import React, { ReactNode } from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';

import { styles } from '../styles/components/PrimaryButton.styles';

type Props = {
  label: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  leftIcon?: ReactNode;
};

export const PrimaryButton = ({
  label,
  onPress,
  disabled,
  style,
  labelStyle,
  leftIcon,
}: Props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.buttonDisabled, style]}
    >
      <View style={styles.contentRow}>
        {leftIcon && <View style={styles.iconWrapper}>{leftIcon}</View>}
        <Text style={[styles.label, labelStyle]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PrimaryButton;
