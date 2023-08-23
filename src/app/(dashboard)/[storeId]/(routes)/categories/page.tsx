import BillBoardClient from '@/components/BillBoardClient';
import { CategoryColumn } from '@/components/ui/columns';
import prismaDB from '@/lib/prisma-db';
import React from 'react';
import { format } from 'date-fns';
import CategoryClient from '@/components/CategoryClient';

export default async function CategoriesPage({
  params,
}: {
  params: { storeId: string };
}) {
  const categories = await prismaDB.category.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedCategories: CategoryColumn[] = categories.map((category) => ({
    id: category.id,
    name: category.name,
    billboardLabel: category.billboard.label,
    createdAt: format(category.createdAt, 'dd/MM/yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryClient data={formattedCategories} />
      </div>
    </div>
  );
}
