const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 8080;

const DIST_DIR = path.join(__dirname, '..', 'build');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

app.use(express.json());
app.use(express.static('build'));

app.get('/', (req, res) => {
    res.sendFile(HTML_FILE, (err) => {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(port, () => console.log(`The app server is running on port: ${port}`));
