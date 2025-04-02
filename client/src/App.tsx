import { useState } from "react";
import { Message } from "./models/message.ts";
import ChatInput from "../src/components/ChatInput";
import ChatMessage from "../src/components/ChatMessage";
import {Box, Flex, Heading} from "@chakra-ui/react";

function formatChatGPTDateTime(): string {
    const now = new Date();

    return new Intl.DateTimeFormat("en-US", {
        weekday: "short", // Mon, Tue, etc.
        month: "short", // Jan, Feb, etc.
        day: "numeric", // 1, 2, 3, etc.
        hour: "2-digit", // 08, 09, etc.
        minute: "2-digit", // 30, 45, etc.
        hour12: true, // AM/PM format
    }).format(now);
}

function App() {
    const apiUrl = import.meta.env.VITE_API_URL;
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome-message",
            content: `# 👋 Welcome! 
I am an AI chatbot powered by a Java Spring Boot and Spring AI backend. The AI is running with Ollama, using the Deepseek-R1 model. Ask me anything about the latest technology trends, and I'll do my best to assist you!`,
            role: "ai",
            loading: false,
            timestamp: formatChatGPTDateTime(),
            error: "",
        },
    ]);
    const [newMessage, setNewMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!newMessage.trim()) return;
        setIsLoading(true);

        const userMessage: Message = {
            id: `${Date.now()}-${Math.random()}`,
            content: newMessage,
            role: "user", // Ensure this is typed as "user"
            loading: false,
            timestamp: formatChatGPTDateTime(),
            error: "",
        };

        const aiMessage: Message = {
            id: `${Date.now()}-${Math.random()}`,
            content: "",
            role: "ai", // Ensure this is typed as "ai"
            loading: true,
            timestamp: formatChatGPTDateTime(),
            error: "",
        };

        setMessages((prevMessages) => [
            ...prevMessages,
            userMessage,
            aiMessage,
        ]);

        setNewMessage(""); // Clear the input

        try {
            const response = await fetch(`${apiUrl}/stream/${newMessage}`);

            if (response.ok && response.body != null) {
                const reader = response.body.getReader();
                let receivedText = "";

                while (true) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    receivedText += new TextDecoder().decode(value);

                    // Update the AI message with the received text
                    setMessages((prevMessages) =>
                        prevMessages.map((msg) =>
                            msg.id === aiMessage.id
                                ? { ...msg, content: receivedText, loading: false }
                                : msg
                        )
                    );
                }
            }
        } catch (error) {
            console.error(error);
            setMessages((prevMessages) => [
                ...prevMessages,
                {
                    id: Date.now().toString(),
                    content: "",
                    role: "ai", // Make sure this is typed as "ai"
                    loading: false,
                    timestamp: formatChatGPTDateTime(),
                    error: `Error processing request. Details: ${error}`,
                },
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex direction="column" minHeight="100vh" maxWidth="6xl" mx="auto" px={4}>
            <Box as="header" position="sticky" top={0} zIndex={20} bg="themeColor" py={4} mb={4}>
                <Heading as="h1" fontSize="1.65rem" textAlign="center" fontWeight="semibold">
                    AI Chatbot
                </Heading>
            </Box>

            <Box flex="1" overflowY="auto">
                <ChatMessage messages={messages} />
            </Box>

            <Box as="footer" mt={4}>
                <ChatInput
                    isLoading={isLoading}
                    sendMessage={sendMessage}
                    newMessage={newMessage}
                    setNewMessage={setNewMessage}
                />
            </Box>
        </Flex>
    );
}

export default App;