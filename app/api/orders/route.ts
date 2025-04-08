import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error loading orders:', error);
    return NextResponse.json(
      { error: 'Failed to load orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const orderData = await request.json();
    
    const newOrder = await prisma.order.create({
      data: {
        totalAmount: orderData.totalAmount,
        status: orderData.status,
        deliveryAddress: orderData.deliveryAddress,
        paymentStatus: orderData.paymentStatus,
        deliveryType: orderData.deliveryType,
        paymentType: orderData.paymentType,
        trackingNumber: orderData.trackingNumber || '',
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        phone: orderData.phone,
        email: orderData.email || null,
        userId: orderData.userId || null
      },
    });
    
    return NextResponse.json(newOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
} 