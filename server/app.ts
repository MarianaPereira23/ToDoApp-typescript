import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { addUser, getUser } from './mongo';
import { User, LoginUser } from './types';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const hash = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
}

app.post('/join', async (req, res) => {
  try {
    const user: User = req.body.user;
    const dbUser = await getUser(user.email);
    if (dbUser != "Sorry, this user does not seem to exist.") {
      res.status(400).send('Sorry, a user with that email address already exists')
    }
    user.password = await hash(user.password);
    await addUser(user);
    res.status(201).send(user.username);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post('/login', async (req, res) => {
  try {
    const user: LoginUser = req.body.user;
    const dbUser = await getUser(user.email);
    if (dbUser === "Sorry, this user does not seem to exist.") {
      res.status(404).send('Sorry, a user with that email address does not seem to exist');
    } 
    if (dbUser && dbUser != "Sorry, this user does not seem to exist."){
      const validate: boolean = await bcrypt.compare(user.password, dbUser.password);
      if (!validate) {
        res.status(401).send('Sorry, something is wrong with your credentials')
      }
      res.status(200).send(dbUser.username);
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(8000, () => console.log('listening on 8000'));