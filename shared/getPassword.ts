import AsyncStorage from "@react-native-async-storage/async-storage"

export const getPassword = async () => {
    const userId = await AsyncStorage.getItem('@jl_password')
    
    return userId
}