import { Box, Flex, Image } from '@chakra-ui/react'

const ActiveUser = () => {
  return (
    <Box>
        <Flex  alignItems="center" fontWeight="500" cursor="pointer" >
            <Box position="relative" >
                <Image w="50px" h="50px" borderRadius="50%" objectFit="cover" src="https://i.pinimg.com/736x/1b/16/33/1b1633596f28baaad39243e943959506.jpg" alt="activeUser" />
                <Box position="absolute" w="10px" h="10px" borderRadius="50%" backgroundColor="limegreen" 
                top="2px" right="2px" ></Box>
            </Box>
        </Flex>
    </Box> 
  )
} 

export default ActiveUser;