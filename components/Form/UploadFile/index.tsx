import {
  AspectRatio,
  Box,
  Container,
  Heading,
  Image,
  Input,
  InputProps,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useField } from 'formik';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import API from '../../../apis/constants';
import useAxios from '../../../hooks/useAxios';
// import useCustomColorMode from '~/hooks/useColorMode';
import { formatUrl } from '../../../utils/functions';

type UploadFileProps = InputProps & { dropLabel?: string, haveImage: boolean, updateImageSuccess: any };
type ImageResponse = {
  fileName: string;
  storedFileName: string;
};
type UploadResponse = { data?: ImageResponse[] };
export default function UploadFile(props: UploadFileProps) {
  const { name = '', placeholder, dropLabel, haveImage, updateImageSuccess } = props;
  const [label, setLabel] = useState(placeholder);
  const [file, setFile] = useState<File | undefined>();
  const [data, setData] = useState<any>();
  const [field, _, helpers] = useField(name);
  // const { primaryColor } = useCustomColorMode();

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleDrop = (e) => {
    setFile(e.dataTransfer.files[0]);
  };
  useEffect(() => {
    if (file) {
      const formData = new FormData();
      formData.append('files', file);
      setData(formData);
    }
  }, [file]);

  /* Upload file */
  const { cancel, data: uploadResponse } = useAxios<UploadResponse>(
    {
      url: API.UPLOAD_PHOTO,
      method: 'post',
      data,
      params: {
        folder: 'dkdl_avatar',
      },
    },
    [data],
  );
  if (!file && cancel) {
    cancel.cancel();
  }

  useEffect(() => {
    if (uploadResponse?.data) {
      updateImageSuccess(true);
      helpers.setValue(
        formatUrl(API.GET_PHOTO, {
          key: uploadResponse.data[0]?.storedFileName,
        }),
      );
    }
  }, [uploadResponse]);

  return (
    <Container my='2' centerContent>
      <AspectRatio width='200px' ratio={1}>
        <Box
          borderColor={!haveImage ? 'red' : 'grey.300'}
          borderStyle='dashed'
          borderWidth='2px'
          rounded='md'
          shadow='sm'
          role='group'
          transition='all 150ms ease-in-out'
          _hover={{
            shadow: 'md',
          }}
          as={motion.div}
          initial='rest'
          animate='rest'
          whileHover='hover'
        >
          <Box position='relative' height='100%' width='100%'>
            <Box
              position='absolute'
              top='0'
              left='0'
              height='100%'
              width='100%'
              display='flex'
              flexDirection='column'
            >
              <Stack
                height='100%'
                width='100%'
                display='flex'
                alignItems='center'
                justify='center'
              // spacing='4'
              >
                {field.value ? (
                  <Box position='relative'>
                    <Image src={field.value} />
                  </Box>
                ) : (
                  <Stack p='8' textAlign='center' spacing='1'>
                    <Heading fontSize='lg' fontWeight='bold'>
                      {label}
                    </Heading>
                    <Text fontWeight='light'>hoặc bấm để chọn ảnh</Text>
                  </Stack>
                )}
              </Stack>
            </Box>
            <Input
              cursor='pointer'
              type='file'
              height='100%'
              width='100%'
              position='absolute'
              top='0'
              left='0'
              opacity='0'
              aria-hidden='true'
              accept='image/*'
              onDragLeave={() => setLabel(placeholder)}
              onDragEnter={() => setLabel(dropLabel)}
              onDrop={handleDrop}
              onChange={handleChange}
            />
          </Box>
        </Box>
      </AspectRatio>
      {!haveImage && <Text fontWeight='red' color={'red'}>Vui lòng chọn ảnh</Text>}
    </Container>
  );
}

UploadFile.defaultProps = {
  placeholder: 'Kéo ảnh vào',
  dropLabel: 'Thả vào đây ạ',
} as UploadFileProps;
