import { Player } from '@/interfaces/Player';
import { AbsoluteCenter, Box, Divider } from '@chakra-ui/react';
import PlayedParts from '../ui/PlayedParts';

type PlayCountListProps = {
    players: Player[];
    playCount: number[];
    parts: number[][];
    playedParts: number[][];
};

export default function PlayCountList({players, playCount, parts, playedParts}: PlayCountListProps) {
    return (
        <>
            <Box>
                <Box position='relative' padding='5'>
                    <Divider size="xl"/>
                    <AbsoluteCenter bg='white' px='4'>
                        Play count
                    </AbsoluteCenter>
                </Box>
                <table style={{marginRight: "10%", marginLeft: "10%"}}>
                    {players.map((player: Player) => {
                        if (!player.active) return;
                        return (
                            <tr key={"pc" + Math.random()} style={{backgroundColor: playCount[player.id] < 2 || playCount[player.id] > 3 ? '#ffffaa' : 'white'}}>
                                <td align='right'>
                                    {player.number}
                                </td>
                                <td style={{ padding: 8, paddingLeft: 10 }}>
                                    {player.name}
                                </td>
                                <td style={{ padding: 8, paddingLeft: 10 }}>
                                    {playCount[player.id]}
                                </td>
                                <td style={{paddingLeft: '15px'}}>
                                    <PlayedParts parts={parts ? parts : []} player={player} playedParts={playedParts}></PlayedParts>
                                </td>
                            </tr>
                        )
                    })}
                </table>
            </Box>
        </>
    );
}