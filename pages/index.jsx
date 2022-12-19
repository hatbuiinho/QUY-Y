import {
  Box,
  Button,
  Heading,
  Radio,
  Stack,
  Text,
  Container,
  SimpleGrid,
  Divider,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Textarea,
  FormControl,
  useToast,
  GridItem,
} from '@chakra-ui/react';
import DateOfBirth from '@/components/Form/DateOfBirth';
import _ from 'lodash';
import { Form, FormikProvider, useFormik } from 'formik';
import Address from '@/components/Form/Address';
import Radios from '@/components/Form/Radios';
import CultivationPlace from '@/components/Form/CultivationPlace';
import FormInput from '@/components/Form/FormInput';
import UploadFile from '@/components/Form/UploadFile';
import Layout from '@/components/Layout';
import formRegister from '@/components/validationSchema/formRegister';
// import QrCode from '@/components/Modals/QrCode';
import { userService, alertService } from 'services';
import { useLoadingContext } from '@/providers/LoadingProvider';
import { useState, useEffect } from 'react';
import API from '../apis/constants';
import useAxios from '../hooks/useAxios';
import request from '../utils/request';

import { useRouter } from 'next/router';
const Register = (props) => {
  const router = useRouter();
  const toast = useToast();
  const { setLoading } = useLoadingContext();
  const [haveImage, setFlapImage] = useState(true);
  const [openQR, openQrCode] = useState(false);

  const { data: dataRegister } = useAxios(
    {
      method: 'get',
      url: API.GET_PAGE_QUY_Y,
      params: { Id: _.get(router, 'query.id') },
      transformResponse: ({ data }) => data,
    },
    []
  );

  // useEffect(() => {
  //   if (document.getElementsByClassName('sign-in')) {
  //     document.getElementsByClassName('sign-in')[0].style.display = 'none';
  //   }

  //   if (document.getElementsByClassName('sign-up')) {
  //     document.getElementsByClassName('sign-up')[0].style.display = 'none';
  //   }

  //   if (document.getElementsByClassName('sign-out')[0]) {
  //     document.getElementsByClassName('sign-out')[0].style.display = 'none';
  //   }
  // });

  if (!dataRegister) {
    // toast({
    //   title: 'Trang đăng ký không đúng',
    //   description: "Trở về trang hôm",
    //   status: 'warning',
    //   duration: 7000,
    //   isClosable: true,
    // });
    // setTimeout(() => {
    //   const returnUrl = router.query.returnUrl || '/';
    //   router.push(returnUrl);
    // }, 3000);
  }
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatarPath: '',
      fullName: '',
      gender: '1',
      phoneNumber: '',
      identityCard: '',
      email: '',
      dob: '',
      dobDate: '',
      dobMonth: '',
      dobYear: '',
      permanentAddress: '',
      provinceId: '',
      districtId: '',
      wardId: '',
    },
    validationSchema: formRegister,
    onSubmit: (values) => {
      // if (_.get(values, 'avatarPath') === '') {
      //   window.scrollTo({ top: 0, behavior: 'smooth' });
      //   setFlapImage(false);
      //   return;
      // }
      setLoading(true);
      // const submitData = {
      //   full_name: _.get(values, 'fullName'),
      //   id_card: _.get(values, 'identityCard'),
      //   email: _.get(values, 'email'),
      //   gender: _.get(values, 'gender'),
      //   phone: _.get(values, 'phoneNumber'),

      //   province_id: _.get(values, 'permanentAddress.provinceId'),
      //   district_id: _.get(values, 'permanentAddress.districtId'),
      //   ward_id: _.get(values, 'permanentAddress.wardId'),
      //   tt_province_id: _.get(values, 'temporaryAddress.districtId'),
      //   tt_province_id: _.get(values, 'temporaryAddress.provinceId'),
      //   tt_ward_id: _.get(values, 'temporaryAddress.wardId'),

      //   ctn_group_id: _.get(values, 'organizationStructureId'),

      //   birth_day: _.get(values, 'dob.date'),
      //   birth_month: _.get(values, 'dob.month'),
      //   birth_year: _.get(values, 'dob.year'),

      //   avatar: _.get(values, 'avatarPath'),
      //   nominator: _.get(values, 'Referencer'),
      //   note: _.get(values, 'note'),
      // }

      const submitData = {
        ...JSON.parse(dataRegister),
        fullName: _.get(values, 'fullName'),
        idCard: _.get(values, 'identityCard'),
        email: _.get(values, 'email'),
        gender: _.get(values, 'gender'),
        mobile: _.get(values, 'phoneNumber'),
        provinceId: _.get(values, 'permanentAddress.provinceId'),
        districtId: _.get(values, 'permanentAddress.districtId'),
        wardId: _.get(values, 'permanentAddress.wardId'),
        ttDistrictId: _.get(values, 'temporaryAddress.districtId'),
        ttProvinceId: _.get(values, 'temporaryAddress.provinceId'),
        ttWardId: _.get(values, 'temporaryAddress.wardId'),
        ctnGroupId: _.get(values, 'organizationStructureId'),
        birthDay: _.get(values, 'dobDate') || undefined,
        birthMonth: _.get(values, 'dobMonth') || undefined,
        birthYear: _.get(values, 'dobYear') || undefined,
        avatar: _.get(values, 'avatarPath'),
        nominator: _.get(values, 'Referencer'),
        note: _.get(values, 'note'),
      };
      request
        .post(API.POST_REGISTER_QUY_Y, submitData, { isNotCheck: true })
        .then((res) => {
          if (_.get(res, 'data')) {
            setLoading(false);
            toast({
              title: 'Đăng ký thành công',
              description: 'Chúc mừng quý phật tử đã đăng ký quy y thành công!',
              status: 'success',
              duration: 7000,
              isClosable: true,
              position: 'top',
            });
            setTimeout(() => {
              window.location.href = 'http://thongtin.thientonphatquang.com/';
              // const returnUrl = router.query.returnUrl || '/';
              // router.push(returnUrl);
            }, 2000);
          }
        })
        .catch((message, option) => {
          setLoading(false);

          alertService.error(message, option);
        });
      // alertService.error(_.get(registerResponse, 'message'), option);
      // return userService.register(submitData)
      //   .then((rep) => {
      //     if (rep.status === 'success') {
      //       return userService.login(_.get(values, 'phoneNumber'), _.get(values, 'identityCard'))
      //         .then((rep) => {
      //           if (rep.status === 'success') {
      //             toast({
      //               title: 'Đăng ký thành công',
      //               description: "Chúc mừng quý phật tử đã đăng ký quy y thành công!",
      //               status: 'success',
      //               duration: 7000,
      //               isClosable: true,
      //             });
      //             setTimeout(() => {
      //               setLoading(false);
      //               const returnUrl = router.query.returnUrl || '/';
      //               router.push(returnUrl);
      //             }, 3000);
      //           }
      //         });
      //     }
      //     setLoading(false);
      //   })
      //   .catch((message, option) => {
      //     alertService.error(message, option);
      //     setLoading(false);
      //   });
    },
  });

  return (
    <Layout>
      {/* <QrCode open={openQR} setCloseQrCode={(flap) => {
        openQrCode(flap);
      }} /> */}
      <Box
        w={'full'}
        // bgGradient='linear(to-r,  blue.200, Blue.500)'
        bgGradient="linear(to-r, yellow.300, blue.500)"
        p={[2, 4, 6, 8, 10]}
      >
        <Container maxW={'4xl'} alignItems={'center'} rounded="md">
          <GridItem colSpan={{ base: 3 }}>
            <Box
              p={{ base: 4, sm: 6, md: '10px 40px' }}
              roundedTop={'5px'}
              boxShadow="dark-lg"
              bg="#FFFFFF"
            >
              <Stack spacing={1} textAlign={'center'}>
                <Heading
                  fontSize={{ base: '3xl', sm: '4xl', md: '5xl' }}
                  fontWeight={700}
                  color="yellow.500"
                >
                  {`Đăng ký Quy Y`}
                </Heading>
              </Stack>
              <Divider mb={2} mt={2} />
              <Box mt={0}>
                <FormikProvider value={formik}>
                  <Form noValidate>
                    <FormControl name="avatarPath" as="fieldset" border={1}>
                      <UploadFile
                        haveImage={haveImage}
                        name="avatarPath"
                        updateImageSuccess={(flap) => {
                          if (flap) {
                            setFlapImage(true);
                          }
                        }}
                      />
                    </FormControl>
                  </Form>
                </FormikProvider>
              </Box>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                <Box mb={5}>
                  <SimpleGrid mb={5} columns={{ base: 1, md: 1 }} spacing={5}>
                    <FormikProvider value={formik}>
                      <Form noValidate>
                        <Stack spacing={2}>
                          <FormInput
                            name="fullName"
                            label="Họ và tên"
                            isRequired
                          />
                        </Stack>
                      </Form>
                    </FormikProvider>
                  </SimpleGrid>
                  <SimpleGrid mb={5} columns={{ base: 1, md: 2 }} spacing={5}>
                    <Box>
                      <FormikProvider value={formik}>
                        <Form noValidate>
                          <Stack spacing={2}>
                            <FormInput
                              name="phoneNumber"
                              label="Số điện thoại"
                              pattern="[0-9]*"
                              inputMode="numeric"
                            />
                          </Stack>
                        </Form>
                      </FormikProvider>
                    </Box>
                    <Box>
                      <FormikProvider value={formik}>
                        <Form noValidate>
                          <Stack spacing={2}>
                            <FormInput
                              name="identityCard"
                              label="Số CCCD / Hộ chiếu"
                              inputMode="numeric"
                            />
                          </Stack>
                        </Form>
                      </FormikProvider>
                    </Box>
                  </SimpleGrid>
                  <SimpleGrid columns={{ base: 1, md: 1 }} spacing={5}>
                    <Box>
                      <FormikProvider value={formik}>
                        <Form noValidate>
                          <FormInput name="email" label="Email" />
                        </Form>
                      </FormikProvider>
                    </Box>
                  </SimpleGrid>
                </Box>

                <Box>
                  <FormikProvider value={formik}>
                    <Form noValidate>
                      <Stack>
                        <Radios
                          mb={'6px'}
                          spacing={8}
                          label="Giới tính"
                          name="gender"
                        >
                          <Radio value={'1'}>Nam</Radio>
                          <Radio value={'2'}>Nữ</Radio>
                        </Radios>
                        <DateOfBirth mb={'6px'} name="dob" label="Ngày sinh" />
                        <Address
                          style={{ marginTop: '20px' }}
                          name="permanentAddress"
                          label="Địa chỉ thường trú"
                        />
                      </Stack>
                    </Form>
                  </FormikProvider>
                </Box>
              </SimpleGrid>
              <Accordion defaultIndex={[0]} allowMultiple mt={10}>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      padding={'10px 5px'}
                      backgroundColor={'grey.50'}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Thông Tin Khác
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel padding={0} borderBlockEnd={'none'}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                        <Box>
                          <FormikProvider value={formik}>
                            <Form noValidate>
                              <FormInput
                                name="Referencer"
                                label="Người giới thiệu"
                              />
                            </Form>
                          </FormikProvider>
                        </Box>
                        <Box>
                          <FormikProvider value={formik}>
                            <Form noValidate>
                              <CultivationPlace
                                name="organizationStructureId"
                                className="organizationStructureId"
                                label="Địa điểm tu tập"
                              />
                            </Form>
                          </FormikProvider>
                        </Box>
                      </SimpleGrid>
                      <Box>
                        <FormikProvider value={formik}>
                          <Form noValidate>
                            <Address
                              name="temporaryAddress"
                              label="Địa chỉ tạm trú"
                              mb={5}
                            />
                          </Form>
                        </FormikProvider>
                      </Box>
                    </SimpleGrid>
                    <SimpleGrid columns={{ base: 1, md: 1 }}>
                      <Box>
                        <Box>
                          <FormikProvider value={formik}>
                            <Form noValidate>
                              <FormInput
                                name="note"
                                label="Ghi chú"
                                as={Textarea}
                                placeholder="Huynh đệ có thắc mắc gì không ạ?"
                              />
                            </Form>
                          </FormikProvider>
                        </Box>
                      </Box>
                    </SimpleGrid>
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              <Box width="100%" textAlign={'center'}>
                <FormikProvider value={formik}>
                  <Form noValidate>
                    <Button
                      type="submit"
                      fontFamily={'heading'}
                      mt={4}
                      mb={1}
                      w={'full'}
                      width="200px"
                      colorScheme="blue"
                    >
                      Đăng ký
                    </Button>
                    {/* <Button onClick={() => {
                      openQrCode(true);
                    }} fontFamily={'heading'} mt={8} mb={2} w={'full'} ml={5} width='100px'>
                      Mã QrCode
                    </Button> */}
                  </Form>
                </FormikProvider>
              </Box>
            </Box>
          </GridItem>
        </Container>
      </Box>
    </Layout>
  );
};

export default Register;
