import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { Task } from './types';

config();

const uri: string = process.env.DB_CONNECTION ? process.env.DB_CONNECTION : '';
const client: MongoClient = new MongoClient(uri);

export const addTask = async (task: Task) => {
  try {
    await client.connect();
    await client.db("todo-typescript").collection("tasks").insertOne(task);
    await client.close();
    return "Task added";
  } catch (err) {
    await client.close();
    return "Sorry, there was an error adding this task, please try again later."
  }
};