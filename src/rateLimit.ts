// rateLimit.ts
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

// Define any other rate-limiting related functions here

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
