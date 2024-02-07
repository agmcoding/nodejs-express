import express from 'express';
import { randomUUID } from 'node:crypto';
import { body, validationResult } from 'express-validator';

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

const usersMap = new Map();
usersMap.set(randomUUID(), { username: 'Bob', email: 'bob@example.com' });
usersMap.set(randomUUID(), { username: 'Amy', email: 'amy@example.com' });
usersMap.set(randomUUID(), { username: 'Duke', email: 'duke@example.com' });

app.get('/welcome/', (request, response) => {
  response.status(200).send('Welcome!');
});

app.get('/api/users/', (request, response) => {
  response.status(200).send(Array.from(usersMap));
});

app.get('/api/users/:ID', (request, response) => {
  const { ID } = request.params;

  if (usersMap.has(ID) === false) {
    response.status(404).send(`User not found with ID: ${ID}`);
    return;
  }

  const user = usersMap.get(ID);
  response.status(200).send(user);
});

/* jscpd:ignore-start */
app.post(
  '/api/users/',
  body('username').notEmpty(),
  body('email').notEmpty().isEmail(),
  (request, response) => {
    const errors = validationResult(request);
    const thereAreErrors = !(errors.isEmpty());

    if (thereAreErrors) {
      response.status(400).send(errors.array());
      return;
    }

    const ID = randomUUID();
    /* jscpd:ignore-end */
    const { username, email } = request.body;
    usersMap.set(ID, { username, email });

    const createdUser = usersMap.get(ID);
    const result = [ID, createdUser];

    response.status(201).send(result);
  },
);

/* jscpd:ignore-start */
app.put(
  '/api/users/:ID',
  body('username').notEmpty(),
  body('email').notEmpty().isEmail(),
  (request, response) => {
    const errors = validationResult(request);
    const thereAreErrors = !(errors.isEmpty());

    if (thereAreErrors) {
      response.status(400).send(errors.array());
      return;
    }

    const { ID } = request.params;
    /* jscpd:ignore-end */
    const { username, email } = request.body;

    if (usersMap.has(ID) === false) {
      response.status(404).send(`User not found with ID: ${ID}`);
      return;
    }

    usersMap.set(ID, { username, email });
    response.status(204).end();
  },
);

app.delete('/api/users/:ID', (request, response) => {
  const { ID } = request.params;

  const userDeleted = usersMap.delete(ID);

  if (userDeleted === false) {
    response.status(404).send(`User not found with ID: ${ID}`);
    return;
  }

  response.status(204).end();
});

app.listen(port, () => {
  console.log('Server starting...');
  console.log(`Listening on port ${port}`);
});
