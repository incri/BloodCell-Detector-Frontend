// src/MenuButton.tsx
import React from 'react';
import { Button, ButtonProps, HStack, Text, Icon } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { Link } from 'react-router-dom'; 


interface MenuButtonProps extends ButtonProps {
  icon: IconType;
  text: string;
  to: string;
}


const MenuButton: React.FC<MenuButtonProps> = ({ icon: IconComponent, text, to, ...props }) => {
 
  return (
    <Link to={to} style={{  width: '100%' }}>

    <Button
      w="100%"
      bg="transparent"
      justifyContent="flex-start"
      textAlign="left"
      fontWeight="semilight"
      fontSize="sm"
      {...props}
    >
      <HStack spacing={4}>
        <Icon as={IconComponent} boxSize={'1.3em'} />
        <Text>{text}</Text>
      </HStack>
    </Button>
    </Link>
  );
};

export default MenuButton;
