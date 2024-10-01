import { Box } from "@chakra-ui/react";
import PartHeader from "../ui/PartHeader";

type PartProps = {
    partData: any;
    partNum: number;
    players: any[];
    warnings: number[][];
    onPlayerClick: (partNum: number, playerIdx: number) => void;
}

export default function Part({partData, partNum, players, warnings, onPlayerClick}: PartProps) {
    return (
        <Box key={"part" + partNum}>
            <PartHeader partNum={partNum}></PartHeader>
            <table style={{ width: "100%", borderCollapse: "collapse"}}>
                <tr>
                    {partData.map((playerIdx: any, index: any) => {
                        if (index > 2) return;
                        return (
                            <PlayerCell playerData={players[playerIdx]} bgColor={warnings[partNum][index] == 0 ? 'white' : '#ffcccc'} onClick={() => { onPlayerClick(partNum, index) }}></PlayerCell>
                        )
                    })}
                </tr>
                <tr>
                    {partData.map((playerIdx: any, index: any) => {
                        if (index < 3) return;
                        return (
                            <PlayerCell playerData={players[playerIdx]} bgColor={warnings[partNum][index] == 0 ? 'white' : '#ffcccc'} onClick={() => { onPlayerClick(partNum, index) }}></PlayerCell>
                        )
                    })}
                </tr>
            </table>
        </Box>
    );
}

function PlayerCell({playerData, bgColor, onClick}: {playerData: any, bgColor: string, onClick: () => void}) {
    return (
        <td key={Math.random()} style={{ textAlign: "center", width: "33.3%", paddingBottom: "20px", backgroundColor: bgColor}} onClick={() => { onClick() }}>
            {playerData.short}
        </td>
    );
}