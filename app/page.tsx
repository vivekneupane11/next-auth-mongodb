/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { headers } from 'next/headers';

export const dynamic = 'force-dynamic';

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  rating: number;
  imageUrl?: string;
};

function apiBaseUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  const host = headers().get('host');
  if (!host) return '';
  const protocol =
    host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https';
  return `${protocol}://${host}`;
}

async function loadProducts(): Promise<{ products: Product[]; error?: string }> {
  const base = apiBaseUrl();
  const url = base ? `${base}/api/` : '/api/';
  try {
    const response = await fetch(url, { cache: 'no-store' });
    const data = await response.json();
    if (!response.ok) {
      return {
        products: [],
        error: typeof data.error === 'string' ? data.error : 'Failed to load products',
      };
    }
    return { products: Array.isArray(data.products) ? data.products : [] };
  } catch {
    return { products: [], error: 'Could not reach the products API' };
  }
}

export default async function Home() {
  const { products, error } = await loadProducts();

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>

      {error ? (
        <div className="flex flex-col items-center justify-center text-center max-w-md">
          <p className="text-xl mb-2 text-red-700">{error}</p>
          <p className="text-gray-600 text-sm mb-4">
            Ensure <code className="bg-gray-100 px-1 rounded">MONGODB_URI</code> is set and MongoDB is reachable.
          </p>
        </div>
      ) : products.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-xl mb-4">No products found</p>
          <Link href="/api" className="text-blue-500 hover:underline">
            Click here to seed products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full max-w-7xl">
          {products.map((product) => (
            <div key={product._id} className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative h-48 w-full">
                <img 
                  src={product.imageUrl || '/placeholder.jpg'} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {product.category}
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    {product.stock} in stock
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
