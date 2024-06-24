// src/components/CreateHospitalModal.tsx

import React, { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  Alert,
  AlertIcon,
  useToast,
} from '@chakra-ui/react';
import { useHospitalCreate } from '../hooks/useHospitalCreate';
import { HospitalData, HospitalFormSchema } from '../validations/HospitalEditFormSchema';
import { z } from "zod";

interface CreateHospitalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateHospitalModal: React.FC<CreateHospitalModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const { loading, createHospital } = useHospitalCreate();
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      HospitalFormSchema.parse({ name, address, email, phone });
      const hospitalData: HospitalData = { name, address, email, phone };
      const result = await createHospital(hospitalData);
      if (result?.status === 201) {
        toast({
          title: 'Hospital created.',
          description: "The new hospital has been created successfully.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        onClose();
      }
    } catch (error) {
      if (error instanceof z.ZodError) { // Now TypeScript should recognize 'z'
        setFormError(error.errors[0].message);
      } else {
        console.error("Error:", error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create Hospital</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {formError && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {formError}
            </Alert>
          )}
          <FormControl mb={4}>
            <FormLabel>Hospital Name</FormLabel>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Address</FormLabel>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Phone</FormLabel>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </FormControl>
          <FormControl mb={4}>
            <FormLabel>Email</FormLabel>
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={loading}>
            Create
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateHospitalModal;
