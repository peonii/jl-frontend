import { View, Text, TouchableOpacity } from "react-native"
import { Money } from "../components/money/Money"
import { MenuButtons } from "../components/menu/MenuButtons"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from 'react';

export const HomeScreen = ({ navigation }) => {
    async function fetchData() {
        const data = await AsyncStorage.getItem('@jl_password')

        if (data == null) {
            navigation.push('Login')
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <Money />

            <Text style={{margin: 40}}></Text>

            <MenuButtons navigation={navigation} />
        </View>
    )
}