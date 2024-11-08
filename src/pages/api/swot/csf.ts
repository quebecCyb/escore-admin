// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    message: string;
    data?: any;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {

    if (req.method === 'POST') {
        try {
            console.log(req.body)
            const response = await fetch('http://162.19.233.237:4040/swot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            });

            if (response.ok) {
                const data = await response.json();
                res.status(200).json(data);
            } else {
                console.log(response)
                const error = await response.text();
                res.status(response.status).json({ message: 'Error', data: error });
            }
        } catch (error: unknown) {
            if(error instanceof Error){
                res.status(500).json({ message: 'Internal Server Error', data: error.message });
            }else{
                res.status(500).json({ message: 'Internal Server Error', data: error });
            }
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
