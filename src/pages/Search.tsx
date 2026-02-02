import { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ProductGrid from '@/components/products/ProductGrid';
import { searchProducts } from '@/data/mockData';

const Search = () => {
  const [query, setQuery] = useState('');
  const results = query.trim() ? searchProducts(query) : [];

  return (
    <div className="container py-8">
      <div className="mx-auto max-w-2xl mb-8">
        <div className="relative"><SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" /><Input placeholder="Search products..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-12 h-14 text-lg" autoFocus /></div>
      </div>
      {query.trim() ? (<><h2 className="mb-4 text-lg text-muted-foreground">{results.length} results for "{query}"</h2><ProductGrid products={results} /></>) : (<p className="text-center text-muted-foreground">Start typing to search products...</p>)}
    </div>
  );
};

export default Search;
