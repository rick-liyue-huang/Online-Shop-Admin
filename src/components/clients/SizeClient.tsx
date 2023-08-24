'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import FormHeading from '@/components/forms/FormHeading';
import { SizeColumn, sizeColumns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ApiList';

interface Props {
  data: SizeColumn[];
}

export default function SizeClient({ data }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <FormHeading
          title={`Size (${data.length})`}
          description="manage size for your store"
        />
        <Button
          variant={'outline'}
          onClick={() => router.push(`/${params.storeId}/sizes/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={sizeColumns} data={data} searchKey="name" />

      <FormHeading title="API" description="API desc" />
      <Separator />
      <ApiList entityName="sizes" entityIdName="sizeId" />
    </>
  );
}
