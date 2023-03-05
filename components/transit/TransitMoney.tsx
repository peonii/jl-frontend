import { TextInput, Text, View } from "react-native"

interface Props {
    state: number
    setState(val: number): void
}

export const TransitMoney = (props: Props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily: 'LexendBold', fontSize: 20 }}>Ilość biletów</Text>
            <TextInput
                value={props.state.toString()}
                onChangeText={(num: string) => { props.setState(parseInt(num) || 0) }}
                keyboardType="numeric"
                style={{ fontFamily: 'Lexend', fontSize: 50, borderBottomWidth: 2, borderColor: '#aaaaaa', padding: 10 }}
            />
        </View>
    )
}