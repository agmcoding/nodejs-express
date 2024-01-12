const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const usersArray = [
    { "ID": "bobid", "username": "Bob", "email": "bob@example.com" },
    { "ID": "amyid", "username": "Amy", "email": "amy@example.com" },
    { "ID": "dukeid", "username": "Duke", "email": "duke@example.com" }
];

app.get('/welcome/', (request, response) => {
    response.status(200).send('Welcome!');
});

app.get('/api/users/', (request, response) => {
    response.status(200).send(usersArray);
});

app.listen(port, () => {
    console.log('Server starting...');
    console.log(`Listening on port ${port}`);
});