import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BloodTest, PatientData } from '../hooks/usePatients';
import { bloodTestAddFormSchema } from '../validations/BloodTestAddSchema';
import { useAddBloodTest } from '../hooks/useAddBloodTest';

interface AddBloodTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientData | null;
}

const AddBloodTestModal: React.FC<AddBloodTestModalProps> = ({ isOpen, onClose, patient }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<BloodTest>({
    resolver: zodResolver(bloodTestAddFormSchema),
  });

  const { loading, profileBloodTest } = useAddBloodTest();

  const onSubmit = async (data: BloodTest) => {
    if (patient) {
      const response = await profileBloodTest(patient.id, data);

      if (!response?.error) {
        onClose();
      } else {
        console.error(response.error);
      }
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Blood Test</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="title" isInvalid={!!errors.title}>
              <FormLabel>Title</FormLabel>
              <Input {...register('title')} />
              <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="description" mt={4} isInvalid={!!errors.description}>
              <FormLabel>Description</FormLabel>
              <Textarea {...register('description')} />
              <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="patient" mt={4} isInvalid={!!errors.patient} hidden>
              <FormLabel>Patient</FormLabel>
              <Input {...register('patient')} value={patient?.id} readOnly />
              <FormErrorMessage>{errors.patient?.message}</FormErrorMessage>
            </FormControl>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} type="submit" isLoading={loading}>
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default AddBloodTestModal;
