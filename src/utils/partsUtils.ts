import { Player } from "@/interfaces/Player";

function calculatePlayCount(parts: number[][], players: Player[]): number[] {
    let playCount: number[] = new Array(players.length).fill(0);

    for (let i = 0; i < parts.length; i++) {
        for (let j = 0; j < parts[i].length; j++) {
            playCount[parts[i][j]]++;
        }
    }
    console.log(playCount);

    return playCount;
}

export { calculatePlayCount };