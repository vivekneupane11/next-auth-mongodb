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

const categoryStyles: Record<string, string> = {
  Electronics: 'bg-sky-100 text-sky-900 ring-sky-200/80',
  Clothing: 'bg-rose-100 text-rose-900 ring-rose-200/80',
  Books: 'bg-amber-100 text-amber-950 ring-amber-200/80',
  Home: 'bg-emerald-100 text-emerald-900 ring-emerald-200/80',
  Beauty: 'bg-fuchsia-100 text-fuchsia-900 ring-fuchsia-200/80',
};

function categoryClass(category: string): string {
  return (
    categoryStyles[category] ??
    'bg-stone-100 text-stone-800 ring-stone-200/80'
  );
}

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
    <div className="min-h-screen">
      <header className="border-b border-brand-line/80 bg-brand-surface/75 backdrop-blur-md sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline gap-3">
            <span className="font-display text-lg font-bold tracking-tight text-brand-ink sm:text-xl">
              Northline
            </span>
            <span className="hidden text-sm text-brand-muted sm:inline">
              Supply Co.
            </span>
          </div>
          <span className="rounded-full bg-brand-bg px-3 py-1 text-xs font-medium text-brand-muted ring-1 ring-brand-line">
            Live catalog
          </span>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="bg-mesh-header mb-10 rounded-3xl border border-brand-line/60 bg-brand-surface/40 px-6 py-10 sm:px-10 sm:py-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-accent">
            Curated inventory
          </p>
          <h1 className="font-display mt-2 max-w-2xl text-3xl font-bold tracking-tight text-brand-ink sm:text-4xl lg:text-5xl">
            Pieces worth keeping on the shelf
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-muted">
            Pulled from MongoDB in real time—refresh after seeding to see the grid
            fill in.
          </p>
        </div>

        {error ? (
          <div
            className="mx-auto max-w-lg rounded-2xl border border-red-200 bg-red-50/90 px-6 py-8 text-center shadow-sm"
            role="alert"
          >
            <p className="font-display text-lg font-semibold text-red-900">
              {error}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-red-800/90">
              Set{' '}
              <code className="rounded bg-red-100 px-1.5 py-0.5 font-mono text-xs text-red-950">
                MONGODB_URI
              </code>{' '}
              and confirm your cluster accepts connections from this app.
            </p>
          </div>
        ) : products.length === 0 ? (
          <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-brand-line bg-brand-surface/60 px-8 py-14 text-center">
            <div
              className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-bg ring-1 ring-brand-line"
              aria-hidden
            >
              <svg
                className="h-8 w-8 text-brand-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h2 className="font-display text-xl font-bold text-brand-ink">
              No products yet
            </h2>
            <p className="mt-2 text-sm text-brand-muted">
              Seed the database with mock items to populate this storefront.
            </p>
            <Link
              href="/api"
              className="mt-8 inline-flex items-center justify-center rounded-full bg-brand-accent px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-accenthover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
            >
              Seed products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <article
                key={product._id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-brand-line/90 bg-brand-surface shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-bg">
                  <img
                    src={product.imageUrl || '/placeholder.jpg'}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-ink/25 to-transparent opacity-0 transition duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${categoryClass(product.category)}`}
                    >
                      {product.category}
                    </span>
                  </div>
                  <h2 className="font-display text-lg font-bold leading-snug text-brand-ink">
                    {product.name}
                  </h2>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-brand-muted">
                    {product.description}
                  </p>
                  <div className="mt-4 flex items-end justify-between border-t border-brand-line/80 pt-4">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-brand-muted">
                        Price
                      </p>
                      <p className="font-display text-xl font-bold text-brand-ink">
                        ${product.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-right text-sm text-brand-muted">
                      <p className="flex items-center justify-end gap-0.5 font-medium text-brand-ink">
                        <span className="text-amber-500" aria-hidden>
                          ★
                        </span>
                        {product.rating}
                      </p>
                      <p className="mt-0.5">{product.stock} in stock</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
