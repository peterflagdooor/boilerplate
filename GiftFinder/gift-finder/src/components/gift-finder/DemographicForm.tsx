import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  useColorModeValue,
  VStack,
  HStack,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { DemographicProfile } from '../../types';

interface DemographicFormProps {
  onSubmit: (profile: DemographicProfile) => void;
  isLoading: boolean;
}

const interestOptions = [
  'Art', 'Books', 'Cooking', 'Fashion', 'Fitness', 'Gaming', 'Gardening',
  'Movies', 'Music', 'Outdoors', 'Photography', 'Sports', 'Technology', 'Travel'
];

const DemographicForm: React.FC<DemographicFormProps> = ({ onSubmit, isLoading }) => {
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [relationship, setRelationship] = useState<'Friend' | 'Partner' | 'Family' | 'Coworker' | 'Other'>('Friend');
  const [ageRange, setAgeRange] = useState<'Child' | 'Teen' | 'Young Adult' | 'Adult' | 'Senior'>('Adult');
  const [interests, setInterests] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState(20);
  const [maxPrice, setMaxPrice] = useState(100);
  const [occasion, setOccasion] = useState('');
  const [customInterest, setCustomInterest] = useState('');

  const backgroundColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleInterestToggle = (interest: string) => {
    if (interests.includes(interest)) {
      setInterests(interests.filter((i) => i !== interest));
    } else {
      setInterests([...interests, interest]);
    }
  };

  const addCustomInterest = () => {
    if (customInterest.trim() && !interests.includes(customInterest.trim())) {
      setInterests([...interests, customInterest.trim()]);
      setCustomInterest('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const profile: DemographicProfile = {
      gender,
      relationship,
      ageRange,
      interests,
      priceRange: {
        min: minPrice,
        max: maxPrice,
      },
      occasion: occasion || undefined,
    };
    
    onSubmit(profile);
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      bg={backgroundColor}
      borderRadius="xl"
      boxShadow="md"
      p={{ base: 4, md: 6 }}
      borderWidth="1px"
      borderColor={borderColor}
    >
      <VStack spacing={6} align="stretch">
        <Heading as="h3" size="md">
          Find the Perfect Gift
        </Heading>
        
        <FormControl isRequired>
          <FormLabel>Who is this gift for?</FormLabel>
          <RadioGroup value={gender} onChange={(value) => setGender(value as any)}>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4}>
              <Radio value="Male" colorScheme="purple">Male</Radio>
              <Radio value="Female" colorScheme="purple">Female</Radio>
              <Radio value="Other" colorScheme="purple">Other</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Relationship</FormLabel>
          <RadioGroup value={relationship} onChange={(value) => setRelationship(value as any)}>
            <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} wrap="wrap">
              <Radio value="Friend" colorScheme="purple">Friend</Radio>
              <Radio value="Partner" colorScheme="purple">Partner</Radio>
              <Radio value="Family" colorScheme="purple">Family</Radio>
              <Radio value="Coworker" colorScheme="purple">Coworker</Radio>
              <Radio value="Other" colorScheme="purple">Other</Radio>
            </Stack>
          </RadioGroup>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Age Range</FormLabel>
          <Select
            value={ageRange}
            onChange={(e) => setAgeRange(e.target.value as any)}
            colorScheme="purple"
            borderRadius="lg"
          >
            <option value="Child">Child (0-12)</option>
            <option value="Teen">Teen (13-19)</option>
            <option value="Young Adult">Young Adult (20-29)</option>
            <option value="Adult">Adult (30-59)</option>
            <option value="Senior">Senior (60+)</option>
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>Occasion (Optional)</FormLabel>
          <Select
            value={occasion}
            onChange={(e) => setOccasion(e.target.value)}
            colorScheme="purple"
            borderRadius="lg"
            placeholder="Select an occasion"
          >
            <option value="Birthday">Birthday</option>
            <option value="Anniversary">Anniversary</option>
            <option value="Wedding">Wedding</option>
            <option value="Christmas">Christmas</option>
            <option value="Valentine's Day">Valentine's Day</option>
            <option value="Graduation">Graduation</option>
            <option value="Housewarming">Housewarming</option>
            <option value="Baby Shower">Baby Shower</option>
            <option value="Other">Other</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Price Range</FormLabel>
          <Flex gap={4}>
            <NumberInput
              min={1}
              max={999}
              value={minPrice}
              onChange={(_, value) => setMinPrice(value)}
              flex={1}
            >
              <NumberInputField borderRadius="lg" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Text alignSelf="center">to</Text>
            <NumberInput
              min={minPrice}
              max={10000}
              value={maxPrice}
              onChange={(_, value) => setMaxPrice(value)}
              flex={1}
            >
              <NumberInputField borderRadius="lg" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
        </FormControl>

        <FormControl>
          <FormLabel>Interests</FormLabel>
          <VStack align="stretch" spacing={4}>
            <CheckboxGroup colorScheme="purple">
              <Flex wrap="wrap" gap={2}>
                {interestOptions.map((interest) => (
                  <Checkbox
                    key={interest}
                    isChecked={interests.includes(interest)}
                    onChange={() => handleInterestToggle(interest)}
                  >
                    {interest}
                  </Checkbox>
                ))}
              </Flex>
            </CheckboxGroup>
            
            <Box>
              <HStack>
                <InputGroup size="md">
                  <Input
                    placeholder="Add custom interest"
                    value={customInterest}
                    onChange={(e) => setCustomInterest(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        addCustomInterest();
                      }
                    }}
                    borderRadius="lg"
                  />
                  <InputRightElement width="4.5rem">
                    <Button
                      h="1.75rem"
                      size="sm"
                      colorScheme="purple"
                      onClick={addCustomInterest}
                    >
                      <AddIcon />
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </HStack>
            </Box>
            
            {interests.length > 0 && (
              <Box>
                <Text mb={2} fontSize="sm">Selected Interests:</Text>
                <Flex wrap="wrap" gap={2}>
                  {interests.map((interest) => (
                    <Tag
                      key={interest}
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="purple"
                    >
                      <TagLabel>{interest}</TagLabel>
                      <TagCloseButton onClick={() => handleInterestToggle(interest)} />
                    </Tag>
                  ))}
                </Flex>
              </Box>
            )}
          </VStack>
        </FormControl>

        <Button
          mt={4}
          colorScheme="purple"
          isLoading={isLoading}
          loadingText="Finding Gifts..."
          type="submit"
          size="lg"
        >
          Find Gift Suggestions
        </Button>
      </VStack>
    </Box>
  );
};

export default DemographicForm;
