import BillBoardClient from '@/components/clients/BillBoardClient';
import { BillboardColumn, OrderColumn } from '@/components/ui/columns';
import prismaDB from '@/lib/prisma-db';
import React from 'react';
import { format } from 'date-fns';
import { formatter } from '@/lib/utils';
import OrderClient from '@/components/clients/OrderClient';

export default async function OrdersPage({
  params,
}: {
  params: { storeId: string };
}) {
  const orders = await prismaDB.order.findMany({
    where: {
      storeId: params.storeId,
    },
    include: {
      orderItems: {
        include: {
          product: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    phone: order.phone,
    address: order.address,
    isPaid: order.isPaid,
    products: order.orderItems
      .map((orderItem) => orderItem.product.name)
      .join(', '),
    totalPrice: formatter.format(
      order.orderItems.reduce((total, item) => {
        return total + Number(item.product.price);
      }, 0)
    ),
    createdAt: format(order.createdAt, 'dd/MM/yyyy'),
  }));

  return (
    <div className="flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}
