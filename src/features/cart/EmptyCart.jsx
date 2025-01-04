import LinkButton from '../../ui/LinkButton';

function EmptyCart() {
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; بازگشت به منو</LinkButton>

      <p className="mt-7 font-semibold">سبد خرید شما خالی است :)</p>
    </div>
  );
}

export default EmptyCart;
