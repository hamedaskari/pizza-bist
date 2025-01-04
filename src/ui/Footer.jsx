import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-16 w-full bg-gray-800  py-2 pt-4 text-center text-white">
      <div className=" container mx-auto text-center text-sm">
        <h2 className="text-xl font-bold text-yellow-500">پیتزا بیست</h2>
        <p className="mt-2">شماره تماس: ۳۲۳۴۵۸۹</p>
        <p className="mt-1">آدرس: کرمان ، خیابان مثال کوچه 24 پیتزا بیست</p>
      </div>
      <span className="text-[10px] text-gray-400">
        تهیه شده توسط <b>حامد عسکری</b>
      </span>
    </footer>
  );
};

export default Footer;
