import {Avatar, Circle, Float, Stack} from "@chakra-ui/react"

const colorPalettes = ["red", "green", "blue", "purple", "yellow"];

export const PersonalAvatar = () => {
    return (
        <Avatar.Root>
            <Avatar.Fallback name="Daniel Laera" />
            <Avatar.Image src="https://bit.ly/sage-adebayo" />
        </Avatar.Root>
    )
}

export const CustomAvatar = () => {
    return (
        <Avatar.Root colorPalette="green" variant="subtle">
            <Avatar.Fallback name="A I" />
            <Float placement="bottom-end" offsetX="1" offsetY="1">
                <Circle
                    bg="green.500"
                    size="8px"
                    outline="0.2em solid"
                    outlineColor="bg"
                />
            </Float>
        </Avatar.Root>
    )
}

export const AvatarError = () => {
    return (
        <Stack gap="4" align="flex-start">
            {colorPalettes.map((colorPalette) => (
                <Stack key={colorPalette} align="center" direction="row" gap="10">
                    {/* Avatar with no image and just fallback */}
                    <Avatar.Root colorPalette={colorPalette}>
                        <Avatar.Fallback />
                    </Avatar.Root>
                </Stack>
            ))}
        </Stack>
    );
};

