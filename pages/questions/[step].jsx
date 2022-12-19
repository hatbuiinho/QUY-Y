import {
	Stack,
	Flex,
	HStack,
	Box,
	Tabs,
	TabPanels,
	TabPanel,
	Grid,
	GridItem,
	Progress,
	Alert,
	AlertIcon,
	AlertTitle,
	AlertDescription,
	Text,
	Button
} from '@chakra-ui/react';
import { useState, useRef, useEffect } from 'react';
import Question from '@/components/Question'

import questionClasses from '@/styles/question.module.css';
import { useRouter } from 'next/router';

import { HiDotsVertical } from "react-icons/hi";

import {
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
	IconButton
} from '@chakra-ui/react'

import QuestionControllers from '@/controllers/questions';
import request from '@/utils/request';
import { useLoadingContext } from "@/providers/LoadingProvider"

function Questions({ questions, step, first_step_code }) {
	const { setLoading } = useLoadingContext();
	const router = useRouter();

	let total_scores = 0;
	questions.forEach(q => { total_scores += q.score });
	const [score, setScore] = useState(0);
	const [question, setQuestion] = useState(questions[0]);
	const [is_submit_answer, setSubmitAnswer] = useState();
	const questionRef = useRef();

	const [question_index, setQuestionIdx] = useState(0);
	const [is_finish, setIsFinish] = useState(false);

	const getChoices = () => {
		const pick_answers = questionRef.current.getPickAnswers();
		if (Array.isArray(pick_answers))
			return pick_answers;
		else if (pick_answers != "")
			return [pick_answers];
		else
			return null;
	}

	const calculateScore = () => {
		const pick_answers = questionRef.current.getPickAnswers();
		console.log("pick_answers", pick_answers)
		if (Array.isArray(pick_answers)) {
			let pick_answers_correct = 0;
			pick_answers.map((element) => {
				if (question.corrects.indexOf(element) > -1) {
					pick_answers_correct += 1;
				}
			})
			if (pick_answers_correct == question.corrects.length);
			setScore(score + question.score);
		} else if (question.corrects.indexOf(pick_answers) > -1) {
			setScore(score + question.score);
		}
	}

	const nextAnswer = function () {
		calculateScore();
		questionRef.current.stopMedia();
		if (question_index == questions.length - 1) {
			if (router.query.step == first_step_code)
				setIsFinish(true);
			else if (step && step.next_step)
				router.push('/ceremony/' + step.next_step);
			else
				router.push('/');
		} else {
			setQuestionIdx(question_index + 1);
			setQuestion(questions[question_index + 1]);
		}
		setSubmitAnswer(false);
	}

	const submitAnswer = function () {
		const choice_ids = getChoices();
		if (choice_ids) {
			questionRef.current.stopCountDown();
			questionRef.current.showCorrectAnswer();
			setLoading(true);
			request.post("/api/questions/choices", {
				question_id: question.id,
				step_id: question.step_id,
				choice_ids
			}).then(result => {
				setLoading(false);
				setSubmitAnswer(true);
			}).catch(err => {
				setLoading(false);
			});
		}
	}

	return <Flex
		w={'100%'}
		h={'100%'}
		backgroundImage={'url(/senhong.png)'}
		backgroundSize={'cover'}
		backgroundPosition={'center'}
		flexDirection="column"
		overflow="hidden"
	>
		<Box>
			<Progress value={(question_index + 1) / questions.length * 100} size='xs' colorScheme='pink' />
		</Box>
		<Flex w="100%" h="100%" bg="rgb(237, 100, 166, 0.7)" flexDirection="column">
			<Stack direction="row" spacing={10} minW="110px" p={6}>
				<Box flex={1} borderBottom="1px solid white" color="white">
					<Grid templateColumns='repeat(2, 1fr)' gap={6}>
						<GridItem colSpan={1}>
							{!is_finish && <Text as="b" fontSize={{ base: "md", sm: "lg", lg: "xl" }}>
								Câu hỏi {(question_index + 1)}
							</Text>}
							{is_finish && <Text as="b" fontSize={{ base: "md", sm: "lg", lg: "xl" }}>
								Kết quả
							</Text>}
						</GridItem>
						<GridItem colSpan={1} justifyContent="end" display="flex">
							<Text as="b" fontSize={{ base: "md", sm: "lg", lg: "xl" }}>Điểm: {score}</Text>
						</GridItem>
					</Grid>
				</Box>
				<Box w="120px">
					<HStack spacing={0} justifyContent="end">
						<Flex bg="rgba(0,0,0,.2)" h="2.4em"
							justifyContent={"center"} alignItems={"center"}
							borderLeftRadius="4px" p={2}
						>
							<Text fontSize="md" as="b" color="white">
								{(question_index + 1)} / {questions.length}
							</Text>
						</Flex>
						<Menu>
							<MenuButton
								h="2.4em" minW='2.4em'
								as={IconButton}
								aria-label='Options'
								borderLeft="1px solid rgba(0,0,0,.1)"
								icon={<HiDotsVertical />}
								variant='outline'
								borderLeftRadius="0px"
								bg="rgba(0,0,0,.2)"
								border="inherit"
								color="white"
								_active={{
									bg: "rgba(0,0,0,.2)"
								}}
								_hover={{
									bg: "rgba(0,0,0,.2)"
								}}
							/>
							<MenuList>
								<MenuItem onClick={() => { router.push("/") }}>
									Về trang chủ
								</MenuItem>
							</MenuList>
						</Menu>
					</HStack>
				</Box>
			</Stack>

			<Flex flex="1" flexDirection='column' alignItems="center" justifyContent="center" overflowY={{ md: 'auto' }}>
				{!is_finish && <Question
					key={question.id}
					ref={questionRef}
					question={question}
					setSubmitAnswer={setSubmitAnswer}
				/>}

				{is_finish && (score / total_scores >= 0.7) && <Stack><Alert
					status='success'
					variant='subtle'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					textAlign='center'
					bg="rgba(0,0,0,.2)" rounded="lg"
					color="white"
				>
					<AlertIcon boxSize='40px' mr={0} />
					<AlertTitle mt={4} mb={1} fontSize='lg'>
						Quý Phật tử đã vượt qua bài kiểm tra!
					</AlertTitle>
					<AlertDescription maxWidth='sm'>
						Quý Phật tử bấm vào <b>Tiếp tục</b> để sang phần nghi thức Quy Y
					</AlertDescription>
				</Alert>
					<Button color="white" bg="rgba(0,0,0,.25)"
						_hover={{ bg: "rgba(0,0,0,.25)" }}
						variant='solid' size='lg' onClick={() => { router.push("/ceremony/" + step.next_step) }}>
						Tiếp tục
					</Button>
				</Stack>}

				{is_finish && (score / total_scores < 0.7) && <Stack><Alert
					status='error'
					variant='subtle'
					flexDirection='column'
					alignItems='center'
					justifyContent='center'
					textAlign='center'
					height='200px'
					bg="rgba(0,0,0,.2)" rounded="lg"
					color="white"
				>
					<AlertIcon boxSize='40px' mr={0} />
					<AlertTitle mt={4} mb={1} fontSize='lg'>
						Quý Phật tử chưa vượt qua bài kiểm tra!
					</AlertTitle>
					<AlertDescription maxWidth='sm'>
						Quý Phật tử bấm vào <b>Làm lại</b> để trả lời lại các câu hỏi
					</AlertDescription>
				</Alert>
					<Button color="white" bg="rgba(0,0,0,.25)"
						_hover={{ bg: "rgba(0,0,0,.25)" }}
						variant='solid' size='lg' onClick={() => { router.push("/ceremony/" + first_step_code) }}>
						Làm lại
					</Button>
				</Stack>}
			</Flex>

			<Box p={6}>
				<Flex borderTop="1px solid white" justifyContent="center" pt={4} alignItems="center" color="white">
					{!is_finish && <Button disabled={is_submit_answer} variant='ghost' onClick={submitAnswer} size='lg' bg="rgba(0,0,0,.25)"
						_hover={{ bg: "rgba(0,0,0,.25)" }}
					>Trả lời</Button>}
					{!is_finish && <Button
						disabled={!is_submit_answer} variant='ghost' size='lg' onClick={nextAnswer} bg="rgba(0,0,0,.25)"
						_hover={{ bg: "rgba(0,0,0,.25)" }} ml={3}
					>
						Tiếp theo
					</Button>}
				</Flex>
			</Box>


		</Flex>
	</Flex>
}

export const getServerSideProps = QuestionControllers.getByStep;
export default Questions;