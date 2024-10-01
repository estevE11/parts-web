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
            <table style={{ marginRight: "10%", marginLeft: "10%" }}>
                {partData.map((playerIdx: any, index: any) => (
                    <tr key={Math.random()} style={{ backgroundColor: warnings[partNum][index] == 0 ? 'white' : '#ffcccc' }} onClick={() => { onPlayerClick(partNum, index) }}>
                        <td align='right'>
                            {players[playerIdx].number}
                        </td>
                        <td style={{ padding: 8, paddingLeft: 10 }}>
                            {players[playerIdx].name}
                        </td>
                    </tr>
                ))}
            </table>
        </Box>
    );
}