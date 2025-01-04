import Header from './Header';
import Loader from './Loader';
import CartOverview from '../features/cart/CartOverview';
import { Outlet, useNavigation } from 'react-router-dom';
import Footer from './Footer';

function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}

      <Header />

      <div className="flex w-full flex-col items-center justify-between overflow-x-hidden">
        <main className="w-full max-w-3xl">
          <Outlet />
        </main>
        <Footer />
      </div>

      <CartOverview />
    </div>
  );
}

export default AppLayout;
