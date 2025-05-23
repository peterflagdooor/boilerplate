import React from 'react';
import { SimpleGrid, Button, Center, Spinner, Text, Box } from '@chakra-ui/react';
import ProductCard from './ProductCard';
import { GiftProduct } from '../../types';

interface ProductGridProps {
  products: GiftProduct[];
  isLoading: boolean;
  onLoadMore: () => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, isLoading, onLoadMore }) => {
  if (isLoading && products.length === 0) {
    return (
      <Center py={10}>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="brand.500"
          size="xl"
        />
      </Center>
    );
  }

  if (products.length === 0) {
    return (
      <Center py={10}>
        <Text>No products found. Try adjusting your search criteria.</Text>
      </Center>
    );
  }

  return (
    <Box>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={6} py={6}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </SimpleGrid>
      
      <Center py={6}>
        <Button
          onClick={onLoadMore}
          isLoading={isLoading}
          loadingText="Loading more..."
          colorScheme="purple"
          variant="outline"
          size="lg"
        >
          Load More Gifts
        </Button>
      </Center>
    </Box>
  );
};

export default ProductGrid;
