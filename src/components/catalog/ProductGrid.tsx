import type { Product } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function ProductGrid({ products, featured = false }: { products: Product[]; featured?: boolean }) {
  return <div className={`product-grid ${featured ? "featured-grid" : ""}`}>
    {products.map(product => <ProductCard key={product.id} product={product} />)}
  </div>;
}
