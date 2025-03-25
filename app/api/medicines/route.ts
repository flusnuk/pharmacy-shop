import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { Prisma } from '@prisma/client'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const categoryId = searchParams.get('category')
    const sortPrice = searchParams.get('sortPrice')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '6')
    
    const skip = (page - 1) * limit

    // Будуємо об'єкт запиту
    const query: Prisma.MedicineFindManyArgs = {
      where: {},
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        }
      },
      orderBy: {},
      skip,
      take: limit
    }

    // Додаємо фільтр по категорії
    if (categoryId && categoryId !== 'all') {
      query.where!.categoryId = parseInt(categoryId)
    }

    // Додаємо сортування за ціною
    if (sortPrice === 'asc' || sortPrice === 'desc') {
      query.orderBy = { price: sortPrice as Prisma.SortOrder }
    }

    // Отримуємо загальну кількість записів для пагінації
    const totalCount = await prisma.medicine.count({
      where: query.where
    })

    const medicines = await prisma.medicine.findMany(query)
    
    return NextResponse.json({
      medicines,
      pagination: {
        total: totalCount,
        pages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit
      }
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch medicines' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const medicine = await prisma.medicine.create({
      data: json,
      include: {
        category: true
      }
    })
    return NextResponse.json(medicine)
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create medicine' },
      { status: 500 }
    )
  }
} 