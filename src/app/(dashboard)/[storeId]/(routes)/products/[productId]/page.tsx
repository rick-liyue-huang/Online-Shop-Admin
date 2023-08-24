import ProductForm from '@/components/forms/ProductForm';
import prismaDB from '@/lib/prisma-db';
import React from 'react';

export default async function SingleProductPage({
  params,
}: {
  params: {
    productId: string;
    storeId: string;
  };
}) {
  const product = await prismaDB.product.findUnique({
    where: {
      id: params.productId,
    },
    include: {
      images: true,
    },
  });

  const categories = await prismaDB.category.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const sizes = await prismaDB.size.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  const colors = await prismaDB.color.findMany({
    where: {
      storeId: params.storeId,
    },
  });

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={product}
          categories={categories}
          sizes={sizes}
          colors={colors}
        />
      </div>
    </div>
  );
}
