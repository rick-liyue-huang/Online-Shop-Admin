'use client';

import { ColumnDef } from '@tanstack/react-table';
import {
  BillBoardCellAction,
  CategoryCellAction,
} from '@/components/ui/cell-action';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string;
  label: string;
  createdAt: string;
};

export type CategoryColumn = {
  id: string;
  name: string;
  billboardLabel: string;
  createdAt: string;
};

export const billboardColumns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: 'label',
    header: 'Label',
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <BillBoardCellAction data={row.original} />,
  },
];

export const categoryColumns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'billboard',
    header: 'Billboard',
    cell: ({ row }) => row.original.billboardLabel,
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CategoryCellAction data={row.original} />,
  },
];
