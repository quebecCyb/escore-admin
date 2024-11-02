import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs';
import * as XLSX from 'xlsx';
import fetch from 'node-fetch';

// Disable Next.js's built-in body parsing for file upload
export const config = {
    api: {
        bodyParser: false,
    },
};

const parseForm = (req: NextApiRequest): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
    const form = formidable({
        multiples: false,
        keepExtensions: true,
    });

    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            else resolve({ fields, files });
        });
    });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method === 'POST') {
        try {
            const { fields, files } = await parseForm(req);

            const requiredField = Array.isArray(fields.required) ? fields.required[0] : fields.required;
            let file = Array.isArray(files.file) ? files.file[0] : files.file;

            if (!file || !requiredField) {
                res.status(400).json({ error: 'File or required field is missing' });
                return;
            }

            // Read the file data from the temporary file path
            const fileData = fs.readFileSync(file.filepath);

            // Parse the Excel file to JSON
            const workbook = XLSX.read(fileData, { type: 'buffer' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData: string[][] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

            // Convert the JSON data to a plain text format
            const textData = jsonData.map((row: string[]) => row.join(' | ')).join('\n');

            // Prepare the data for the request
            const data = {
                text: textData,
                required: requiredField,
            };

            // Send the data to the Python backend
            const pythonResponse = await fetch('http://162.19.233.237:4040/extract', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await pythonResponse.json();

            res.status(pythonResponse.status).json(result);
        } catch (error) {
            console.error('Error processing upload:', error);
            res.status(500).json({ error: 'Error processing upload' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
};

export default handler;
