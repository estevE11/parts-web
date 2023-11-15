import { Player } from "@/interfaces/Player";
import { calculatePlayCount } from "@/utils/partsUtils";

const generateMatch = (players: Player[], nParts: number, nPlayers: number): number[][] => {
    let parts: number[][] = new Array(nParts).fill([]);
    
    for (let partIndex = 0; partIndex < nParts; partIndex++) {
        console.log("generating part " + (partIndex+1))
        for (let i = 0; i < nPlayers; i++) {
            const playerPool = getLeastPlayedPlayers(parts, players);
            console.log(playerPool);

            let count = 0;
            let selectedPlayer = getRandom(playerPool);
            while (parts[partIndex].includes(selectedPlayer.id) || !selectedPlayer.active) {
                selectedPlayer = getRandom(playerPool);
                count++;
                if (count > 10) return parts;
            }

            parts[partIndex] = [...parts[partIndex], selectedPlayer.id];
        }
    }

    return parts;
}

const getLeastPlayedPlayers = (parts: number[][], players: Player[]) => {
    const playCount = calculatePlayCount(parts, players); 
    const playList: Player[][] = new Array(parts.length).fill([]);

    for (let i = 0; i < playCount.length; i++) {
        if (!players[i].active) continue;
        playList[playCount[i]] = [...playList[playCount[i]], players[i]];
    }

    for (let i = 0; i < playList.length; i++) {
        if (playList[i].length > 0) return playList[i];
    }
    return players;
}

const getRandom = (list: any[]) => {
    return list[Math.floor(Math.random()*list.length)];
}

export { generateMatch };