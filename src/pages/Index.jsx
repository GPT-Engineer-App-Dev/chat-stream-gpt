import { Box, Flex, Input, Button, VStack, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { create } from "lib/openai";

const Index = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;
    const newMessage = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInput("");

    const response = await create({
      messages: [{ role: "system", content: "Start chat" }, newMessage],
      model: "gpt-3.5-turbo",
      stream: true,
    });

    if (response.data) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "ai", content: response.data.choices[0].message.content },
      ]);
    }
  };

  return (
    <Flex direction="column" align="center" justify="center" height="100vh">
      <VStack spacing={4} width="100%" maxW="md" p={5}>
        <Text fontSize="2xl" fontWeight="bold">Chat with AI</Text>
        <Flex direction="column" width="100%">
          {messages.map((msg, index) => (
            <Box key={index} bg={msg.role === "user" ? "blue.100" : "green.100"} p={3} borderRadius="lg">
              {msg.content}
            </Box>
          ))}
        </Flex>
        <Input
          placeholder="Type your message here..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <Button colorScheme="blue" onClick={sendMessage}>Send</Button>
      </VStack>
    </Flex>
  );
};

export default Index;