'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useParams, useRouter } from 'next/navigation';
import BillBoardFormHeading from '@/components/forms/BillBoardFormHeading';

export default function BillBoardClient() {
  const router = useRouter();
  const params = useParams();

  return (
    <>
      <div className="flex items-center justify-between">
        <BillBoardFormHeading
          title="BillBoards (0)"
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
    </>
  );
}
