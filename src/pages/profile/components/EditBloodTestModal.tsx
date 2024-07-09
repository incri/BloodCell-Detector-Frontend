import React, { useEffect } from 'react';
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
import { BloodTest } from '../hooks/usePatients';
import { bloodTestAddFormSchema } from '../validations/BloodTestAddSchema';
import { useEditBloodTest } from '../hooks/useEditBloodTest';

interface EditBloodTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient_id: string;
  blood_test: BloodTest | null;

}

const EditBloodTestModal: React.FC<EditBloodTestModalProps> = ({ isOpen, onClose, patient_id, blood_test }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<BloodTest>({
    resolver: zodResolver(bloodTestAddFormSchema),
    defaultValues: {
        title: blood_test?.title || '',
        description: blood_test?.description || '',

      },
  });

  const { loading, profileEditBloodTest } = useEditBloodTest();

  useEffect(() => {
    if (patient_id) {
      reset({
        title: blood_test?.title || '',
        description: blood_test?.description || '',
      });
    }
  }, [blood_test, reset]);

  const onSubmit = async (data: BloodTest) => {
    if (patient_id && blood_test) {
      const response = await profileEditBloodTest(patient_id, blood_test.id,  data);

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
        <ModalHeader>Edit Blood Test</ModalHeader>
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
              <Input {...register('patient')} value={patient_id} readOnly />
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

export default EditBloodTestModal;
