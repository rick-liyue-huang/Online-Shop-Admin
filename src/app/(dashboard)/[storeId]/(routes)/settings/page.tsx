import SettingsForm from '@/components/forms/SettingsForm';
import prismaDB from '@/lib/prisma-db';
import { auth, redirectToSignIn } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    storeId: string;
  };
}

export default async function SettingUpPage({ params: { storeId } }: Props) {
  const { userId } = auth();

  if (!userId) {
    // redirect('/sign-in');
    redirectToSignIn();
  }

  const store = await prismaDB.store.findFirst({
    where: {
      id: storeId,
      userId: userId as string,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}
