import { Image, Link } from '@chakra-ui/react';

function Logo({}) {
  return (
    <Link href="/" w={{ base: 10, md: 14 }}>
      <Image h="40px" src="/logo.png" alt="Logo Image" />
    </Link>
  );
}

export default Logo;
