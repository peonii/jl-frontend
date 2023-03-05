import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert, Text, TouchableOpacity } from "react-native"
import { announceEvent } from "../../shared/announceEvent"
import { PowerupButton } from "../buttons/PowerupButton"
import { QuestsButton } from "../buttons/QuestsButton"
import { TransitButton } from "../buttons/TransitButton"

export const MenuButtons = ({ navigation }) => {
    async function resetData() {
        Alert.alert(
            'UWAGA',
            'Ten przycisk wyczyści wszystkie twoje dane związane z aplikacją! Nie potwierdzaj tego podczas gry! Czy na pewno chcesz wyczyścić dane?',
            [
                {
                    'style': 'cancel',
                    'text': 'Nie'
                },
                {
                    'style': 'destructive',
                    'text': 'Tak',
                    async onPress() {
                        await AsyncStorage.multiRemove(["@jl_money", "@jl_quests", "@jl_sideQuest", "@jl_prevSideQuest", "@jl_double", "@jl_vetoPeriod"])

                        announceEvent('PUREQ ZRESETOWAŁ SWOJA APLIKACJE')
                        Alert.alert('Uwaga', 'Zrestartuj aplikację, aby zmiany poprawnie zaszły')
                    }
                }
            ]
        )
    }

    return (
        <Text style={{ textAlign: 'center', width: 40}}>
            <PowerupButton navigation={navigation} />{'\n'}
            <TransitButton navigation={navigation} />{'\n'}
            <QuestsButton navigation={navigation} />{'\n\n'}
            <TouchableOpacity onPress={resetData} style={{ borderRadius: 10, borderWidth: 2, borderColor: '#ff7777', padding: 10, marginTop: 50 }}>
                <Text style={{ color: '#ff7777', fontFamily: 'LexendBold' }}>Reset</Text>
            </TouchableOpacity>
        </Text>
    )
}