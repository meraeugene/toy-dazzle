import React from "react";

const vouchers = [
  {
    id: 1122,
    image: "/images/voucher1.png",
  },
  {
    id: 2131,
    image: "/images/voucher2.png",
  },
  {
    id: 3123,
    image: "/images/voucher3.png",
  },
];

const Voucher = () => {
  return (
    <div className="2xl:px-40 py-10 lg:px-16">
      <h1 className=" mb-6 fredoka text-[#FA6A02] text-[40px] font-semibold">
        Voucher
      </h1>
      <div className="flex items-center justify-between lg:gap-6">
        {vouchers.map((voucher) => (
          <div key={voucher.id}>
            <img src={voucher.image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Voucher;
