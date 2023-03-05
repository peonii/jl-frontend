import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext, useEffect, useState } from "react"
import { Alert, Text, TouchableOpacity, View } from "react-native"
import { announceEvent } from "../../shared/announceEvent"
import { MoneyContext } from "../../shared/MoneyContext"
import { sideQuests } from "../../shared/sideQuests"
import { SideQuest } from "../../shared/types"



export const SideQuestDisplay = () => {
    const moneyContext = useContext(MoneyContext)

    const [sideQuest, setSideQuest] = useState<SideQuest>()
    const [isDouble, setIsDouble] = useState<boolean>(false)

    async function completeSideQuest() {
        Alert.alert(
            'Potwierdź',
            'Na pewno chcesz ukończyć zadanie poboczne?',
            [
                {
                    text: 'Nie',
                    style: 'destructive',
                },
                {
                    text: 'Tak',
                    style: 'default',
                    async onPress() {
                        await AsyncStorage.setItem('@jl_prevSideQuest', `${sideQuest.index}`)
                        const double = (await AsyncStorage.getItem('@jl_double') == 'yes')

                        await AsyncStorage.setItem('@jl_money', `${moneyContext.money + (sideQuest.reward * (double ? 2 : 1))}`)
                        moneyContext.setMoney(moneyContext.money + (sideQuest.reward) * (double ? 2 : 1))
                        
                        await AsyncStorage.removeItem('@jl_sideQuest')
                        if (double)
                            await AsyncStorage.removeItem('@jl_double')

                        announceEvent('Ukończono zadanie poboczne: ' + sideQuest.content)
                        setSideQuest(null)
                        setIsDouble(false)
                    }
                }
            ]
        )
    }

    async function vetoSideQuest() {
        Alert.alert(
            'Potwierdź',
            'Na pewno chcesz zvetować zadanie poboczne?',
            [
                {
                    text: 'Nie',
                    style: 'destructive',
                },
                {
                    text: 'Tak',
                    style: 'default',
                    async onPress() {
                        await AsyncStorage.setItem('@jl_prevSideQuest', `${sideQuest.index}`)
                        const double = (await AsyncStorage.getItem('@jl_double') == 'yes')
                        await AsyncStorage.removeItem('@jl_sideQuest')

                        const timeNow = new Date();
                        const timeIn20Minutes = new Date(timeNow.getTime() + (20 * 60 * 1000 * (double ? 2 : 1)))

                        await AsyncStorage.setItem('@jl_vetoPeriod', `${timeIn20Minutes.toISOString()}`)
                        if (double)
                            await AsyncStorage.removeItem('@jl_double')
                        setSideQuest(null)
                        setIsDouble(false)
                    }
                }
            ]
        )
    }

    async function newSideQuest() {
        const vetoPeriod = await AsyncStorage.getItem('@jl_vetoPeriod')
        const vetoPeriodDate = new Date(vetoPeriod)

        if (vetoPeriodDate.getTime() > new Date().getTime())
            return Alert.alert('Uwaga', 'Jesteś podczas veto!')

        if (sideQuest != null)
            return Alert.alert('Uwaga', 'Już masz rozpoczęte zadanie!')

        const previousIndex = await AsyncStorage.getItem('@jl_prevSideQuest')
        const previousIndexParsed = parseInt(previousIndex)

        let randomIndex = Math.floor(Math.random() * 30)
        while (previousIndexParsed == randomIndex) {
            randomIndex = Math.floor(Math.random() * 30)
        }

        setSideQuest(sideQuests.filter(v => v.index == randomIndex)[0])
        await AsyncStorage.setItem('@jl_sideQuest', `${randomIndex}`)
    }

    useEffect(() => {
        async function fetchData() {
            const currentSideQuestIndex = await AsyncStorage.getItem('@jl_sideQuest')
            if (currentSideQuestIndex == null)
                return

            const currentSideQuest = sideQuests.filter(v => v.index == parseInt(currentSideQuestIndex))[0]

            setSideQuest(currentSideQuest)
            const double = await AsyncStorage.getItem('@jl_double')
            setIsDouble(double == 'yes')
        }

        fetchData()
    }, [])

    return (
        <View style={{ marginTop: 20 }}>
            <Text style={{ fontFamily: 'Lexend', textAlign: 'center', marginHorizontal: 20 }}>
                Aktualne zadanie poboczne:{'\n'}
                <Text style={{ fontFamily: 'LexendBold', fontSize: 13 }}>
                    {sideQuest ? sideQuest.content : 'brak'} {sideQuest ? '($' + sideQuest.reward + ')' : ''}{isDouble ? ' (x2)' : ''}
                </Text>
            </Text>
            {sideQuest ?
                (
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ justifyContent: 'center', flex: 1, marginHorizontal: 10 }} onPress={completeSideQuest}>
                            <Text style={{ fontFamily: 'Lexend', color: '#ffffff', textAlign: 'center', fontSize: 15, borderRadius: 10, padding: 10, backgroundColor: '#333333', marginTop: 10 }}>Ukończ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ justifyContent: 'center', flex: 1, marginHorizontal: 10 }} onPress={vetoSideQuest}>
                            <Text style={{ fontFamily: 'Lexend', textAlign: 'center', color: '#ff0000', borderColor: '#ff0000', borderWidth: 2, fontSize: 15, borderRadius: 10, padding: 10, marginTop: 10 }}>Veto</Text>
                        </TouchableOpacity>
                    </View>
                ) :
                (
                    <TouchableOpacity style={{ justifyContent: 'center' }} onPress={newSideQuest}>
                        <Text style={{ fontFamily: 'Lexend', color: '#ffffff', textAlign: 'center', fontSize: 20, borderRadius: 10, padding: 10, backgroundColor: '#333333', marginTop: 10 }}>Nowe zadanie</Text>
                    </TouchableOpacity>
                )
            }
        </View>
    )
}