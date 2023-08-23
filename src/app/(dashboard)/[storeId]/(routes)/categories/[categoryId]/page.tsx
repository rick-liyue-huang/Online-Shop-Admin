import CategoryForm from '@/components/forms/CategoryForm';
import prismaDB from '@/lib/prisma-db';
import React from 'react';

export default async function SingleCategoryPage({
  params,
}: {
  params: {
    categoryId: string;
    storeId: string;
  };
}) {
  const category = await prismaDB.category.findUnique({
    where: {
      id: params.categoryId,
    },
  });

  const billboards = await prismaDB.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm initialData={category} billboards={billboards} />
      </div>
    </div>
  );
}
