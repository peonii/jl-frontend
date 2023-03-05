import { useContext } from "react";
import { Text } from "react-native";
import { MoneyContext } from '../../shared/MoneyContext'
import Config from "../../config";
import { useQuery } from "react-query";
import { useRefreshOnFocus } from "../../shared/useRefetchOnFocus";
import { getPassword } from "../../shared/getPassword";

export const MoneyDisplay = () => {
    const { isLoading, isError, data, error, refetch } = useQuery('money', async () => {
        const password = await getPassword();
        const money = await fetch(Config.apiURL + "/team", {
            headers: {
                'Authorization': password
            }
        })


        const moneyJSON = await money.json();

        return moneyJSON.balance;
    })

    useRefreshOnFocus(refetch);

    if (isLoading) {
        return (
            <Text style={{fontFamily: 'LexendBold', fontSize: 96}}>
                ...
            </Text>
        )
    }

    if (!data) {
        return (
            <Text style={{fontFamily: 'LexendBold', fontSize: 96}}>
                ...
            </Text>
        )
    }

    return (
        <Text style={{fontFamily: 'LexendBold', fontSize: 96}}>
            {data >= 0 ? data : 'cuh?'}
        </Text>
    )
}