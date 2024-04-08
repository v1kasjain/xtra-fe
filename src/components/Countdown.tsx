import React, { useState, useEffect, SetStateAction } from "react";

type CountdownTimerProps = {
  time: number;
  setTime?: React.Dispatch<SetStateAction<number>>;
};
function CountdownTimer({ time, setTime }: CountdownTimerProps) {
  const playSound = () => {
    const audio = new Audio("/sound/notification.wav");
    audio.play().catch((error) => {
      console.error("Failed to play sound:", error);
    });
  };
  useEffect(() => {
    let intervalId: string | number | NodeJS.Timeout | undefined;
    if (time) {
      if (time === 1) {
        playSound();
      }
      intervalId = setInterval(() => {
        setTime && setTime((prevSeconds) => Math.max(0, prevSeconds - 1)); // Decrement timer & handle minimum
      }, 1000);
    }

    return () => {
      clearInterval(intervalId); // Cleanup on unmount/deactivation
    };
  }, [time]);

  const timeRemaining =
    time === 0 ? "Timer complete!" : `${time} seconds remaining`;

  return (
    <div>
      <p>{timeRemaining}</p>
    </div>
  );
}

export default CountdownTimer;
