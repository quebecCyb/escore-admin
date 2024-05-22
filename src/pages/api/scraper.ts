// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    statuses: any,
    dates: any
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    const response = await fetch(`${process.env.API_URL_ADMIN_MCS}/Admin/count/status`, {
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // }
    });

    let statuses = (await response.json()).data;


    const response_date = await fetch(`${process.env.API_URL_ADMIN_MCS}/Admin/count/date`, {
        // headers: {
        //     'Authorization': `Bearer ${token}`
        // }
    });

    let dates = (await response_date.json()).data;

    res.status(200).json({ statuses, dates });
}
