import express, { Request, Response } from 'express';
import { isWordLimitExceeded, incrementWordCount } from './auth';

const router = express.Router();

function justifyText(text: string, lineLength: number): string {
    if (!text || typeof text !== 'string') {
        return ''; // Return empty string for invalid input
    }

    const words = text.split(' ');
    let currentLine: string = '';

    const justifiedLines: string[] = [];

    for (const word of words) {
        if ((currentLine + word).length <= lineLength) {
            currentLine += word + ' ';
        } else {
            justifiedLines.push(currentLine.trim());
            currentLine = word + ' ';
        }
    }

    if (typeof currentLine === 'string') {
        justifiedLines.push(currentLine.trim());
    }

    const justifiedText = justifiedLines
        .map((line) => {
            const wordsInLine = line.split(' ');
            const numSpacesToAdd = lineLength - line.length + wordsInLine.length - 1;
            const spacesPerWord = Math.floor(numSpacesToAdd / (wordsInLine.length - 1));
            const extraSpaces = numSpacesToAdd % (wordsInLine.length - 1);

            let justifiedLine = '';
            for (let i = 0; i < wordsInLine.length - 1; i++) {
                justifiedLine += wordsInLine[i] + ' '.repeat(spacesPerWord);
                if (i < extraSpaces) {
                    justifiedLine += ' ';
                }
            }
            justifiedLine += wordsInLine[wordsInLine.length - 1];
            return justifiedLine;
        })
        .join('\n');

    return justifiedText;
}

router.post('/', (req: Request, res: Response) => {
    const { text } = req.body;
    const token = req.header('Authorization')?.split(' ')[1];

    if (!text || typeof text !== 'string') {
        return res.status(400).json({ error: 'Invalid text' });
    }

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (isWordLimitExceeded(token)) {
        return res.status(402).json({ error: 'Payment Required' });
    }

    const wordCount = text.trim().split(/\s+/).length;
    incrementWordCount(token, wordCount);

    const justifiedText = justifyText(text, 80); // Assuming a line length of 80 characters
    res.set('Content-Type', 'text/plain').send(justifiedText);
});

export default router;




/*
 __                        ___  ____                    __      
/\ \                     /'___\/\  _`\   __          __/\ \__   
\ \ \___   _ __    __   /\ \__/\ \ \/\ \/\_\     __ /\_\ \ ,_\  
 \ \  _ `\/\`'__\/'__`\ \ \ ,__\\ \ \ \ \/\ \  /'_ `\/\ \ \ \/  
  \ \ \ \ \ \ \//\ \L\.\_\ \ \_/ \ \ \_\ \ \ \/\ \L\ \ \ \ \ \_ 
   \ \_\ \_\ \_\\ \__/.\_\\ \_\   \ \____/\ \_\ \____ \ \_\ \__\
    \/_/\/_/\/_/ \/__/\/_/ \/_/    \/___/  \/_/\/___L\ \/_/\/__/
                                                 /\____/        
                                                 \_/__/         
    ===================================================================
    ±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±
    ## TypeScript & Node.js ##
    2024 © Achraf (aka hrafDigit)
        https://www.achrafbel.fr
        https://codepen.io/hraf
        https://github.com/hrafdigit
        made w/ ¶ from Paris, France
        [ <3 ] Grand Jardin Digital
        https://www.grandjardindigital.fr
    ±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±±
    ================================================================== 
*/