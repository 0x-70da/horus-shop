import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAppDispatch, useAppSelector } from '@/hooks/useStore';
import {
  selectCartItems,
  selectCartSubtotal,
  selectCartTotal,
  selectPromoCode,
  selectPromoDiscount,
  updateQuantity,
  removeFromCart,
  applyPromoCode,
  removePromoCode,
  clearCart,
} from '@/store/cartSlice';
import { useState } from 'react';
import { toast } from 'sonner';

const Cart = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectCartItems);
  const subtotal = useAppSelector(selectCartSubtotal);
  const total = useAppSelector(selectCartTotal);
  const promoCode = useAppSelector(selectPromoCode);
  const promoDiscount = useAppSelector(selectPromoDiscount);
  const [promoInput, setPromoInput] = useState('');

  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  const handleApplyPromo = () => {
    if (promoInput.trim()) {
      dispatch(applyPromoCode(promoInput));
      toast.success('Promo code applied!');
      setPromoInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container py-20 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground" />
        <h1 className="mt-4 text-2xl font-bold">Your cart is empty</h1>
        <p className="mt-2 text-muted-foreground">Add some products to get started!</p>
        <Link to="/products">
          <Button className="mt-6 gap-2">
            Continue Shopping <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <motion.div key={`${item.productId}-${item.selectedVariant?.id}`} layout className="flex gap-4 rounded-lg border p-4">
              <img src={item.product.images[0]} alt={item.product.name} className="h-24 w-24 rounded-lg object-cover" />
              <div className="flex-1">
                <Link to={`/product/${item.product.slug}`} className="font-semibold hover:text-primary">{item.product.name}</Link>
                {item.selectedVariant && <p className="text-sm text-muted-foreground">{item.selectedVariant.name}</p>}
                <p className="text-lg font-bold">${(item.selectedVariant?.price ?? item.product.price).toLocaleString()}</p>
                <div className="mt-2 flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => dispatch(updateQuantity({ productId: item.productId, variantId: item.selectedVariant?.id, quantity: item.quantity - 1 }))}><Minus className="h-3 w-3" /></Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => dispatch(updateQuantity({ productId: item.productId, variantId: item.selectedVariant?.id, quantity: item.quantity + 1 }))}><Plus className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="ml-auto text-destructive" onClick={() => dispatch(removeFromCart({ productId: item.productId, variantId: item.selectedVariant?.id }))}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <Card>
          <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            {promoDiscount > 0 && <div className="flex justify-between text-success"><span>Discount ({promoDiscount}%)</span><span>-${((subtotal * promoDiscount) / 100).toFixed(2)}</span></div>}
            <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span></div>
            <div className="flex justify-between"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
            <Separator />
            <div className="flex justify-between text-lg font-bold"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
            <div className="flex gap-2">
              <Input placeholder="Promo code" value={promoInput} onChange={(e) => setPromoInput(e.target.value)} />
              <Button variant="outline" onClick={handleApplyPromo}>Apply</Button>
            </div>
            <Button className="w-full" size="lg">Proceed to Checkout</Button>
            <Link to="/products"><Button variant="outline" className="w-full">Continue Shopping</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Cart;
