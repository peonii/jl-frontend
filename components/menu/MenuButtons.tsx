import AsyncStorage from "@react-native-async-storage/async-storage"
import { Alert, Text, TouchableOpacity } from "react-native"
import { announceEvent } from "../../shared/announceEvent"
import { PowerupButton } from "../buttons/PowerupButton"
import { QuestsButton } from "../buttons/QuestsButton"
import { TransitButton } from "../buttons/TransitButton"

export const MenuButtons = ({ navigation }) => {
    return (
        <Text style={{ textAlign: 'center', width: 40, flexDirection: 'column' }}>
            <PowerupButton navigation={navigation} />{'\n\n'}
            <TransitButton navigation={navigation} />{'\n\n'}
            <QuestsButton navigation={navigation} />{'\n\n'}
        </Text>
    )
}