import BillBoardClient from '@/components/clients/BillBoardClient';
import { BillboardColumn } from '@/components/ui/columns';
import prismaDB from '@/lib/prisma-db';
import React from 'react';
import { format } from 'date-fns';

export default async function BillBoardsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedBillboards: BillboardColumn[] = billboards.map(
    (billboard) => ({
      id: billboard.id,
      label: billboard.label,
      createdAt: format(billboard.createdAt, 'dd/MM/yyyy'),
    })
  );

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient data={formattedBillboards} />
      </div>
    </div>
  );
}
