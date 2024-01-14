import React, { useState, useEffect} from "react";
import StopWatch from './StopWatch.jsx';
import TimerController from './TimerController.jsx'


/*
Since update in january 2013. It is better to rewrite this as function instead of classes!
*/

export default function TMTimer() {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    //console.log(time)

    //useEffect: handles the updating of the timer
    useEffect(() => {
        let interval = null;
 
        if (isActive === true) {
            interval = setInterval(() => {
                setTime((time) => time + 10);
            }, 10);
        } else {
            clearInterval(interval);
        }
        return () => {
            clearInterval(interval);
        };
    }, [isActive]);

    const handleStart = () => {
        setIsActive(!isActive);
    }

    const handleReset = () => {
        setIsActive(false);
        setTime(0);
    }

    return(
        <div id="TimingDevice" className="hero bg-base-200">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <StopWatch 
                    time={time}
                    isActive={isActive}
                ></StopWatch>
                <TimerController
                    active={isActive}
                    handleStart={handleStart}
                    handleReset={handleReset}
                ></TimerController>
            </div>
        </div>
    )
}