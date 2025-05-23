import React, { useState } from 'react';
import { Box, Container, Flex, useColorModeValue } from '@chakra-ui/react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthPage: React.FC = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const { currentUser } = useAuth();
  
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  
  // Redirect if user is already logged in
  if (currentUser) {
    return <Navigate to="/" />;
  }
  
  const toggleForm = () => {
    setIsLoginView(!isLoginView);
  };
  
  return (
    <Box bg={bgColor} minH="calc(100vh - 60px)">
      <Container maxW="container.md" py={12}>
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="60vh"
        >
          {isLoginView ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default AuthPage;
