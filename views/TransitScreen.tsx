import { View } from "react-native"
import { TransitMenu } from "../components/transit/TransitMenu"

export const TransitScreen = () => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <TransitMenu />
        </View>
    )
}