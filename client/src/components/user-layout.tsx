import React from 'react'
import ContentWrapper from './wrapper/content-wrapper';
import PageWrapper from './wrapper/page-wrapper';
import UserNavigation from './user-navigation';

export default function UserLayout({children}: React.PropsWithChildren) {
  return (
    <PageWrapper>
      <UserNavigation />
      <ContentWrapper>
        {children}
      </ContentWrapper>
    </PageWrapper>
  );
}
