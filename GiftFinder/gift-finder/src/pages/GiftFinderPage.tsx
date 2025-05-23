import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Heading, 
  Text, 
  VStack, 
  useColorModeValue, 
  Tabs, 
  TabList, 
  TabPanels, 
  Tab, 
  TabPanel,
  Divider
} from '@chakra-ui/react';
import DemographicForm from '../components/gift-finder/DemographicForm';
import ProductGrid from '../components/products/ProductGrid';
import { useGift } from '../contexts/GiftContext';
import { DemographicProfile } from '../types';

const GiftFinderPage: React.FC = () => {
  const { isSearching, searchResults, searchGifts, loadMoreGifts } = useGift();
  const [showResults, setShowResults] = useState(false);

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleSubmit = (profile: DemographicProfile) => {
    searchGifts(profile);
    setShowResults(true);
  };

  return (
    <Box bg={bgColor} minH="calc(100vh - 60px)">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={8} align="stretch">
          <Heading as="h1" size="xl" textAlign="center">
            Find the Perfect Gift
          </Heading>
          
          <Text textAlign="center" fontSize="lg" mb={8}>
            Answer a few questions about the recipient, and our AI will suggest personalized gift ideas.
          </Text>
          
          <Tabs 
            variant="soft-rounded" 
            colorScheme="purple" 
            isFitted 
            index={showResults && searchResults.length > 0 ? 1 : 0}
            onChange={(index) => setShowResults(index === 1)}
          >
            <TabList mb="1em">
              <Tab>Search Criteria</Tab>
              <Tab isDisabled={searchResults.length === 0}>Gift Suggestions</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box 
                  maxW="800px" 
                  mx="auto" 
                  bg={cardBg} 
                  borderRadius="xl" 
                  overflow="hidden"
                  boxShadow="md"
                >
                  <DemographicForm onSubmit={handleSubmit} isLoading={isSearching} />
                </Box>
              </TabPanel>
              <TabPanel>
                <Box>
                  <Heading as="h2" size="lg" mb={4}>
                    Gift Suggestions
                  </Heading>
                  <Divider mb={6} />
                  <ProductGrid 
                    products={searchResults} 
                    isLoading={isSearching} 
                    onLoadMore={loadMoreGifts} 
                  />
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Container>
    </Box>
  );
};

export default GiftFinderPage;
