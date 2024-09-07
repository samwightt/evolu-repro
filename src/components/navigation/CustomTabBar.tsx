import React from 'react';
import { BottomNavigation } from 'react-native-paper';
import { CommonActions, NavigationState } from '@react-navigation/native';
import { EdgeInsets } from 'react-native-safe-area-context';

import { Colors } from '~/constants/Colors';
import { useColorScheme } from '~/hooks/useColorScheme';

interface CustomTabBarProps {
  navigation: any;
  state: NavigationState;
  descriptors: Record<string, any>;
  insets: EdgeInsets;
}

export const CustomTabBar: React.FC<CustomTabBarProps> = ({ navigation, state, descriptors, insets }) => {
  const colorScheme = useColorScheme();

  return (
    <BottomNavigation.Bar
      navigationState={state}
      safeAreaInsets={insets}
      onTabPress={({ route, preventDefault }) => {
        const event = navigation.emit({
          type: 'tabPress',
          target: route.key,
          canPreventDefault: true,
        });

        if (event.defaultPrevented) {
          preventDefault();
        } else {
          navigation.dispatch({
            ...CommonActions.navigate({ name: route.name, params: route.params }),
            target: state.key,
          });
        }
      }}
      renderIcon={({ route, focused, color }) => {
        const { options } = descriptors[route.key];
        if (options.tabBarIcon) {
          return options.tabBarIcon({ focused, color, size: 24 });
        }
        return null;
      }}
      getLabelText={({ route }) => {
        const { options } = descriptors[route.key];
        return options.title ?? route.name;
      }}
      activeColor={Colors[colorScheme ?? 'light'].tint}
      inactiveColor="gray"
    />
  );
};