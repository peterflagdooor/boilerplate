import React from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  useColorModeValue,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Badge,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Spinner,
  Center,
} from '@chakra-ui/react';
import { FaCalendarPlus, FaCalendarAlt } from 'react-icons/fa';
import { useCalendar } from '../contexts/CalendarContext';
import { useAuth } from '../contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const CalendarPage: React.FC = () => {
  const { isConnected, isLoading, birthdays, connectGoogleCalendar, refreshBirthdays } = useCalendar();
  const { currentUser } = useAuth();
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  // Redirect if user is not logged in
  if (!currentUser) {
    return <Navigate to="/login" />;
  }
  
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };
  
  const isUpcoming = (date: Date) => {
    const today = new Date();
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    
    return date > today && date <= oneMonthFromNow;
  };
  
  return (
    <Box bg={bgColor} minH="calc(100vh - 60px)">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Birthday Calendar
          </Heading>
          
          <Text textAlign="center" fontSize="lg">
            Connect your Google Calendar to sync birthday events and receive notifications.
          </Text>
          
          {!isConnected ? (
            <Box
              p={8}
              bg={cardBg}
              borderRadius="xl"
              borderWidth="1px"
              borderColor={borderColor}
              boxShadow="md"
              maxW="600px"
              mx="auto"
            >
              <VStack spacing={6}>
                <Box fontSize="6xl" color="brand.500">
                  <FaCalendarPlus />
                </Box>
                
                <Heading size="md" textAlign="center">
                  Connect Google Calendar
                </Heading>
                
                <Text textAlign="center">
                  Connect your Google Calendar to sync birthday events and receive
                  notifications one month before important dates.
                </Text>
                
                <Button
                  colorScheme="purple"
                  size="lg"
                  leftIcon={<FaCalendarPlus />}
                  onClick={connectGoogleCalendar}
                  isLoading={isLoading}
                  loadingText="Connecting..."
                >
                  Connect Calendar
                </Button>
              </VStack>
            </Box>
          ) : (
            <Box>
              <Flex 
                justify="space-between" 
                align="center" 
                mb={6}
                direction={{ base: 'column', md: 'row' }}
                gap={4}
              >
                <Heading as="h2" size="lg">
                  Upcoming Birthdays
                </Heading>
                
                <Button
                  colorScheme="purple"
                  leftIcon={<FaCalendarAlt />}
                  onClick={refreshBirthdays}
                  isLoading={isLoading}
                  loadingText="Refreshing..."
                >
                  Refresh Birthdays
                </Button>
              </Flex>
              
              {isLoading && birthdays.length === 0 ? (
                <Center py={10}>
                  <Spinner
                    thickness="4px"
                    speed="0.65s"
                    emptyColor="gray.200"
                    color="brand.500"
                    size="xl"
                  />
                </Center>
              ) : birthdays.length === 0 ? (
                <Alert
                  status="info"
                  variant="subtle"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                  borderRadius="lg"
                  p={6}
                >
                  <AlertIcon boxSize="40px" mr={0} />
                  <AlertTitle mt={4} mb={1} fontSize="lg">
                    No Birthdays Found
                  </AlertTitle>
                  <AlertDescription maxWidth="md">
                    We couldn't find any birthday events in your Google Calendar.
                    Make sure you have birthday events added to your calendar and refresh.
                  </AlertDescription>
                </Alert>
              ) : (
                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                  {birthdays.map((birthday) => (
                    <Card 
                      key={birthday.id} 
                      bg={cardBg} 
                      borderRadius="xl" 
                      overflow="hidden"
                      boxShadow="md"
                      borderWidth="1px"
                      borderColor={borderColor}
                    >
                      <CardHeader>
                        <Heading size="md">{birthday.contactName}</Heading>
                        {isUpcoming(birthday.date) && (
                          <Badge colorScheme="red" mt={2}>
                            Upcoming
                          </Badge>
                        )}
                      </CardHeader>
                      
                      <Divider />
                      
                      <CardBody>
                        <Flex align="center" gap={2}>
                          <Box color="brand.500">
                            <FaCalendarAlt />
                          </Box>
                          <Text>{formatDate(birthday.date)}</Text>
                        </Flex>
                      </CardBody>
                      
                      <Divider />
                      
                      <CardFooter>
                        <Button
                          as="a"
                          href="/gifts"
                          colorScheme="purple"
                          size="sm"
                          width="full"
                        >
                          Find a Gift
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </SimpleGrid>
              )}
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
};

export default CalendarPage;
