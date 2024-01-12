import React from "react";

export default class TMTimer extends React.Component{
    render(){
        return(
            <div id="TimingDevice" class="hero bg-base-200">
                <div class="hero-content flex-col lg:flex-row-reverse">
                    <div class="text-center md:w-[25vw]">
                        <h1 class="text-5xl font-bold">Timer</h1>
                        <p class="text-4xl">00:00:00</p>
                    </div>
                    <div class="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form class="card-body">
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Green (Minutes)</span>
                                </label>
                                <input type="number" placeholder="Green Time" class="input input-bordered input-success" required />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                    <span class="label-text">Yellow (Minutes)</span>
                                </label>
                                <input type="text" placeholder="Yellow Time" class="input input-bordered input-warning" required />
                            </div>
                            <div class="form-control">
                                <label class="label">
                                <span class="label-text">Red (Minutes)</span>
                                </label>
                                <input type="text" placeholder="Red Time" class="input input-bordered input-error" required />
                            </div>
                            <div class="form-control">
                                <label class="label cursor-pointer">
                                    <input type="checkbox" class="toggle" checked />
                                    <span class="label-text">Display Clock?</span> 
                                </label>
                            </div>
                            <div class="form-control mt-6">
                                <button class="btn btn-primary" id="startTimer">Start Timer</button>
                            </div>
                            <div class="form-control mt-6">
                                <button class="btn btn-error" id="ResetTimer">Start Timer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}