document.addEventListener('DOMContentLoaded', () => {
    const getTokenBtn = document.getElementById('getTokenBtn');
    const getAnotherTokenBtn = document.getElementById('getAnotherTokenBtn');
    const justifyBtn = document.getElementById('justifyBtn');
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const resetBtn = document.getElementById('resetBtn');

    let token = ''; // Store token globally

    // Disable input fields and reset button by default
    inputText.disabled = true;
    justifyBtn.disabled = true;
    resetBtn.disabled = true;
    getAnotherTokenBtn.disabled = true;

    // Function to enable UI elements after token received
    function enableUI() {
        inputText.disabled = false;
        justifyBtn.disabled = false;
        resetBtn.disabled = false;
        getTokenBtn.disabled = true;
        getAnotherTokenBtn.disabled = true;
    }

    // Function to disable UI elements after rate words limit reached or unauthorized
    function disableUI() {
        inputText.disabled = true;
        justifyBtn.disabled = true;
        resetBtn.disabled = true;
        getAnotherTokenBtn.disabled = false;
    }

    getTokenBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: 'foo@bar.com' })
            });
            const data = await response.json();
            if (data.token) {
                token = data.token; // Store the token
                enableUI();
                alert('Token received successfully!');
            } else {
                alert('Failed to get token');
            }
        } catch (error) {
            console.error('Error fetching token:', error);
            alert('Failed to get token');
        }
    });

    justifyBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/justify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Use the stored token
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ text: inputText.value })
            });

            if (response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const responseData = await response.json();
                    outputText.value = responseData.justifiedText;
                    alert('Text justified successfully!');
                } else {
                    const responseText = await response.text();
                    outputText.value = responseText; // Display plain text response
                    alert('Text justified successfully!');
                }
            } else {
                if (response.status === 401) {
                    alert('Unauthorized: Please get another token');
                } else if (response.status === 402) {
                    alert('Maximum words reached: Payment Required');
                    // Reset input text
                    inputText.value = '';
                    // Reset output text
                    outputText.value = '';
                } else {
                    const errorData = await response.json();
                    alert('Failed to justify text: ' + errorData.error);
                }
                disableUI();
            }
        } catch (error) {
            console.error('Error justifying text:', error);
            alert('Failed to justify text');
        }
    });

    resetBtn.addEventListener('click', () => {
        inputText.value = '';
        outputText.value = '';
    });

    getAnotherTokenBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/api/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: 'foo@bar.com' })
            });
            const data = await response.json();
            if (data.token) {
                token = data.token; // Store the token
                enableUI();
                alert('Token received successfully!');
            } else {
                alert('Failed to get token');
            }
        } catch (error) {
            console.error('Error fetching token:', error);
            alert('Failed to get token');
        }
    });
});



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