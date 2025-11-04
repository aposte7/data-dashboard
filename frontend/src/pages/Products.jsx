import React, { useMemo, useState } from "react";
import ProductTable from "../components/ProductTable";
import Filters from "../components/Filters";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui/card";

export default function Products() {
  const products = useMemo(() => dummyProducts, []);
  const [filters, setFilters] = useState({
    q: "",
    category: "all",
    minPrice: "",
    maxPrice: "",
    minRating: "0",
  });

  const filtered = useMemo(() => {
    const q = filters.q.trim().toLowerCase();
    return products.filter((p) => {
      const title = p.title?.toLowerCase() || "";
      const brand = p.brand?.toLowerCase() || "";
      const category = p.category?.toLowerCase() || "";
      const matchQ =
        !q || title.includes(q) || brand.includes(q) || category.includes(q);
      const matchCat =
        filters.category === "all" || p.category === filters.category;
      const price = p.priceNumber ?? 0;
      const minOk = !filters.minPrice || price >= Number(filters.minPrice);
      const maxOk = !filters.maxPrice || price <= Number(filters.maxPrice);
      const ratingOk = (p.rating ?? 0) >= Number(filters.minRating || 0);
      return matchQ && matchCat && minOk && maxOk && ratingOk;
    });
  }, [products, filters]);

  const totalCount = products.length;
  const shownCount = filtered.length;
  const clearFilters = () =>
    setFilters({
      q: "",
      category: "all",
      minPrice: "",
      maxPrice: "",
      minRating: "0",
    });

  return (
    <section className="space-y-8 px-10 py-5">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2">
          <CardTitle className="text-gray-900">Filters</CardTitle>
          <div className="text-sm text-gray-500">
            Showing {shownCount} of {totalCount}
          </div>
        </CardHeader>
        <CardContent>
          <Filters
            products={products}
            filters={filters}
            onChange={setFilters}
            onClear={clearFilters}
          />
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-900">Products</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductTable products={filtered} />
        </CardContent>
      </Card>
    </section>
  );
}

// Local dummy data (no imports required)
const dummyProducts = [
  {
    id: 1,
    title: "Widget A",
    brand: "Acme",
    category: "Gadgets",
    priceNumber: 19.99,
    rating: 4.2,
    reviewsCount: 120,
    availability: "in stock",
    imageUrl: "https://picsum.photos/seed/widget-a/96/96",
    productUrl: "#",
  },
  {
    id: 2,
    title: "Widget B",
    brand: "Acme",
    category: "Gadgets",
    priceNumber: 29.99,
    rating: 3.8,
    reviewsCount: 64,
    availability: "limited",
    imageUrl: "https://picsum.photos/seed/widget-b/96/96",
    productUrl: "#",
  },
  {
    id: 3,
    title: "Sprocket X",
    brand: "Globex",
    category: "Hardware",
    priceNumber: 49.0,
    rating: 4.6,
    reviewsCount: 87,
    availability: "preorder",
    imageUrl: "https://picsum.photos/seed/sprocket-x/96/96",
    productUrl: "#",
  },
  {
    id: 4,
    title: "Doohickey",
    brand: "Initech",
    category: "Accessories",
    priceNumber: 9.5,
    rating: 4.0,
    reviewsCount: 14,
    availability: "in stock",
    imageUrl: "https://picsum.photos/seed/doohickey/96/96",
    productUrl: "#",
  },
  {
    id: 5,
    title: "Thingamajig",
    brand: "Umbrella",
    category: "Hardware",
    priceNumber: 99.0,
    rating: 4.9,
    reviewsCount: 231,
    availability: "in stock",
    imageUrl: "https://picsum.photos/seed/thingamajig/96/96",
    productUrl: "#",
  },
];
