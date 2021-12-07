import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface Props {
  children: React.ReactElement;
}

export default function Layout({ children }: Props): React.ReactElement {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export const getLayout = (page) => <Layout>{page}</Layout>;
