import prismaDB from '@/lib/prisma-db';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // confirm it is login user
    const body = await req.json();
    const { userId } = auth();
    const { name } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!name) {
      return new NextResponse('Missing name', { status: 400 });
    }

    const store = await prismaDB.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (err) {
    console.log('[STORE POST]', err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
