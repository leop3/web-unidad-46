import React, { useState } from 'react';

const Tooltip = ({ text, children }) => {
    const [onHover, setOnHover] = useState(false);

    function createTooltip() {
        return (
            <>
                <span className="bg-blue-500 text-white rounded-3xl p-2 ml-2  fixed">
                    <span className="absolute bg-blue-500 w-2 h-2 transform rotate-45 top-4 -left-1"></span>
                    {text}
                </span>
                <span> </span>
            </>)
    }

    return (<>
        <span
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}>
            {children}
        </span>
        {
            onHover ?
                <span className='justify-center'>{createTooltip()}</span>
                : <span></span>
        }
    </>
    );
};



export default Tooltip;