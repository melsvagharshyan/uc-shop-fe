"use client";

import { useState } from "react";
import axios from "axios";

type Item = {
  id: string;
  uc: number;
  price: number;
};

const items: Item[] = [
  { id: "uc60", uc: 60, price: 1 },
  { id: "uc300", uc: 300, price: 5 },
  { id: "uc600", uc: 600, price: 10 },
];

export default function Home() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleBuy = async (item: Item) => {
    setLoading(item.id);
    try {
      const { data } = await axios.post(
        "https://site--uc-shop-server--69z8m7t7vlwy.code.run/payments/create",
        {
          orderId: `order-${Date.now()}`,
          amount: item.price,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // send cookies
        }
      );

      console.log(data);

      if (!data.url) {
        alert("Payment URL not received from server");
        return;
      }

      window.location.href = data.url; // redirect to Paysera
    } catch (err) {
      console.error(err);
      alert("Failed to start payment.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 sm:p-20 flex flex-col items-center gap-12">
      <h1 className="text-3xl font-bold">Buy UC</h1>

      <main className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center gap-4"
          >
            <p className="text-xl font-semibold">{item.uc} UC</p>
            <p className="text-gray-600 text-lg">${item.price}</p>
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2 rounded-xl w-full"
              onClick={() => handleBuy(item)}
              disabled={loading === item.id}
            >
              {loading === item.id ? "Redirecting..." : "Buy"}
            </button>
          </div>
        ))}
      </main>
    </div>
  );
}
