import { SessionProvider } from 'next-auth/react';
import '../styles/index.css';
import 'antd/dist/antd.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout;

  return (
    <SessionProvider session={pageProps.session}>
      {getLayout ? (
        getLayout(<Component {...pageProps} />)
      ) : (
        <Component {...pageProps} />
      )}
    </SessionProvider>
  );
}

export default MyApp;
