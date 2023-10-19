import {JSX} from "react";
import {
  Badge,
  HStack,
  IconButton,
  Spacer,
  StackDivider,
  Switch,
  Text,
  useColorMode,
  VStack
} from "@chakra-ui/react";
import {FaEdit, FaTrash} from "react-icons/fa";
import {ITodos} from "../App.tsx";
import {BsCheckLg} from "react-icons/bs";
import {AnimatePresence, motion} from "framer-motion";
import {IoMdClose} from "react-icons/io";

export default function TodoList({todos, del, handleToggleCompleted}: {
  todos: ITodos[];
  del: (id: number) => void;
  handleToggleCompleted: (id: number) => void;
}): JSX.Element {
  const {colorMode} = useColorMode();
  const truncate = (str: string, len: number): string => {
    return str.length > len ? str.substring(0, len) + "..." : str;
  }
  if (!todos.length) {
    return (
      <Badge
        px={20}
        py={4}
        borderRadius={"md"}
        colorScheme={"red"}
        size={"md"}
        fontSize={"16px"}
        textTransform={"capitalize"}>
        no todos available!
      </Badge>
    )
  }
  return (
    <>
      <VStack
        divider={<StackDivider/>}
        borderColor={colorMode === "light" ? "gray.100" : "gray.700"}
        borderWidth={"2px"}
        px={4} py={3}
        borderRadius={"lg"}
        w={["100%", 550, 700]}
        alignItems={"stretch"}>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{x: `${todos.length % 2 === 0 ? -40 : 40}`}}
            animate={{x: 0}}
            transition={{duration: 0.3, type: "tween"}}>
            <HStack key={todo.id} opacity={todo.completed ? "0.85" : ""}>
              <HStack gap={2}>
                <HStack gap={1}>
                  <Switch
                    isChecked={todo.completed}
                    onChange={() => handleToggleCompleted(todo.id)}
                    colorScheme={"pink"}
                    size={"md"}/>
                  <AnimatePresence>
                    {todo.completed ? <motion.div
                      initial={{scale: 0}}
                      animate={{scale: 1}}
                      transition={{duration: 0.1, type: "spring", stiffness: 350}}
                      exit={{scale: 0}}>
                      <BsCheckLg size={22} color={"#47a759"}/>
                    </motion.div> : <motion.div
                      initial={{scale: 0}}
                      animate={{scale: 1}}
                      transition={{duration: 0.1, type: "spring", stiffness: 350}}
                      exit={{scale: 0}}>
                      <IoMdClose size={22} color={"#b14848"}/>
                    </motion.div>}
                  </AnimatePresence>
                </HStack>
                <Text
                  fontSize={"lg"}
                  wordBreak={"break-word"}
                  whiteSpace={"pre-wrap"}
                  color={colorMode === "dark" ? "gray.400" : "gray.600"}>
                  {truncate(todo.todo, 100)}
                </Text>
              </HStack>
              <Spacer/>
              <HStack>
                <motion.div
                  initial={{scale: 1}}
                  whileTap={{scale: 0.9}}
                  transition={{duration: 0.1, type: "spring", stiffness: 250}}>
                  <IconButton
                    aria-label={""}
                    icon={<FaEdit/>}
                    isRound={true}
                    size={"sm"}
                    bg={"purple.400"}
                    color={"gray.100"}
                    _hover={{bg: "purple.500"}}
                    onClick={() => {}}/>
                </motion.div>
                <motion.div
                  initial={{scale: 1}}
                  whileTap={{scale: 0.9}}
                  transition={{duration: 0.1, type: "spring", stiffness: 250}}>
                  <IconButton
                    aria-label={""}
                    icon={<FaTrash/>}
                    isRound={true}
                    size={"sm"}
                    bg={"red.400"}
                    color={"gray.100"}
                    _hover={{bg: "red.500"}}
                    onClick={() => del(todo.id)}/>
                </motion.div>
              </HStack>
            </HStack>
            <Text
              fontSize={11}
              bgGradient={"linear(to-r, pink.500, pink.300, blue.600)"}
              bgClip={"text"}>
              {todo.date}
            </Text>
          </motion.div>
        ))}
      </VStack>
    </>
  );
}
