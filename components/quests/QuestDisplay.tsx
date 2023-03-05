import AsyncStorage from "@react-native-async-storage/async-storage"
import { useContext } from "react"
import { View, Text, TouchableOpacity, Alert } from "react-native"
import { announceEvent } from "../../shared/announceEvent"
import { MoneyContext } from "../../shared/MoneyContext"
import { QuestContext } from "../../shared/QuestContext"
import { Quest, QuestDifficulty } from "../../shared/types"
import { useQuery } from 'react-query';
import { getPassword } from "../../shared/getPassword"
import config from "../../config"

interface Props {
    quest: Quest
}

export const QuestDisplay = (props: Props) => {

    async function handleCompletion() {
        Alert.alert('Potwierdź', `Na pewno chcesz ukończyć zadanie "${props.quest.content}"?`, [
            {
                "style": 'cancel',
                "text": "nie"
            },
            {
                "style": "default",
                async onPress() {
                    const password = await AsyncStorage.getItem('@jl_password');

                    await fetch(config.apiURL + '/quests/complete/' + props.quest.id, {
                        method: 'POST',
                        headers: {
                            Authorization: password
                        }
                    })
                },
                "text": "Tak"
            }
        ])
    }

    return (
        <View style={{ margin: 10, width: 300 }}>
            <Text style={{ fontFamily: 'Lexend', fontSize: 20, color: props.quest.complete ? '#aaaaaa' : '#000000' }}>{props.quest.content}</Text>
            <TouchableOpacity onPress={handleCompletion}>
                <Text style={{ fontFamily: 'LexendBold', borderTopWidth: 2, fontSize: 20, borderColor: "#eeeeee", marginTop: 4, paddingTop: 4 }}>Ukończ</Text>
            </TouchableOpacity>
        </View>
    )
}