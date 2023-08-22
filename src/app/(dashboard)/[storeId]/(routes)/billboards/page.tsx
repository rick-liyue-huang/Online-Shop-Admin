import BillBoardClient from '@/components/BillBoardClient';
import React from 'react';

export default function BillBoardsPage() {
  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillBoardClient />
      </div>
    </div>
  );
}
