import { Player } from "@/interfaces/Player";

const generateMatch = (players: Player[], nParts: number, nPlayers: number): number[][] => {
    let parts: number[][] = [];
    
    for (let partIndex = 0; partIndex < nParts; partIndex++) {
        let part: number[] = [];
        for (let i = 0; i < nPlayers; i++) {
            part.push(getRandom(players).id);
        }
        parts.push(part);
    }

    return parts;
}

const getRandom = (list: any[]) => {
    return list[Math.floor(Math.random()*list.length)];
}

export { generateMatch };