import { useEffect, useState, useRef } from 'react'
import io from 'socket.io-client'
let socket;
import { JitsiMeeting } from '@jitsi/react-sdk';
import { Box } from '@chakra-ui/react';
import {
	useBreakpointValue,
	CircularProgress,
	CircularProgressLabel,
	Flex,
	Stack,
	Heading,
	Tabs,
	TabPanels,
	TabPanel,
} from '@chakra-ui/react';

import questionClasses from '@/styles/question.module.css';
import Question from '@/components/QuestionSocket'

const Home = () => {
	const [is_show_question, setShowQuestion] = useState(false);
	const [current_question, setCurrQuestion] = useState(0);
	const [score, setScore] = useState(0);
	const total_scores = 20;

	const screenSize = useBreakpointValue(
		{
			base: 'small',
			md: 'large',
		}
	)

	const options = [
		{
			question: 'Ba ngôi báu là gì?',
			answers: [
				{ key: 'A', value: 'Giới, Định, Tuệ.' },
				{ key: 'B', value: 'Vô thường, Vô ngã, Niết Bàn.' },
				{ key: 'C', value: 'Phật, Pháp, Tăng.' },
			],
			type: 1,
			time: 15,
			corrects: ['C'],
			corrects_state: useState(null),
			child_ref: useRef()
		},
		{
			question: 'Ngũ giới gồm những gì?',
			answers: [
				{ key: 'A', value: 'Không sát sinh, không trộm cắp, không tà dâm, không nói dối, không uống rượu.' },
				{ key: 'B', value: 'Không ăn phi thời, không trộm cướp, không nói dối, không vọng ngữ, không uống rượu.' },
				{ key: 'C', value: 'Không trộm cắp, không giết người, không tà dâm, không nói dối, không uống rượu.' },
			],
			type: 1,
			time: 15,
			corrects: ['A'],
			corrects_state: useState(null),
			child_ref: useRef()
		},
	];

	useEffect(() => {
		socketInitializer()
	}, [])

	const socketInitializer = async () => {
		await fetch('/api/socket');
		socket = io()

		socket.on('connect', () => {
			console.log('connected')
		})

		socket.on('update-input', msg => {
			setCurrQuestion(Number(msg));
			setShowQuestion(true);
			options[Number(msg)].child_ref.current.startCountDown();
		})
	}

	const calculateScore = function (pick_answers) {
		if (Array.isArray(pick_answers)) {
			var tmp_score = score;
			pick_answers.map((element) => {
				if (options[current_question].corrects.indexOf(element) > -1) {
					tmp_score += options[current_question].score;
				}
			})
			setScore(tmp_score);
		} else if (options[current_question].corrects.indexOf(pick_answers) > -1) {
			setScore(score + options[current_question].score);
		}
		socket.emit('submit-answer', {
			user: 'User 1',
			question: current_question + 1,
			value: pick_answers
		})
	}

	return (
		<Flex w="100vw" h="100vh" bg="#f3f5f9" flexDirection={{ base: "column", md: "row" }}>
			<Stack direction={{ base: 'row', md: 'column' }} spacing={10} p={{ base: 1, md: 4 }} bg="white" minW="110px" boxShadow={'2xl'}>
				<Box display="flex" flexDirection='column' alignItems="center" justifyContent="center" w={{ base: '50%', md: '100%' }}>
					<Heading size={{ base: 'sm', md: 'md' }} mb="1">
						Số điểm
					</Heading>
					<CircularProgress value={score / total_scores * 100} color='blue.300'
						size={{ base: '50px', md: '70px' }} thickness='6px'>
						<CircularProgressLabel>{score}</CircularProgressLabel>
					</CircularProgress>
				</Box>
				<Box display="flex" flexDirection='column' alignItems="center" justifyContent="center" w={{ base: '50%', md: '100%' }}>
					<Heading size={{ base: 'sm', md: 'md' }} mb="1">
						Câu hỏi
					</Heading>
					<CircularProgress value={(current_question) / options.length * 100} color='green.300'
						size={{ base: '50px', md: '70px' }} thickness='6px'>
						<CircularProgressLabel>{(current_question)}/{options.length}</CircularProgressLabel>
					</CircularProgress>
				</Box>
			</Stack>
			<Flex flex="1" flexDirection='column' alignItems="center" justifyContent="center" overflowY={{ md: 'auto' }}>
				<Box w='100%' h='100%' display={is_show_question && 'none'}>
					<JitsiMeeting
						getIFrameRef={(iframeRef) => { iframeRef.style.height = '100%'; iframeRef.style.width = '100%'; }}
						roomName={'QUY Y ONLINE'}
						breakoutRooms={{
							hideAddRoomButton: true,
							hideAutoAssignButton: true,
							hideJoinRoomButton: true
						}}
						userInfo={{
							displayName: 'YOUR_USERNAME'
						}}
					/>
				</Box>
				<Box w='100%' h='100%' display={!is_show_question && 'none'}>
					<Tabs index={current_question} w='100%'
						className={screenSize == 'small' ? questionClasses.tab_mobile : ''}>
						<TabPanels pt={{ base: "30px", md: "100px" }} pb='50px'>
							{options.map((item, index) => (
								<TabPanel key={index}>
									<Question
										ref={item.child_ref}
										question={item}
										question_index={index}
										setShowQuestion={setShowQuestion}
										calculateScore={calculateScore}
										setScore={setScore}
										corrects_state={item.corrects_state}
										score={score} />
								</TabPanel>
							))}
						</TabPanels>
					</Tabs>
				</Box>
			</Flex>
		</Flex>

	)
}

export default Home;