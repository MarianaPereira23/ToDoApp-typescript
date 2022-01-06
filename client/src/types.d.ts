interface Todo {
  name: string;
  description: string;
  completed: boolean;
  display: boolean;
  id: string;
};

type User = {
  username: string;
  email: string;
}

type List = {
  name: string;
  id: string;
}

type Task = {
  name: string;
  description: string;
  status: string;
  list_id: string;
}
