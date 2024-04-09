// Import the required modules
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';


// Function to prompt the user for input
function promptForURL() {
    const questions = [
        {
            type: 'input',
            name: 'url',
            message: 'Enter the URL you want to generate a QR code for:',
            validate: function (value) {
                // Simple validation for URL format
                var pass = value.match(
                    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/
                );
                if (pass) {
                    return true;
                }
                return 'Please enter a valid URL.';
            },
        },
    ];

    inquirer.prompt(questions).then((answers) => {
        const url = answers.url;
        saveURLToFile(url);
        generateQRCode(url);
    });
}

// Function to save the user input to a text file
function saveURLToFile(url) {
    fs.writeFile('inputURL.txt', url, (err) => {
        if (err) throw err;
        console.log('The URL has been saved to inputURL.txt');
    });
}

// Function to generate and save the QR code
function generateQRCode(url) {
    const qr_svg = qr.image(url, { type: 'png' });
    const output = fs.createWriteStream('QRCode.png');

    qr_svg.pipe(output);
    output.on('finish', () => {
        console.log('QR Code has been generated and saved as QRCode.png');
    });
}

// Call the function to start the process
promptForURL();
