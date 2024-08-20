import React from 'react';
import { Box, Button, Text, Avatar, IconButton, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { FaBell, FaUserCircle } from 'react-icons/fa';

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/Login');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleAddAdmin = () => {
    navigate('/register'); 
  };

  return (
    <Box
      p={4}
      bg="teal.500"
      color="white"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      boxShadow="md"
    >
      <Text fontSize="xl" fontWeight="bold">
        Clinic Management Dashboard
      </Text>

      <Box display="flex" alignItems="center">
        <Button
          colorScheme="teal"
          onClick={handleAddAdmin}
          mr={4}
        >
          Add New Admin
        </Button>

        <IconButton
          icon={<FaBell />}
          variant="outline"
          colorScheme="teal"
          mr={4}
          aria-label="Notifications"
        />

        <Menu>
          <MenuButton as={Button} colorScheme="teal" rightIcon={<FaUserCircle />}>
            Profile
          </MenuButton>
          <MenuList>
            <MenuItem onClick={handleProfile}>View Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </Menu>

        <Avatar
          ml={4}
          size="md"
          name="John Doe"
          src="https://bit.ly/broken-link"
        />
      </Box>
    </Box>
  );
};

export default Header;
