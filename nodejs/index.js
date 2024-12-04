const axios = require('axios');
const fileUpload = require('express-fileupload');

const express = require('express');
const server = express();

server.use(fileUpload({
    useTempFiles : true
}));

server.post('/', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.files) {
        const script = await axios.post('http://localhost:5000/upload', {path: req.files.file.tempFilePath});
        return res.json(script.data);
    }
    return res.json("Insira um arquivo...");
})

server.listen(3000, () => {
    console.log('server working!');
});