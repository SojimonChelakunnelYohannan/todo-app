import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Todo {
  id: number;
  text: string;
}

interface TodoState {
  todos: Todo[];
}

const initialState: TodoState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (
      state: { todos: { id: number; text: any;}[] },
      action: PayloadAction<string>
    ) => {
      state.todos.push({
        id: Date.now(),
        text: action.payload
      });
    },
    deleteTodo: (state: { todos: any[] }, action: PayloadAction<number>) => {
      state.todos = state.todos.filter(
        (todo: { id: any }) => todo.id !== action.payload
      );
    },
  },
});

export const { addTodo, deleteTodo } = todoSlice.actions;

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
