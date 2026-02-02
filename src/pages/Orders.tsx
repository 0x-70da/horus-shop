import { Link } from 'react-router-dom';
import { Package, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { orders } from '@/data/mockData';

const statusColors = { pending: 'bg-muted', processing: 'bg-info', shipped: 'bg-warning', delivered: 'bg-success', cancelled: 'bg-destructive', returned: 'bg-muted' };

const Orders = () => (
  <div className="container py-8">
    <h1 className="mb-8 text-3xl font-bold">Order History</h1>
    {orders.length === 0 ? (
      <div className="py-20 text-center"><Package className="mx-auto h-16 w-16 text-muted-foreground" /><h2 className="mt-4 text-xl font-bold">No orders yet</h2><Link to="/products"><button className="mt-4 text-primary hover:underline">Start Shopping</button></Link></div>
    ) : (
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="rounded-lg border p-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div><p className="font-semibold">{order.orderNumber}</p><p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p></div>
              <Badge className={statusColors[order.status]}>{order.status}</Badge>
              <p className="font-bold">${order.total.toFixed(2)}</p>
            </div>
            <div className="mt-4 flex gap-2">{order.items.slice(0,3).map((item) => (<img key={item.productId} src={item.productImage} alt={item.productName} className="h-12 w-12 rounded object-cover" />))}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default Orders;
