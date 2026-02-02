import { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronRight,
  Heart,
  Minus,
  Plus,
  Share2,
  ShoppingCart,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import ProductGrid from '@/components/products/ProductGrid';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import { addToCart } from '@/store/cartSlice';
import { toggleWishlist, selectIsInWishlist } from '@/store/wishlistSlice';
import {
  getProductBySlug,
  getProductsByCategory,
  getReviewsByProduct,
  products,
} from '@/data/mockData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import type { ProductVariant } from '@/types';

// ============================================
// Product Details Page
// ============================================
// Full product details with gallery, variants, reviews, and related products.
// TODO: Replace mock data with API calls

const ProductDetails = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();

  const product = getProductBySlug(slug || '');
  const isInWishlist = useAppSelector(
    selectIsInWishlist(product?.id || '')
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | undefined>(
    product?.variants?.[0]
  );
  const [quantity, setQuantity] = useState(1);

  const reviews = product ? getReviewsByProduct(product.id) : [];
  const relatedProducts = product
    ? getProductsByCategory(product.category)
        .filter((p) => p.id !== product.id)
        .slice(0, 4)
    : [];

  if (!product) {
    return (
      <div className="container py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <p className="mt-2 text-muted-foreground">
          The product you're looking for doesn't exist.
        </p>
        <Link to="/products">
          <Button className="mt-4">Browse Products</Button>
        </Link>
      </div>
    );
  }

  const currentPrice = selectedVariant?.price ?? product.price;
  const currentStock = selectedVariant?.stock ?? product.stock;

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        product,
        quantity,
        variant: selectedVariant,
      })
    );
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(product));
    toast.success(
      isInWishlist
        ? `${product.name} removed from wishlist`
        : `${product.name} added to wishlist`
    );
  };

  const discountPercent = product.originalPrice
    ? Math.round(
        ((product.originalPrice - product.price) / product.originalPrice) * 100
      )
    : 0;

  // Rating distribution (mock)
  const ratingDistribution = [
    { stars: 5, percent: 72 },
    { stars: 4, percent: 18 },
    { stars: 3, percent: 6 },
    { stars: 2, percent: 2 },
    { stars: 1, percent: 2 },
  ];

  return (
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link
          to={`/category/${product.category}`}
          className="hover:text-foreground capitalize"
        >
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.name}</span>
      </nav>

      {/* Product Info */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Main Image */}
          <motion.div
            key={selectedImage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="relative aspect-square overflow-hidden rounded-2xl bg-muted"
          >
            <img
              src={product.images[selectedImage]}
              alt={product.name}
              className="h-full w-full object-cover"
            />

            {/* Navigation Arrows */}
            {product.images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? product.images.length - 1 : prev - 1
                    )
                  }
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === product.images.length - 1 ? 0 : prev + 1
                    )
                  }
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </>
            )}

            {/* Badges */}
            <div className="absolute left-4 top-4 flex flex-col gap-2">
              {discountPercent > 0 && (
                <Badge className="bg-primary">-{discountPercent}%</Badge>
              )}
              {product.newArrival && (
                <Badge className="bg-info text-info-foreground">New</Badge>
              )}
            </div>
          </motion.div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={cn(
                    'relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all',
                    selectedImage === index
                      ? 'border-primary'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  )}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          {/* Brand */}
          <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
            {product.brand}
          </p>

          {/* Name */}
          <h1 className="text-3xl font-bold lg:text-4xl">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    'h-5 w-5',
                    i < Math.floor(product.rating)
                      ? 'fill-warning text-warning'
                      : 'text-muted-foreground/30'
                  )}
                />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">
              ({product.reviewCount.toLocaleString()} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold">
              ${currentPrice.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xl text-muted-foreground line-through">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
            {discountPercent > 0 && (
              <Badge variant="destructive">Save {discountPercent}%</Badge>
            )}
          </div>

          {/* Short Description */}
          <p className="text-muted-foreground">{product.shortDescription}</p>

          <Separator />

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="space-y-3">
              <Label className="text-sm font-medium">Select Option</Label>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={cn(
                      'flex items-center gap-2 rounded-lg border px-4 py-2 transition-all',
                      selectedVariant?.id === variant.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    )}
                  >
                    {variant.colorHex && (
                      <span
                        className="h-4 w-4 rounded-full border"
                        style={{ backgroundColor: variant.colorHex }}
                      />
                    )}
                    <span className="text-sm font-medium">{variant.name}</span>
                    {variant.storage && (
                      <span className="text-sm text-muted-foreground">
                        {variant.storage}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quantity</Label>
            <div className="flex items-center gap-3">
              <div className="flex items-center rounded-lg border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-r-none"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-l-none"
                  onClick={() => setQuantity(Math.min(currentStock, quantity + 1))}
                  disabled={quantity >= currentStock}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <span className="text-sm text-muted-foreground">
                {currentStock > 0 ? (
                  currentStock <= 5 ? (
                    <span className="text-warning">Only {currentStock} left!</span>
                  ) : (
                    <span className="text-success">In Stock</span>
                  )
                ) : (
                  <span className="text-destructive">Out of Stock</span>
                )}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={handleAddToCart}
              disabled={currentStock === 0}
            >
              <ShoppingCart className="h-5 w-5" />
              {currentStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={handleToggleWishlist}
            >
              <Heart
                className={cn(
                  'h-5 w-5',
                  isInWishlist && 'fill-primary text-primary'
                )}
              />
            </Button>
            <Button size="lg" variant="outline">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid gap-4 rounded-lg border p-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">Free Shipping</p>
                <p className="text-xs text-muted-foreground">Orders over $100</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">2 Year Warranty</p>
                <p className="text-xs text-muted-foreground">Full coverage</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <RotateCcw className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium">30-Day Returns</p>
                <p className="text-xs text-muted-foreground">Easy returns</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-12">
        <Tabs defaultValue="description">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-6">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="specifications" className="mt-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {product.specs.map((spec, index) => (
                <div
                  key={index}
                  className="flex justify-between rounded-lg bg-muted/50 px-4 py-3"
                >
                  <span className="font-medium">{spec.name}</span>
                  <span className="text-muted-foreground">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Rating Overview */}
              <div className="rounded-lg border p-6">
                <div className="mb-4 text-center">
                  <div className="text-5xl font-bold">{product.rating}</div>
                  <div className="mt-2 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-5 w-5',
                          i < Math.floor(product.rating)
                            ? 'fill-warning text-warning'
                            : 'text-muted-foreground/30'
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Based on {product.reviewCount.toLocaleString()} reviews
                  </p>
                </div>

                <div className="space-y-2">
                  {ratingDistribution.map(({ stars, percent }) => (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="w-8 text-sm">{stars}★</span>
                      <Progress value={percent} className="flex-1" />
                      <span className="w-10 text-right text-sm text-muted-foreground">
                        {percent}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews List */}
              <div className="lg:col-span-2">
                {reviews.length > 0 ? (
                  <div className="space-y-6">
                    {reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-0">
                        <div className="mb-3 flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={review.userAvatar} />
                              <AvatarFallback>
                                {review.userName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {review.userName}
                                </span>
                                {review.verified && (
                                  <Badge variant="secondary" className="gap-1">
                                    <Check className="h-3 w-3" />
                                    Verified
                                  </Badge>
                                )}
                              </div>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={cn(
                                      'h-3 w-3',
                                      i < review.rating
                                        ? 'fill-warning text-warning'
                                        : 'text-muted-foreground/30'
                                    )}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="mb-2 font-semibold">{review.title}</h4>
                        <p className="text-muted-foreground">{review.comment}</p>
                        <button className="mt-2 text-sm text-muted-foreground hover:text-foreground">
                          Helpful ({review.helpful})
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">No reviews yet.</p>
                    <Button variant="outline" className="mt-4">
                      Be the first to review
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
          <ProductGrid products={relatedProducts} columns={4} />
        </section>
      )}
    </div>
  );
};

// Label component for this file
const Label = ({ className, children, ...props }: React.HTMLAttributes<HTMLLabelElement>) => (
  <label className={cn(className)} {...props}>{children}</label>
);

export default ProductDetails;
