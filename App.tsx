import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './views/HomeScreen';
import { PowerupScreen } from './views/PowerupScreen';
import { TransitScreen } from './views/TransitScreen';
import { QuestsScreen } from './views/QuestsScreen'
import { useEffect, useState } from 'react';
import { MoneyContext } from './shared/MoneyContext';
import { useFonts } from 'expo-font';
import { defaultQuests, QuestContext } from './shared/QuestContext';
import { Quest } from './shared/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()

export default function App() {
  const [money, setMoney] = useState<number>(500)
  const [quests, setQuests] = useState<Array<Quest>>(defaultQuests)

  const [loaded] = useFonts({
      'Lexend': require('./assets/fonts/Lexend-Regular.ttf'),
      'LexendBold': require('./assets/fonts/Lexend-Bold.ttf'),
  })

  async function fetchData() {
    const data = await AsyncStorage.getItem('@jl_quests')
    if (data != null) {
      const parsed = JSON.parse(data)

      setQuests(parsed)
    } else {
      await AsyncStorage.setItem('@jl_quests', JSON.stringify(quests))
    }

    const moneyData = await AsyncStorage.getItem('@jl_money')
    if (moneyData != null) {
      const parsed = parseInt(moneyData)

      setMoney(parsed)
    } else {
      await AsyncStorage.setItem('@jl_money', '500')
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  if (!loaded) return null

  return (
    <MoneyContext.Provider value={{ money, setMoney }}>
      <QuestContext.Provider value={{ quests, setQuests }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerTitle: '', headerShadowVisible: false }} />
            <Stack.Screen name="Powerups" component={PowerupScreen} options={{ headerTitle: 'Powerupy', headerShadowVisible: false }} />
            <Stack.Screen name="Transit" component={TransitScreen} options={{ headerTitle: 'Bilety', headerShadowVisible: false }} />
            <Stack.Screen name="Quests" component={QuestsScreen} options={{ headerTitle: 'Zadania', headerShadowVisible: false }} />
          </Stack.Navigator>
        </NavigationContainer>
      </QuestContext.Provider>
    </MoneyContext.Provider>
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
