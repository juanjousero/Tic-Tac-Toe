import React from 'react';


export function Casilla ({index, empty, onClick, end}) {
    
    const showX = () => {
        if (!end) {
            const userX = document.querySelectorAll('.X');
            userX[index].style.display = 'block';
        } else {

        }
    }

    const handleClick = () => {
        if (empty === false) {
            return
        }
        showX();
        onClick(index);
    }

    return (
        <>
            <div id='test' 
                 className={`box box${index}`} 
                 onClick={handleClick}>
                 <span className={'X'}>X</span>
                 <span className={'O'}>O</span>
            </div>
        </>
    )
}