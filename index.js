const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/welcome/', (request, response) => {
    response.status(200).send('Welcome!');
});

app.listen(port, () => {
    console.log('Server starting...');
    console.log(`Listening on port ${port}`);
});