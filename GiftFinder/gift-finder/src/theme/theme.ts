import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const colors = {
  brand: {
    50: '#f5e9ff',
    100: '#dac1f0',
    200: '#c098e1',
    300: '#a66fd2',
    400: '#8c46c3',
    500: '#732da9', // primary purple
    600: '#5a2387',
    700: '#411965',
    800: '#280f43',
    900: '#110422',
  },
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: 'xl',
    },
    variants: {
      solid: (props: any) => ({
        bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.500',
        color: 'white',
        _hover: {
          bg: props.colorMode === 'dark' ? 'brand.300' : 'brand.600',
        },
      }),
    },
  },
  Card: {
    baseStyle: {
      container: {
        borderRadius: 'xl',
        overflow: 'hidden',
        boxShadow: 'md',
      },
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  components,
  fonts: {
    body: '"Inter", sans-serif',
    heading: '"Inter", sans-serif',
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.50',
      },
    }),
  },
});

export default theme;
