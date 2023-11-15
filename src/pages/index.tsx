import { Player } from '@/interfaces/Player';
import { AbsoluteCenter, Badge, Box, Button, Divider, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, VisuallyHidden, useToast } from '@chakra-ui/react'
import Head from 'next/head'
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { apiPOST } from '@/utils/apiUtils';
import SelectPlayerModal from '@/components/modals/SelectPlayerModal';
import { calculatePlayCount } from '@/utils/partsUtils';
import { CheckIcon, ChevronDownIcon, CopyIcon, DownloadIcon, EditIcon, HamburgerIcon } from '@chakra-ui/icons';
import EditLineupModal from '@/components/modals/EditLineupModal';

export default function Home() {
    const toast = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const [players, setPlayers] = useState<Player[]>([]);
    const [parts, setParts] = useState<number[][]>(); // 2d number array containing player index
    const [playCount, setPlayCount] = useState<number[]>([]);

    const [selectPlayerModalOpen, setSelectPlayerModalOpen] = useState(false);
    const [editLineupModalOpen, setEditLineupModalOpen] = useState(false);

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

        const playCount = calculatePlayCount(parts, players);

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
                        <Box pr={1}>
                            <Menu>
                                <MenuButton
                                    as={IconButton}
                                    aria-label='Options'
                                    icon={<HamburgerIcon />}
                                />
                                <MenuList>
                                    { players.length > 0 &&
                                        <>
                                            <MenuItem icon={<CheckIcon/>} onClick={() => (setEditLineupModalOpen(true))}>Edit lineup</MenuItem>
                                            <MenuItem icon={<EditIcon/>}>Edit team</MenuItem>
                                            <MenuItem icon={<DownloadIcon/>}>Download team file</MenuItem>
                                        </>
                                    }
                                    <MenuItem
                                        ml="-8px"
                                        icon={<DownloadIcon ml={2} style={{ transform: 'rotate(180deg)' }}></DownloadIcon>}
                                        onClick={() => fileInputRef.current?.click()}
                                    >Upload team</MenuItem>
                                </MenuList>
                            </Menu>
                            <VisuallyHidden>
                                <input type="file" accept=".json" ref={fileInputRef} onChange={loadFile} />
                            </VisuallyHidden>
                        </Box>
                        <Box w="100%" pl={1}>
                            <Button w="100%" leftIcon={ <CopyIcon/> }  onClick={copy}> Copy</Button>
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
                                {players.map((player: Player) => {
                                    if (!player.active) return;
                                    return (
                                        <tr key={"pc" + Math.random()}>
                                            <td align='right'>
                                                {player.number}
                                            </td>
                                            <td style={{ padding: 8, paddingLeft: 10 }}>
                                                {player.name}
                                            </td>
                                            <td style={{ padding: 8, paddingLeft: 10 }}>
                                                {playCount[player.id]}
                                            </td>
                                        </tr>
                                    )
                                })}
                            </table>
                        </Box>
                    }
                </Box>
            </Box>
            <SelectPlayerModal
                open={selectPlayerModalOpen}
                onClose={() => { setSelectPlayerModalOpen(false) }}
                onChange={ updateSelectedPlayer }
                players={ players }
                playCount={ playCount }
            ></SelectPlayerModal>
            <EditLineupModal
                open={editLineupModalOpen}
                onClose={() => { setEditLineupModalOpen(false); } }
                onChange={(players: Player[]) => (setPlayers([...players]))}
                _players={players}
            ></EditLineupModal>
        </>
    )
}
