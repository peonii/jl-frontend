import { MoneyDisplay } from "./MoneyDisplay"
import { Text } from "react-native"

export const Money = () => {
    return (
        <Text style={{ textAlign: 'center' }}>
            <Text style={{ fontFamily: 'Lexend', fontSize: 40 }}>
                Masz teraz{'\n'}
            </Text>
            <Text style={{ fontFamily: 'Lexend', fontSize: 60 }}>
                $
            </Text>
            <MoneyDisplay />
        </Text>
    )
}