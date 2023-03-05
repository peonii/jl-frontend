import { View, Text, TouchableOpacity } from "react-native"
import { Money } from "../components/money/Money"
import { MenuButtons } from "../components/menu/MenuButtons"

export const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <Money />

            <Text style={{margin: 40}}></Text>

            <MenuButtons navigation={navigation} />
        </View>
    )
}