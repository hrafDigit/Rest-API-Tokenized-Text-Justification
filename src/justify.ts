import express from "express";
import { incrementWordCount } from "./rateLimit";

const router = express.Router();

function justifyText(text: string, lineLength: number): string {
    // Split the text into an array of words
    const words = text.split(/\s+/);

    // Initialize variables to store the current line and the justified lines
    let currentLine = '';
    const justifiedLines: string[] = [];

    // Iterate over each word
    for (const word of words) {
        // Check if adding the word to the current line exceeds the line length
        if ((currentLine + word).length <= lineLength) {
            // If not, add the word to the current line
            currentLine += word + ' ';
        } else {
            // If adding the word exceeds the line length, push the current line to the justified lines
            justifiedLines.push(currentLine.trim());
            // Start a new line with the current word
            currentLine = word + ' ';
        }
    }

    // Push the last line to the justified lines
    justifiedLines.push(currentLine.trim());

    // Join the justified lines with newline characters
    const justifiedText = justifiedLines.join('\n');

    // Return the justified text
    return justifiedText;
}

router.post("/", (req, res) => {
    const { text } = req.body;
    if (!text || typeof text !== "string") {
        return res.status(400).json({ error: "Invalid text" });
    }

    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const wordCount = text.trim().split(/\s+/).length;
    incrementWordCount(token, wordCount);

    // Escape special characters in the input text
    const escapedText = JSON.stringify(text)
        .slice(1, -1)
        .replace(/\\'/g, "'") // Unescape apostrophes
        .replace(/\\"/g, '"'); // Unescape quotes

    // Justify the escaped text assuming line max. equal 80 char
    const justifiedText = justifyText(escapedText, 80);

    // Send the justified text as plain text response
    res.set("Content-Type", "text/plain; charset=utf-8").send(justifiedText);

});

export default router;



// src/justify.ts
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