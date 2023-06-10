"use client"

import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { Todo, TodoContext } from "../app/TodoContext"
import { Checkbox } from "./ui/checkbox"

export function AddATodo() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [completed, setCompleted] = useState(false)

  const { addTodo, todos } = useContext(TodoContext)

  console.log(todos)
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value)
  }

  const handleDescChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setDescription(e.target.value)
  }

  const handleCompletedChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setCompleted(!completed)
  }

  const handleSubmit = (e: FormEvent): void => {
    e.preventDefault()

    const newTodo: Todo = {
      id: Date.now(),
      title,
      description,
      completed,
    }

    addTodo(newTodo)

    setTitle("")
    setDescription("")
    setCompleted(false)
  }

  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Add a todo</CardTitle>
        <CardDescription>What are your task?</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          {/* TODO: Add Checkbox  */}
        </div>
        <div className="grid gap-2 md:w-1/3">
          <Label htmlFor="subject">Title</Label>
          <Input
            value={title}
            onChange={handleTitleChange}
            id="subject"
            placeholder="I need to buy groceries..."
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            value={description}
            onChange={handleDescChange}
            id="description"
            placeholder="Please include all information relevant to your task."
          />
          <div className="grid gap-2 w-1/3 mt-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={completed}
                onCheckedChange={handleCompletedChange}
              />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Completed
              </label>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="justify-start space-x-2 ">
        <Button className="w-full md:w-1/3" onClick={handleSubmit}>
          Add
        </Button>
      </CardFooter>
    </Card>
  )
}
