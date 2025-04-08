import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const categoryId = parseInt(params.id)
    
    if (isNaN(categoryId)) {
      return NextResponse.json(
        { error: 'Invalid category ID' },
        { status: 400 }
      )
    }

    const medicines = await prisma.medicine.findMany({
      where: {
        categoryId: categoryId
      },
      include: {
        category: true,
      }
    })
    
    return NextResponse.json(medicines)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch medicines by category' },
      { status: 500 }
    )
  }
} 