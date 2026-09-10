"use client";

import { useState } from "react";
import { categoryLabels, getCategories, type Product, type ProductCategory } from "@/data/products";
import { ProductGrid } from "./ProductGrid";

export function Catalog({ products }: { products: Product[] }) {
  const [category, setCategory] = useState<ProductCategory | "all">("all");
  const active = products.filter(p => p.active);
  const categories = getCategories(active);
  const filtered = category === "all" ? active : active.filter(p => p.category === category);
  const options = [{ value: "all" as const, label: "Todos" }, ...categories.map(value => ({ value, label: categoryLabels[value] }))];
  return <div className="shell catalog-body">
    <div className="catalog-toolbar">
      <div className="desktop-filters" role="group" aria-label="Filtrar por categoria">{options.map(option => <button key={option.value} type="button" aria-pressed={category === option.value} onClick={() => setCategory(option.value)}>{option.label}<span>{option.value === "all" ? active.length : active.filter(p => p.category === option.value).length}</span></button>)}</div>
      <div className="mobile-filters"><label htmlFor="product-category">Categoria</label><select id="product-category" value={category} onChange={event => setCategory(event.target.value as ProductCategory | "all")}>{options.map(option => <option value={option.value} key={option.value}>{option.label}</option>)}</select></div>
      <p className="result-count" role="status" aria-live="polite">{filtered.length} {filtered.length === 1 ? "produto" : "produtos"}</p>
    </div>
    <ProductGrid products={filtered} />
    {filtered.length === 0 && <p className="empty-catalog">Nenhum produto nesta categoria.</p>}
  </div>;
}
