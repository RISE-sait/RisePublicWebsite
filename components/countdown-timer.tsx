"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
}

export default function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
      <div className="text-white p-4 rounded-lg w-24 text-center">
        <div className="text-4xl font-bold text-white">{timeLeft.days}</div>
        <div className="text-sm text-white">days</div>
      </div>
      <div className="text-white p-4 rounded-lg w-24 text-center">
        <div className="text-4xl font-bold text-white">{timeLeft.hours}</div>
        <div className="text-sm text-white">hours</div>
      </div>
      <div className="text-white p-4 rounded-lg w-24 text-center">
        <div className="text-4xl font-bold text-white">{timeLeft.minutes}</div>
        <div className="text-sm text-white">minutes</div>
      </div>
      <div className="text-white p-4 rounded-lg w-24 text-center">
        <div className="text-4xl font-bold text-white">{timeLeft.seconds}</div>
        <div className="text-sm text-white">seconds</div>
      </div>
    </div>
  );
}
