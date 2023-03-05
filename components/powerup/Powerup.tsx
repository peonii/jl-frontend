import { TouchableOpacity, Text, View } from "react-native"

interface Props {
    name: string
    icon: string
    price: number
    handlePress: () => void
}

export const Powerup = (props: Props) => {
    return (
        <TouchableOpacity onPress={props.handlePress} style={{ borderColor: '#999', borderWidth: 2, borderRadius: 20, padding: 20, flex: 1, margin: 10, flexDirection: 'column', height: 150 }}>
            <View style={{marginBottom: 5, paddingBottom: 5, borderBottomWidth: 2, borderColor: '#ddd', flex: 2, flexDirection: 'row' }}>
                <Text style={{ fontFamily: 'Lexend', fontSize: 15, flex: 4 }}>
                    {props.name}
                </Text>
                <Text style={{ flex: 1, textAlign: 'right', fontSize: 16 }}>
                    {props.icon}
                </Text>
            </View>
            <Text style={{ fontFamily: 'LexendBold', fontSize: 20, flex: 1 }}>${props.price}</Text>
        </TouchableOpacity>
    )
}