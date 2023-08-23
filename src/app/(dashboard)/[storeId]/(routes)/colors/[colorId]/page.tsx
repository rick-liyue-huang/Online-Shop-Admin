import ColorForm from '@/components/forms/ColorForm';
import prismaDB from '@/lib/prisma-db';
import React from 'react';

export default async function SingleColorPage({
  params,
}: {
  params: {
    colorId: string;
  };
}) {
  const color = await prismaDB.color.findUnique({
    where: {
      id: params.colorId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ColorForm initialData={color} />
      </div>
    </div>
  );
}
