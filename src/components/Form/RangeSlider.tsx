"use client";
import React, { useState } from "react";

const YourComponent: React.FC = () => {
  const [minprice, setMinprice] = useState<number>(0);
  const [maxprice, setMaxprice] = useState<number>(10000);
  const min = 0;
  const max = 10000;
  const [minthumb, setMinthumb] = useState<number>(0);
  const [maxthumb, setMaxthumb] = useState<number>(0);

  const mintrigger = () => {
    validation();
    const newMinprice = Math.min(minprice, maxprice - 500);
    setMinprice(newMinprice);
    setMinthumb(((newMinprice - min) / (max - min)) * 100);
  };

  const maxtrigger = () => {
    validation();
    const newMaxprice = Math.max(maxprice, minprice + 200);
    setMaxprice(newMaxprice);
    setMaxthumb(100 - ((newMaxprice - min) / (max - min)) * 100);
  };

  const validation = () => {
    if (/^\d*$/.test(String(minprice))) {
      if (minprice > max) {
        setMinprice(9500);
      }
      if (minprice < min) {
        setMinprice(min);
      }
    } else {
      setMinprice(0);
    }
    if (/^\d*$/.test(String(maxprice))) {
      if (maxprice > max) {
        setMaxprice(max);
      }
      if (maxprice < min) {
        setMaxprice(200);
      }
    } else {
      setMaxprice(10000);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="relative w-full max-w-xl">
        <div>
          <input
            type="range"
            step={100}
            min={min}
            max={max}
            onChange={mintrigger}
            value={minprice}
            className="pointer-events-none absolute z-20 h-2 w-full cursor-pointer appearance-none opacity-0"
          />

          <input
            type="range"
            step={100}
            min={min}
            max={max}
            onChange={maxtrigger}
            value={maxprice}
            className="pointer-events-none absolute z-20 h-2 w-full cursor-pointer appearance-none opacity-0"
          />

          <div className="relative z-10 h-2">
            <div className="absolute top-0 right-0 bottom-0 left-0 z-10 rounded-md bg-gray-200"></div>

            <div
              className="absolute top-0 bottom-0 z-20 rounded-md bg-green-300"
              style={{ right: `${maxthumb}%`, left: `${minthumb}%` }}
            ></div>

            <div
              className="absolute top-0 left-0 z-30 -mt-2 h-6 w-6 rounded-full bg-green-300"
              style={{ left: `${minthumb}%` }}
            ></div>

            <div
              className="absolute top-0 right-0 z-30 -mt-2 h-6 w-6 rounded-full bg-green-300"
              style={{ right: `${maxthumb}%` }}
            ></div>
          </div>
        </div>

        <div className="flex items-center justify-between space-x-4 pt-5 text-sm text-gray-700">
          <div>
            <input
              type="text"
              maxLength={5}
              onChange={mintrigger}
              value={minprice}
              className="w-24 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center focus:border-yellow-400 focus:outline-hidden"
            />
          </div>
          <div>
            <input
              type="text"
              maxLength={5}
              onChange={maxtrigger}
              value={maxprice}
              className="w-24 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-center focus:border-yellow-400 focus:outline-hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default YourComponent;
