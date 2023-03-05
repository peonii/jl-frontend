import { Text, TouchableOpacity } from "react-native"

export const QuestsButton = ({ navigation }) => {
    return (
        <TouchableOpacity onPress={() => navigation.navigate('Quests')} style={{ borderRadius: 10, borderWidth: 2, borderColor: '#aaaaaa', paddingHorizontal: 15, paddingVertical: 10, width: 250 }}>
            <Text style={{ fontFamily: 'Lexend', fontSize: 20, textAlign: 'center' }}>🔏 Zobacz zadania</Text>
        </TouchableOpacity>
    )
}