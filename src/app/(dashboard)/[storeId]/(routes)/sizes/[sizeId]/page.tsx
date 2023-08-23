import BillBoardForm from '@/components/forms/BillBoardForm';
import SizeForm from '@/components/forms/SizeForm';
import prismaDB from '@/lib/prisma-db';
import React from 'react';

export default async function SingleSizePage({
  params,
}: {
  params: {
    sizeId: string;
  };
}) {
  const size = await prismaDB.size.findUnique({
    where: {
      id: params.sizeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizeForm initialData={size} />
      </div>
    </div>
  );
}
