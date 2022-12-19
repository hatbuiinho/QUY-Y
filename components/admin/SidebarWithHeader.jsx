import {
	IconButton,
	Avatar,
	Box,
	CloseButton,
	Flex,
	HStack,
	VStack,
	Icon,
	useColorModeValue,
	Drawer,
	DrawerContent,
	Text,
	useDisclosure,
	BoxProps,
	FlexProps,
	Menu,
	Image,
	MenuButton,
	MenuDivider,
	MenuItem,
	MenuList,
} from '@chakra-ui/react';
import { AiOutlineHome, AiOutlineOrderedList, AiOutlineVideoCamera,
	AiOutlineMenu, AiOutlineBell, AiFillCaretDown } from "react-icons/ai";
import { useRouter } from 'next/router';

import Link from 'next/link';

const LinkItems = [
	{ name: 'Home', icon: AiOutlineHome, href: '/admin' },
	{ name: 'Questions', icon: AiOutlineOrderedList, href: '/admin/questions' },
	{ name: 'Meet', icon: AiOutlineVideoCamera, href: '/admin/meet' },
];

export default function SidebarWithHeader({ children }) {
	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
			<SidebarContent
				onClose={() => onClose}
				display={{ base: 'none', md: 'block' }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full">
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			<MobileNav onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4">
				{children}
			</Box>
		</Box>
	);
}

const SidebarContent = ({ onClose, ...rest }) => {
	return (
		<Box
			transition="3s ease"
			bg={'yellow.600'}
			color="white"
			borderRight="1px"
			borderRightColor={useColorModeValue('gray.200', 'gray.700')}
			w={{ base: 'full', md: 60 }}
			pos="fixed"
			h="full"
			{...rest}>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Image h="40px" src="/logo.png" alt="Logo Image" />
				<CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem key={link.name} icon={link.icon} href={link.href}>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
};

const NavItem = ({ icon, href, children, ...rest }) => {
	const router = useRouter();

	return (
		<Link href={href} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
			<Flex
				color={router.pathname === href && 'yellow.900'}
				bg={router.pathname === href && 'yellow.100'}
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: 'orange.400',
					color: 'white',
				}}
				{...rest}>
				{icon && (
					<Icon
						mr="4"
						fontSize="16"
						_groupHover={{
							color: 'white',
						}}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

const MobileNav = ({ onOpen, ...rest }) => {
	const router = useRouter();
	
	const logout = function () {
		//call api
		fetch('/api/admin/logout', {
			method: 'GET'
		}).then((r) => {
			router.push("/admin/login");
		}).catch((error) => {
			console.log(error)
		});
	};

	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			bg={'white'}
			borderBottomWidth="1px"
			borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
			justifyContent={{ base: 'space-between', md: 'flex-end' }}
			{...rest}>
			<IconButton
				display={{ base: 'flex', md: 'none' }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<AiOutlineMenu />}
			/>

			<Image display={{ base: 'flex', md: 'none' }} h="40px" src="/logo.png" alt="Logo Image" />

			<HStack spacing={{ base: '0', md: '6' }}>
				{/* <IconButton
					size="lg"
					variant="ghost"
					aria-label="open menu"
					icon={<AiOutlineBell />}
				/> */}
				<Flex alignItems={'center'}>
					<Menu>
						<MenuButton
							py={2}
							transition="all 0.3s"
							_focus={{ boxShadow: 'none' }}>
							<HStack>
								<Avatar
									size={'sm'}
									src={'/admin_default.png'}
								/>
								<VStack
									display={{ base: 'none', md: 'flex' }}
									alignItems="flex-start"
									spacing="1px"
									ml="2">
									<Text fontSize="sm">Kỹ Thuật PQ</Text>
									<Text fontSize="xs" color="gray.600">
										Admin
									</Text>
								</VStack>
								<Box display={{ base: 'none', md: 'flex' }}>
									<AiFillCaretDown />
								</Box>
							</HStack>
						</MenuButton>
						<MenuList
							bg={useColorModeValue('white', 'gray.900')}
							borderColor={useColorModeValue('gray.200', 'gray.700')}>
							<MenuItem>Profile</MenuItem>
							<MenuItem>Settings</MenuItem>
							<MenuItem>Billing</MenuItem>
							<MenuDivider />
							<MenuItem onClick={logout}>Sign out</MenuItem>
						</MenuList>
					</Menu>
				</Flex>
			</HStack>
		</Flex>
	);
};