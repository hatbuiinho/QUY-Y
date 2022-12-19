import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Heading } from '@chakra-ui/react';
import {
    ListItem,
    OrderedList,
    UnorderedList,
    Button,
    Flex, Box,
    useDisclosure,
    Stack
} from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
let socket;
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useRouter } from 'next/router';


const Home = () => {
    const router = useRouter();

    const { isOpen, onOpen, onClose } = useDisclosure()

    useEffect(() => {
        socketInitializer()
    }, [])

    const [answers, setAnswers] = useState([])

    const socketInitializer = async () => {
        await fetch('/api/socket');
        socket = io()

        socket.on('connect', () => {
            console.log('connected');
            socket.emit('set-admin', 'hello');
        })

        socket.on('update-answer', msg => {
            setAnswers([msg.user + " trả lời câu hỏi " + msg.question + " với đáp án " + msg.value])
        })
    }

    const sendQuestion = (question_id) => {
        socket.emit('input-change', {
            user: 'admin',
            value: question_id
        })
    }

    return (
        <Flex w="100vw" h="100vh" bg="#f3f5f9" flexDirection={{ base: "column", md: "row" }}>
            <Stack direction={{ base: 'row', md: 'column' }} spacing={10} p={{ base: 1, md: 4 }} bg="white" minW="110px" boxShadow={'2xl'}>
                <Button onClick={() => router.push("/admin")}>Home</Button>
                <Button onClick={onOpen}>Questions</Button>
            </Stack>
            <Flex flex="1" flexDirection='column' alignItems="center" justifyContent="center" overflowY={{ md: 'auto' }}>
                <Box w='100%' h='100%'>
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
            </Flex>
            <Modal onClose={onClose} size={'full'} isOpen={isOpen}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex flexDirection="column">
                            <Tabs>
                                <TabList>
                                    <Tab>Câu hỏi 1</Tab>
                                    <Tab>Câu hỏi 2</Tab>
                                </TabList>

                                <TabPanels>
                                    <TabPanel>
                                        <Heading>Ba ngôi báu là gì?</Heading>
                                        <OrderedList>
                                            <ListItem>Giới, định, tuệ.</ListItem>
                                            <ListItem>Vô thường, vô ngã, Niết Bàn tịch tịnh.</ListItem>
                                            <ListItem>Phật, Pháp, Tăng.</ListItem>
                                        </OrderedList>
                                        <Button onClick={() => { sendQuestion(0) }}>Gửi câu hỏi</Button>
                                    </TabPanel>
                                    <TabPanel>
                                        <Heading>Ngũ giới gồm những gì?</Heading>
                                        <OrderedList>
                                            <ListItem>Không sát sinh, không trộm cắp, không tà dâm, không nói dối, không uống rượu.</ListItem>
                                            <ListItem>Không ăn phi thời, không trộm cướp, không nói dối, không vọng ngữ, không uống rượu.</ListItem>
                                            <ListItem>Không trộm cắp, không giết người, không tà dâm, không nói dối, không uống rượu.</ListItem>
                                        </OrderedList>
                                        <Button onClick={() => { sendQuestion(1) }}>Gửi câu hỏi</Button>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                            <Box>
                                <Heading>Câu trả lời của phật tử</Heading>
                                <UnorderedList>
                                    {answers.map((item, index) => (
                                        <ListItem key={index}>{item}</ListItem>
                                    ))}
                                </UnorderedList>

                            </Box>
                        </Flex>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>


    )
}

export default Home;