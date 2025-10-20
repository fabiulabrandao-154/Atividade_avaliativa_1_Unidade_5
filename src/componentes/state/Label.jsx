// Function component
import React, {useState} from 'react';
export default function Label({texto}){
//hook - Criar os componentes
const [valor, setValor] = useState(texto)
//================================= DOIS BLOCOS=========================
  return(
    <>
     {valor} 
     </>
  );

}