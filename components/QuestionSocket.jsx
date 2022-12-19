import {
	SimpleGrid,
	Heading,
	Flex,
	Box,
	Image,
	Button
} from '@chakra-ui/react';
import { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import RadioCard from '@/components/RadioCard'
import CheckboxCard from '@/components/CheckboxCard'
import { useRadioGroup, useCheckboxGroup } from '@chakra-ui/react';

const convert2Countdown = (tl) => {
	let m = Math.trunc(tl / 60);
	let s = tl % 60;
	let m_str = "" + m;
	if (m < 10) m_str = "0" + m;
	let s_str = "" + s;
	if (s < 10) s_str = "0" + s;
	return m_str + ":" + s_str;
}

const QuestionSocket = forwardRef((props, ref) => {
	const index = props.question_index;
	const question_detail = props.question;
	const setScore = props.setScore;
	const score = props.score;
	const [correct_answer, setCorrectAnswer] = props.corrects_state;
	const pick_answers = useRef("");
	const [countdown, setCountdown] = useState(convert2Countdown(question_detail.time));
	const countdown_timer = useRef();

	const closeQuestion = function () {
		props.setShowQuestion(false);
	};

	const { getRootProps, getRadioProps } = useRadioGroup({
		name: 'answer',
		defaultValue: '',
		onChange: function (value) {
			pick_answers.current = value;
		},
	})
	const group = getRootProps()

	const { value, getCheckboxProps } = useCheckboxGroup({
		defaultValue: [],
		onChange: function (values) {
			pick_answers.current = values;
		},
	})

	const submitAnswer = function () {
		clearInterval(countdown_timer.current);
		setCorrectAnswer(question_detail.corrects);
		props.calculateScore(pick_answers.current);
	}

	const runCountdown = () => {
		var timeleft = question_detail.time;
		if (countdown_timer.current) clearInterval(countdown_timer.current);
		countdown_timer.current = setInterval(function () {
			if (timeleft <= 0) {
				clearInterval(countdown_timer.current);
				setCorrectAnswer(question_detail.corrects);
			}
			setCountdown(convert2Countdown(timeleft))
			timeleft -= 1;
		}, 1000);
	}

	useImperativeHandle(ref, () => ({
		startCountDown() {
			runCountdown()
		},
		// calculateScore() {
		//     if (Array.isArray(pick_answers.current)) {
		//         var tmp_score = score;
		//         pick_answers.current.map((element) => {
		//             if (question_detail.corrects.indexOf(element) > -1) {
		//                 tmp_score += question_detail.score;
		//             }
		//         })
		//         setScore(tmp_score);
		//     } else if (question_detail.corrects.indexOf(pick_answers.current) > -1) {
		//         setScore(score + 10);
		//     }
		// }
	}));


	useEffect(() => {
		return () => {
			clearInterval(countdown_timer.current);
		}
	}, []);

	return <Box>
		<Box w="100%" display="flex" justifyContent={"center"}>
			<Box
				mb={4}
				maxW={{ base: '600px', md: '680px' }}
				w={'full'}
				bg="white"
				boxShadow={'lg'}
				rounded={'md'}
				pos="relative"
			>
				<Box textAlign="center" bg="#e5e8ee" borderTopRadius="6px">
					{question_detail.image && <Image
						rounded={'md'}
						w="100%"
						objectFit={'cover'}
						src={question_detail.image}
					/>}
					<Heading color="#2e3973" pt={6} pb={14} size="md" textAlign="center">
						{question_detail.content}
					</Heading>

					<Flex justify={'center'} mt='-31px' pos="absolute" w="100%" zIndex={2}>
						<Image
							w="50px"
							objectFit={'cover'}
							src={'/clock.png'}
						/>
						<Flex mt='20px' fontSize={"14px"} justify={'center'} pos="absolute" w="100%" zIndex={2}>
							{countdown}
						</Flex>
					</Flex>
				</Box>

				<SimpleGrid spacing={2} columns={{ base: 1, md: 2 }}
					{...group}
					pointerEvents={correct_answer && 'none'}
					userSelect="none"
					m="auto"
					p={4}
					pt={12}
					position="relative"
					z-index={1}
				>
					{question_detail.multiple == 0 && question_detail.answers.map((item) => {
						const radio = getRadioProps({ value: item.id, sequence: item.sequence })
						return (
							<RadioCard image={item.image} corrects={correct_answer} key={item.id} {...radio}>
								{item.value}
							</RadioCard>
						)
					})}
					{question_detail.multiple == 1 && question_detail.answers.map((item) => {
						const checkbox = getCheckboxProps({ value: item.id, sequence: item.sequence })
						return (
							<CheckboxCard image={item.image} corrects={correct_answer} key={item.id} {...checkbox}>
								{item.value}
							</CheckboxCard>
						)
					})}
				</SimpleGrid>

			</Box>
		</Box>

		<Box textAlign="center" pt={4}>
			{!correct_answer && <Button colorScheme='yellow' onClick={submitAnswer} size='lg'>Trả lời</Button>}
			{correct_answer && <Button colorScheme='orange' variant='solid' size='lg' onClick={closeQuestion}>
				Tiếp tục
			</Button>}
		</Box>
	</Box>
})

QuestionSocket.displayName = 'QuestionSocket';
export default QuestionSocket;