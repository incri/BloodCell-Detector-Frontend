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
  InputGroup,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PatientData } from '../hooks/usePatients';
import { patientsRegistrationFormSchema } from '../validations/PatientRegistrationFormSchema';
import { useEditPatient } from '../hooks/useEditPatient';


interface EditPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: PatientData | null;
}

const EditPatientModal: React.FC<EditPatientModalProps> = ({ isOpen, onClose, patient }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<PatientData>({
    resolver: zodResolver(patientsRegistrationFormSchema),
    defaultValues: {
      first_name: patient?.first_name || '',
      last_name: patient?.last_name || '',
      phone: patient?.phone || '',
      email: patient?.email || '',
      birth_date: patient?.birth_date || '',

    },
  });

  const { loading, profilePatient } = useEditPatient();

  useEffect(() => {
    if (patient) {
      reset({
      first_name: patient?.first_name ,
      last_name: patient?.last_name ,
      phone: patient?.phone ,
      email: patient?.email ,
      birth_date: patient?.birth_date ,
      });
    }
  }, [patient, reset]);

  const onSubmit = async (data: PatientData) => {
    if (patient) {
      const response = await profilePatient(patient.id, data);

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
        <ModalHeader>Edit Hospital</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl id="first_name" isInvalid={!!errors.first_name}>
              <FormLabel>First Name</FormLabel>
              <Input {...register('first_name')} />
              <FormErrorMessage>{errors.first_name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="last_name" mt={4} isInvalid={!!errors.last_name}>
              <FormLabel>Last Name</FormLabel>
              <Input {...register('last_name')} />
              <FormErrorMessage>{errors.last_name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="phone" mt={4} isInvalid={!!errors.phone}>
              <FormLabel>Phone</FormLabel>
              <Input {...register('phone')} />
              <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="email" mt={4} isInvalid={!!errors.email}>
              <FormLabel>Email</FormLabel>
              <Input {...register('email')} />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="birth_date">
            <FormLabel mb={1}>Birth Date</FormLabel>
            <InputGroup>
              <Input
                type= "date"
                placeholder="Enter your DOB"
                {...register("birth_date")}
              />
            </InputGroup>
            {errors.birth_date && (
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            )}
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

export default EditPatientModal;
