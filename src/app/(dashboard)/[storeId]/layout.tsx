import DashboardNavbar from '@/components/DashboardNavbar';
import prismaDB from '@/lib/prisma-db';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import React from 'react';

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirectToSignIn();
  }

  const store = await prismaDB.store.findFirst({
    where: {
      id: params.storeId,
      userId: userId as string,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <>
      <DashboardNavbar />
      {children}
    </>
  );
}
