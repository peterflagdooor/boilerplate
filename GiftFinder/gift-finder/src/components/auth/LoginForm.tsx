import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  useColorModeValue,
  Alert,
  AlertIcon,
  Divider,
  Center,
  Heading,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useAuth } from '../../contexts/AuthContext';

interface LoginFormProps {
  onToggleForm: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onToggleForm }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();
  
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setError('');
      setLoading(true);
      await login(email, password);
    } catch (err: any) {
      setError('Failed to log in: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      setError('');
      setLoading(true);
      await loginWithGoogle();
    } catch (err: any) {
      setError('Failed to log in with Google: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };
  
  const bgColor = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  
  return (
    <Box
      bg={bgColor}
      borderWidth="1px"
      borderRadius="xl"
      borderColor={borderColor}
      boxShadow="lg"
      p={8}
      width="100%"
      maxWidth="400px"
      mx="auto"
    >
      <Stack spacing={4} mb={8}>
        <Heading fontSize="2xl" textAlign="center">
          Sign in to your account
        </Heading>
        <Text fontSize="md" color="gray.500" textAlign="center">
          Welcome back! Please sign in to continue.
        </Text>
      </Stack>
      
      {error && (
        <Alert status="error" mb={4} borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      <form onSubmit={handleEmailLogin}>
        <Stack spacing={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              borderRadius="lg"
            />
          </FormControl>
          
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <Input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                borderRadius="lg"
              />
              <InputRightElement h="full">
                <IconButton
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  variant="ghost"
                  icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  onClick={() => setShowPassword(!showPassword)}
                  size="sm"
                />
              </InputRightElement>
            </InputGroup>
          </FormControl>
          
          <Button
            colorScheme="purple"
            type="submit"
            size="lg"
            fontSize="md"
            isLoading={loading}
            loadingText="Signing in..."
            borderRadius="lg"
          >
            Sign in
          </Button>
        </Stack>
      </form>
      
      <Stack spacing={4} mt={8}>
        <Divider />
        
        <Center>
          <Text fontSize="sm" color="gray.500">
            Or continue with
          </Text>
        </Center>
        
        <Button
          w="full"
          variant="outline"
          leftIcon={<FcGoogle size="20px" />}
          onClick={handleGoogleLogin}
          isLoading={loading}
          loadingText="Signing in..."
          borderRadius="lg"
        >
          Sign in with Google
        </Button>
        
        <Center pt={2}>
          <Text fontSize="md">
            Don't have an account?{' '}
            <Button
              variant="link"
              colorScheme="purple"
              onClick={onToggleForm}
              fontWeight="semibold"
            >
              Sign up
            </Button>
          </Text>
        </Center>
      </Stack>
    </Box>
  );
};

export default LoginForm;
