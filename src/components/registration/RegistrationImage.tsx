import {
  Image,
} from '@chakra-ui/react';

import image from '../../assets/logo-no-background.png'


const RegistrationImage = () => {
  return (
        <Image
          padding={40}
          src={image}
          alt="Registration Image"
          objectFit="cover"
          height="100%"
          width="100%"
        />
  );
};

export default RegistrationImage;
