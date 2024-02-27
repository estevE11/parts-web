import { AbsoluteCenter, Box, Divider } from "@chakra-ui/react";

type PartHeaderProps = {
    partNum: number;
}

export default function PartHeader({ partNum }: PartHeaderProps) {
    return (
        <Box position='relative' padding='5'>
            <Divider size="xl"/>
            <AbsoluteCenter bg='white' px='4'>
                {partNum+1}
            </AbsoluteCenter>
        </Box>
    );
}