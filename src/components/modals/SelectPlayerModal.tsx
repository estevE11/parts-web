import { Player } from "@/interfaces/Player";
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from "@chakra-ui/react";
import React from "react";

type SelectPlayerModalProps = {
    open: boolean;
    onClose: () => void;
    players: Player[];
    playCount: number[];
    changePosition: number;
    onChange: (playerId: number) => void;
    partPlayers: number[];
}

export default function SelectPlayerModal({ open, onClose, players, changePosition, onChange, playCount, partPlayers } : SelectPlayerModalProps ) {

    return (
        <Modal blockScrollOnMount={false} isOpen={open} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Choose player</ModalHeader>
                <ModalCloseButton />
                    <table style={{ marginRight: "10%", marginLeft: "10%", marginBottom: "40px" }}>
                    {partPlayers.map((playerId: number, index: number) => {
                        const player = players[playerId];
                        return (
                            <tr key={Math.random()} style={{border: index == changePosition ? "1px solid black" : ""}}>
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
                    <tr>
                        <td></td>
                        <td style={{paddingTop: "30px", fontWeight: "bold"}}>Bench</td>
                        <td></td>
                    </tr>
                    {players.map((player: Player, index: number) => {
                        if (!player.active) return;
                        if(partPlayers.includes(player.id)) return;
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
            </ModalContent>
        </Modal>
    );
}
