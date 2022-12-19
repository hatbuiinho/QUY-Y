import { Box, Container, Heading, GridItem, Button } from '@chakra-ui/react';
import _ from 'lodash';

import Layout from '@/components/Layout';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import QRCode from 'react-qr-code';
const QR = (props) => {
  const router = useRouter();
  const [urlQrCode, setQrCode] = useState('');
  // const onClose = () => {
  //   setCloseQrCode(false)
  // }

  useEffect(() => {
    setQrCode(_.replace(window.location.href, '/qr', ''));
  });

  const onImageCownload = () => {
    const svg = document.getElementById('QRCode');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'QRCode';
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <Layout>
      <Box
        w={'full'}
        backgroundImage={'url(/cover-1.jpg)'}
        backgroundSize={'cover'}
        backgroundPosition={'center'}
        height={'100%'}
        p={[2, 4, 6, 8]}
      >
        <Container maxW={'lg'} pt={{ base: 5 }} alignItems={'center'}>
          <GridItem colSpan={{ base: 3 }}>
            <Box
              bg={'gray.50'}
              p={{ base: 4, sm: 6, md: '10px 40px' }}
              roundedTop={'5px'}
            >
              <Box textAlign={'center'}>
                <Heading
                  fontSize={{ base: '30px', sm: '20px', md: '25px' }}
                  color="blue.500"
                >
                  {`Quét má QR lấy link đăng ký quy y`}
                </Heading>
              </Box>
              <Box display={'none'}>
                <QRCode id="QRCode" title="Custom Title" value={urlQrCode} />
              </Box>
              <Box p={3} textAlign="center">
                <QRCode
                  id="QRCode"
                  // size={256}
                  style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
                  value={urlQrCode}
                  // viewBox={`0 0 256 256`}
                />
              </Box>
              <Box textAlign={'center'}>
                <Button
                  mt={5}
                  width="200px"
                  colorScheme="blue"
                  onClick={() => onImageCownload()}
                  mr={3}
                >
                  Lưu về máy
                </Button>
              </Box>
            </Box>
          </GridItem>
        </Container>
      </Box>
    </Layout>
  );
};

export default QR;
