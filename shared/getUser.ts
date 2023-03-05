import AsyncStorage from "@react-native-async-storage/async-storage"

export const getUser = async () => {
    const userId = await AsyncStorage.getItem('@jl_user_id')
    
    return userId
}