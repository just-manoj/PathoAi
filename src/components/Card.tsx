import React, { ReactNode } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { styles } from '../styles/components/Card.styles';

type Props = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export const Card = ({ children, style }: Props) => {
  return <View style={[styles.card, style]}>{children}</View>;
};

export default Card;
