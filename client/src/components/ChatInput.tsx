import useAutoSize from "../hooks/useAutoSize";
import React from "react";
import {Box, IconButton, Textarea} from "@chakra-ui/react";
import {FaArrowUp} from "react-icons/fa";

interface ChatInputProps {
    isLoading: boolean;
    newMessage: string;
    setNewMessage: (message: string) => void;
    sendMessage: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
                                                 isLoading,
                                                 newMessage,
                                                 setNewMessage,
                                                 sendMessage,
                                             }) => {
    const textareaRef = useAutoSize<HTMLTextAreaElement>(newMessage);
    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (e.key === "Enter" && !e.shiftKey && !isLoading) {
            e.preventDefault();
            sendMessage();
        }
    }
    return (
        <Box position="sticky" bottom="0" bg="themetextcolor" py={4}>
            <Box
                p={1.5}
                bg="primaryBlue.35" // Replace with your custom color from theme if needed
                borderRadius="full"
                zIndex={50}
                fontFamily="mono"
                transformOrigin="bottom"
                animation="chatAnimation 400ms" // Add appropriate animation if needed
            >
                <Box
                    pr={0.5}
                    position="relative"
                    borderRadius="full"
                    overflow="hidden"
                    border="1px solid"
                    borderColor="primaryBlue" // Customize according to your theme
                    _focusWithin={{
                        ring: 2,
                        ringColor: "primaryBlue", // Customize according to your theme
                    }}
                    transition="all 0.2s"
                >
                    <Textarea
                        placeholder="Ask anything"
                        ref={textareaRef}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        size="md"
                        resize="none"
                        rows={1}
                        borderColor="primaryBlue" // Customize border color when focused
                        _placeholder={{
                            color: "primaryBlue", // Customize placeholder color
                            fontSize: "sm",
                            transform: "translateY(-1px)", // Adjust placeholder alignment
                        }}
                    />
                    <IconButton
                        aria-label="Send message"
                        position="absolute"
                        top="50%"
                        right={3}
                        transform="translateY(-50%)"
                        onClick={sendMessage}
                        borderRadius="md"
                        _hover={{ bg: "primaryBlue.20" }}
                    >
                        <FaArrowUp />
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default ChatInput;