import { Button, View } from "react-native"
import { TransitSelectorButton } from "./TransitSelectorButton"

interface Props {
    state: number
    setState(val: number): void
}

export const TransitSelector = (props: Props) => {
    return (
        <View style={{ justifyContent: 'center', flex: 2, width: '95%' }}>
            <View style={{ flex: 1, flexDirection: 'row', margin: 20, justifyContent: 'center' }}>
                <View style={{ flex: 1 }}>
                    <TransitSelectorButton {...props} title="Autobus" price={20} index={0} />
                    <TransitSelectorButton {...props} title="Tramwaj" price={30} index={1} />
                    <TransitSelectorButton {...props} title="Metro (M1)" price={70} index={2} />
                </View>
                <View style={{ flex: 1 }}>
                    <TransitSelectorButton {...props} title="Metro (M2)" price={60} index={3} />
                    <TransitSelectorButton {...props} title="WKD" price={40} index={4} />
                    <TransitSelectorButton {...props} title="KM/SKM" price={70} index={5} />
                </View>
            </View>
        </View>
    )
}