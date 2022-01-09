import { Server, Socket } from 'socket.io';
import { createServer } from "http";
import * as bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';
import { config } from 'dotenv';
import { addUser, getUser } from './usersdb';
import { addList, getListByName, getUserLists, deleteList, addListUser, removeListUser, getList } from './listsdb';
import { addTask, getTasks, findTask, deleteTask, toggleTask } from './tasksdb';
import { User, ReturnUser, LoginUser, NewList, List, UserList, ListUser, Task } from './types';

config();

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    allowedHeaders: ["Access-Control-Allow-Origin", "*"],
    credentials: true
  },
});

const hash = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

io.on("connection", (socket: Socket) => {

  socket.on('join', async (user: User) => {
    const dbUser = await getUser(user.email);
    if (typeof dbUser !== 'string') {
      return socket.emit('loginStatus', 'Sorry, a user with that email address already exists');
    };
    user.password = await hash(user.password);
    await addUser(user);
    const returnUser: ReturnUser = {
      username: user.username,
      email: user.email
    };
    socket.emit('loginStatus', returnUser);
  });

  socket.on('login', async (user: LoginUser) => {
    const dbUser = await getUser(user.email);
    if (typeof dbUser === 'string' || !dbUser) {
      return socket.emit('loginStatus', 'Sorry, a user with that email address does not seem to exist');
    };
    const validate: boolean = await bcrypt.compare(user.password, dbUser.password);
    if (!validate) {
      return socket.emit('loginStatus', 'Sorry, something is wrong with your credentials');
    };
    const returnUser: ReturnUser = {
      username: dbUser.username,
      email: dbUser.email
    };
    socket.emit('loginStatus', returnUser);
  });

  socket.on('createList', async (listData: NewList) => {
    const listToAdd: List = {
      name: listData.name,
      id: uuidv4(),
      users: [listData.user]
    };
    const existingList = await getListByName(listToAdd.name, listData.user);
    if (typeof existingList !== 'string') {
      return socket.emit('list', 'You already hava list with that name');
    };
    await addList(listToAdd);
    socket.emit('newList', listToAdd);
  });

  socket.on('getLists', async (user: ReturnUser) => {
    const lists = await getUserLists(user.email);
    if(lists && lists.length > 0) {
      const userLists: UserList[] = lists.map(list => {
        return ({
          name: list.name,
          id: list.id
        });
      });
      return socket.emit('lists', userLists);
    };
    socket.emit('lists', []);
  });

  socket.on('deleteList', async (listId: string, user: ReturnUser) => {
    await deleteList(listId);
    const lists = await getUserLists(user.email);
    if(lists && lists.length > 0) {
      const userLists: UserList[] = lists.map(list => {
        return ({
          name: list.name,
          id: list.id
        });
      });
      return socket.emit('lists', userLists);
    };
    socket.emit('lists', []);
  });

  socket.on('addListUser', async (user: ListUser) => {
    const dbUser = await getUser(user.email);
    if (typeof dbUser === 'string') {
      return socket.emit('lists', 'Sorry, a user with that email address does not seem to exist');
    };
    await addListUser(user);
  });

  socket.on('removeListUser', async (user: ListUser) => {
    await removeListUser(user);
  });

  socket.on('getListName', async (id: string) => {
    const list = await getList(id);
    if (typeof list === 'string') {
      return socket.emit('listName', list);
    };
    if (list) {
      return socket.emit('listName', list.name);
    }
  });

  socket.on('joinRoom', (id: string) => socket.join(id));

  socket.on('getTasks', async (id: string) => {
    const tasks = await getTasks(id);
    if (tasks && tasks.length > 0) {
      const listTasks: Task[] = tasks.map(task => {
        return ({
          name: task.name,
          description: task.description,
          status: task.status,
          list_id: task.list_id
        });
      });
      return io.in(id).emit('tasks', listTasks);
    };
    io.in(id).emit('tasks', []);
  });

  socket.on('addTask', async (task: Task, id: string) => {
    const dbTask = await findTask(task.name, task.list_id);
    if (typeof dbTask !== 'string') {
      return io.in(id).emit('tasks', 'Sorry, a task with that name already exists');
    };
    await addTask(task);
    const tasks = await getTasks(id);
    if (tasks && tasks.length > 0) {
      const listTasks: Task[] = tasks.map(task => {
        return ({
          name: task.name,
          description: task.description,
          status: task.status,
          list_id: task.list_id
        });
      });
      return io.in(id).emit('tasks', listTasks);
    };
  });

  socket.on('deleteTask', async (name: string, id: string) => {
    await deleteTask(name, id);
    const tasks = await getTasks(id);
    if (tasks && tasks.length > 0) {
      const listTasks: Task[] = tasks.map(task => {
        return ({
          name: task.name,
          description: task.description,
          status: task.status,
          list_id: task.list_id
        });
      });
      return io.in(id).emit('tasks', listTasks);
    };
    io.in(id).emit('tasks', []);
  });

  socket.on('toggleTask', async (task: Task, id: string) => {
    if (task.status === 'Pending') {
      await toggleTask(task.name, task.list_id, 'Done');
    };
    if (task.status === 'Done') {
      await toggleTask(task.name, task.list_id, 'Pending');
    };
    const tasks = await getTasks(task.list_id);
    if (tasks && tasks.length > 0) {
      const listTasks: Task[] = tasks.map(task => {
        return ({
          name: task.name,
          description: task.description,
          status: task.status,
          list_id: task.list_id
        });
      });
      return io.in(id).emit('tasks', listTasks);
    };
    io.in(id).emit('tasks', []);
  });

});

httpServer.listen(8080);