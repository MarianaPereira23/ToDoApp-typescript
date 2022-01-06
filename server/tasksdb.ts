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

export const getTasks = async (id: string) => {
  try {
    await client.connect();
    const tasks = await client.db("todo-typescript").collection("tasks").find({ list_id: id }).toArray();
    await client.close();
    return tasks;
  } catch (err) {
    await client.close();
    return "Sorry, there was an error getting your tasks, please try again later.";
  }
};

export const findTask = async (name: string) => {
  try {
    await client.connect();
    const task = await client.db("todo-typescript").collection("tasks").findOne({ name });
    if (!task) {
      return "Sorry, that task does not seem to exist.";
    }
    await client.close();
    return task;
  } catch (err) {
    await client.close();
    return "Sorry, there was an error getting your task, please try again later.";
  }
};