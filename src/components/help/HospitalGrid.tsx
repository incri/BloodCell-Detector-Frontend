
// import { SimpleGrid, Text } from '@chakra-ui/react';
// import useHospital from '../hooks/useHospital';
// import HospitalCard from './HospitalCard';
// import HospitalCardSkeleton from './HospitalCardSkeleton';
// import HospitalCardContainer from './HospitalCardContainer';




// const HospitalGrid = () => {

//    const{data, error, isLoading}=useHospital()

//    const skeletons = [1,2,3,4,5,6]

//   return (

//     <>
//     {error && <Text>{error}</Text>}

//     <SimpleGrid columns={{sm:1, md:2, lg:3, xl:5}} spacing={10} padding="10px">
//       {isLoading && skeletons.map(skeleton => 
//       <HospitalCardContainer>
//         <HospitalCardSkeleton key={skeleton}/>
//       </HospitalCardContainer>
//         )}
//       {data.map((hospital) => (
//         <HospitalCardContainer>
//           <HospitalCard key={hospital.id} hospital={hospital} />
//         </HospitalCardContainer>
//         ))}
//     </SimpleGrid>
    
//     </>

    
    
//   )
// }

// export default HospitalGrid