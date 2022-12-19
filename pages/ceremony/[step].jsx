import {
	Stack,
	Flex,
	Box,
	Grid,
	GridItem,
	Text,
	Button,
	Image
} from '@chakra-ui/react';
import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton
} from '@chakra-ui/react'
import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { HiDotsVertical } from "react-icons/hi";
import StepControllers from '@/controllers/steps';

export function Step({ step, first_step_code }) {
	const router = useRouter();
	const audioRef = useRef(null);
	const videoRef = useRef(null);
	const [finish_step, setFinishStep] = useState(false);
	const mediaListener = function () {
		setFinishStep(true);
	};
	useEffect(() => {
		if (step.audio_url && step.audio_url != "") {
			audioRef.current.addEventListener("canplay", () => {
				audioRef.current.play().catch(err => console.log(err));
			});
			audioRef.current.addEventListener("ended", mediaListener);
		} else if (step.video_url && step.video_url != "") {
			videoRef.current.addEventListener("canplay", () => {
				videoRef.current.play().catch(err => console.log(err));
			});
			videoRef.current.addEventListener("ended", mediaListener);
		}
		setFinishStep(false);
	}, [step]);

	console.log(step);
	const nextHandle = function () {
		if (step && step.questions.length) {
			router.push("/questions/" + step.short_code);
		} else if (step && step.type == 3) {
			router.push("/info");
		} else {
			router.push("/ceremony/" + step.next_step);
		}
	};

	return <Flex
		w={'100%'}
		h={'100%'}
		backgroundImage={'url(/senhong.png)'}
		backgroundSize={'cover'}
		backgroundPosition={'center'}
		flexDirection="column"
		overflow="hidden"
	>
		<Flex w="100%" h="100%" bg="rgb(237, 100, 166, 0.7)" flexDirection="column" p={6}>
			<Stack direction="row" spacing={10} minW="110px">
				<Box flex={1} borderBottom="1px solid white" color="white">
					<Grid templateColumns='repeat(2, 1fr)' gap={6}>
						<GridItem colSpan={1}>
							<Text as="b" fontSize={{ base: "md", sm: "lg", lg: "xl" }}>{step.name}</Text>
						</GridItem>
						<GridItem colSpan={1} justifyContent="end" display="flex">
							<Text as="b" fontSize={{ base: "md", sm: "lg", lg: "xl" }}></Text>
						</GridItem>
					</Grid>
				</Box>
				<Box w="2.4em">
					<Menu>
						<MenuButton
							as={IconButton}
							aria-label='Options'
							icon={<HiDotsVertical />}
							variant='outline'
							bg="rgba(0,0,0,.25)"
							border="inherit"
							color="white"
							_active={{
								bg: "rgba(0,0,0,.25)"
							}}
							_hover={{
								bg: "rgba(0,0,0,.25)"
							}}
						/>
						<MenuList>
							<MenuItem onClick={() => {router.push("/")}}>
								Về trang chủ
							</MenuItem>
						</MenuList>
					</Menu>
				</Box>
			</Stack>

			<Flex flex="1" flexDirection='column' alignItems="center" justifyContent="center"
				overflowY={{ md: 'auto' }} color="white">
				<Flex mb={4} maxW="640px" flexDirection="column" justifyContent="center" alignItems="center" p={4} bg="rgba(0,0,0,.2)" rounded="lg">
					<Text fontSize="xl" dangerouslySetInnerHTML={{ __html: step.content }}></Text>
				</Flex>

				{step && step.image_url && step.image_url != "" && (!step.audio_url || step.audio_url == "")
				 && (!step.video_url || step.video_url == "") && <Flex maxW="640"
				 justifyContent="center" alignItems="center" p={4} bg="rgba(0,0,0,.2)" rounded="lg" flexDirection="column">
					<Image
						w="100%"
						objectFit={'cover'}
						src={step.image_url}
						alt="Step Image"
					/>
					</Flex>}

				{step && step.video_url && step.video_url != "" && <Flex justifyContent="center" alignItems="center" p={4} bg="rgba(0,0,0,.2)" rounded="lg" flexDirection="column">
					<video key={step.video_url} ref={videoRef} width="640" controls>
						<source src={step.video_url} type="video/mp4" />
					</video>
				</Flex>}

				{step && step.audio_url && step.audio_url != "" && <Flex
					w={{ base: '100%', md: '80%', lg: '60%' }}
					justifyContent="center" alignItems="center" p={4} bg="rgba(0,0,0,.2)" rounded="lg"
					flexDirection="column">
					{step && step.image_url && step.image_url != "" && <Image
						w="100%"
						objectFit={'cover'}
						src={step.image_url}
						alt="Image Step"
					/>}
					<audio
						style={{
							width: '100%',
						}}
						ref={audioRef}
						controls
						src={step.audio_url}>
					</audio>
				</Flex>}
			</Flex>

			<Flex borderTop="1px solid white" justifyContent="center" alignItems="center" pt={4} color="white">
				{step && step.type != 2 && <Button variant='ghost' size='lg' bg="rgba(0,0,0,.25)"
					disabled={!finish_step && step.short_code != first_step_code && step.type != 3}
					_hover={{ bg: "rgba(0,0,0,.25)" }} ml={3} onClick={nextHandle}
				>
					{step && step.questions.length ? "Bắt đầu trả lời câu hỏi" : "Tiếp theo"}
				</Button>}

				{step && step.type == 2 && <Stack direction={['column', 'row']}><Button color="white" bg="rgba(0,0,0,.25)"
					_hover={{ bg: "rgba(0,0,0,.25)" }}
					variant='solid' size='md' onClick={() => { router.push("/meet") }}>
					Link Meet
				</Button>
					<Button color="white" bg="rgba(0,0,0,.25)"
						_hover={{ bg: "rgba(0,0,0,.25)" }}
						variant='solid' size='md' onClick={() => { router.push("/ceremony/" + step.next_step) }}>
						Nghi Thức Quy Y tự động
					</Button></Stack>}
			</Flex>
		</Flex>
	</Flex>
}

export const getServerSideProps = StepControllers.getByShortCode;
export default Step;