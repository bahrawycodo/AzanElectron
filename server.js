const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors')
require('dotenv').config(); // Load environment variables from .env file


const app = express()

app.use(express.json())
app.use(cors())
let fullPath = process.env.NODE_ENV === "development" ? __dirname :process.resourcesPath;
const dataFilePath = path.join(fullPath,"assets","resources" ,'index.json');
const isDev = process.env.ELECTRON_ENV === 'development';
// Serve static files from the Next.js export
app.use(express.static(path.join(fullPath, 'assets')));

app.use('/assets', express.static(path.join(fullPath, 'assets')));
app.use('/images', express.static(path.join(fullPath, 'assets/images')));
app.use('/js', express.static(path.join(fullPath, 'assets/js')));
app.use('/css', express.static(path.join(fullPath, 'assets/css')));
app.use('/resources', express.static(path.join(fullPath, 'assets/resources')));
app.use('/fonts', express.static(path.join(fullPath, 'assets/fonts')));
app.use('/lib', express.static(path.join(fullPath, 'assets/lib')));
app.use('/sounds', express.static(path.join(fullPath, 'assets/sounds')));

// Catch-all to serve index.html for any other requests
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'index.html'))
})

app.post('/api/SaveSettings', (req, res) => {
    const data = req.body;
    fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file:', err);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
        res.send({ message: 'Data saved successfully' });
    });
});
// GET route to read data from JSON file
app.get('/api/GetSettings', (req, res) => {
    fs.readFile(dataFilePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send({ message: 'Internal Server Error' });
        }
        if(data == null || data === "" || data === undefined){
            res.send({})
        }else {
            res.send(data);
        }
    });
});
function startServer(Port) {
    app.listen(Port, () => {
        console.log(`Express server running on http://localhost:${Port}`);
    });
}

// Export the startServer function
module.exports = startServer;