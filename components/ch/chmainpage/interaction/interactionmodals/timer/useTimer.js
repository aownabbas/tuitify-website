import { useCallback, useState } from "react";
import Interval from "./Interval";

const use1Second = Interval(1e3);

 const useTimer = ({
    seconds: initialSeconds = 0,
    running: initiallyRunning = false
} = {}) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [running, setRunning] = useState(initiallyRunning);
    const tick = useCallback(
        () => (running ? setSeconds(seconds => seconds + 1) : undefined),
        [running]
    );
    const startTime = () => {setSeconds(0); setRunning(true)};
    const pauseTime = () => setRunning(false);
    const resetTime = () => setSeconds(0);
    const stopTime = () => {
        pauseTime();
        resetTime();
    };

    use1Second(tick);

    return { pauseTime, resetTime, running, seconds, startTime, stopTime };
};

export default useTimer;