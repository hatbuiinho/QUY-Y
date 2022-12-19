import Layout from '@/components/Layout'
import {
	Stack,
	Flex,
	Button,
	Text,
	VStack,
	Heading,
	useBreakpointValue
} from '@chakra-ui/react';

import { useLoginContext } from "@/providers/LoginProvider"

import UserControllers from '@/controllers/users';

// import { userService } from 'services';
import { useRouter } from 'next/router';

const Home = ({ user }) => {
	const router = useRouter();
	const { openLogin } = useLoginContext();

	const getStarted = function () {
		if (!user) {
			openLogin("first_step_code");
		} else {
			router.push("/ceremony/" + user.first_step_code);
		}
	};

	return (
		<Layout user={user} bg="#f3f5f9">
			<Flex
				w={'full'}
				h={'100%'}
				backgroundImage={
					'url(/background.jpg)'
				}
				backgroundSize={'cover'}
				backgroundPosition={'top center'}
			>
				<VStack
					w={'full'}
					justify={'center'}
					px={useBreakpointValue({ base: 4, md: 8 })}
					bg='rgba(0,0,0,0.6)'
				>
					<Stack
						textAlign={'center'}
						align={'center'}
						spacing={{ base: 8, md: 10 }}
						py={{ base: 20, md: 28 }}>
						<Heading
							fontWeight={600}
							fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
							lineHeight={'110%'}
							color={'white'}
						>
							Quy Y Tam Bảo<br />
							<Text as={'span'} color={'orange.500'}>
								trực tuyến
							</Text>
						</Heading>
						<Text color={'white'} maxW={'3xl'} fontSize={'xl'} textAlign='justify'>
							Quy y Tam Bảo là Quy y Phật, Quy y Pháp, Quy y Tăng. Quy y có nghĩa
							là đem cả cuộc đời mình dâng lên Tam Bảo vì từ giây phút Quy y, chúng
							ta tôn thờ Đức Phật với trọn lòng tôn kính thiết tha.
						</Text>
						<Stack spacing={6} direction={'row'}>
							<Button
								rounded={'full'}
								px={6}
								colorScheme={'orange'}
								bg={'orange.400'}
								_hover={{ bg: 'orange.500' }}
								onClick={getStarted}
							>
								Bắt đầu
							</Button>
							<Button rounded={'full'} px={6}>
								Tìm hiểu thêm
							</Button>
						</Stack>
					</Stack>
				</VStack>
			</Flex>
		</Layout>
	)
}

export const getServerSideProps = UserControllers.getUserInfo;
export default Home;