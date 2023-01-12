import React from 'react'
import UserNavigation from '../user/user-navigation';
import ContentWrapper from './content-wrapper';
import PageWrapper from './page-wrapper';

export default function Layout({children}: React.PropsWithChildren) {
  return (
    <PageWrapper>
      <UserNavigation />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </PageWrapper>
  );
}
