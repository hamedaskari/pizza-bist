import { supabase } from './GetMenu';
const API_URL = 'https://react-fast-pizza-api.jonas.io/api';

export async function getMenu() {
  const res = await fetch(`${API_URL}/menu`);

  // fetch won't throw error on 400 errors (e.g. when URL is wrong), so we need to do it manually. This will then go into the catch block, where the message is set
  if (!res.ok) throw Error('Failed getting menu');

  const { data } = await res.json();
  return data;
}

// services/apiRestaurant.js

export async function getOrder(orderId) {
  try {
    const { data, error } = await supabase
      .from('order_items') // نام جدول سفارشات
      .select('*') // انتخاب تمام ستون‌ها
      .eq('order_id', orderId);

    if (error) {
      throw new Error(`Error fetching order: ${error.message}`);
    }
    console.log(`order man : ${data}`);
    return data; // برگرداندن داده‌های سفارش
  } catch (error) {
    console.error('Failed to fetch order:', error);
    throw error; // پرتاب خطا برای مدیریت در جاهای دیگر
  }
}
// export async function createOrder(newOrder) {
//   try {
//     const res = await fetch(`${API_URL}/order`, {
//       method: 'POST',
//       body: JSON.stringify(newOrder),
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!res.ok) throw Error();
//     const { data } = await res.json();
//     return data;
//   } catch {
//     throw Error('Failed creating your order');
//   }
// }

export async function updateOrder(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateObj),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) throw Error();
    // We don't need the data, so we don't return anything
  } catch (err) {
    throw Error('Failed updating your order');
  }
}
export async function getCustomer(customerID) {
  let { data: customer, error } = await supabase
    .from('customer')
    .select('*')
    .eq('id', customerID);

  return customer;
}
export async function createOrder(order) {
  const { customer, phone, address, priority, cart } = order;

  try {
    // درج سفارش در جدول orders
    const { data: orderData, error: orderError } = await supabase
      .from('customer')
      .insert([
        {
          customer,
          phone,
          address,
          priority,
        },
      ])
      .select(); // برای دریافت داده‌های درج‌شده

    if (orderError) throw orderError;

    // دریافت شناسه سفارش جدید
    const orderId = orderData[0].id; // بر اساس نام ستون واقعی خود تنظیم کنید

    // آماده‌سازی اقلام سفارش برای درج
    const orderItems = cart.map((item) => ({
      order_id: orderId,
      pizzaId: item.pizzaId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice,
    }));

    // درج اقلام در جدول order_items
    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { id: orderId }; // بازگشت شناسه سفارش جدید
  } catch (error) {
    console.error('خطا در ذخیره‌سازی سفارش:', error);
    throw error; // پرتاب خطا برای مدیریت در جاهای دیگر
  }
}
