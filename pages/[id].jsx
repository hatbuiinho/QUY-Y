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
  HStack,
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
import FloatingLabel from '@/components/Form/FloatingLabel/FloatingLabel';
const Register = (props) => {
  const router = useRouter();
  const toast = useToast();
  const { setLoading, isLoading } = useLoadingContext();
  const [haveImage, setFlapImage] = useState(true);
  const [openQR, openQrCode] = useState(false);
  const { query } = useRouter();
  const [success, setSuccess] = useState();

  const { data: dataRegister } = useAxios(
    {
      method: 'get',
      url: API.GET_PAGE_QUY_Y,
      params: { Id: query.id },
      transformResponse: ({ data }) => data,
    },
    [query.id]
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
    //   title: 'Trang ????ng k?? kh??ng ????ng',
    //   description: "Tr??? v??? trang h??m",
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
      address: '',
      ttAddress: '',
    },
    validationSchema: formRegister,
    onSubmit: (values) => {
      // if (_.get(values, 'avatarPath') === '') {
      //   window.scrollTo({ top: 0, behavior: 'smooth' });
      //   setFlapImage(false);
      //   return;
      // }
      setLoading(true);

      const submitData = {
        ...JSON.parse(dataRegister),
        fullName: _.get(values, 'fullName'),
        idCard: _.get(values, 'identityCard'),
        email: _.get(values, 'email'),
        gender: _.get(values, 'gender'),
        mobile: _.get(values, 'phoneNumber'),

        ttProvinceId: _.get(values, 'permanentAddress.provinceId'),
        ttDistrictId: _.get(values, 'permanentAddress.districtId'),
        ttWardId: _.get(values, 'permanentAddress.wardId'),
        ttAddress: _.get(values, 'ttAddress'),

        districtId: _.get(values, 'temporaryAddress.districtId'),
        provinceId: _.get(values, 'temporaryAddress.provinceId'),
        wardId: _.get(values, 'temporaryAddress.wardId'),
        address: _.get(values, 'address'),

        ctnGroupId: _.get(values, 'organizationStructureId'),
        // birthDay: _.get(values, 'dobDate') || undefined,
        // birthMonth: _.get(values, 'dobMonth') || undefined,
        birthYear: _.get(values, 'birthYear') || undefined,
        avatar: _.get(values, 'avatarPath'),
        nominator: _.get(values, 'Referencer'),
        note: _.get(values, 'note'),
        id: -1,
      };
      request
        .post(API.POST_REGISTER_QUY_Y, submitData, { isNotCheck: true })
        .then((res) => {
          if (_.get(res, 'data')) {
            setLoading(false);
            toast({
              title: '????ng k?? th??nh c??ng',
              description:
                'Ch??c m???ng qu?? ph???t t??? ???? ????ng k?? Quy Y Tam B???o th??nh c??ng!',
              status: 'success',
              duration: 7000,
              isClosable: true,
              position: 'top',
              variant: 'left-accent',
            });
            setSuccess(true);
            setTimeout(() => {
              window.location.href = 'http://thongtin.thientonphatquang.com/';
            }, 6000);
          } else {
            toast({
              title: 'L???i',
              description: _.get(res, 'message', ''),
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top',
            });
          }
        })
        .catch((message, option) => {
          setLoading(false);
          alertService.error(message, option);
        });
    },
  });

  return (
    <Layout>
      {/* <QrCode open={openQR} setCloseQrCode={(flap) => {
        openQrCode(flap);
      }} /> */}
      <FormikProvider value={formik}>
        <Form>
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
                      {`????ng K?? Quy Y`}
                    </Heading>
                  </Stack>
                  <Divider mb={2} mt={2} />
                  <Box mt={0}>
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
                  </Box>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                    <Box mb={5}>
                      <SimpleGrid
                        mb={5}
                        columns={{ base: 1, md: 1 }}
                        spacing={5}
                      >
                        <Form noValidate>
                          <Stack spacing={2}>
                            <FormInput
                              name="fullName"
                              label="H??? v?? t??n"
                              isRequired
                            />
                          </Stack>
                        </Form>
                      </SimpleGrid>
                      <Box>
                        <HStack spacing={2}>
                          <FormInput
                            name="phoneNumber"
                            label="S??? ??i???n tho???i"
                            pattern="[0-9]*"
                            inputMode="numeric"
                          />
                          <FormInput name="email" label="Email" />
                        </HStack>
                      </Box>
                      <Address
                        mt={2}
                        name="permanentAddress"
                        label="?????a ch??? theo CCCD"
                        mb={5}
                      />
                      <FloatingLabel label="S??? nh??" name="ttAddress" />
                      {/* <Box>
                      <FormikProvider value={formik}>
                        <Form noValidate>
                          <Stack spacing={2}>
                            <FormInput
                              name="identityCard"
                              label="S??? CCCD"
                              inputMode="numeric"
                            />
                          </Stack>
                        </Form>
                      </FormikProvider>
                    </Box> */}
                    </Box>

                    <Box>
                      <Stack>
                        <Radios
                          mb={'6px'}
                          spacing={8}
                          label="Gi???i t??nh"
                          name="gender"
                        >
                          <Radio value={'1'}>Nam</Radio>
                          <Radio value={'2'}>N???</Radio>
                        </Radios>
                        {/* <DateOfBirth mb={'6px'} name="dob" label="Ng??y sinh" /> */}
                        <FormInput name="birthYear" label="N??m sinh" />

                        <Box>
                          <Address
                            name="temporaryAddress"
                            label="?????a ch??? t???m tr??"
                            mb={5}
                          />
                          <FloatingLabel label="S??? nh??" name="address" />
                        </Box>
                      </Stack>
                    </Box>
                  </SimpleGrid>
                  <Accordion defaultIndex={[0]} allowMultiple mt={5}>
                    <AccordionItem>
                      <h2>
                        <AccordionButton
                          padding={'10px 5px'}
                          backgroundColor={'grey.50'}
                        >
                          <Box as="span" flex="1" textAlign="left">
                            Th??ng Tin Kh??c
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h2>
                      <AccordionPanel padding={0} borderBlockEnd={'none'}>
                        {/* <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}> */}
                        <HStack dir={{ base: 'column', sm: 'row' }} spacing={2}>
                          <FormInput
                            name="Referencer"
                            label="Ng?????i gi???i thi???u"
                          />
                          <CultivationPlace
                            name="organizationStructureId"
                            className="organizationStructureId"
                            label="?????a ??i???m tu t???p"
                          />
                        </HStack>
                        <FormInput
                          name="note"
                          label="Ghi ch??"
                          as={Textarea}
                          placeholder="Huynh ????? c?? th???c m???c g?? kh??ng ????"
                        />
                        {/* </SimpleGrid> */}
                        <SimpleGrid columns={{ base: 1, md: 1 }}>
                          <Box>
                            <Box></Box>
                          </Box>
                        </SimpleGrid>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                  <Box width="100%" textAlign={'center'}>
                    <Button
                      type="submit"
                      fontFamily={'heading'}
                      mt={4}
                      mb={1}
                      w={'full'}
                      width="200px"
                      colorScheme="blue"
                      isLoading={isLoading}
                      loadingText="Loading..."
                      spinnerPlacement="start"
                      disabled={success}
                    >
                      {success ? '???? ????ng k??' : '????ng k??'}
                    </Button>
                    {/* <Button onClick={() => {
                      openQrCode(true);
                    }} fontFamily={'heading'} mt={8} mb={2} w={'full'} ml={5} width='100px'>
                      M?? QrCode
                    </Button> */}
                    {/* <Button
                      isLoading
                      loadingText="Loading"
                      colorScheme="teal"
                      variant="outline"
                      spinnerPlacement="start"
                    >
                      Submit
                    </Button> */}
                  </Box>
                </Box>
              </GridItem>
            </Container>
          </Box>
        </Form>
      </FormikProvider>
    </Layout>
  );
};

export default Register;
