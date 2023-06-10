import { ReactNode, createContext, useState } from "react"

export interface Todo {
  id: number
  title: string
  description: string
  completed: boolean
}

interface TodoContextType {
  todos: Todo[]
  addTodo: (todo: Todo) => void
  updateTodo: (id: number, updatedTodo: Todo) => void
  deleteTodo: (id: number) => void
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  addTodo: () => {},
  updateTodo: () => {},
  deleteTodo: () => {},
})

interface TodoProviderProps {
  children: ReactNode
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([])

  const addTodo = (todo: Todo) => {
    setTodos((prevTodos) => [...prevTodos, todo])
  }
  const updateTodo = (id: number, updatedTodo: Todo) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    )
    setTodos(updatedTodos)
  }
  const deleteTodo = (id: number) => {
    const filteredTodos = todos.filter((todo) => todo.id !== id)
    setTodos(filteredTodos)
  }

  return (
    <TodoContext.Provider value={{ todos, addTodo, updateTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  )
}
