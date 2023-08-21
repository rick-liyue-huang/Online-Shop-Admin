import prismaDB from '@/lib/prisma-db';
import React from 'react';

interface Props {
  params: {
    storeId: string;
  };
}

export default async function DashBoardPage({ params: { storeId } }: Props) {
  const store = await prismaDB.store.findFirst({
    where: {
      id: storeId,
    },
  });
  return <div>Active Store: {store?.name}</div>;
}
