import { useState } from "react"
import * as Yup from 'yup';
import { useContext, createContext } from "react"
import { userService, alertService } from 'services';
import { useDisclosure } from '@chakra-ui/react';
import FormInput from 'components/FormInput';

import { useLoadingContext } from "@/providers/LoadingProvider"

import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	Button,
	Collapse,
	Alert,
	AlertIcon,
	AlertTitle,
} from '@chakra-ui/react'

import { Form, FormikProvider, useFormik } from 'formik';
import { useRouter } from 'next/router'

const LoginContext = createContext();
const useLoginContext = function () {
	return useContext(LoginContext);
};
let next_path = null;
const LoginProvider = function ({ children }) {
	const { setLoading } = useLoadingContext();
	const router = useRouter();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [isRegister, setRegister] = useState(false);

	const openLogin = function (url, isRegis = false) {
		next_path = url;
		onOpen();
		setRegister(isRegis);
	}
	let value = { openLogin };
	const { isOpen: isOpenLoginAlert, onOpen: onOpenLoginAlert } = useDisclosure();


	const loginMember = (
		phone = login_phone,
		id_card = login_id_card,
	) => {
		setLoading(true);
		return userService.login(phone, id_card)
			.then((rep) => {
				if (rep.status === 'success') {
					let returnUrl = router.query.returnUrl || next_path || '/';
					if (next_path == "first_step_code")
						returnUrl = "/ceremony/" + rep.data.first_step_code;
					router.push(returnUrl);
					onClose();
				}
				setLoading(false);
			})
			.catch((message, option) => {
				alertService.error(message, option);
				onOpenLoginAlert();
				setLoading(false);
			});
	};


	const validateForm = () => {
		const REGEX_PHONE = new RegExp(/^(09|03|08|07|05)+([0-9]{8})$/);
		const validateRegis = {
			FullName: Yup.string().required('Xin hãy nhập họ và tên'),
			Email: Yup.string().email('Email không hợp lệ').required('Xin hãy nhập email'),
		};
		return Yup.object({
			Phone: Yup.string()
				.required('Xin hãy nhập số điện thoại')
				.matches(REGEX_PHONE, 'Số điện thoại không hợp lệ'),
			IdCard: Yup.string().required('Xin hãy nhập số CCCD / Hộ chiếu'),
			...(isRegister ? validateRegis : {})
		});
	}

	const registerMember = (values) => {
		setLoading(true);
		const submitData = {
			full_name: _.get(values, 'FullName'),
			phap_danh: _.get(values, 'PhapDanh'),
			email: _.get(values, 'Email'),
			login_phone: _.get(values, 'Phone'),
			login_id_card: _.get(values, 'IdCard'),
		}
		return userService.register(submitData)
			.then((rep) => {
				if (rep.status === 'success') {
					loginMember(_.get(rep, 'data.phone'), _.get(rep, 'data.id_card'));
					const returnUrl = router.query.returnUrl || '/';
					router.push(returnUrl);
					onClose();
				}
				setLoading(false);
			})
			.catch((message, option) => {
				alertService.error(message, option);
				onOpenLoginAlert();
				setLoading(false);
			});
	};

	const regisFields = isRegister ? {
		Email: '',
		FullName: '',
	} : {};

	const formik = useFormik({
		enableReinitialize: true,
		initialValues: {
			Phone: '',
			IdCard: '',
			...regisFields,
		},
		validationSchema: validateForm,
		onSubmit: (values) => {
			if (isRegister) {
				registerMember(values);
			} else {
				loginMember(_.get(values, 'Phone'), _.get(values, 'IdCard'));
			}
		},
		onChange: (invalid) => {
			console.log({ invalid })
		}
	});


	return <LoginContext.Provider value={value}>
		<Modal
			isOpen={isOpen}
			onClose={onClose}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập tài khoản'}</ModalHeader>
				<ModalCloseButton />
				<ModalBody pb={6}>
					<Collapse in={isOpenLoginAlert} animateOpacity>
						<Alert status='error' variant='subtle' mb={2}>
							<AlertIcon />
							<AlertTitle>{isRegister ? 'Lỗi đăng ký' : 'Lỗi đăng nhập'}</AlertTitle>
						</Alert>
					</Collapse>
					<FormikProvider value={formik}>
						<Form noValidate>
							{isRegister && (
								<>
									<FormControl isRequired>
										<FormInput
											label='Họ và tên'
											name='FullName'
											isRequired
										/>
									</FormControl>

									<FormControl mt={4} isRequired>
										<FormInput
											name='PhapDanh'
											label='Pháp Danh'
										/>
									</FormControl>

									<FormControl mt={4} isRequired>
										<FormInput
											name='Email'
											label='Email'
											isRequired
										/>
									</FormControl>
								</>
							)}
							<br />
							<FormControl isRequired>
								<FormInput
									name='Phone'
									label='Số điện thoại'
									isRequired
								/>
							</FormControl>
							<FormControl mt={4} isRequired>
								<FormInput
									name='IdCard'
									label='Số CCCD/CMT'
									isRequired
								// value={login_id_card}
								// onChange={(e) => handleChangeValue(setLoginIdCard, e)}
								/>
							</FormControl>
						</Form>
					</FormikProvider>
				</ModalBody>
				<ModalFooter>
					<FormikProvider value={formik}>
						<Form noValidate>
							<Button type='submit'>{isRegister ? 'Đăng ký' : 'Đăng nhập'}</Button>
							<Button ml={3} onClick={onClose}>Cancel</Button>
						</Form>
					</FormikProvider>
				</ModalFooter>
			</ModalContent>

		</Modal>
		{children}
	</LoginContext.Provider>;
}

export { LoginProvider, LoginContext, useLoginContext }