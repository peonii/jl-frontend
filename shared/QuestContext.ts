import { createContext } from "react";
import { Quest, QuestDifficulty } from "./types";

export const defaultQuests: Array<Quest> = [
    {
        content: 'Kup i zjedz jedną rzecz z części restauracyjnej w Złotych Tarasach (zrób zdjęcie paragonu i pustej tacy). Musisz zjeść w Złotych Tarasach.',
        difficulty: QuestDifficulty.EASY,
        id: 0
    },
    {
        content: 'Stój na terenie stacji Metra Świętokrzyska i wyrecytuj cały tekst (nagraj jak mówisz aparatem).',
        difficulty: QuestDifficulty.EASY,
        id: 1
    },
    {
        content: 'Przejdź całą ulicę Świętokrzyską (nagraj całą trasę).',
        difficulty: QuestDifficulty.MEDIUM,
        id: 2
    },
    {
        content: 'Odwiedź dwa przystanki końcowe jednej linii tramwajowej (używając podstawowego rozkładu) i zrób sobie przed nimi zdjęcie.',
        difficulty: QuestDifficulty.MEDIUM,
        id: 3
    },
    {
        content: 'Zrób sobie zdjęcie pod Mostem Południowym.',
        difficulty: QuestDifficulty.HARD,
        id: 4
    },
    {
        content: 'Pojedź do domu każdego uczestnika i zrób sobie przed nim zdjęcie.',
        difficulty: QuestDifficulty.HARD,
        id: 5
    }
]

export const QuestContext = createContext({ quests: defaultQuests, setQuests: (val: Array<Quest>) => {} })