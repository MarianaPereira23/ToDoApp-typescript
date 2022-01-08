import { MongoClient } from 'mongodb';
import { config } from 'dotenv';
import { User } from './types';

config();

const uri: string = process.env.DB_CONNECTION ? process.env.DB_CONNECTION : '';
const client: MongoClient = new MongoClient(uri);

export const addUser = async (user: User) => {
  try {
    await client.connect();
    await client.db("todo-typescript").collection("users").insertOne(user);
    await client.close();
    return "User added";
  } catch (err) {
    await client.close();
    return;
  };
};

export const getUser = async (email: string) => {
  try {
    await client.connect();
    const dbUser = await client.db("todo-typescript").collection("users").findOne({ email });
    await client.close();
    if (!dbUser) {
      return "Sorry, this user does not seem to exist.";
    };
    return dbUser;
  } catch (err) {
    await client.close();
    return;
  };
};