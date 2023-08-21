import prismaDB from '@/lib/prisma-db';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function SettingUpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirectToSignIn();
    // redirect('/')
  }

  const store = await prismaDB.store.findFirst({
    where: {
      userId: userId as string,
    },
  });

  if (store) {
    redirect(`/${store.id}`);
  }

  return <>{children}</>;
}
