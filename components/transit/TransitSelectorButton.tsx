import { TouchableOpacity, View, Text } from "react-native"

interface Props {
    state: number
    setState(val: number): void
    index: number
    title: string
    price: number
}

export const TransitSelectorButton = (props: Props) => {
    return (
        <TouchableOpacity onPress={() => props.setState(props.index)}>
            <View style={{ borderColor: props.index == props.state ? '#333333' : '#dddddd', backgroundColor: props.index == props.state ? '#333333' : '#ffffff', borderWidth: 3, padding: 10, borderRadius: 15, width: 160, marginBottom: 20 }}>
                <Text style={{ fontFamily: 'LexendBold', fontSize: 18, color: props.index == props.state ? '#ffffff' : '#000000' }}>{props.title}</Text>
                <Text style={{ fontFamily: 'Lexend', fontSize: 20, color: props.index == props.state ? '#ffffff' : '#000000' }}>${props.price}</Text>
            </View>
        </TouchableOpacity>
    )
}