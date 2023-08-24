'use client';

import React from 'react';
import { Separator } from '@/components/ui/separator';
import FormHeading from '@/components/forms/FormHeading';
import { OrderColumn, orderColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';

interface Props {
  data: OrderColumn[];
}

export default function OrderClient({ data }: Props) {
  return (
    <>
      <FormHeading
        title={`Orders (${data.length})`}
        description="manage orders for your store"
      />
      <Separator />
      <DataTable columns={orderColumns} data={data} searchKey="products" />
    </>
  );
}
