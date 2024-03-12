import express from 'express';
import jwt from 'jsonwebtoken';

// Read secret key and token word limit from environment variables .env
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key';

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

// Define any other authentication-related functions here


// Define authenticateToken function
export const authenticateToken: express.RequestHandler = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    if (!validateToken(token)) {
        return res.status(401).json({ error: 'Invalid token' });
    }
    next();
};

export const tokenHandler: express.RequestHandler = (req, res) => {
    const { email } = req.body;
    if (!email || typeof email !== 'string') {
        return res.status(400).json({ error: 'Invalid email' });
    }

    const token = generateToken(email);
    res.json({ token });
};



// src/auth.ts
/*
––– Implement Token Generation –––
Once created a new file named auth.ts inside the src directory,
implement a function to generate a JWT token.
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