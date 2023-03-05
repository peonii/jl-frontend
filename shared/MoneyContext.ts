import React from "react"

export const MoneyContext = React.createContext({
    money: 500,
    setMoney: (val: number) => {}
})