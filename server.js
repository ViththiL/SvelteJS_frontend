const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;
const buildPath = path.join(__dirname, 'dist'); // Make sure this is the path to your built Svelte app

app.use(express.static(buildPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
