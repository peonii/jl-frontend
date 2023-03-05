import { View, Text, TouchableOpacity, TextInput } from "react-native"
import { Money } from "../components/money/Money"
import { MenuButtons } from "../components/menu/MenuButtons"
import { useState } from 'react';
import config from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginScreen = ({ navigation }) => {
    const [login, setLogin] = useState('');

    async function submitLogin() {
        const status = await fetch(config.apiURL + '/team/status', {
            headers: {
                'Authorization': login
            }
        })

        const statusJSON = await status.json();

        if (statusJSON.status == true) {
            await AsyncStorage.setItem('@jl_password', login)
            navigation.push('Home')
        } else {
            navigation.push('Login')
        }
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <Text style={{ fontFamily: 'LexendBold', fontSize: 20 }}>Hasło grupy</Text>
            <TextInput
                value={login}
                onChangeText={(l: string) => {setLogin(l) }}
                style={{ fontFamily: 'Lexend', fontSize: 20, borderBottomWidth: 2, borderColor: '#aaaaaa', padding: 10, minWidth: 120, textAlign: 'center' }}
            />
            <TouchableOpacity onPress={submitLogin}>
                <View style={{ borderColor: '#dddddd', backgroundColor: '#ffffff', borderWidth: 3, marginTop: 50, padding: 10, borderRadius: 15, width: 160, marginBottom: 20 }}>
                    <Text style={{ fontFamily: 'Lexend', fontSize: 18, color: '#000000', textAlign: 'center' }}>Zaloguj</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}