import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

import { colors } from '../theme/colors';
import { styles } from '../styles/components/LabeledTextInput.styles';

type Props = TextInputProps & {
  label: string;
  required?: boolean;
  multiline?: boolean;
};

export const LabeledTextInput = ({
  label,
  required,
  style,
  multiline,
  ...rest
}: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {label}
        {required ? <Text style={styles.required}> *</Text> : null}
      </Text>
      <TextInput
        style={[styles.input, multiline && styles.multiline, style]}
        placeholderTextColor={colors.inputPlaceholder}
        multiline={multiline}
        {...rest}
      />
    </View>
  );
};

export default LabeledTextInput;
