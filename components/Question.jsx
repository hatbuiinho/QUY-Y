import {
	SimpleGrid,
	Heading,
	Flex,
	Box,
	Image,
	Button,
	useBreakpointValue
} from '@chakra-ui/react';
import { forwardRef, useRef, useImperativeHandle, useEffect, useState } from 'react';
import RadioCard from '@/components/RadioCard'
import CheckboxCard from '@/components/CheckboxCard'
import { useRadioGroup, useCheckboxGroup } from '@chakra-ui/react';
import questionClasses from '@/styles/question.module.css';
import YouTube, { YouTubeProps } from 'react-youtube';
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'

const convert2Countdown = (tl) => {
	let m = Math.trunc(tl / 60);
	let s = tl % 60;
	let m_str = "" + m;
	if (m < 10) m_str = "0" + m;
	let s_str = "" + s;
	if (s < 10) s_str = "0" + s;
	return m_str + ":" + s_str;
}

const Question = forwardRef((props, ref) => {
	const question_detail = props.question;
	const setSubmitAnswer = props.setSubmitAnswer;
	const audioRef = useRef();
	const videoRef = useRef();
	const [correct_answer, setCorrectAnswer] = useState(null);
	const pick_answers = useRef("");
	const [countdown, setCountdown] = useState(convert2Countdown(question_detail.time));
	const countdown_timer = useRef();
	const [countdown_percent, setCountdownPercent] = useState(100);
	const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

	const screenSize = useBreakpointValue(
		{
			base: 'small',
			md: 'large',
		}
	)

	const isSmall = (screenSize == "small" || question_detail.media_type == 0);
	let answerCols = 1;
	if (screenSize == "small") {
		answerCols = 1;
	} else if (question_detail.media_type == 0) {
		if (question_detail.answers.length < 4) {
			answerCols = 1;
		} else {
			answerCols = 2;
		}
	} else {
		if (question_detail.answers[0].image || question_detail.answers.length >= 4) {
			answerCols = 2;
		} else {
			answerCols = 1;
		}
	}


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

	// const onPlayerReady = (event) => {
	// 	// access to player in all event handlers via event.target
	// 	if (index == 0) {
	// 		event.target.playVideo();
	// 	}
	// 	playerRef.current = event.target;
	// }

	// const onVideoEnd = (event) => {
	// 	runCountdown();
	// }

	const opts = {
		playerVars: {
			'autoplay': 0,
			'disablekb': 1,
			'controls': 0,
		},
	};

	const runCountdown = () => {
		var timeleft = question_detail.time;
		if (countdown_timer.current) clearInterval(countdown_timer.current);
		countdown_timer.current = setInterval(function () {
			if (timeleft <= 0) {
				clearInterval(countdown_timer.current);
				setCorrectAnswer(question_detail.corrects);
				setSubmitAnswer(true);
			}
			setCountdown(convert2Countdown(timeleft))
			setCountdownPercent(timeleft / question_detail.time * 100);
			timeleft -= 1;
		}, 1000);
	}

	useImperativeHandle(ref, () => ({
		showCorrectAnswer() {
			setCorrectAnswer(question_detail.corrects);
		},
		startCountDown() {
			runCountdown()
		},
		stopCountDown() {
			clearInterval(countdown_timer.current);
		},
		getPickAnswers() {
			return pick_answers.current
		},
		stopMedia() {
			audioRef?.current?.pause();
			videoRef?.current?.pause();
		}
	}));

	const mediaListener = function () {
		runCountdown();
	};

	useEffect(() => {
		if (question_detail.audio_url && question_detail.audio_url != "") {
			audioRef.current.addEventListener("ended", mediaListener);
		} else if (question_detail.video_url && question_detail.video_url != "") {
			videoRef.current.addEventListener("ended", mediaListener);
		} else {
			runCountdown();
		}
		return () => {
			clearInterval(countdown_timer.current);
		}
	}, [question_detail]);

	return <SimpleGrid className={questionClasses.tab_mobile} py={{base: 4, md: "50px"}} flex={1}
			w="100vw" px={{base: 2, sm: "20px", md: "50px", lg: "100px", xl: "10%"}}
			columns={isSmall ? 1 : 2} spacing={4} margin="auto">
		<Flex flexDirection="column" justifyContent="center" alignItems="center" p={4} bg="rgba(0,0,0,.2)" rounded="lg">
			{/* {question_detail.youtube &&
				<Box w={'100%'} pos="relative">
					<Box className={questionClasses.overlay_div}></Box>
					<Box className={questionClasses.iframe_div} w={'100%'} m="auto">
						<YouTube videoId={question_detail.youtube} opts={opts} onReady={onPlayerReady} onEnd={onVideoEnd} />
					</Box>
				</Box>} */}

			{question_detail.video_url && question_detail.video_url != "" && <Flex justifyContent="center" alignItems="center"
				pt={12} pb={4} maxW={{md: "640px"}}
			><video controls ref={videoRef} poster="/video_poster.png" autoPlay>
					<source src={question_detail.video_url} type="video/mp4" />
				</video></Flex>}

			{question_detail.image_url && question_detail.image_url != "" && <Image
				alt="Question image"
				rounded={'md'}
				w="100%"
				objectFit={'cover'}
				src={question_detail.image_url}
			/>}

			{question_detail.audio_url && question_detail.audio_url != "" && <Flex
				justifyContent="center" alignItems="center" flexDirection="column"
				pt={12} pb={4}>
				<Image
					w="100%"
					objectFit={'cover'}
					src={question_detail.image_url && question_detail.image_url != "" ? question_detail.image_url : "/video_poster.png"}
					alt="Image thumbnail"
				/>
				<audio
				autoPlay
				style={{
					width: '100%',
				}}
				ref={audioRef}
				controls
				src={question_detail.audio_url}>
				</audio>
			</Flex>}
			<Heading color="white" p={4} size="md" textAlign="center">
				{question_detail.content}
			</Heading>
		</Flex>
		<Flex justifyContent="center" alignItems="center" p={4} bg="rgba(0,0,0,.2)" rounded="lg" flexDirection="column">
			<Flex justify={'center'} pt={4}>
				<CircularProgress value={countdown_percent} color='blue.500' size={{base: "80px", md: "100px"}}>
					<CircularProgressLabel color="white">{countdown}</CircularProgressLabel>
				</CircularProgress>
			</Flex>
			<SimpleGrid spacing={2} columns={answerCols}
				{...group}
				pointerEvents={correct_answer && 'none'}
				userSelect="none"
				w="100%"
				m="auto"
				p={2}
				position="relative"
				z-index={1}
			>
				{question_detail.multiple == 0 && question_detail.answers.map((item, index) => {
					const radio = getRadioProps({ value: item.id, sequence: alphabet[index] })
					return (
						<RadioCard image={item.image} corrects={correct_answer} key={item.id} {...radio}>
							{item.content}
						</RadioCard>
					)
				})}
				{question_detail.multiple == 1 && question_detail.answers.map((item, index) => {
					const checkbox = getCheckboxProps({ value: item.id, sequence: alphabet[index] })
					return (
						<CheckboxCard image={item.image} corrects={correct_answer} key={item.id} {...checkbox}>
							{item.content}
						</CheckboxCard>
					)
				})}
			</SimpleGrid>
		</Flex>
	</SimpleGrid>


})

Question.displayName = 'Question';
export default Question;