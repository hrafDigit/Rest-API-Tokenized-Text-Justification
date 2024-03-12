import express from 'express';
// import { isWordLimitExceeded } from './auth';

// Define Types for token-object (words count).
interface TokenWordCount {
    [token: string]: {
        count: number;
        date: string;
    };
}

// Define Object to keep track for the number of words per token per day
const tokenWordCount: TokenWordCount = {};

const TOKEN_WORD_LIMIT = parseInt(process.env.TOKEN_WORD_LIMIT || '80000', 10);

export function incrementWordCount(token: string, wordCount: number): void {
    const today = new Date().toISOString().split('T')[0];
    if (!tokenWordCount[token]) {
        tokenWordCount[token] = { count: 0, date: today };
    }
    if (today !== tokenWordCount[token].date) {
        tokenWordCount[token] = { count: 0, date: today };
    }
    tokenWordCount[token].count += wordCount;
}

export function isWordLimitExceeded(token: string): boolean {
    return tokenWordCount[token]?.count > TOKEN_WORD_LIMIT;
}

export const wordLimitHandler: express.RequestHandler = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    if (isWordLimitExceeded(token)) {
        return res.status(402).json({ error: 'Payment Required' });
    }

    next();
};



// rateLimit.ts
/*
––– Add comments and explanations here –––
*/




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