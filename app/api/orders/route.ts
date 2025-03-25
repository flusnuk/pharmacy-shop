import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
    const data = await fs.readFile(ordersPath, 'utf8');
    const orders = JSON.parse(data);
    
    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load orders' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const ordersPath = path.join(process.cwd(), 'data', 'orders.json');
    const data = await fs.readFile(ordersPath, 'utf8');
    const { orders } = JSON.parse(data);
    
    const orderData = await request.json();
    const newOrder = {
      ...orderData,
      id: `ORDER${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString()
    };
    
    orders.push(newOrder);
    await fs.writeFile(ordersPath, JSON.stringify({ orders }, null, 2));
    
    return NextResponse.json(newOrder);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
} 