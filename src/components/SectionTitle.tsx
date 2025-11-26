import React from 'react';
import { Text, View } from 'react-native';

import { styles } from '../styles/components/SectionTitle.styles';

type Props = {
  title: string;
};

export const SectionTitle = ({ title }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default SectionTitle;
