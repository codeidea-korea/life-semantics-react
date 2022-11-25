import BaseLayout from '@layouts/BaseLayout';
import React from 'react';
import TitleHeadComponent from '@/components/head/TitleHeadComponent';

const LoginLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseLayout>
    <TitleHeadComponent name='통증' targetUrl= ""/>
      {children}
    </BaseLayout>
  );
};

export default LoginLayout;
