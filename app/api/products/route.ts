import { promises as fs } from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const productsPath = path.join(process.cwd(), 'data', 'products.json');
    const data = await fs.readFile(productsPath, 'utf8');
    const products = JSON.parse(data);
    
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load products' },
      { status: 500 }
    );
  }
} 