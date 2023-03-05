import { useContext } from "react"
import { Text, View } from "react-native"
import { Powerups } from "../components/powerup/Powerups"
import { MoneyContext } from "../shared/MoneyContext"

export const PowerupScreen = () => {
    const { money, setMoney } = useContext(MoneyContext)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <Text style={{ fontSize: 40, fontFamily: 'LexendBold', marginTop: 200 }}>Kup powerup</Text>
            <Text style={{ fontSize: 20, fontFamily: 'Lexend', marginTop: 10 }}>${money}</Text>
            <Powerups />
        </View>
    )
}