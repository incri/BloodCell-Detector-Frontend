import React, { useState, useEffect } from 'react';
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
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const { loading, createHospital } = useHospitalCreate();
  const toast = useToast();

  useEffect(() => {
    if (!isOpen) {
      setName('');
      setAddress('');
      setPhone('');
      setEmail('');
      setFormErrors([]);
    }
  }, [isOpen]);

  const handleSubmit = async () => {
    try {
      HospitalFormSchema.parse({ name, address, email, phone });
      const hospitalData: HospitalData = { name, address, email, phone };
      await createHospital(hospitalData);
        onClose();
    } catch (error) {
      if (error instanceof z.ZodError) {
        setFormErrors(error.errors.map(err => err.message));
      } else {
        console.error("Error:", error);
        toast({
          title: 'An error occurred.',
          description: "Unable to create hospital. Please try again later.",
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
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
          {formErrors.length > 0 && (
            <Alert status="error" mb={4}>
              <AlertIcon />
              {formErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
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
          <Button colorScheme="blue" mr={3} onClick={handleSubmit} isLoading={loading} disabled={loading}>
            Create
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateHospitalModal;
