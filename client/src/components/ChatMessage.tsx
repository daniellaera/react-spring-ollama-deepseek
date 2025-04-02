import React, { useEffect, useRef } from "react";
import CustomMarkdown from "../components/Markdown";
import { Message } from "@/models/message.ts";
import { Box, Text, Spinner as ChakraSpinner } from "@chakra-ui/react";
import {CustomAvatar, AvatarError, PersonalAvatar} from "@/components/CustomAvatar.tsx";

interface ChatMessageProps {
    messages: Message[];
}

const ChatMessage: React.FC<ChatMessageProps> = ({ messages }) => {
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    return (
        <Box flex="1" overflowY="auto" px={4} py={4} my={4}>
            {messages.length === 0 && (
                <Box mt={3} fontFamily="Urbanist" color="primaryBlue" fontSize="xl" fontWeight="light">
                    <Text>👋 Welcome!</Text>
                    <Text>
                        I am an AI chatbot powered by a Java Spring Boot and Spring AI backend. The AI is running with Ollama,
                        using the Deepseek-R1 model. Ask me anything about the latest technology trends, and I'll do my best to
                        assist you!
                    </Text>
                    <Text>Ask me anything about the latest technology trends.</Text>
                </Box>
            )}

            <Box flex="1" overflowY="auto" px={4} py={4} my={4}>
                {messages.map(({ id, role, content, loading, timestamp, error }) => (
                    <Box
                        key={id}
                        display="flex"
                        alignItems="start"
                        gap={4}
                        py={4}
                        px={3}
                        borderRadius="xl"
                        bg={role === "user" ? "primaryBlue.10" : undefined}
                    >
                        {role === "user" ? (
                            <PersonalAvatar />
                        ) : (
                            <CustomAvatar  />
                        )}

                        <Box>
                            <Box className="markdown-container">
                                {loading && !content ? (
                                    <ChakraSpinner size="md" />
                                ) : role === "ai" && content ? (
                                    <CustomMarkdown content={content} /> // Use CustomMarkdown with content
                                ) : role === "user" && content ? (
                                    <Text whiteSpace="pre-line">{content}</Text> // Render user content normally
                                ) : role === "ai" && !content ? (
                                    <Text>No response from AI.</Text> // Fallback when AI content is empty
                                ) : (
                                    <Text>No content available.</Text> // Fallback for other empty cases
                                )}
                            </Box>

                            {error && (
                                <Box display="flex" alignItems="center" gap={1} fontSize="sm" color="errorRed" mt={2}>
                                    <AvatarError />
                                    <Text>Error generating the response</Text>
                                </Box>
                            )}

                            <Text color="gray.500" fontSize="sm">
                                {timestamp}
                            </Text>
                        </Box>
                    </Box>
                ))}
            </Box>

            <Box ref={messagesEndRef} />
        </Box>
    );
};

export default ChatMessage;
