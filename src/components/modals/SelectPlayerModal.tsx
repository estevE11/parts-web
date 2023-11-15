import { Player } from "@/interfaces/Player";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";

type SelectPlayerModalProps = {
    open: boolean;
    onClose: () => void;
    players: Player[];
    playCount: number[];
    onChange: (playerId: number) => void;
}

export default function SelectPlayerModal({ open, onClose, players, onChange, playCount } : SelectPlayerModalProps ) {

    return (
        <Modal blockScrollOnMount={false} isOpen={open} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose player</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                </ModalBody>
                    <table style={{marginRight: "10%", marginLeft: "10%"}}>
                    {players.map((player: Player, index: number) => {
                        if (!player.active) return;
                        return (
                            <tr key={Math.random()} onClick={() => { onChange(index) }}>
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
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
