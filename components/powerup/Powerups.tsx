import { useContext } from "react"
import { View, Alert } from "react-native"
import { MoneyContext } from "../../shared/MoneyContext"
import { Powerup } from "./Powerup"
import { announceEvent } from "../../shared/announceEvent"
import AsyncStorage from "@react-native-async-storage/async-storage"

export const Powerups = () => {
    const { money, setMoney } = useContext(MoneyContext)

    async function handleFreeze() {
        if (money < 1000) 
            return Alert.alert('Nie masz pieniędzy!', 'Nie masz wystarczającej liczby monet aby użyć tego powerupa!')

        await AsyncStorage.setItem('@jl_money', `${money - 1000}`)
        setMoney(money - 1000)

        const timeIn10Minutes = Math.round((Date.now() / 1000)) + 10 * 60

        announceEvent(`Powerup: Goniący zatrzymani na 10 minut :bangbang:\nGoniący mogą się ponownie ruszać <t:${timeIn10Minutes}:R>!`)
    }

    async function turnOffTracker() {
        if (money < 600) 
            return Alert.alert('Nie masz pieniędzy!', 'Nie masz wystarczającej liczby monet aby użyć tego powerupa!')

        await AsyncStorage.setItem('@jl_money', `${money - 600}`)
        setMoney(money - 600)

        const timeIn10Minutes = Math.round((Date.now() / 1000)) + 10 * 60

        announceEvent(`Powerup: Tracker wyłączony na 10 minut!\nGoniący mogą ponownie spojrzeć na tracker <t:${timeIn10Minutes}:R>!`)
    }

    async function hunterTrackers() {
        if (money < 450) 
            return Alert.alert('Nie masz pieniędzy!', 'Nie masz wystarczającej liczby monet aby użyć tego powerupa!')

        await AsyncStorage.setItem('@jl_money', `${money - 450}`)
        setMoney(money - 450)

        const timeIn10Minutes = Math.round((Date.now() / 1000)) + 10 * 60
        announceEvent(`Powerup: Tracker goniących włączony na 10 minut!\nTracker się wyłączy <t:${timeIn10Minutes}:R>!`)
    }

    async function doubleOrNothing() {
        if (money < 125) 
            return Alert.alert('Nie masz pieniędzy!', 'Nie masz wystarczającej liczby monet aby użyć tego powerupa!')

        await AsyncStorage.setItem('@jl_money', `${money - 125}`)
        setMoney(money - 125)

        await AsyncStorage.setItem('@jl_double', `yes`)
    }


    return (
        <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, marginBottom: 150, marginTop: 50 }}>
            <View style={{ flex: 1 }}>
                <Powerup name={'Zatrzymaj\ngoniących'} icon={'❄️'} price={1000} handlePress={handleFreeze}  />
                <Powerup name={'Wyłącz lokalizator'} icon={'️📌'} price={600} handlePress={turnOffTracker}  />
            </View>
            <View style={{ flex: 1 }}>
                <Powerup name={'Lokalizacja goniących'} icon={'↪️'} price={450} handlePress={hunterTrackers}  />
                <Powerup name={'Wszystko albo jajco'} icon={'️✨'} price={125} handlePress={doubleOrNothing}  />
            </View>
        </View>
    )
}