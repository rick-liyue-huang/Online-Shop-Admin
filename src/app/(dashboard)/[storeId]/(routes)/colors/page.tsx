import { ColorColumn } from '@/components/ui/columns';
import prismaDB from '@/lib/prisma-db';
import React from 'react';
import { format } from 'date-fns';
import ColorClient from '@/components/clients/ColorClient';

export default async function ColorsPage({
  params,
}: {
  params: { storeId: string };
}) {
  const colors = await prismaDB.color.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedColors: ColorColumn[] = colors.map((color) => ({
    id: color.id,
    name: color.name,
    value: color.value,
    createdAt: format(color.createdAt, 'dd/MM/yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorClient data={formattedColors} />
      </div>
    </div>
  );
}
