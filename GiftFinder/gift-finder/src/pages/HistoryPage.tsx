import React, { useState } from 'react';
import {
  Box,
  Container,
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
  Button,
  HStack,
  Tag,
  TagLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { ChevronDownIcon, DeleteIcon } from '@chakra-ui/icons';
import { FaArchive, FaEye } from 'react-icons/fa';
import { useGift } from '../contexts/GiftContext';
import { useAuth } from '../contexts/AuthContext';
import { HistoryItem } from '../types';
import { Link as RouterLink } from 'react-router-dom';

const HistoryPage: React.FC = () => {
  const { searchHistory, archiveHistoryItem, deleteHistoryItem } = useGift();
  const { currentUser } = useAuth();
  const [viewType, setViewType] = useState<'all' | 'active' | 'archived'>('all');
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const filteredHistory = searchHistory.filter((item) => {
    if (viewType === 'all') return true;
    if (viewType === 'active') return !item.archived;
    if (viewType === 'archived') return item.archived;
    return true;
  });

  const getRelationshipColor = (relationship: string) => {
    switch (relationship) {
      case 'Friend':
        return 'blue';
      case 'Partner':
        return 'red';
      case 'Family':
        return 'green';
      case 'Coworker':
        return 'orange';
      default:
        return 'gray';
    }
  };

  return (
    <Box bg={bgColor} minH="calc(100vh - 60px)">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Gift Search History
          </Heading>
          
          <Text textAlign="center" fontSize="lg">
            {currentUser 
              ? 'View and manage your past gift searches.' 
              : 'Your gift search history is stored locally on this device.'}
          </Text>
          
          <Tabs variant="soft-rounded" colorScheme="purple" isFitted>
            <TabList mb="1em">
              <Tab onClick={() => setViewType('all')}>All</Tab>
              <Tab onClick={() => setViewType('active')}>Active</Tab>
              <Tab onClick={() => setViewType('archived')}>Archived</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <HistoryList 
                  historyItems={filteredHistory} 
                  onArchive={archiveHistoryItem} 
                  onDelete={deleteHistoryItem} 
                  formatDate={formatDate}
                  getRelationshipColor={getRelationshipColor}
                  cardBg={cardBg}
                  borderColor={borderColor}
                />
              </TabPanel>
              <TabPanel>
                <HistoryList 
                  historyItems={filteredHistory} 
                  onArchive={archiveHistoryItem} 
                  onDelete={deleteHistoryItem} 
                  formatDate={formatDate}
                  getRelationshipColor={getRelationshipColor}
                  cardBg={cardBg}
                  borderColor={borderColor}
                />
              </TabPanel>
              <TabPanel>
                <HistoryList 
                  historyItems={filteredHistory} 
                  onArchive={archiveHistoryItem} 
                  onDelete={deleteHistoryItem} 
                  formatDate={formatDate}
                  getRelationshipColor={getRelationshipColor}
                  cardBg={cardBg}
                  borderColor={borderColor}
                />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};

interface HistoryListProps {
  historyItems: HistoryItem[];
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
  formatDate: (date: Date) => string;
  getRelationshipColor: (relationship: string) => string;
  cardBg: string;
  borderColor: string;
}

const HistoryList: React.FC<HistoryListProps> = ({
  historyItems,
  onArchive,
  onDelete,
  formatDate,
  getRelationshipColor,
  cardBg,
  borderColor,
}) => {
  if (historyItems.length === 0) {
    return (
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
        <Text mt={4} mb={1} fontSize="lg">
          No history found
        </Text>
        <Text maxWidth="md">
          You haven't searched for any gifts yet. Start finding gifts to build your history.
        </Text>
        <Button
          as={RouterLink}
          to="/gifts"
          colorScheme="purple"
          mt={4}
        >
          Find Gifts
        </Button>
      </Alert>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {historyItems.map((item) => (
        <Card
          key={item.id}
          bg={cardBg}
          borderRadius="xl"
          overflow="hidden"
          boxShadow="md"
          borderWidth="1px"
          borderColor={borderColor}
          opacity={item.archived ? 0.7 : 1}
        >
          <CardHeader>
            <Flex justify="space-between" align="center">
              <Heading size="md">
                {item.profile.occasion || 'Gift Search'}
                {item.archived && (
                  <Badge ml={2} colorScheme="gray">
                    Archived
                  </Badge>
                )}
              </Heading>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<ChevronDownIcon />}
                  variant="ghost"
                  size="sm"
                />
                <MenuList>
                  <MenuItem
                    icon={<FaEye />}
                    as={RouterLink}
                    to={`/gifts?id=${item.id}`}
                  >
                    View Results
                  </MenuItem>
                  {!item.archived && (
                    <MenuItem
                      icon={<FaArchive />}
                      onClick={() => onArchive(item.id)}
                    >
                      Archive
                    </MenuItem>
                  )}
                  <MenuItem
                    icon={<DeleteIcon />}
                    onClick={() => onDelete(item.id)}
                    color="red.500"
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
            <Text fontSize="sm" color="gray.500" mt={1}>
              {formatDate(item.timestamp)}
            </Text>
          </CardHeader>

          <Divider />

          <CardBody>
            <VStack align="flex-start" spacing={3}>
              <HStack>
                <Text fontWeight="bold" minWidth="80px">For:</Text>
                <Tag colorScheme={getRelationshipColor(item.profile.relationship)}>
                  <TagLabel>{item.profile.relationship}</TagLabel>
                </Tag>
                <Tag colorScheme={item.profile.gender === 'Male' ? 'blue' : 'pink'}>
                  <TagLabel>{item.profile.gender}</TagLabel>
                </Tag>
              </HStack>

              <HStack>
                <Text fontWeight="bold" minWidth="80px">Age:</Text>
                <Text>{item.profile.ageRange}</Text>
              </HStack>

              <Box>
                <Text fontWeight="bold" mb={1}>Interests:</Text>
                <Flex wrap="wrap" gap={2}>
                  {item.profile.interests.slice(0, 5).map((interest, index) => (
                    <Tag key={index} size="sm" colorScheme="purple" borderRadius="full">
                      {interest}
                    </Tag>
                  ))}
                  {item.profile.interests.length > 5 && (
                    <Tag size="sm" colorScheme="gray" borderRadius="full">
                      +{item.profile.interests.length - 5} more
                    </Tag>
                  )}
                </Flex>
              </Box>
            </VStack>
          </CardBody>

          <Divider />

          <CardFooter>
            <Button
              as={RouterLink}
              to={`/gifts?id=${item.id}`}
              colorScheme="purple"
              leftIcon={<FaEye />}
              width="full"
            >
              View Results
            </Button>
          </CardFooter>
        </Card>
      ))}
    </SimpleGrid>
  );
};

export default HistoryPage;
