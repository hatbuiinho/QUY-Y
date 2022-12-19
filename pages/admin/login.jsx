import {
	Button,
	Checkbox,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Link,
	Stack,
	Image,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SplitScreen() {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = function () {
		//call api
		fetch('/api/admin/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
				password,
			}),
		}).then((r) => {
			return r.json();
		}).then((data) => {
			router.push("/admin");
		}).catch((error) => {
			console.log(error)
		});
	};

	return (
		<Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
			<Flex p={8} flex={1} align={'center'} justify={'center'}>
				<Stack spacing={4} w={'full'} maxW={'md'}>
					<Heading fontSize={'2xl'}>Sign in to your account</Heading>
					<FormControl id="username">
						<FormLabel>Username</FormLabel>
						<Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
					</FormControl>
					<FormControl id="password">
						<FormLabel>Password</FormLabel>
						<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
					</FormControl>
					<Stack spacing={6}>
						{/* <Stack
							direction={{ base: 'column', sm: 'row' }}
							align={'start'}
							justify={'space-between'}>
							<Checkbox>Remember me</Checkbox>
							<Link color={'blue.500'}>Forgot password?</Link>
						</Stack> */}
						<Button colorScheme={'blue'} variant={'solid'} onClick={handleSubmit}>
							Sign in
						</Button>
					</Stack>
				</Stack>
			</Flex>
			<Flex flex={1}>
				<Image
					alt={'Login Image'}
					objectFit={'cover'}
					src={'/login_background.jpg'}
				/>
			</Flex>
		</Stack>
	);
}