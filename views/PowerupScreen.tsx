import { useContext } from "react"
import { Text, View } from "react-native"
import { Powerups } from "../components/powerup/Powerups"
import { MoneyContext } from "../shared/MoneyContext"
import { useQuery } from "react-query"
import { getPassword } from "../shared/getPassword"
import config from "../config"
import { useRefreshOnFocus } from "../shared/useRefetchOnFocus"

export const PowerupScreen = () => {
    const { isLoading, isError, data, error, refetch } = useQuery('money', async () => {
        const password = await getPassword();
        const money = await fetch(config.apiURL + "/team", {
            headers: {
                'Authorization': password
            }
        })


        const moneyJSON = await money.json();

        return moneyJSON.balance;
    })

    useRefreshOnFocus(refetch);

    if (isLoading) {
        return <Text>...</Text>
    }

    if (!data) {
        return <Text>...</Text>
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <Text style={{ fontSize: 40, fontFamily: 'LexendBold', marginTop: 200 }}>Kup powerup</Text>
            <Text style={{ fontSize: 20, fontFamily: 'Lexend', marginTop: 10 }}>${data}</Text>
            <Powerups />
        </View>
    )
}