import {JSX, useEffect, useState} from "react";
import {Heading, VStack, IconButton, useColorMode} from "@chakra-ui/react";
import TodoList from "./components/TodoList.tsx";
import AddTodo from "./components/AddTodo.tsx";
import {FaSun, FaMoon} from "react-icons/fa";
import { motion } from "framer-motion";
export interface ITodos {
  id: number;
  todo: string;
  completed: boolean;
  date: string;
}
export default function App(): JSX.Element {
  const [todos, setTodos] = useState<ITodos[]>(
    () => JSON.parse(localStorage.getItem("todos") || "[]") || []
  );
  const { colorMode, toggleColorMode } = useColorMode();
  function handleDeleteTodo(id: number): void {
    const newTodos = todos.filter((todo): boolean => {
      return todo.id !== id;
    });
    setTodos(newTodos);
  }
  function handleAddTodo(todo: ITodos): void{
    setTodos((prevTodos) => [todo, ...prevTodos]);
  }
  function handleToggleCompleted(id: number) {
    const updated = todos.map((item) => {
      return item.id === id ? {
        ...item,
        completed: !item.completed
      } : item
    });
    setTodos(updated);
  }
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);
  return (
    <>
      <VStack p={4} minH={"100vh"}>
        <motion.div
          initial={{scale: 1}}
          whileTap={{scale: 0.9}}
          transition={{duration: 0.1, type: "spring", stiffness: 250}}
          style={{alignSelf: "end"}}>
          <IconButton
            onClick={toggleColorMode}
            icon={colorMode === "light"
              ? <FaSun size={20} color={"#b08f46"}/>
              : <FaMoon size={20} color={"#767474"}/>
            }
            isRound={true}
            size={"md"}
            aria-label={""}
            alignSelf={"end"}/>
        </motion.div>
        <Heading
          mb={5}
          fontWeight={900}
          size={"2xl"}
          bgGradient={"linear(to-r, pink.500, pink.300, blue.600)"}
          bgClip={"text"}>
          To-do App
        </Heading>
        <TodoList todos={todos} del={handleDeleteTodo} handleToggleCompleted={handleToggleCompleted}/>
        <AddTodo add={handleAddTodo}/>
      </VStack>
    </>
  )
}


