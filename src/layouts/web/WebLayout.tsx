import React from 'react';

import BaseLayout from '@layouts/BaseLayout';

const WebLayout = ({ children }: { children: React.ReactNode }) => {

  return (
    <BaseLayout>
      {children}
    </BaseLayout>
  );
};

export default WebLayout;
