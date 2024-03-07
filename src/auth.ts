// src/auth.ts
/*
––– Implement Token Generation Endpoint –––
Once created a new file named auth.ts inside the src directory,
implement a function to generate a JWT token.
*/

import jwt from 'jsonwebtoken';

// Read secret key and token word limit from environment variables .env
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';
const TOKEN_WORD_LIMIT = parseInt(process.env.TOKEN_WORD_LIMIT || '80000', 10);

// Define Types for token-object (words count).
interface TokenWordCount {
    [token: string]: {
        count: number;
        date: string;
    };
}

// Define Object to keep track for the number of words per token per day
const tokenWordCount: TokenWordCount = {};

export function generateToken(email: string): string {
    return jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
}

export function validateToken(token: string): boolean {
    try {
        jwt.verify(token, SECRET_KEY);
        return true;
    } catch (err) {
        return false;
    }
}

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