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
    console.log(err);
    return;
  };
};

export const getListByName = async (name: string, email: string) => {
  try {
    await client.connect();
    const list = await client.db("todo-typescript").collection("lists").findOne({ name, users: email });
    if (!list) {
      return "Sorry, this list does not seem to exist."
    }
    await client.close();
    return list;
  } catch (err) {
    await client.close();
    console.log(err);
    return;
  };
};

export const getUserLists = async (email: string) => {
  try {
    await client.connect();
    const lists = await client.db("todo-typescript").collection("lists").find({ users: email }).toArray();
    await client.close();
    return lists;
  } catch (err) {
    await client.close();
    console.log(err);
    return;
  };
};

export const deleteList = async (id: string) => {
  try {
    await client.connect();
    await client.db("todo-typescript").collection("lists").deleteOne({ id });
    await client.close();
    return "List Removed";
  } catch (err) {
    await client.close();
    console.log(err);
    return;
  };
};

export const addListUser = async (listUser: ListUser) => {
  try {
    await client.connect();
    const list = await client.db("todo-typescript").collection("lists").findOne({ id: listUser.id });
    if (!list) {
      return "Sorry, this list does not seem to exist."
    };
    await client.db("todo-typescript").collection("lists").updateOne({ id: listUser.id }, { $push: { users: listUser.email }});
    await client.close();
  } catch (err) {
    await client.close();
    console.log(err);
    return;
  };
};

export const removeListUser = async (listUser: ListUser) => {
  try {
    await client.connect();
    const list = await client.db("todo-typescript").collection("lists").findOne({ id: listUser.id });
    if (!list) {
      return "Sorry, this list does not seem to exist."
    };
    await client.db("todo-typescript").collection("lists").updateOne({ id: listUser.id }, { $pull: { users: listUser.email }});
    await client.close();
  } catch (err) {
    await client.close();
    console.log(err);
    return;
  };
};

export const getList = async (id: string) => {
  try {
    await client.connect();
    const list = await client.db("todo-typescript").collection("lists").findOne({ id });
    if (!list) {
      return "Sorry, this list does not seem to exist."
    };
    await client.close();
    return list;
  } catch (err) {
    await client.close();
    console.log(err);
    return;
  };
};