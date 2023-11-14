import { Player } from '@/interfaces/Player';
import { AbsoluteCenter, Badge, Box, Button, Divider, Flex, useToast } from '@chakra-ui/react'
import Head from 'next/head'
import { useState } from 'react';
import { apiPOST } from '@/utils/apiUtils';
import SelectPlayerModal from '@/components/modals/SelectPlayerModal';

export default function Home() {
    const toast = useToast();
  
    const [players, setPlayers] = useState<Player[]>([
        { id: 0, name: "Lucas", number: 13, q: 2, active: true },
        { id: 1, name: "Raul", number: 4, q: 1, active: true},
        { id: 2, name: "Esteve", number: 11, q: 2, active: true }
    ]);

    const [parts, setParts] = useState<number[][]>([[]]); // 2d number array containing player index

    const [selectPlayerModalOpen, setSelectPlayerModalOpen] = useState(false);

    const [positionSelected, setPositionSelected] = useState([-1, -1]);

    const generateMatch = () => {
        const body = {
            players: players,
            nParts: 4,
            nPlayers: 6
        };

        apiPOST('match', body).then((data: any) => {
            setParts([...data.parts]);
        });
    }

    const updateSelectedPlayer = (newPlayerId: number) => {
        parts[positionSelected[0]][positionSelected[1]] = newPlayerId;
        setParts([...parts]);
        setSelectPlayerModalOpen(false);
    }

    const openSelectPlayerModal = (partN: number, posIndex: number) => {
        setPositionSelected([partN, posIndex]);
        setSelectPlayerModalOpen(true);
    }

    const copy = () => {
        let copyText = "";

        for (let i = 0; i < parts.length; i++) { 
            copyText += `Part ${i+1}:\n`;
            for (let j = 0; j < parts[i].length; j++) { 
                const player = players[parts[i][j]];
                copyText += `${player.number} - ${player.name}\n`;
            }
            copyText += `\n`;
        }

        navigator.clipboard.writeText(copyText);

        toast({
            title: 'Copied!',
            description: "Match copied to clipboard!",
            status: 'success',
            duration: 3000,
            isClosable: true,
        })
    }

    return (
        <>
            <Head>
                <title>Dev</title> <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Box m={2}>
                <Box>
                    <Flex>
                        <Box w="50%" pr={1}>
                            <Button w="100%">Upload</Button>
                        </Box>
                        <Box w="50%" pl={1}>
                            <Button w="100%" onClick={copy}>Copy</Button>
                        </Box>
                    </Flex>
                    <Button mt={2} w="100%" onClick={generateMatch}>Generate match</Button>
                </Box>
                <Box mt="2">
                    {parts.map((part: number[], partNum) => (
                        <Box key={"part" + partNum}>
                            <Box position='relative' padding='5'>
                                <Divider size="xl"/>
                                <AbsoluteCenter bg='white' px='4'>
                                    {partNum+1}
                                </AbsoluteCenter>
                            </Box>
                            <table style={{marginRight: "10%", marginLeft: "10%"}}>
                                {part.map((playerIdx, index) => (
                                    <tr key={Math.random()} onClick={() => { openSelectPlayerModal(partNum, index) }}>
                                        <td align='right'>
                                            { players[playerIdx].number }
                                        </td>
                                        <td style={{padding:8, paddingLeft: 10}}>
                                            { players[playerIdx].name }
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </Box>
                    ))}
                </Box>
            </Box>
            <SelectPlayerModal
                open={selectPlayerModalOpen}
                onClose={() => { setSelectPlayerModalOpen(false) }}
                players={ players }
                onChange={ updateSelectedPlayer }
            ></SelectPlayerModal>
        </>
    )
}
