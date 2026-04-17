import React from "react";
import NotFoundImage from "../assets/404_NotFound.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
      <img
        src={NotFoundImage}
        alt="not found"
        className="max-w-full mb-6 w-96"
      />
      <p className="text-xl font-semibold">Bạn đang đi vào vùng cấm </p>
      <a
        href="/"
        className="inline-block px-6 py-3 mt-3 font-medium text-white transition shadow-md bg-primary rounded-2xl hover:bg-primary-dark"
      >
        Quay lại trang chủ
      </a>
    </div>
  );
};

export default NotFound;
