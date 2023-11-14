import { Player } from '@/interfaces/Player';
import { AbsoluteCenter, Badge, Box, Button, Divider, Flex, VisuallyHidden, useToast } from '@chakra-ui/react'
import Head from 'next/head'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { apiPOST } from '@/utils/apiUtils';
import SelectPlayerModal from '@/components/modals/SelectPlayerModal';

export default function Home() {
    const toast = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const [players, setPlayers] = useState<Player[]>([]);
    const [parts, setParts] = useState<number[][]>(); // 2d number array containing player index
    const [playCount, setPlayCount] = useState<number[]>([]);

    const [selectPlayerModalOpen, setSelectPlayerModalOpen] = useState(false);

    const [positionSelected, setPositionSelected] = useState([-1, -1]);

    useEffect(() => {calculateMatchStats()}, [parts]);

    const loadFile = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            if (event.target != undefined && event.target.result != undefined) {
                const fileObject = JSON.parse(event.target.result.toString());
                fileObject["players"].map((x: any, index: number) => {
                    x["id"] = index;
                    x["active"] = true;
                    return x;
                })
                setPlayers([...fileObject["players"]]);
            }
        })
        if (e.target.files != undefined)
            reader.readAsText(e.target.files[0]);
    }

    const generateMatch = () => {
        if (players.length <= 0) {
            toast({
                title: 'No team!',
                description: "You need to upload a team file before generating a match!",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }
        const body = {
            players: players,
            nParts: 4,
            nPlayers: 6
        };

        apiPOST('match', body).then((data: any) => {
            setParts([...data.parts]);
        });
    }

    const calculateMatchStats = () => {
        if (!parts) return;

        let playCount: number[] = new Array(players.length).fill(0);
        console.log(playCount);

        for (let i = 0; i < parts.length; i++) {
            for (let j = 0; j < parts[i].length; j++) {
                playCount[parts[i][j]]++;
            }
        }
        setPlayCount([...playCount]);
    }

    const updateSelectedPlayer = (newPlayerId: number) => {
        if (!parts) return;
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

        if (!parts) {
            toast({
                title: 'No match',
                description: "You need to generate a match to copy",
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        for (let i = 0; i < parts.length; i++) { 
            copyText += `Part ${i+1}:\n`;
            for (let j = 0; j < parts[i].length; j++) { 
                const player = players[parts[i][j]];
                copyText += `${player.number} - ${player.name}\n`;
            }
            copyText += `\n`;
        }

        for (let i = 0; i < playCount.length; i++) {
            if (!players[i].active) continue;
            copyText += `${players[i].number} - ${players[i].name} played ${playCount[i]}\n`
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
                            <Button w="100%" onClick={() => fileInputRef.current?.click()}>Upload</Button>
                            <VisuallyHidden>
                                <input type="file" accept=".json" ref={fileInputRef} onChange={loadFile} />
                            </VisuallyHidden>
                        </Box>
                        <Box w="50%" pl={1}>
                            <Button w="100%" onClick={copy}>Copy</Button>
                        </Box>
                    </Flex>
                    <Button mt={2} w="100%" onClick={generateMatch}>Generate match</Button>
                </Box>
                <Box mt="2">
                    {parts && parts.map((part: number[], partNum) => (
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
                    { players.length > 0 && 
                        <Box>
                            <Box position='relative' padding='5'>
                                <Divider size="xl"/>
                                <AbsoluteCenter bg='white' px='4'>
                                    Play count
                                </AbsoluteCenter>
                            </Box>
                            <table style={{marginRight: "10%", marginLeft: "10%"}}>
                                {players.map((player: Player) => (
                                    <tr key={"pc" + Math.random()}>
                                        <td align='right'>
                                            { player.number }
                                        </td>
                                        <td style={{padding:8, paddingLeft: 10}}>
                                            { player.name }
                                        </td>
                                        <td style={{padding:8, paddingLeft: 10}}>
                                            { playCount[player.id] }
                                        </td>
                                    </tr>
                                ))}
                            </table>
                        </Box>
                    }
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
