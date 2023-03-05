import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { announceEvent } from "../../shared/announceEvent"
import { MoneyContext } from "../../shared/MoneyContext"
import { QuestContext } from "../../shared/QuestContext"
import { Quest, QuestDifficulty } from "../../shared/types"

interface Props {
    quest: Quest
}

export const QuestDisplay = (props: Props) => {
    const questContext = useContext(QuestContext)
    const moneyContext = useContext(MoneyContext)

    async function handleCompletion() {
        Alert.alert('Potwierdź', `Na pewno chcesz ukończyć zadanie "${props.quest.content}"?`, [
            {
                "style": 'cancel',
                "text": "nie"
            },
            {
                "style": "default",
                async onPress() {
                    if (props.quest.difficulty == QuestDifficulty.EASY) {
                        await AsyncStorage.setItem('@jl_money', `${moneyContext.money + 150}`)
                        moneyContext.setMoney(moneyContext.money + 150)
                    } else if (props.quest.difficulty == QuestDifficulty.MEDIUM) {
                        await AsyncStorage.setItem('@jl_money', `${moneyContext.money + 300}`)
                        moneyContext.setMoney(moneyContext.money + 300)
                    } else if (props.quest.difficulty == QuestDifficulty.HARD) {
                        await AsyncStorage.setItem('@jl_money', `${moneyContext.money + 500}`)
                        moneyContext.setMoney(moneyContext.money + 500)
                    }

                    const newQuests = questContext.quests.filter((q) => q.id != props.quest.id)
                    await AsyncStorage.setItem('@jl_quests', JSON.stringify(newQuests))

                    announceEvent('Ukończono zadanie: ' + props.quest.content)
                    questContext.setQuests(newQuests)
                },
                "text": "Tak"
            }
        ])
    }

    return (
        <View style={{ margin: 10, width: 300 }}>
            <Text style={{ fontFamily: 'Lexend', fontSize: 13 }}>{props.quest.content}</Text>
            <TouchableOpacity onPress={handleCompletion}>
                <Text style={{ fontFamily: 'LexendBold', borderTopWidth: 2, borderColor: "#eeeeee", marginTop: 4, paddingTop: 4 }}>Ukończ</Text>
            </TouchableOpacity>
        </View>
    )
}