import React from 'react';

export default function StopWatch(props){

    return (
        <div className="text-center md:w-[25vw]">
            <h1 className="text-5xl font-bold">Timer</h1>
            <p className="text-4xl">
                {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
                {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}.
                {("0" + ((props.time / 10) % 100)).slice(-2)}
            </p>
            <p className="text-4xl">{!props.isActive && props.time > 0 ? "Paused": ""}</p>
        </div>

    )
}
