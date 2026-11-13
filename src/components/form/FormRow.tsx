import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {expandedWidth} from '@constants/layout';
import {theme} from '@constants/theme';

type FormRowProps = {
  children: React.ReactNode;
};

export function FormRow({children}: FormRowProps) {
  const {width} = useWindowDimensions();
  const columns = width >= expandedWidth;

  return (
    <View style={columns ? styles.row : styles.stack}>
      {React.Children.map(children, child => (
        <View style={columns ? styles.cell : undefined}>{child}</View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: {
    gap: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.lg,
  },
  cell: {
    flex: 1,
    minWidth: 0,
  },
});
