import { generateMatch } from "@/parts/parts";
import { HamburgerIcon, CheckIcon, EditIcon, DownloadIcon, CopyIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, IconButton, Menu, MenuButton, MenuItem, MenuList, VisuallyHidden } from "@chakra-ui/react";
import { useRef } from "react";

type HeaderProps = {
    players: any[];
    onEditLineup: () => void;
    onGenerateMatch: () => void;
    onLoadFile: (e: any) => void;
    onCopy: () => void;
}

export default function Header({ players, onEditLineup, onGenerateMatch, onLoadFile, onCopy }: HeaderProps) {
    const fileInputRef = useRef<HTMLInputElement>(null); 

    return (
        <>
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
                                        <MenuItem icon={<CheckIcon/>} onClick={onEditLineup}>Edit lineup</MenuItem>
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
                            <input type="file" accept=".json" ref={fileInputRef} onChange={onLoadFile} />
                        </VisuallyHidden>
                    </Box>
                    <Box w="100%" pl={1}>
                        <Button w="100%" leftIcon={ <CopyIcon/> }  onClick={onCopy}> Copy</Button>
                    </Box>
                </Flex>
                <Button mt={2} w="100%" onClick={onGenerateMatch}>Generate match</Button>
            </Box>
        </>
    );
}