import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext, useEffect, useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { MoneyContext } from "../../shared/MoneyContext"
import { TransitMoney } from "./TransitMoney"
import { TransitSelector } from "./TransitSelector"

export const TransitMenu = () => {
    const [current, setCurrent] = useState<number>(1)
    const [count, setCount] = useState<number>(0)
    const { money, setMoney } = useContext(MoneyContext)
    const [afterVeto, setAfterVeto] = useState(false)
    const [toVeto, setToVeto] = useState(new Date())

    const CONSTANTS = {
        0: 20,
        1: 30,
        2: 70,
        3: 60,
        4: 40,
        5: 70
    }

    const NAMES = {
        0: 'autobus',
        1: 'tramwaj',
        2: 'metro (M1)',
        3: 'metro (M2)',
        4: 'WKD',
        5: 'KM lub SKM'
    }

    async function handleBuying() {
        const calculatedMoney = CONSTANTS[current] * count

        if (calculatedMoney > money) {
            return Alert.alert('Nie masz pieniędzy!', 'Nie masz wystarczającej liczby monet aby kupić tyle biletów!')
        }

        await AsyncStorage.setItem('@jl_money', `${money - calculatedMoney}`)
        setMoney(money - calculatedMoney)
        setCurrent(0)
        setCount(0)
        return Alert.alert('Kupiono bilety', `Kupiono ${count} biletów na ${NAMES[current]}!`)
    }

    function getTimeTillVeto() {
        return 
    }

    useEffect(() => {
        async function fetchData() {
            const vetoPeriod = await AsyncStorage.getItem('@jl_vetoPeriod')
            const vetoPeriodDate = new Date(vetoPeriod)

            if (vetoPeriodDate.getTime() > new Date().getTime()) {
                setAfterVeto(true)
                setToVeto(vetoPeriodDate)
            }
        }

        fetchData()
    }, [])

    return (
        <>
            {afterVeto ? (
                <>
                    <Text style={{ color: '#ff0000', fontSize: 20, fontFamily: 'LexendBold', textAlign: 'center' }}>Jesteś podczas veto!{'\n'} Nie możesz używać transportu publicznego!{'\n'}{
                        new Date(toVeto.getTime() - new Date().getTime()).getMinutes() + 'm' + new Date(toVeto.getTime() - new Date().getTime()).getSeconds() + 's'
                    }</Text>
                </>
            )
                : (
                    <>
                        <TransitSelector state={current} setState={setCurrent} /> 
                        <TransitMoney state={count} setState={setCount} />
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 30, fontFamily: 'Lexend' }}>
                                Cena
                            </Text>
                            <Text style={{ fontSize: 40, fontFamily: 'LexendBold' }}>
                                ${CONSTANTS[current] * count}
                            </Text>
                        </View>
                        <View style={{flex: 1,  height: '40%' }}>
                            <TouchableOpacity onPress={handleBuying} style={{ backgroundColor: '#333333', justifyContent: 'center', alignItems: 'center', borderWidth: 2, height: '50%', borderRadius: 20 }}>
                                <Text style={{ fontFamily: 'LexendBold', fontSize: 30, paddingHorizontal: 50, color: '#ffffff' }}>
                                    Kup
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )
            }
        </>
    )
}