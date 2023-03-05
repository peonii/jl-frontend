import { useContext } from "react"
import { Text, View } from "react-native"
import { QuestDisplay } from "../components/quests/QuestDisplay"
import { SideQuestDisplay } from "../components/quests/SideQuestDisplay"
import { QuestContext } from "../shared/QuestContext"
import { Quest } from "../shared/types"

export const QuestsScreen = () => {
    const ctx = useContext(QuestContext)

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            {ctx.quests.map(val => {
                return (
                    <QuestDisplay quest={val} key={val.id} />
                )
            })}
            <SideQuestDisplay />
        </View>
    )
}