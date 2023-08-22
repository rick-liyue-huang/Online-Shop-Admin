import BillBoardForm from '@/components/forms/BillBoardForm';
import prismaDB from '@/lib/prisma-db';
import React from 'react';

export default async function SingleBillboardPage({
  params,
}: {
  params: {
    billboardId: string;
  };
}) {
  const billboard = await prismaDB.billboard.findUnique({
    where: {
      id: params.billboardId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardForm initialData={billboard} />
      </div>
    </div>
  );
}
