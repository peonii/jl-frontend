import { useContext } from "react"
import { FlatList, Text, View } from "react-native"
import { QuestDisplay } from "../components/quests/QuestDisplay"
import { SideQuestDisplay } from "../components/quests/SideQuestDisplay"
import { QuestContext } from "../shared/QuestContext"
import { Quest } from "../shared/types"
import { useQuery } from "react-query"
import { getPassword } from "../shared/getPassword"
import config from "../config"

export const QuestsScreen = () => {
    const { isLoading, isError, error, data, refetch } = useQuery('quests', async () => {
        const password = await getPassword();
        const questsReq = await fetch(config.apiURL + "/quests", {
            headers: {
                'Authorization': password
            }
        })

        const questsUnparsed = await questsReq.json();
        
        return questsUnparsed
    })

    if (isLoading) {
        return <View>
            <Text>Loading...</Text>
        </View>
    }

    if (!data) {
        return <View>
            <Text>Loading...</Text>
        </View>
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
            <View style={{ flex: 5 }}>
                <FlatList
                    data={data.filter(val => val.type == "MAIN")}
                    renderItem={({ item }) => <QuestDisplay quest={item} />}
                    keyExtractor={item => item.id}
                />
            </View>
            <View style={{ flex: 2 }}>
                <SideQuestDisplay />
            </View>
        </View>
    )
}