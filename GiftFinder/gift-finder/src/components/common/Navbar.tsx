import React from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  useColorMode,
  useBreakpointValue,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  HStack,
  IconButton,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

// Routes that should be hidden when user is not logged in
const PROTECTED_ROUTES = ['/history', '/profile', '/calendar'];

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const { currentUser, logout } = useAuth();
  const location = useLocation();

  const logoColor = useColorModeValue('gray.800', 'white');
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('brand.500', 'brand.300');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  const isActive = (path: string | undefined) => {
    if (!path) return false;
    return location.pathname === path;
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        align={'center'}
        position="sticky"
        top={0}
        zIndex={100}
        boxShadow="sm"
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            as={RouterLink}
            to="/"
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            fontWeight={'bold'}
            fontSize={'xl'}
            color={logoColor}
            _hover={{
              textDecoration: 'none',
            }}
          >
            GiftFinder
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav isActive={isActive} isLoggedIn={!!currentUser} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
          align="center"
        >
          <IconButton
            size="md"
            fontSize="lg"
            aria-label={`Switch to ${
              colorMode === 'light' ? 'dark' : 'light'
            } mode`}
            variant="ghost"
            color="current"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          />

          {currentUser ? (
            <Menu>
              <MenuButton
                as={Button}
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}
              >
                <Avatar
                  size={'sm'}
                  src={currentUser.photoURL || undefined}
                  name={currentUser.displayName || currentUser.email}
                />
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem as={RouterLink} to="/history">
                  Gift History
                </MenuItem>
                <MenuItem as={RouterLink} to="/calendar">
                  Birthday Calendar
                </MenuItem>
                <MenuDivider />
                <MenuItem onClick={logout}>Sign Out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <Button
              as={RouterLink}
              to="/login"
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'brand.500'}
              _hover={{
                bg: 'brand.600',
              }}
              display={{ base: 'none', md: 'inline-flex' }}
            >
              Sign In
            </Button>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav isActive={isActive} isLoggedIn={!!currentUser} />
      </Collapse>
    </Box>
  );
};

const DesktopNav = ({ 
  isActive = () => false, 
  isLoggedIn = false 
}: { 
  isActive?: (path: string) => boolean,
  isLoggedIn?: boolean 
}) => {
  // Filter out protected routes if user is not logged in
  const filteredNavItems = NAV_ITEMS.filter(item => {
    if (isLoggedIn) return true;
    return !PROTECTED_ROUTES.includes(item.href || '');
  });
  
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('brand.500', 'brand.300');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {filteredNavItems.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                as={RouterLink}
                p={2}
                to={navItem.href || '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={navItem.href && isActive(navItem.href) ? 'brand.500' : linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav
                      key={child.label}
                      {...child}
                      isActive={isActive}
                    />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({
  label,
  href,
  subLabel,
  isActive,
}: NavItem & { isActive: (path: string) => boolean }) => {
  const hoverBg = useColorModeValue('brand.50', 'gray.900');
  const activeBg = useColorModeValue('brand.50', 'gray.900');
  
  return (
    <Link
      as={RouterLink}
      p={2}
      to={href || '#'}
      role={'group'}
      display={'block'}
      rounded={'md'}
      _hover={{ bg: hoverBg }}
      bg={href && isActive(href) ? activeBg : undefined}
      color={href && isActive(href) ? 'brand.500' : undefined}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'brand.500' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'brand.500'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ 
  isActive = () => false, 
  isLoggedIn = false 
}: { 
  isActive?: (path: string) => boolean,
  isLoggedIn?: boolean 
}) => {
  // Filter out protected routes if user is not logged in
  const filteredNavItems = NAV_ITEMS.filter(item => {
    if (isLoggedIn) return true;
    return !PROTECTED_ROUTES.includes(item.href || '');
  });

  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {!isLoggedIn && (
        <Button
          as={RouterLink}
          to="/login"
          fontSize={'sm'}
          fontWeight={600}
          color={'white'}
          bg={'brand.500'}
          _hover={{
            bg: 'brand.600',
          }}
          mb={4}
        >
          Sign In
        </Button>
      )}
      {filteredNavItems.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} isActive={isActive} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({
  label,
  children,
  href,
  isActive = () => false,
}: NavItem & { isActive?: (path: string) => boolean }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={RouterLink}
        to={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
        color={href && isActive(href) ? 'brand.500' : undefined}
        fontWeight={href && isActive(href) ? 'semibold' : 'normal'}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                as={RouterLink}
                to={child.href ?? '#'}
                py={2}
                color={child.href && isActive(child.href) ? 'brand.500' : undefined}
                fontWeight={child.href && isActive(child.href) ? 'semibold' : 'normal'}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'Find Gifts',
    href: '/gifts',
  },
  {
    label: 'Gift History',
    href: '/history',
  },
  {
    label: 'Birthday Calendar',
    href: '/calendar',
  },
];

export default Navbar;
