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
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Hospital } from '../../registration/hooks/useHospital';
import { HospitalEditFormSchema, HospitalEditData } from '../validations/HospitalEditFormSchema';
import { useEditHospital } from '../hooks/useEditHospital';


interface EditHospitalModalProps {
  isOpen: boolean;
  onClose: () => void;
  hospital: Hospital | null;
}

const EditHospitalModal: React.FC<EditHospitalModalProps> = ({ isOpen, onClose, hospital }) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<HospitalEditData>({
    resolver: zodResolver(HospitalEditFormSchema),
    defaultValues: {
      name: hospital?.name || '',
      address: hospital?.address || '',
      phone: hospital?.phone || '',
      email: hospital?.email || '',
    },
  });

  const { loading, profileUser } = useEditHospital();

  useEffect(() => {
    if (hospital) {
      reset({
        name: hospital.name,
        address: hospital.address,
        phone: hospital.phone,
        email: hospital.email,
      });
    }
  }, [hospital, reset]);

  const onSubmit = async (data: HospitalEditData) => {
    if (hospital) {
      const response = await profileUser(hospital.id, data);

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
            <FormControl id="name" isInvalid={!!errors.name}>
              <FormLabel>Name</FormLabel>
              <Input {...register('name')} />
              <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
            </FormControl>
            <FormControl id="address" mt={4} isInvalid={!!errors.address}>
              <FormLabel>Address</FormLabel>
              <Input {...register('address')} />
              <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
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

export default EditHospitalModal;
