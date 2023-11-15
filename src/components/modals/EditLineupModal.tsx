import { Player } from "@/interfaces/Player";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

type EditLineupModalProps = {
    open: boolean;
    onClose: () => void;
    _players: Player[];
    onChange: (players: Player[]) => void;
}

export default function EditLineupModal({ open, onClose, _players, onChange } : EditLineupModalProps ) {

    const [players, setPlayers] = useState<Player[]>([]); 

    useEffect(() => {
        setPlayers([..._players]);
    }, [open]);

    const togglePlayer = (playerId: number) => {
        players[playerId] = { ...players[playerId], active: !players[playerId].active };
        setPlayers([...players]);
    }

    const handleClose = () => {
        onChange(players);
        onClose();
    }

    return (
        <Modal blockScrollOnMount={false} isOpen={open} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose player</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                </ModalBody>
                    <table style={{marginRight: "10%", marginLeft: "10%"}}>
                        {players.map((player: Player, index: number) => (
                            <tr key={Math.random()} style={{backgroundColor: player.active ? 'white' : 'gray'}} onClick={() => {togglePlayer(index)}}>
                                <td align='right'>
                                    { player.number }
                                </td>
                                <td style={{padding:8, paddingLeft: 10}}>
                                    { player.name }
                                </td>
                            </tr>
                        ))}
                    </table>
                <ModalFooter>
                    <Button colorScheme='green' mr={3} onClick={handleClose}>
                        Save & Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
