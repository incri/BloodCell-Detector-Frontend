import React from "react";
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  BoxProps,
  ButtonProps,
  ImageProps,
} from "@chakra-ui/react";

interface EmailActivationGridProps {
  title: string;
  description: React.ReactNode;
  imageSrc: string;
  onActionClick: () => void;
  actionLabel: string;
  boxProps?: BoxProps;
  buttonProps?: ButtonProps;
  imageProps?: ImageProps;
  actionDisabled: boolean;
}

const EmailActivationGrid: React.FC<EmailActivationGridProps> = ({
  title,
  description,
  imageSrc,
  onActionClick,
  actionLabel,
  boxProps,
  buttonProps,
  imageProps,
}) => (
  <Box
    display="flex"
    flexDirection="column"
    alignItems="center"
    justifyContent="center"
    minHeight="100vh"
    p={4} // Add padding for spacing
    {...boxProps}
  >
    <Image src={imageSrc} alt={title} maxW="200px" {...imageProps} />

    <Heading as="h2" size="lg" mt={4}>
      {title}
    </Heading>

    <Text mt={2} textAlign="center">
      {" "}
      {/* Set text alignment to center */}
      {description}
    </Text>

    <Button onClick={onActionClick} colorScheme="blue" mt={4} {...buttonProps}>
      {actionLabel}
    </Button>
  </Box>
);

export default EmailActivationGrid;
