import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [
    {
      name: 'Walk the dog',
      description: 'Take the dog for a walk in the park',
      display: true,
      id: '1',
      completed: false,
    },
  ] as Todo[],
  reducers: {
    addTodo(state, action: PayloadAction<Todo>){
      state.push(action.payload);
    },
    removeTodo(state, action: PayloadAction<string>) {
      const index = state.findIndex((todo) => todo.id === action.payload);
      state.splice(index, 1);
    },
    toggleTodoStatus(
      state,
      action: PayloadAction<{ completed: boolean; id: string }>
    ) {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].completed = action.payload.completed;
    },
  },
});

export const { addTodo, removeTodo, toggleTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;