import { Casilla } from './casilla.jsx';
import React from 'react';

export function Tablero ({array, onClick, end}) {
    
    return (
        <>
            {array.map(elemento => 
                <Casilla key={elemento.index} 
                         index={elemento.index} 
                         empty={elemento.isEmpty} 
                         user={elemento.isUser} 
                         onClick={onClick} 
                         end={end}/>
            )}
        </>
    )
};