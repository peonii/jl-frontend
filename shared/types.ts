
export enum QuestDifficulty {
    EASY,
    MEDIUM,
    HARD
}

export interface Quest {
    content: string,
    id: number
    complete: boolean
}

export interface SideQuest {
    index: number
    content: string
    reward: number
}