import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import justifyRouter from './justify';
import { tokenHandler } from './auth';
import { wordLimitHandler } from './rateLimit';

/* ---  'path' is needed for the GUI "app" feature I made as easterEgg ^^ */
import path from 'path';

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

/* --- 'path' is needed for the GUI "app" feature I made as easterEgg ^^ --- */
// Serve static files from the 'app' folder
const staticPath = path.join(__dirname, '../app');
app.use('/app', express.static(staticPath));

app.post('/api/token', tokenHandler);

app.use('/api/justify', wordLimitHandler, justifyRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



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