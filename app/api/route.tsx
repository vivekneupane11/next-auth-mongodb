import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { NextResponse } from 'next/server';

// GET route to fetch all products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();
    const products = await db.collection('products').find({}).toArray();
    
    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST route to seed 100 mock products
export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db();
    
    // Check if products already exist to avoid duplicate seeding
    const count = await db.collection('products').countDocuments();
    if (count > 0) {
      return NextResponse.json({ message: 'Products already seeded' }, { status: 200 });
    }
    
    // Generate 100 mock products
    const mockProducts = Array.from({ length: 100 }, (_, i) => ({
      _id: new ObjectId(),
      name: `Product ${i + 1}`,
      description: `Description for product ${i + 1}`,
      price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
      category: ['Electronics', 'Clothing', 'Books', 'Home', 'Beauty'][Math.floor(Math.random() * 5)],
      stock: Math.floor(Math.random() * 100),
      rating: parseFloat((Math.random() * 5).toFixed(1)),
      imageUrl: `https://picsum.photos/id/${i + 100}/300/300`,
      createdAt: new Date()
    }));
    
    // Insert mock products into the database
    await db.collection('products').insertMany(mockProducts);
    
    return NextResponse.json({ 
      message: 'Successfully seeded 100 products',
      count: mockProducts.length 
    }, { status: 201 });
  } catch (error) {
    console.error('Error seeding products:', error);
    return NextResponse.json({ error: 'Failed to seed products' }, { status: 500 });
  }
}
