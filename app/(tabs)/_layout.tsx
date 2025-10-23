import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
       <Tabs.Screen
        name="WelcomePage"
        options={{
          title: 'Welcome Page',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="RecentCreationsPage"
        options={{
          title: 'Recent Creations',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="CreationTypePage"
        options={{
          title: 'Creation Type Page',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="StoryboardSelectionPage"
        options={{
          title: 'Storyboard Selection',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

      <Tabs.Screen
        name="CanvasPage"
        options={{
          title: 'Canvas Page',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="MovieTitlePage"
        options={{
          title: 'Movie Title Page',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
            <Tabs.Screen
        name="MovieEditorPage"
        options={{
          title: 'Movie Editor Page',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
                  <Tabs.Screen
        name="MovieSpeedPage"
        options={{
          title: 'Movie Speed Page',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
                        <Tabs.Screen
        name="MovieSelectionPage"
        options={{
          title: 'Movie Selection Page',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
      <Tabs.Screen
        name="MovieCreationResult"
        options={{
          title: 'Movie Creation Result',
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />

    </Tabs>
  );
}
