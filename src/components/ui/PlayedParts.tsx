import { Player } from "@/interfaces/Player";

type PlayedPartsProps = {
    parts: number[][];
    player: Player;
    playedParts: number[][];
};

export default function PlayedParts({parts, player, playedParts}: PlayedPartsProps) {
  return (
    <>
          {parts?.map((part: number[], partNum: number) => {
            return (
                <div key={"vis"+part+partNum} style={{
                    display: 'inline-block',
                    marginRight: '5px',
                    width: '10px',
                    height: '10px',
                    border: '1px solid black',
                    backgroundColor: playedParts[player.id][partNum] == 1 ? 'black' : 'white'
                }}></div>
            )
        })}
    </>
  );
};