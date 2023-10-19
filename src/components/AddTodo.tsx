import {FormEvent, JSX, useState} from "react";
import {Button, FormControl, FormHelperText, HStack, Input, useColorMode, useToast} from "@chakra-ui/react";
import {ITodos} from "../App.tsx";
import {BiSolidError} from "react-icons/bi";
import { motion } from "framer-motion";
export default function AddTodo({add}: {
  add: (todo: ITodos) => void;
}): JSX.Element {
  const [inputValue, setInputValue] = useState<string>("");
  const toast = useToast();
  const {colorMode} = useColorMode();
  function addTodo(e: FormEvent): void {
    e.preventDefault();
    if(!inputValue) {
      toast({
        description: "please fill input!",
        status: "error",
        variant: "left-accent",
        position: "bottom",
        icon: <BiSolidError size={30}/>,
        duration: 2000,
        isClosable: true
      });
      return;
    }
    if((inputValue.charAt(0).indexOf(" ") !== -1)) {
      toast({
        description: "white space detected!",
        status: "warning",
        variant: "left-accent",
        position: "bottom",
        icon: <BiSolidError size={30}/>,
        duration: 2000,
        isClosable: true
      });
      return;
    }
    const date: Date = new Date();
    const year: string = date.getFullYear().toString();
    let day: string = date.getDay().toString();
    let hours: string = date.getHours().toString();
    let minutes: string = date.getMinutes().toString();
    day = Number(day) < 10 ? day.padStart(2, "0") : day;
    hours = Number(hours) < 10 ? hours.padStart(2, "0") : hours;
    minutes = Number(minutes) < 10 ? minutes.padStart(2, "0") : minutes;
    const todo = {
      id: Math.random(),
      todo: inputValue,
      completed: false,
      date: year + "/" + day + "/" + hours + ":" + minutes
    }
    add(todo);
    setInputValue("");
  }
  return (
    <>
      <motion.form
        onSubmit={addTodo}
        initial={{y: 50}}
        animate={{y: 0}}
        transition={{duration: 0.3, type: "tween"}}>
        <HStack h={45} w={["100%", 550, 700]} mt={4}>
          <FormControl h={"100%"}>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoComplete={"off"}
              variant={"filled"}
              placeholder={"enter todo text.."}
              h={"100%"} w={"100%"}
              color={"gray.500"}
              _placeholder={{color: "inherit"}}
              maxLength={100}
              border={"none"}
              outline={"none"}
              _focus={{
                bg: `${colorMode === "light" ? "gray.100" : "gray.700"}`,
                border: "none", outline: "none"
              }}/>
            <FormHelperText
              color={"yellow.500"}
              fontSize={[10, 13]}>
              maximum 100 characters.
            </FormHelperText>
          </FormControl>
          <motion.div
            initial={{scale: 1}}
            whileTap={{scale: 0.9}}
            transition={{duration: 0.1, type: "spring", stiffness: 250}}
            style={{height: "100%"}}>
            <Button
              bg={"pink.400"}
              _hover={{bg: "pink.500"}}
              color={colorMode === "light" ? "gray.600" : "gray.200"}
              px={8}
              h={"100%"}
              type={"submit"}>
              add to-do
            </Button>
          </motion.div>
        </HStack>
      </motion.form>
    </>
  );
}
