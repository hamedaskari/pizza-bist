import { supabase } from './GetMenu';

export async function getOrder(orderId) {
  try {
    const { data, error } = await supabase
      .from('order_items')
      .select('*')
      .eq('order_id', orderId);

    if (error) {
      throw new Error(`Error fetching order: ${error.message}`);
    }

    return data;
  } catch (error) {
    console.error('Failed to fetch order:', error);
    throw error;
  }
}

export async function getCustomer(customerID) {
  let { data: customer } = await supabase
    .from('customer')
    .select('*')
    .eq('id', customerID);

  return customer;
}
export async function createOrder(order) {
  const { customer, phone, address, priority, cart } = order;

  try {
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
      .select();
    if (orderError) throw orderError;

    const orderId = orderData[0].id;

    const orderItems = cart.map((item) => ({
      order_id: orderId,
      pizzaId: item.pizzaId,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      totalPrice: item.totalPrice,
    }));

    const { error: itemsError } = await supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsError) throw itemsError;

    return { id: orderId };
  } catch (error) {
    console.error('خطا در ذخیره‌سازی سفارش:', error);
    throw error;
  }
}
