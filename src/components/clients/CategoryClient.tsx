'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import BillBoardFormHeading from '@/components/forms/FormHeading';
import { CategoryColumn, categoryColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ApiList';

interface Props {
  data: CategoryColumn[];
}

export default function CategoryClient({ data }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <BillBoardFormHeading
          title={`Category (${data.length})`}
          description="manage category for your store"
        />
        <Button
          variant={'outline'}
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={categoryColumns} data={data} searchKey="name" />

      <BillBoardFormHeading title="API" description="API desc" />
      <Separator />
      <ApiList entityName="categories" entityIdName="categoryId" />
    </>
  );
}
