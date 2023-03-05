
export enum QuestDifficulty {
    EASY,
    MEDIUM,
    HARD
}

export interface Quest {
    content: string,
    difficulty: QuestDifficulty,
    id: number
}

export interface SideQuest {
    index: number
    content: string
    reward: number
}