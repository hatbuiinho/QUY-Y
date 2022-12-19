import { ChakraProvider } from '@chakra-ui/react';
import NextNProgress from 'nextjs-progressbar';
import { LoginProvider } from '@/providers/LoginProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';
import '@/styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NextNProgress options={{ showSpinner: false }} />
      <LoadingProvider>
        <LoginProvider>
          <Component {...pageProps} />
        </LoginProvider>
      </LoadingProvider>
    </ChakraProvider>
  );
}

export default MyApp;
