import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './views/HomeScreen';
import { PowerupScreen } from './views/PowerupScreen';
import { TransitScreen } from './views/TransitScreen';
import { QuestsScreen } from './views/QuestsScreen'
import { LoginScreen } from './views/LoginScreen';
import { useEffect, useState } from 'react';
import { MoneyContext } from './shared/MoneyContext';
import { useFonts } from 'expo-font';
import { defaultQuests, QuestContext } from './shared/QuestContext';
import { Quest } from './shared/types';
import { QueryClient, QueryClientProvider } from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()
const queryClient = new QueryClient();

export default function App() {
  const [money, setMoney] = useState<number>(500)
  const [quests, setQuests] = useState<Array<Quest>>(defaultQuests)

  const [loaded] = useFonts({
      'Lexend': require('./assets/fonts/Lexend-Regular.ttf'),
      'LexendBold': require('./assets/fonts/Lexend-Bold.ttf'),
  })


  if (!loaded) return null

  return (
    <QueryClientProvider client={queryClient}>
      <QuestContext.Provider value={{ quests, setQuests }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="Powerups" component={PowerupScreen} options={{ headerTitle: 'Powerupy', headerShadowVisible: false }} />
            <Stack.Screen name="Transit" component={TransitScreen} options={{ headerTitle: 'Bilety', headerShadowVisible: false }} />
            <Stack.Screen name="Quests" component={QuestsScreen} options={{ headerTitle: 'Zadania', headerShadowVisible: false }} />
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: 'Login', headerShadowVisible: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QuestContext.Provider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
