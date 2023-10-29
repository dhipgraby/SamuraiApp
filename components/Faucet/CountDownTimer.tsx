import React, { useState, useEffect } from 'react';

type CountDownProps = {
    secondsLeft: number,
}

const CountdownTimer = ({ secondsLeft }: CountDownProps) => {



    const hours = Math.floor(secondsLeft / 3600);
    const minutes = Math.floor((secondsLeft % 3600) / 60);
    const seconds = secondsLeft % 60;

    return (
        <div>
            <h1 className='text-yellow-400 text-2xl mb-3'>Time left for next claim:</h1>
            <div className='my-4 mx-auto p-2 rounded-lg text-lg border-2 border-yellow-400 w-fit bg-black'>
                <span>{String(hours).padStart(2, '0')}:</span>
                <span>{String(minutes).padStart(2, '0')}:</span>
                <span>{String(seconds).padStart(2, '0')}</span>
            </div>
        </div>
    );
}

export default CountdownTimer;
