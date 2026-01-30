"use client";
import { MethodComponentProps } from "@/app/definitions/definitions";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const INITIAL_TIME = 1500; // 25 minutes
const FIVE_MINUTES = 300;
const MAX_TIME = 3600; // 60 minutes

enum TimerActions {
  ADD_TIME = "add-time",
  SUBTRACT_TIME = "subtract-time",
  RESET = "reset",
}

export default function PomodoroTechnique({
  methodData,
}: MethodComponentProps) {
  const [time, setTime] = useState(1500);
  const [isRunning, setIsRunning] = useState(false);
  const [showHint, setShowHint] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((prevSeconds) => {
          if (prevSeconds <= 1) {
            setIsRunning(false);
            if (intervalRef.current) clearInterval(intervalRef.current);
            console.log("Countdown finished!");
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRunning]);

  useEffect(() => {
    // Runs when the user tries to leave and timer is running
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isRunning) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  function handleControls(action: TimerActions) {
    if (action === TimerActions.ADD_TIME) {
      setTime((prev) => Math.min(prev + FIVE_MINUTES, MAX_TIME));
    }
    if (action === TimerActions.SUBTRACT_TIME) {
      if (time === FIVE_MINUTES) return;
      setTime((prev) => Math.max(prev - FIVE_MINUTES, FIVE_MINUTES));
    }
    if (action === TimerActions.RESET) {
      setIsRunning(false);
      setTime(INITIAL_TIME);
    }
  }
  const degreesPerMinute = 6; // 360 / 60 = 6 degrees per minute standard
  const currentRotation = (time / 60) * degreesPerMinute;
  const ticks = Array.from({ length: 60 }, (_, i) => i); // Generate ticks for 0 to 60 minutes

  return (
    <>
      <button
        onClick={() => {
          setIsRunning((prev) => !prev);
          setShowHint(false);
        }}
        aria-label={isRunning ? "Pause Timer" : "Start Timer"}
        aria-live="polite"
        className="relative size-80 md:w-96 md:h-96 cursor-pointer select-none flex justify-center"
      >
        {showHint && (
          <p className="text-sm text-gray-500">
            Click on the tomato to start/pause the timer
          </p>
        )}
        {/* Tomato */}
        <Image
          src={methodData.icon}
          alt=""
          aria-hidden="true"
          fill
          className="absolute inset-0 size-full object-contain pointer-events-none z-0"
        />

        {/* Wheel container */}
        <div className="absolute top-[55%] w-[85%] h-[45%] overflow-hidden z-10">
          {/* Wheel containing the ticks */}
          <div
            className="absolute top-[10%] left-1/2 size-full"
            style={{
              // transformOrigin: "50% -600px" pushes the pivot point, creating a gentle curve
              transformOrigin: "50% -600px",
              transform: `translateX(-50%) rotate(${currentRotation}deg)`,
              transition: isRunning
                ? "transform 1s linear"
                : "transform 0.5s ease-out",
            }}
          >
            {ticks.map((minute) => {
              // Each minute is 6 degrees apart
              const tickRotation = minute * degreesPerMinute;
              const isMajor = minute % 5 === 0;

              return (
                <div
                  key={minute}
                  className="absolute top-0 left-1/2 flex flex-col items-center"
                  style={{
                    height: "400px",
                    transformOrigin: "50% -600px",
                    transform: `translateX(-50%) rotate(${-tickRotation}deg)`,
                  }}
                >
                  {/* Tick Mark */}
                  <div
                    className={`bg-white/90 shadow-sm ${
                      isMajor ? "w-1.5 h-6" : "w-0.5 h-3"
                    }`}
                  />

                  {/* Number for major ticks */}
                  {isMajor && (
                    <span className="mt-2 text-xl md:text-2xl font-bold text-white drop-shadow-md">
                      {minute}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* White triangle pointer */}
        <div className="absolute top-[52%] left-1/2 -translate-x-1/2 z-20">
          <div className="size-0 border-l-10 border-l-transparent border-r-10 border-r-transparent border-t-16 border-t-white drop-shadow-md"></div>
        </div>

        {/* Digital Overlay */}
        <div className="absolute bottom-[15%] text-white/80 font-mono text-sm">
          {formatTime(time)}
        </div>
      </button>

      {/* CONTROLS */}
      <div className="flex gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleControls(TimerActions.SUBTRACT_TIME);
          }}
          aria-label="Subtract 5 minutes"
          className="size-12 rounded-full bg-white shadow-sm shadow-blue-100 hover:bg-red-50 text-2xl font-bold text-red-500 transition-colors"
        >
          -
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleControls(TimerActions.RESET);
          }}
          aria-label="Reset Timer to 25 minutes"
          className="px-6 py-2 rounded-full bg-red-100 hover:bg-red-200 text-red-800 font-bold transition-colors shadow-sm"
        >
          Reset
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleControls(TimerActions.ADD_TIME);
          }}
          aria-label="Add 5 minutes"
          className="size-12 rounded-full bg-white shadow-sm shadow-blue-100 hover:bg-green-50 text-2xl font-bold text-green-600 transition-colors"
        >
          +
        </button>
      </div>
    </>
  );
}
