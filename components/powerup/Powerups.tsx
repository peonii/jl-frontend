import { useContext } from "react"
import { View, Alert } from "react-native"
import { MoneyContext } from "../../shared/MoneyContext"
import { Powerup } from "./Powerup"
import { announceEvent } from "../../shared/announceEvent"
import AsyncStorage from "@react-native-async-storage/async-storage"
import config from "../../config"

export const Powerups = () => {
    const { money, setMoney } = useContext(MoneyContext)

    async function handlePowerup(price: number, callback: () => void) {
        const password = await AsyncStorage.getItem('@jl_password');

        const balanceRequest = await fetch(config.apiURL + '/team/balance', {
            method: "POST",
            headers: {
                Authorization: password,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "subtract": price
            })
        });

        if (balanceRequest.ok) {
            await callback();
            return Alert.alert('Kupiono powerup', 'Pomyślnie kupiono powerup!')
        } else {
            return Alert.alert('Błąd', `Powerup jest za drogi!`)
        }
    }

    async function handleFreeze() {
        handlePowerup(1000, async () => {
            const timeIn10Minutes = Math.round((Date.now() / 1000)) + 10 * 60
            announceEvent(`Powerup: Goniący zatrzymani na 10 minut :bangbang:\nGoniący mogą się ponownie ruszać <t:${timeIn10Minutes}:R>!`)
        })
    }

    async function turnOffTracker() {
        handlePowerup(600, async () => {
            const timeIn10Minutes = Math.round((Date.now() / 1000)) + 10 * 60
            announceEvent(`Powerup: Tracker wyłączony na 10 minut!\nGoniący mogą ponownie spojrzeć na tracker <t:${timeIn10Minutes}:R>!`)
        })
    }

    async function hunterTrackers() {
        handlePowerup(450, async () => {
            const timeIn10Minutes = Math.round((Date.now() / 1000)) + 10 * 60
            announceEvent(`Powerup: Tracker goniących włączony na 10 minut!\nTracker się wyłączy <t:${timeIn10Minutes}:R>!`)
        })
    }

    async function doubleOrNothing() {
        handlePowerup(125, async () => {
            const password = await AsyncStorage.getItem('@jl_password');

            const double = await fetch(config.apiURL + '/team/double', {
                method: 'POST',
                headers: {
                    Authorization: password
                }
            })
        })
    }


    return (
        <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 20, marginBottom: 40, marginTop: 50 }}>
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