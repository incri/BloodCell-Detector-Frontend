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
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HospitalData, HospitalFormSchema } from '../validations/HospitalEditFormSchema';
import { useHospitalCreate } from '../hooks/useHospitalCreate';
import { z } from 'zod';

interface CreateHospitalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateHospitalModal: React.FC<CreateHospitalModalProps> = ({ isOpen, onClose }) => {
  const { loading, createHospital, error } = useHospitalCreate();
  const toast = useToast();
  
  const { handleSubmit, register, formState: { errors }, reset } = useForm<HospitalData>({
    resolver: zodResolver(HospitalFormSchema),
  });

  useEffect(() => {
    if (!isOpen) {
      reset(); // Reset the form when the modal is closed
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: HospitalData) => {
    try {
      await createHospital(data);
      onClose();
      toast({
        title: 'Hospital Created',
        description: 'The hospital has been successfully created.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Handle Zod validation errors if needed
      } else {
        console.error('Error:', error);
        toast({
          title: 'An error occurred.',
          description: 'Unable to create hospital. Please try again later.',
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch">
              <FormControl id="name" isInvalid={!!errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Hospital Name"
                  {...register('name')}
                />
                {errors.name && (
                  <Text color="red.500">{errors.name.message}</Text>
                )}
              </FormControl>

              <FormControl id="address" isInvalid={!!errors.address}>
                <FormLabel>Address</FormLabel>
                <Input
                  placeholder="Hospital Address"
                  {...register('address')}
                />
                {errors.address && (
                  <Text color="red.500">{errors.address.message}</Text>
                )}
              </FormControl>

              <FormControl id="phone" isInvalid={!!errors.phone}>
                <FormLabel>Phone</FormLabel>
                <Input
                  placeholder="Hospital Phone"
                  {...register('phone')}
                />
                {errors.phone && (
                  <Text color="red.500">{errors.phone.message}</Text>
                )}
              </FormControl>

              <FormControl id="email" isInvalid={!!errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="Hospital Email"
                  {...register('email')}
                />
                {errors.email && (
                  <Text color="red.500">{errors.email.message}</Text>
                )}
              </FormControl>
            </VStack>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit(onSubmit)}
            isLoading={loading}
            disabled={loading}
          >
            Create
          </Button>
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateHospitalModal;
