import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [] as Todo[],
  reducers: {
    addTodo(state, action: PayloadAction<Todo>){
      state.push(action.payload);
    },
    editTodo(state, action: PayloadAction<Todo>){
      state.map(task => {
        if (task.id === action.payload.id) {
          task.name = action.payload.name;
          task.description = action.payload.description;
        }
        return task;
      });
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

export const { addTodo, editTodo, removeTodo, toggleTodoStatus } = todoSlice.actions;
export default todoSlice.reducer;