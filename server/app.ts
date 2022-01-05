import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import { addUser, getUser } from './usersdb';
import { addList, deleteList, getUserLists, addListUser, removeListUser } from './listsdb';
import { User, LoginUser, UserEmail, NewList, List, UserLists, ListUser, DeleteList, ReturnUser } from './types';

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
    const returnUser: ReturnUser = {
      username: user.username,
      email: user.email
    }
    res.status(201).send(returnUser);
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
      const returnUser: ReturnUser = {
        username: dbUser.username,
        email: dbUser.email
      }
      res.status(200).send(returnUser);
    }
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post('/lists/create', async (req, res) => {
  try {
    const listData: NewList = req.body;
    const listToAdd: List = {
      name: listData.name,
      id: uuidv4(),
      users: [listData.user]
    };
    await addList(listToAdd);
    // const userList: UserList = {
    //   name: listToAdd.name,
    //   id: listToAdd.id
    // }
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.post('/lists/get', async (req, res) => {
  try {
    const user: ReturnUser = req.body;
    const lists = await getUserLists(user.email);
    if (lists === "Sorry, there was an error getting your lists, please try again later.") {
      res.send(lists);
      return;
    }
    const userLists: UserLists = lists.map(list => {
      return ({
        name: list.name,
        id: list.id
      });
    });
    res.status(200).send(userLists);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.delete('/lists/delete', async (req, res) => {
  try {
    const id: DeleteList = req.body;
    await deleteList(id.id);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.put('/list/adduser', async (req, res) => {
  try {
    const newListUser: ListUser = req.body;
    const dbUser = await getUser(newListUser.email);
    if (dbUser === "Sorry, this user does not seem to exist.") {
      res.send('Sorry, a user with that email address does not seem to exist');
      return;
    } 
    await addListUser(newListUser);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.put('/list/removeuser', async (req, res) => {
  try {
    const listUserToRemove: ListUser = req.body;
    await removeListUser(listUserToRemove);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

app.listen(8000, () => console.log('listening on 8000'));