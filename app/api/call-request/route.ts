import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { phone, name } = await request.json();

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    const callRequest = await prisma.callRequest.create({
      data: {
        phone,
        name,
        status: 'pending'
      }
    });

    return NextResponse.json(callRequest);
  } catch (error) {
    console.error('Error creating call request:', error);
    return NextResponse.json(
      { error: 'Failed to create call request' },
      { status: 500 }
    );
  }
} 