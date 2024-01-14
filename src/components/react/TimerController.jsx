import React from 'react';


export default function TimerController(props){
    /*
    Props include
    Active: Is the timer active
    handlePauseResume: Pointer to the function that handles running/pausing the time
    handleStart: Pointer to the function that handles starting the timer
    handleReset: Pointer to the function that handles resetting
    */

    return(
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Green (Minutes)</span>
                    </label>
                    <input type="number" placeholder="Green Time" className="input input-bordered input-success" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Yellow (Minutes)</span>
                    </label>
                    <input type="text" placeholder="Yellow Time" className="input input-bordered input-warning" required />
                </div>
                <div className="form-control">
                    <label className="label">
                    <span className="label-text">Red (Minutes)</span>
                    </label>
                    <input type="text" placeholder="Red Time" className="input input-bordered input-error" required />
                </div>
                <div className="form-control">
                    <label className="label cursor-pointer">
                        <input type="checkbox" className="toggle"/>
                        <span className="label-text">Display Clock?</span> 
                    </label>
                </div>

                <div className="form-control mt-6">
                    <button type="button" className="btn btn-primary" id="startTimer" onClick={props.handleStart}>
                        {props.active? "Pause": "Start"}
                    </button>
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-error" id="ResetTimer" onClick={props.handleReset}>
                        Reset Timer
                    </button>
                </div>
            </div>
        </div>
    )
}

            