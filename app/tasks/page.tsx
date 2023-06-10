"use client"

import { ReactNode, useContext, useEffect, useState } from "react"
import { FaPencilAlt, FaTrash } from "react-icons/fa"

import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Todo, TodoContext } from "../TodoContext"

export default function TasksPage() {
  const { todos, updateTodo, deleteTodo } = useContext(TodoContext)
  const [editableTodos, setEditableTodos] = useState<Todo[]>([])

  const handleEditClick = (todo: Todo) => {
    setEditableTodos((prevTodos) =>
      prevTodos.includes(todo)
        ? prevTodos.filter((t) => t !== todo)
        : [...prevTodos, todo]
    )
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    todo: Todo
  ) => {
    const { name, value } = e.target
    updateTodo(todo.id, { ...todo, [name]: value })
  }

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    todo: Todo
  ) => {
    const { name, checked } = e.target
    updateTodo(todo.id, { ...todo, [name]: checked })
  }

  const handleDeleteClick = (todo: Todo) => {
    deleteTodo(todo.id)
  }
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex flex-col items-center gap-2">
        <Table>
          <TableCaption>A list of your recent tasks.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Completed</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="p-2">
            {todos.map((todo) => (
              <TableRow key={todo.id}>
                <TableCell className="font-medium">{todo.id}</TableCell>
                <TableCell>
                  {editableTodos.includes(todo) ? (
                    <Input
                      type="text"
                      name="title"
                      value={todo.title}
                      onChange={(e) => handleInputChange(e, todo)}
                    />
                  ) : (
                    <Label htmlFor="title" className="font-bold">
                      {todo.title}
                    </Label>
                  )}
                </TableCell>
                <TableCell>
                  {editableTodos.includes(todo) ? (
                    <Input
                      type="text"
                      name="description"
                      value={todo.description}
                      onChange={(e) => handleInputChange(e, todo)}
                    />
                  ) : (
                    <Label htmlFor="description" className="font-thin">
                      {todo.description}
                    </Label>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {editableTodos.includes(todo) ? (
                    <Input
                      type="checkbox"
                      className="w-full h-auto bg-white"
                      name="completed"
                      checked={todo.completed}
                      onChange={(e) => handleCheckboxChange(e, todo)}
                    />
                  ) : (
                    <Checkbox
                      disabled={true}
                      className="w-auto h-auto p-0"
                      checked={todo.completed}
                    />
                  )}
                </TableCell>
                <TableCell>
                  <FaTrash
                    className="cursor-pointer"
                    onClick={() => handleDeleteClick(todo)}
                  />
                </TableCell>
                <TableCell>
                  <FaPencilAlt
                    className="cursor-pointer"
                    onClick={() => handleEditClick(todo)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  )
}
