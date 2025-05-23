import React from 'react';
import {
  Box,
  Image,
  Text,
  Heading,
  Stack,
  Badge,
  Button,
  useColorModeValue,
  Link,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { GiftProduct } from '../../types';

interface ProductCardProps {
  product: GiftProduct;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    name,
    description,
    price,
    currency,
    imageUrl,
    productUrl,
    source,
  } = product;

  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      maxW="sm"
      borderWidth="1px"
      borderRadius="xl"
      overflow="hidden"
      bg={bgColor}
      borderColor={borderColor}
      boxShadow="md"
      transition="transform 0.3s ease, box-shadow 0.3s ease"
      _hover={{
        transform: 'translateY(-5px)',
        boxShadow: 'lg',
      }}
    >
      <Box position="relative">
        <Image 
          src={imageUrl} 
          alt={name} 
          height="200px" 
          width="100%" 
          objectFit="cover" 
          fallbackSrc="https://via.placeholder.com/300x200?text=Product+Image"
        />
        <Badge
          position="absolute"
          top="10px"
          right="10px"
          borderRadius="full"
          px="2"
          colorScheme={source === 'amazon' ? 'yellow' : 'orange'}
        >
          {source === 'amazon' ? 'Amazon' : 'AliExpress'}
        </Badge>
      </Box>

      <Box p="6">
        <Stack spacing={3}>
          <Heading as="h3" size="md" isTruncated title={name}>
            {name}
          </Heading>
          
          <Text fontSize="xl" fontWeight="bold" color="brand.500">
            {currency} {price.toFixed(2)}
          </Text>
          
          <Text noOfLines={2} fontSize="sm" color="gray.500">
            {description}
          </Text>
          
          <Link href={productUrl} isExternal _hover={{ textDecoration: 'none' }}>
            <Button 
              rightIcon={<ExternalLinkIcon />} 
              colorScheme="purple" 
              variant="solid" 
              size="md" 
              width="100%"
            >
              View Product
            </Button>
          </Link>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProductCard;
