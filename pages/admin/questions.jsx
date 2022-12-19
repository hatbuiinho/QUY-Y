import { Table, Thead, Tbody, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import {
  Button,
  Stack,
  Select,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Text,
  SimpleGrid,
  Box,
  Checkbox,
  IconButton,
  Divider,
  Image
} from '@chakra-ui/react';
import _ from 'lodash';
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'

import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react'

import { BiEdit, BiSelectMultiple } from "react-icons/bi";

import { Card, CardBody } from '@chakra-ui/react'
import Layout from '@/components/admin/Layout'
import QuestionsController from '@/controllers/admin/questions';
import { useState } from 'react';
import { useRouter } from 'next/router';

import request from '@/utils/request';

const MEDIA_TYPE = {
  0: 'image_url',
  1: 'image_url',
  2: 'video_url',
  3: 'audio_url',
};

const DEFAULT_QUESTION_DATA = {
  content: '',
  multiple: false,
  time: 0,
  score: 0,
  media_type: '0',
}

const AdminQuestions = ({ questions }) => {
  const router = useRouter();
  const { isOpen: isOpenAnswers, onOpen: onOpenAnswers, onClose: onCloseAnswers } = useDisclosure();
  const [question_error_message, setQuestionErrorMessage] = useState(null);
  const [answer_error_message, setAnswerErrorMessage] = useState(null);

  const [isOpenQuestion, setOpenEditQuestion] = useState(false);
  const [current_question, setCurrentQuestion] = useState(DEFAULT_QUESTION_DATA);
  const [answers, setAnswers] = useState([]);
  const [correct_answer, setCorrectAnswer] = useState(false);
  const [answer_content, setAnswerContent] = useState('');
  const [answer_image, setAnswerImage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const addAnswers = () => {
    request.put('/api/admin/questions/' + current_question.id, { answers }).then((body) => {
      router.replace(router.asPath);
      onCloseAnswers();
    }).catch((error) => {
      setAnswerErrorMessage(error);
    });
  }

  const setDataQuestion = (type, value) => {
    if(!type) return;
    if (type === 'time' || type === 'score' || type === 'media_type') {
      value = Number(value);
    }
    current_question[type] = value;
    console.log({current_question111: current_question})
    setCurrentQuestion(current_question);
  }

  const saveQuestion = () => {
    console.log({current_question})
    // return;
    request.post("/api/admin/questions", current_question).then((body) => {
      router.replace(router.asPath);
      closeModalQuestion();
    }).catch((error) => {
      setQuestionErrorMessage(error);
    });
  }

  const showAnswersModal = (question) => {
    setCurrentQuestion(question);
    setAnswers([]);
    onOpenAnswers();
  }

  const editQuestionModal = (question) => {
    setCurrentQuestion(question);
    setIsEditing(true);
    setOpenEditQuestion(true);
  }

  const handleAddAnswer = () => {
    setAnswers(answers => [...answers, {
      content: answer_content,
      image_url: answer_image,
      is_correct: correct_answer
    }]);
    setCorrectAnswer(false);
    setAnswerContent("");
    setAnswerImage("");
  };

  const closeModalQuestion = () => {
    setCurrentQuestion(DEFAULT_QUESTION_DATA);
    setOpenEditQuestion(false);
    setIsEditing(false);
  }

  const EditQuestion = () => {
    const {
      content, media_type, score, time, multiple,
    } = current_question;
    console.log({ current_question: _.get(current_question, `${MEDIA_TYPE[media_type]}`) })
    return (
      <Modal
        isOpen={isOpenQuestion}
        onClose={() => {
          setCurrentQuestion(DEFAULT_QUESTION_DATA);
          setOpenEditQuestion(false);
          setIsEditing(false);
        }}
        size={{ base: 'full', sm: 'xl' }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? 'Chỉnh sửa câu hỏi' : 'Tạo mới câu hỏi'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {question_error_message && <Alert mb={3} status='error'>
              <AlertIcon />
              {question_error_message}
            </Alert>}
            <FormControl>
              <FormLabel>Question</FormLabel>
              <Textarea defaultValue={content} placeholder='Content' resize='none' onChange={(e) => {
                setDataQuestion('content', e.target.value);
              }} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Media Type</FormLabel>
              <Stack direction={{ base: 'column', sm: 'row' }}>
                <Select
                  defaultValue={media_type}
                  w={{ base: '100%', sm: '50%', md: '45%' }}
                  onChange={(e) => {
                    setDataQuestion('media_type', e.target.value);
                  }}>
                  <option value={0}>None</option>
                  <option value={1}>Image</option>
                  <option value={2}>Video</option>
                  <option value={3}>Audio</option>
                </Select>
                <Input defaultValue={current_question[MEDIA_TYPE[media_type]]} disabled={media_type === 0} placeholder='URL' onChange={(e) => {
                  console.log(MEDIA_TYPE[media_type])
                  if (media_type !== 0) setDataQuestion(MEDIA_TYPE[media_type], e.target.value);
                }} />
              </Stack>
            </FormControl>
            <Stack mt={4} direction={'row'}>
              <FormControl>
                <FormLabel>Time</FormLabel>
                <NumberInput defaultValue={time}>
                  <NumberInputField onChange={(e) => {
                    setDataQuestion('time', e.target.value);
                  }} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <FormControl>
                <FormLabel>Score</FormLabel>
                <NumberInput defaultValue={score}>
                  <NumberInputField onChange={(e) => {
                    setDataQuestion('score', e.target.value);
                  }} />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
            </Stack>

            <FormControl mt={4}>
              <Checkbox defaultChecked={multiple} onChange={(e) => {
                setDataQuestion('multiple', e.target.checked);
              }}>Multiple Choice</Checkbox>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='yellow' mr={3} onClick={saveQuestion}>
              {isEditing ? 'Edit' : 'Save'}
            </Button>
            <Button onClick={() => {
              setCurrentQuestion(DEFAULT_QUESTION_DATA);
              setOpenEditQuestion(false);
              setIsEditing(false);
            }}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Layout bg="#f3f5f9">
      <Button onClick={() => {
        setOpenEditQuestion(true);
        setQuestionErrorMessage(null);
      }} colorScheme="orange" size='md'>New Question</Button>
      <Modal
        isOpen={isOpenAnswers}
        onClose={onCloseAnswers}
        size="full"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Text as="b">Question</Text>
            <Stack mb={3}>
              <Text>{current_question?.content}</Text>
              {current_question?.image_url && <Image
                src={current_question.image_url}
                alt={current_question.id}
                borderRadius='lg'
              />}
            </Stack>

            <Divider />

            <SimpleGrid mt={3} columns={{ base: 1, md: 2 }} spacing={10}>
              <Box>
                {answer_error_message && <Alert mb={3} status='error'>
                  <AlertIcon />
                  {answer_error_message}
                </Alert>}
                <FormControl>
                  <FormLabel>Answer</FormLabel>
                  <Textarea placeholder='Content' resize='none'
                    onChange={(e) => setAnswerContent(e.target.value)}
                    value={answer_content}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Image URL</FormLabel>
                  <Input placeholder='Image URL'
                    onChange={(e) => setAnswerImage(e.target.value)}
                    value={answer_image}
                  />
                </FormControl>
                <FormControl mt={4}>
                  <Checkbox isChecked={correct_answer} onChange={(e) => { setCorrectAnswer(e.target.checked) }}>Correct Answer</Checkbox>
                </FormControl>
                <Button my="20px" disabled={answer_content == ""} colorScheme='blue' mr={3} onClick={handleAddAnswer}>Add Answer</Button>

              </Box>
              <Box>
                <Text as="b">List of answers</Text>
                {answers.length == 0 && <Text>Empty</Text>}
                {answers.length > 0 && answers.map((answer, index) => (
                  <Card mt={3} key={index} maxW='sm'>
                    <CardBody>
                      <Stack spacing='3'>
                        <Text size='md'>{index + 1}. {answer.content}</Text>
                      </Stack>
                      {answer.image_url && <Image
                        mt='6'
                        src={answer.image_url}
                        alt='Image Answer'
                        borderRadius='lg'
                      />}
                    </CardBody>
                  </Card>
                ))}
              </Box>
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='yellow' mr={3} disabled={answers.length == 0} onClick={addAnswers}>
              Save
            </Button>
            <Button onClick={onCloseAnswers}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <TableContainer bg="white" borderRadius="lg" mt="20px">
        <Table variant='simple'>
          {questions.length == 0 && <TableCaption>Empty Data</TableCaption>}
          <Thead>
            <Tr>
              <Th>Question</Th>
              <Th>Time (seconds)</Th>
              <Th isNumeric>Score</Th>
              <Th></Th>
            </Tr>
          </Thead>
          {questions.length > 0 && <Tbody>
            {questions.map((question, index) => (
              <Tr key={index}>
                <Td>{question.content}</Td>
                <Td>{question.time}</Td>
                <Td isNumeric>{question.score}</Td>
                <Td>
                  <Stack direction="row">
                    <IconButton aria-label='Edit Question' icon={<BiEdit />}
                      onClick={() => { editQuestionModal(question) }} />
                    <IconButton aria-label='Add Answers' icon={<BiSelectMultiple />}
                      onClick={() => { showAnswersModal(question) }} />
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>}
        </Table>
      </TableContainer>
      <EditQuestion />
    </Layout>
  )
}

export const getServerSideProps = QuestionsController.getAll;

export default AdminQuestions;