import Header from "./Components/Header"
import Internos from "./Components/Internos"
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [cantidad, setCantidad] = useState(0);

  const getCelularesActivos = () => {
    console.log("Buscando celulares activos...")
    axios.get('http://localhost:8080/unidad/46/celular/activos/total')
      .then(response => {
        setCantidad(response.data);
      })
      .catch(error => {
      })
  }

  useEffect(() => { getCelularesActivos() }, [cantidad])

  return (
    <>
      <Header cantidad={cantidad} getActivos={getCelularesActivos} />
      <Internos getActivos={getCelularesActivos} />
    </>
  )
}

export default App
