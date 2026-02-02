import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { selectWishlistItems, removeFromWishlist } from '@/store/wishlistSlice';
import { addToCart } from '@/store/cartSlice';
import { toast } from 'sonner';

const Wishlist = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectWishlistItems);

  const handleMoveToCart = (item: typeof items[0]) => {
    dispatch(addToCart({ product: item.product, quantity: 1 }));
    dispatch(removeFromWishlist(item.productId));
    toast.success('Moved to cart!');
  };

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <Heart className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your wishlist is empty</h1>
        <p className="mt-2 text-muted-foreground">Save items you love for later!</p>
        <Link to="/products"><Button className="mt-6">Browse Products</Button></Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Wishlist ({items.length})</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <Card key={item.productId} className="overflow-hidden">
            <div className="aspect-square overflow-hidden">
              <img src={item.product.images[0]} alt={item.product.name} className="h-full w-full object-cover" />
            </div>
            <CardContent className="p-4">
              <Link to={`/product/${item.product.slug}`} className="font-semibold hover:text-primary line-clamp-2">{item.product.name}</Link>
              <p className="mt-1 text-lg font-bold">${item.product.price.toLocaleString()}</p>
              {item.product.price < item.priceAtAdd && <p className="text-sm text-success">Price dropped!</p>}
              <div className="mt-3 flex gap-2">
                <Button size="sm" className="flex-1 gap-1" onClick={() => handleMoveToCart(item)}><ShoppingCart className="h-4 w-4" />Add to Cart</Button>
                <Button size="sm" variant="outline" onClick={() => dispatch(removeFromWishlist(item.productId))}><Trash2 className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
