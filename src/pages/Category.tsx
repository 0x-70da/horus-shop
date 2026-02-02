import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, Filter, SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import ProductGrid from '@/components/products/ProductGrid';
import { getCategoryBySlug, getProductsByCategory } from '@/data/mockData';
import type { SortOption } from '@/types';

// ============================================
// Category Page
// ============================================
// Shows products filtered by category with subcategory navigation.
// TODO: Replace mock data with API calls

const Category = () => {
  const { slug } = useParams<{ slug: string }>();
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    null
  );

  const category = getCategoryBySlug(slug || '');
  const allProducts = getProductsByCategory(slug || '');

  // Filter by subcategory
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    if (selectedSubcategory) {
      result = result.filter((p) => p.subcategory === selectedSubcategory);
    }

    // Sorting
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case 'popularity':
      default:
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }

    return result;
  }, [allProducts, selectedSubcategory, sortBy]);

  if (!category) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Category not found</h1>
        <p className="mt-2 text-muted-foreground">
          The category you're looking for doesn't exist.
        </p>
        <Link to="/products">
          <Button className="mt-4">Browse All Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-64 overflow-hidden bg-muted">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        <div className="container absolute inset-0 flex flex-col justify-end pb-8">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link to="/products" className="hover:text-foreground">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground">{category.name}</span>
          </nav>

          <h1 className="text-4xl font-bold">{category.name}</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {category.description}
          </p>
        </div>
      </section>

      <div className="container py-8">
        {/* Subcategories */}
        {category.subcategories.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            <Badge
              variant={selectedSubcategory === null ? 'default' : 'outline'}
              className="cursor-pointer px-4 py-2"
              onClick={() => setSelectedSubcategory(null)}
            >
              All {category.name}
            </Badge>
            {category.subcategories.map((sub) => (
              <Badge
                key={sub.id}
                variant={selectedSubcategory === sub.slug ? 'default' : 'outline'}
                className="cursor-pointer px-4 py-2"
                onClick={() => setSelectedSubcategory(sub.slug)}
              >
                {sub.name} ({sub.productCount})
              </Badge>
            ))}
          </div>
        )}

        {/* Toolbar */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>

          <Select
            value={sortBy}
            onValueChange={(value) => setSortBy(value as SortOption)}
          >
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Products Grid */}
        <ProductGrid products={filteredProducts} columns={4} />
      </div>
    </div>
  );
};

export default Category;
