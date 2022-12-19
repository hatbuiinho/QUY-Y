import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Heading,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';

// const urlQrCode = window.location.href;
// const urlQrCode = '';

export default function QrCode({open = true, setCloseQrCode}) {

  const [urlQrCode, setQrCode] = useState('');
  const onClose = () => {
    setCloseQrCode(false)
  }

  useEffect(() => {
    setQrCode(window.location.href);
  })

  const onImageCownload = () => {
    const svg = document.getElementById("QRCode");
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "QRCode";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={open}
      onClose={onClose}
      size={['sm', 'md', 'lg']}
      id='download-image'
    // isCentered={isCentered}
    >
      <ModalOverlay />
      <ModalContent fontSize={['sm']} my={0}>
        <ModalHeader textAlign={'center'}>
          <Heading pt={0} as='h5' size='sx'>
            Mã QR Code
          </Heading>
        </ModalHeader>
        <ModalCloseButton onClick={onClose} />
        <ModalBody px={0} background={'#FFFFFF'}>
          <Box display={'none'}><QRCode  id="QRCode" title="Custom Title" value={urlQrCode} /></Box>
          <Box p={3} textAlign='center'>
            <QRCode
              id='QRCode'
              // size={256}
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={urlQrCode}
            // viewBox={`0 0 256 256`}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={() => onImageCownload()} mr={3}>
            Lưu về máy
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
