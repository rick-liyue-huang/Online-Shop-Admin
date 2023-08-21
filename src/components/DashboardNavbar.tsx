import { UserButton, auth, redirectToSignIn } from '@clerk/nextjs';
import React from 'react';
import DashboardMainNavbar from '@/components/DashboardMainNavbar';
import StoreSwitcher from '@/components/StoreSwitcher';
import { redirect } from 'next/navigation';
import prismaDB from '@/lib/prisma-db';

export default async function DashboardNavbar() {
  const { userId } = auth();

  if (!userId) {
    redirectToSignIn();
    // redirect('/sign-in');
  }

  const stores = await prismaDB.store.findMany({
    where: {
      userId: userId as string,
    },
  });

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        <DashboardMainNavbar className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}
