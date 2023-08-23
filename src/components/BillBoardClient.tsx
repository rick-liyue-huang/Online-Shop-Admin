'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import BillBoardFormHeading from '@/components/forms/BillBoardFormHeading';
import { BillboardColumn, columns } from '@/components/ui/columns';
import { DataTable } from '@/components/ui/data-table';
import ApiList from '@/components/ApiList';

interface Props {
  data: BillboardColumn[];
}

export default function BillBoardClient({ data }: Props) {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <BillBoardFormHeading
          title={`Billboards (${data.length})`}
          description="manage billboards for your store"
        />
        <Button
          variant={'outline'}
          onClick={() => router.push(`/${params.storeId}/billboards/new`)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New
        </Button>
      </div>
      <Separator />

      <DataTable columns={columns} data={data} searchKey="label" />

      <BillBoardFormHeading title="API" description="API desc" />
      <Separator />
      <ApiList entityName="billboards" entityIdName="billboardId" />
    </>
  );
}
