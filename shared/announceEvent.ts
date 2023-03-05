import axios from "axios"
import Config from '../config'

export const announceEvent = async (message: string) => {
    axios.post(Config.webhookURL, {
        content: '<@&1061916315683655700> ' + message
    })
}