import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aklbsdzcmezftqtcltou.supabase.co';
const supabaseKey = process.env.REACT_APP_SUPABASE_URL;
export const supabase = createClient(supabaseUrl, supabaseKey);

export async function getMenuList() {
  try {
    let { data: menu, error } = await supabase.from('menu').select('*');
    if (error) throw new Error('خطایی رخ داده');
    return menu;
  } catch (error) {
    console.error(error);
  }
}
