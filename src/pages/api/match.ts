import type { NextApiRequest, NextApiResponse } from 'next';
import { generateMatch } from '@/parts/parts';
import { Player } from '../../interfaces/Player';
import { STATUS_CODES } from 'http';

const methodHandlerMap: { [id: string]: (req: NextApiRequest, res: NextApiResponse) => void } = {
}
methodHandlerMap["post"] = post;

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    // Set the CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');

    const method: string = (req.method as string).toLowerCase();

    if (!Object.keys(methodHandlerMap).includes(method)) {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    return methodHandlerMap[method](req, res);
}

async function post(req: NextApiRequest, res: NextApiResponse) {
    if (!req.body.players || !req.body.nParts || !req.body.nPlayers) {
        return res.status(400).json({ error: "Bad request!" });
    }

    const parts = generateMatch(req.body.players, req.body.nParts, req.body.nPlayers);

    return res.status(200).json({ parts: parts });
}