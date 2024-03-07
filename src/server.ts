// src/server.ts
/* 
–– Create Express Server ---
Once created a file named server.ts inside the src directory,
initialize an Express app, set up middleware for JSON parsing, and listen on a port.

––– Create Token Generation Endpoint –––
• Import the generateToken function in server.ts.
• Implement a POST endpoint for generating tokens.

––– Testing –––
• Run the server using the following command:
$ npx ts-node src/server.ts

(if needed, open another terminal window)
• Send a POST request to http://localhost:3000/api/token with JSON body like {"email": "foo@bar.com"} using cURL
(or tools like Postman).
$ curl -X POST -H "Content-Type: application/json" -d '{"email": "foo@bar.com"}' http://localhost:3000/api/token

You should receive a response containing a JWT token ; which is mandatory to use the "justify text" feature.
{"token":"token_received_appears_here"}
*/


import express from 'express';
import bodyParser from 'body-parser';
import { generateToken, isWordLimitExceeded, incrementWordCount } from './auth';
import justifyRouter from './justify';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());


app.post('/api/token', (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== 'string') {
    return res.status(400).json({ error: 'Invalid email' });
  }

  const token = generateToken(email);
  res.json({ token });
});

app.use('/api/justify', (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (isWordLimitExceeded(token)) {
    return res.status(402).json({ error: 'Payment Required' });
  }

  next();
});

app.use('/api/justify', justifyRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




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