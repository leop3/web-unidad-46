import { useEffect } from "react";

function Header({ cantidad, getActivos }) {

    useEffect(() => { getActivos() }, [])

    return (
        <>
            <div className="bg-pallete-bgHeader">
                <div className='text-4xl text-pallete-textColor text-center font-diavlo flex justify-center'>UNIDAD 46</div>
                <div className="text-3xl text-green-600 text-center font-diavlo flex justify-end mr-5">Celulares Activos: {cantidad}</div>
            </div>
        </>
    )
}
export default Header;