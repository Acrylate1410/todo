const path = require('path')
const fs = require('fs/promises')
const express = require('express')
const app = express()
const port = 3001
const cors = (req, res, next) => {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type");

    next();
};

app.use(cors)
app.use(express.json())

app.get('/get_info', async (req, res) => {
	let data = await fs.readFile(path.resolve(__dirname, './data.json'), 'utf-8');
	res.json(JSON.parse(data));
});

app.post('/save_info', (req, res) => {
	fs.writeFile(path.resolve(__dirname, './data.json'), JSON.stringify(req.body), 'utf-8').then(res.send(''))
});

app.listen(port, function () {
	console.log(`Example app listening on port ${port}`)
});