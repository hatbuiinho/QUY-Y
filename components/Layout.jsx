import Navbar from './Navbar';
import { Container, Flex } from '@chakra-ui/react';
import Footer from './Footer';

export default function Layout({ children, user }) {
  return (
    <Flex flexDirection="column" h="100vh">
      <Navbar user={user} />
      {children}
      <Footer />
    </Flex>
  );
}
