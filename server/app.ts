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
    const user: User = req.body;
    const dbUser = await getUser(user.email);
    if (dbUser != "Sorry, this user does not seem to exist.") {
      res.send('Sorry, a user with that email address already exists');
      return;
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
    const user: LoginUser = req.body;
    const dbUser = await getUser(user.email);
    if (dbUser === "Sorry, this user does not seem to exist.") {
      res.send('Sorry, a user with that email address does not seem to exist');
      return;
    } 
    if (dbUser){
      const validate: boolean = await bcrypt.compare(user.password, dbUser.password);
      if (!validate) {
        res.send('Sorry, something is wrong with your credentials');
        return;
      }
      res.status(200).send(dbUser.username);
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(8000, () => console.log('listening on 8000'));