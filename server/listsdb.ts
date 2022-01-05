import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { List, ListUser } from './types';

config();

const uri: string = process.env.DB_CONNECTION ? process.env.DB_CONNECTION : '';
const client: MongoClient = new MongoClient(uri);

export const addList = async (list: List) => {
  try {
    await client.connect();
    await client.db("todo-typescript").collection("lists").insertOne(list);
    await client.close();
    return "List added";
  } catch (err) {
    await client.close();
    return "Sorry, there was an error adding this list, please try again later."
  }
};

export const addListUser = async (listUser: ListUser) => {
  try {
    await client.connect();
    const list = await client.db("todo-typescript").collection("lists").findOne({ id: listUser.id });
    if (!list) {
      return "Sorry, this list does not seem to exist."
    }
    await client.db("todo-typescript").collection("lists").updateOne({ id: listUser.id }, { $push: { users: listUser.email }});
    await client.close();
  } catch (err) {
    await client.close();
    return "Sorry, there was an error adding this user to the list, please try again later."
  }
};