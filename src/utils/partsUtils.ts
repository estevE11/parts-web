import { Player } from "@/interfaces/Player";

function calculatePlayCount(parts: number[][], players: Player[]): any {
    let playCount: number[] = new Array(players.length).fill(0);
    let warnings: number[][] = new Array(parts.length).fill(new Array(parts[0].length).fill(0));
    let playedParts: number[][] = new Array(players.length).fill([]).map(() => new Array(parts.length).fill(0));

    for (let i = 0; i < parts.length; i++) {
        warnings[i] = new Array(parts[i].length).fill(0);
        for (let j = 0; j < parts[i].length; j++) {
            playCount[parts[i][j]]++;
            playedParts[parts[i][j]][i] = 1;

            for(let k = 0; k < j; k++) {
                if (parts[i][j] === parts[i][k]) {
                    warnings[i][j] = 1;
                    warnings[i][k] = 1;
                }
            }
        }
    }

    console.log(playedParts)

    return [playCount, warnings, playedParts];
}

export { calculatePlayCount };