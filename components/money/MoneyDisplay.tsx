import { useContext } from "react";
import { Text } from "react-native";
import { MoneyContext } from '../../shared/MoneyContext'

export const MoneyDisplay = () => {
    const { money } = useContext(MoneyContext)

    return (
        <Text style={{fontFamily: 'LexendBold', fontSize: 96}}>
            {money >= 0 ? money : 'cuh?'}
        </Text>
    )
}