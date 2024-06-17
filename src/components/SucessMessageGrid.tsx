import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";

interface SucessMessageProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  buttonText: string;
}

const SucessMessageGrid: React.FC<SucessMessageProps> = ({
  isOpen,
  onClose,
  title,
  message,
  buttonText,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg">{message}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" onClick={onClose}>
            {buttonText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SucessMessageGrid;
