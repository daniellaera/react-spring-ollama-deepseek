import React from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import {Box} from "@chakra-ui/react";

interface MessageProps {
    content: string;
}

const CustomMarkdown: React.FC<MessageProps> = ({ content }) => {
    if (!content) {
        return <div>No content available.</div>; // Handle the case where content is empty
    }

    // Replace <think>...</think> with a styled version using <span>
    const processedContent = content.replace(
        /<think>(.*?)<\/think>/gs,
        `<span style="color: gray; font-style: italic;">🤔 $1</span>`
    );

    return (
        <Box>
            <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {processedContent}
            </ReactMarkdown>
        </Box>
    )
};

export default CustomMarkdown;
