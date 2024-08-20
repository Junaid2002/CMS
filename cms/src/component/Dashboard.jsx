import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Picture from '../assets/image/Picture.jpg';
import { Box, Flex, Grid, GridItem, Text, Button, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react'; 
import { FaFileInvoiceDollar, FaChartLine } from 'react-icons/fa';
import './Dashboard.css'; 

const Dashboard = () => {
  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${Picture})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',  
        width: '100vw',   
        overflow: 'hidden',
      }}
    >
      <div className="sidebar" style={{ height: '100%' }}>
        <Sidebar />
      </div>
      <div className="main-content" style={{ height: '100%' }}>
        <div className="header" style={{ height: 'auto' }}>
          <Header />
        </div>
        <div className="content" style={{ padding: '1rem', height: 'calc(100% - auto)' }}>
          <Text fontSize="2xl" mb={4} fontWeight="bold">Welcome to the Dashboard!</Text>
          
          <Grid templateColumns="repeat(3, 1fr)" gap={6} mb={6}>
            <GridItem bg="blue.50" p={4} borderRadius="md" boxShadow="md">
              <Text fontSize="xl" mb={2}>Total Patients</Text>
              <Text fontSize="3xl" fontWeight="bold">150</Text>
            </GridItem>
            <GridItem bg="green.50" p={4} borderRadius="md" boxShadow="md">
              <Text fontSize="xl" mb={2}>Appointments</Text>
              <Text fontSize="3xl" fontWeight="bold">32</Text>
            </GridItem>
            <GridItem bg="yellow.50" p={4} borderRadius="md" boxShadow="md">
              <Text fontSize="xl" mb={2}>Revenue</Text>
              <Text fontSize="3xl" fontWeight="bold">$5,200</Text>
            </GridItem>
          </Grid>

          <Flex justify="space-between" align="center" mb={6}>
            <Button leftIcon={<FaFileInvoiceDollar />} colorScheme="teal" size="lg">
              Generate Report
            </Button>
            <Button leftIcon={<FaChartLine />} colorScheme="purple" size="lg">
              View Statistics
            </Button>
          </Flex>

          <Box bg="white" p={6} borderRadius="md" boxShadow="lg">
            <Text fontSize="xl" mb={4}>Recent Transactions</Text>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Date</Th>
                  <Th>Patient Name</Th>
                  <Th>Service</Th>
                  <Th isNumeric>Amount</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td>08/20/2024</Td>
                  <Td>John Doe</Td>
                  <Td>Consultation</Td>
                  <Td isNumeric>$150</Td>
                </Tr>
                <Tr>
                  <Td>08/19/2024</Td>
                  <Td>Jane Smith</Td>
                  <Td>Prescription</Td>
                  <Td isNumeric>$50</Td>
                </Tr>
                <Tr>
                  <Td>08/18/2024</Td>
                  <Td>Bob Johnson</Td>
                  <Td>Surgery</Td>
                  <Td isNumeric>$1,200</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
