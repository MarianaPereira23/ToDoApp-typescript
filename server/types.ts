export type User = {
  username: string;
  email: string;
  password: string;
};

export type LoginUser = {
  email: string;
  password: string;
};

export type ReturnUser = {
  username: string;
  email: string;
};

export type NewList = {
  name: string;
  user: string;
};

export type List = {
  name: string;
  id: string;
  users: string[];
};

export type UserList = {
  name: string;
  id: string;
};

export type ListUser = {
  email: string;
  id: string;
};

export type Task = {
  name: string;
  description: string;
  status: string;
  list_id: string;
}
