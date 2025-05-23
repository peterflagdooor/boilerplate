import React from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Stack, 
  Flex, 
  Image, 
  useColorModeValue, 
  Icon,
  SimpleGrid
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaGift, FaCalendarAlt, FaHistory } from 'react-icons/fa';

const HomePage: React.FC = () => {
  const bgGradient = useColorModeValue(
    'linear(to-r, purple.100, purple.200)',
    'linear(to-r, purple.900, purple.800)'
  );
  
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgGradient={bgGradient}
        py={{ base: 16, md: 20 }}
        borderRadius={{ base: 'none', md: 'xl' }}
        mx={{ base: 0, md: 4 }}
        mt={{ base: 0, md: 4 }}
      >
        <Container maxW="container.xl">
          <Stack
            direction={{ base: 'column', lg: 'row' }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 10, md: 14 }}
            align="center"
          >
            <Stack flex={1} spacing={{ base: 5, md: 10 }}>
              <Heading
                lineHeight={1.1}
                fontWeight={600}
                fontSize={{ base: '3xl', sm: '4xl', lg: '6xl' }}
              >
                <Text
                  as="span"
                  position="relative"
                  color="brand.500"
                >
                  AI-Powered
                </Text>
                <br />
                <Text as="span">Gift Finder</Text>
              </Heading>
              <Text color={useColorModeValue('gray.600', 'gray.300')}>
                Find the perfect gift for anyone with our AI-powered gift recommendations. 
                Simply provide some information about the recipient, and we'll suggest 
                personalized gift ideas from Amazon and AliExpress.
              </Text>
              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={{ base: 'column', sm: 'row' }}
              >
                <Button
                  as={RouterLink}
                  to="/gifts"
                  rounded="full"
                  size="lg"
                  fontWeight="bold"
                  px={6}
                  colorScheme="purple"
                  leftIcon={<FaGift />}
                >
                  Find Gifts
                </Button>
                <Button
                  as={RouterLink}
                  to="/login"
                  rounded="full"
                  size="lg"
                  fontWeight="bold"
                  px={6}
                  colorScheme="purple"
                  variant="outline"
                >
                  Sign In
                </Button>
              </Stack>
            </Stack>
            <Flex
              flex={1}
              justify="center"
              align="center"
              position="relative"
              w="full"
            >
              <Box
                position="relative"
                height="300px"
                rounded="2xl"
                boxShadow="2xl"
                width="full"
                overflow="hidden"
              >
                <Image
                  alt="Hero Image"
                  fit="cover"
                  align="center"
                  w="100%"
                  h="100%"
                  src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                  fallbackSrc="https://via.placeholder.com/600x400?text=Gift+Finder"
                />
              </Box>
            </Flex>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <VStack spacing={10}>
          <Heading textAlign="center">How It Works</Heading>
          
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} width="full">
            {/* Feature 1 */}
            <Box
              p={8}
              bg={cardBg}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="md"
              textAlign="center"
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'lg',
              }}
            >
              <Icon as={FaGift} w={10} h={10} color="brand.500" mb={4} />
              <Heading size="md" mb={4}>
                AI Gift Suggestions
              </Heading>
              <Text>
                Our AI analyzes demographic information to provide personalized gift
                recommendations from Amazon and AliExpress.
              </Text>
            </Box>

            {/* Feature 2 */}
            <Box
              p={8}
              bg={cardBg}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="md"
              textAlign="center"
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'lg',
              }}
            >
              <Icon as={FaCalendarAlt} w={10} h={10} color="brand.500" mb={4} />
              <Heading size="md" mb={4}>
                Birthday Calendar
              </Heading>
              <Text>
                Connect your Google Calendar to sync birthday events and receive
                notifications one month before the big day.
              </Text>
            </Box>

            {/* Feature 3 */}
            <Box
              p={8}
              bg={cardBg}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="md"
              textAlign="center"
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{
                transform: 'translateY(-5px)',
                boxShadow: 'lg',
              }}
            >
              <Icon as={FaHistory} w={10} h={10} color="brand.500" mb={4} />
              <Heading size="md" mb={4}>
                Gift History
              </Heading>
              <Text>
                Keep track of your gift searches and results, making it easy to
                reference your past gift ideas and preferences.
              </Text>
            </Box>
          </SimpleGrid>

          <Button
            as={RouterLink}
            to="/gifts"
            size="lg"
            colorScheme="purple"
            mt={8}
            rounded="full"
            px={8}
          >
            Start Finding Gifts
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default HomePage;
