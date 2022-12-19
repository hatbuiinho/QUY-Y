import {
	Box,
	Text,
	HStack,
	Image
} from '@chakra-ui/react';
import { useCheckbox } from '@chakra-ui/react';
import answerClasses from '@/styles/question.module.css';
import { useState, useEffect } from 'react';

function CheckboxCard(props) {
	const correct_answer = props.corrects;
	const { state, getInputProps, getCheckboxProps } = useCheckbox(props)
	const input = getInputProps()
	const checkbox = getCheckboxProps()
	const [has_error, setError] = useState(false);
	const [has_success, setSuccess] = useState(false);
	const [has_missing, setMissing] = useState(false);

	useEffect(() => {
		if (correct_answer && correct_answer.indexOf(props.value) < 0 && state.isChecked)
			setError(true)
		if (correct_answer && correct_answer.indexOf(props.value) > -1 && state.isChecked)
			setSuccess(true)
		if (correct_answer && correct_answer.indexOf(props.value) > -1 && !state.isChecked)
			setMissing(true)
	}, [correct_answer]);

	return (
		<Box as='label'>
			<input {...input} />
			<Box
				h='100%'
				{...checkbox}
				cursor='pointer'
				borderWidth='1px'
				borderRadius='md'
				boxShadow='md'
				bg={has_success || has_missing ? 'green.500' : (has_error ? 'red.500' : (state.isChecked ? 'yellow.400' : "#e5e8ee"))}
				borderColor={has_success || has_missing ? 'green.500' : (has_error ? 'red.500' : (state.isChecked ? 'yellow.400' : "#e5e8ee"))}
				opacity={(!has_error && has_missing) ? 0.5 : 1}
				color={has_success || has_missing ? 'white' : (has_error ? 'white' : (state.isChecked ? 'yellow.800' : "pink.900"))}
				_hover={{
					bg: !state.isChecked && 'gray.300',
					borderColor: !state.isChecked && 'gray.300'
				}}
				px={5}
				py={3}
			>
				<Box h='100%'>
					<HStack spacing="5">
						<Box className={answerClasses.key_item}
							borderColor={has_success || has_missing ? 'white' : (has_error ? 'white' : (state.isChecked ? 'yellow.800' : "pink.900"))}
						>
							<Text fontSize={'12px'}>{props.sequence}</Text>
						</Box>
						<Text>{props.children}</Text>
					</HStack>
					{props.image && <Image mt={4} src={props.image} maxW="300" htmlWidth={"100%"} alt="Answer Image" />}
				</Box>

			</Box>
		</Box>
	)
}
export default CheckboxCard