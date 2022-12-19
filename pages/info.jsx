import {
  Container,
  SimpleGrid,
  Image,
  Flex,
  Heading,
  Text,
  Link,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { ImYoutube, ImFacebook2, ImNewspaper } from 'react-icons/im';
import Layout from '@/components/Layout';
import UserControllers from '@/controllers/users';

const Feature = ({ text, icon, iconBg, href }) => {
  return (
    <Stack direction={'row'} align={'center'}>
      <Flex
        w={8}
        h={8}
        align={'center'}
        justify={'center'}
        rounded={'full'}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Link href={href} fontWeight={600}>
        {text}
      </Link>
    </Stack>
  );
};

function Info({ user }) {
  return (
    <Layout user={user} bg="#f3f5f9">
      <Container maxW={'5xl'} py={12} minH="66vh">
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Stack spacing={4}>
            <Text
              textTransform={'uppercase'}
              color={'orange.400'}
              fontWeight={600}
              fontSize={'sm'}
              bg={useColorModeValue('orange.50', 'orange.900')}
              p={2}
              alignSelf={'flex-start'}
              rounded={'md'}
            >
              Thông tin
            </Text>
            <Heading>Thiền Tôn Phật Quang</Heading>
            <Text color={'gray.500'} fontSize={'lg'}>
              Thôn Chu Hải, xã Tân Hải, thị xã Phú Mỹ, tỉnh Bà Rịa-Vũng Tàu
            </Text>
            <Stack
              spacing={4}
              divider={
                <StackDivider
                  borderColor={useColorModeValue('gray.100', 'gray.700')}
                />
              }
            >
              <Feature
                icon={<Icon as={ImYoutube} color={'red.500'} w={5} h={5} />}
                text={'Pháp Quang - Sen Hồng'}
                href="https://www.youtube.com/@SenHongPhapQuang"
              />
              <Feature
                icon={<Icon as={ImFacebook2} color={'blue.500'} w={5} h={5} />}
                text={'Facebook - Thiền Tôn Phật Quang'}
                href="https://www.facebook.com/THIENTONPQ/"
              />
              <Feature
                icon={
                  <Icon as={ImNewspaper} color={'orange.500'} w={5} h={5} />
                }
                text={'Website - Thiền Tôn Phật Quang'}
                href="https://thientonphatquang.com"
              />
            </Stack>
          </Stack>
          <Flex>
            <Image
              rounded={'md'}
              alt={'feature image'}
              src={'/info.jpg'}
              objectFit={'cover'}
            />
          </Flex>
        </SimpleGrid>
      </Container>
    </Layout>
  );
}

export const getServerSideProps = UserControllers.getUserInfo;
export default Info;
