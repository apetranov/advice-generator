"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

async function fetchAdvice() {
  try {
    const apiResponse = await fetch("https://api.adviceslip.com/advice");
    const result = await apiResponse.json();
    return result.slip;
  } catch (err) {
    throw new Error(err);
  }
}

export default function Home() {
  const [advice, setAdvice] = useState(null);
  const [adviceId, setAdviceId] = useState(null);

  useEffect(() => {
    async function getAdvice() {
      const fetchedAdvice = await fetchAdvice();
      setAdvice(fetchedAdvice.advice);
      setAdviceId(fetchedAdvice.id);
    }
    getAdvice();
  }, []);

  const handleButtonClick = async () => {
    const fetchedAdvice = await fetchAdvice();
    setAdvice(fetchedAdvice.advice);
    setAdviceId(fetchedAdvice.id);
  };

  return (
    <div className="bg-gray-900 flex justify-center items-center w-screen h-screen">
      <div className="relative bg-gray-700 w-3/4 h-3/4 md:w-2/4 md:h-2/4 space-y-10 p-10 rounded-xl flex flex-col justify-center items-center ">
        <h1 className="font-thin text-sm text-green-500">ADVICE #{adviceId}</h1>
        <h1 className="md:text-3xl text-xl text-center font-semibold text-white">
          "{advice || "Loading..."}"
        </h1>
        <img
          className="hidden md:flex"
          src="images/pattern-divider-desktop.svg"
          alt=""
        />
        <img
          className="flex md:hidden"
          src="images/pattern-divider-mobile.svg"
          alt=""
        />
        <button
          onClick={handleButtonClick}
          className="absolute bottom-[-2rem] transition-all duration-300 hover:bg-green-300 hover:shadow-2xl bg-green-500 p-7 rounded-full"
        >
          <img src="images/icon-dice.svg" alt="" />
        </button>
      </div>
    </div>
  );
}
