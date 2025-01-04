import { useEffect, useState } from 'react';
import { useFetcher, useLoaderData } from 'react-router-dom';
import { getCustomer, getOrder } from '../../services/apiRestaurant';
import OrderItem from './OrderItem';

function Order() {
  const [order, order_id] = useLoaderData();
  const fetcher = useFetcher();
  const [totalPrice, setTotalPrice] = useState(0);
  const [priority, setPriority] = useState(null);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  useEffect(() => {
    if (order && order.length > 0) {
      const total = order.reduce(
        (acc, item) => acc + (item.totalPrice || 0),
        0
      );
      setTotalPrice(total);
    }
  }, [order]);
  useEffect(() => {
    async function readCustomer() {
      const customer = await getCustomer(order_id);

      setPriority(customer[0].priority);
    }
    readCustomer();
  }, [order, order_id]);

  const deliveryIn = 45;

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold"> سفارش شماره #{order_id} </h2>
        <div className="space-x-2">
          {priority && (
            <span className="mx-2 rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              فوری{' '}
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            سفارش
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p className="font-medium">
          {deliveryIn >= 0 ? `15 دقیقه دیگر اماده میشود` : ''}
        </p>
        <p className="text-xs text-stone-500">(لطفا منتظر بمانید...)</p>
      </div>

      <ul className="dive-stone-200 divide-y border-b border-t">
        {order.map((item) => (
          <OrderItem
            setTotalPrice={setTotalPrice}
            item={item}
            key={item.id}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.id)?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          جمع قیمت غذا: {totalPrice.toLocaleString()} تومان
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            هزینه ارسال فوری : 5000 تومان
          </p>
        )}
        <p className="font-bold">
          جمع هزینه ها : {(totalPrice + (true ? 5000 : 0)).toLocaleString()}{' '}
          تومان
        </p>
      </div>
      <button className=" w-full rounded-md bg-yellow-400 p-3">پرداخت</button>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);

  return [order, params.orderId];
}

export default Order;
