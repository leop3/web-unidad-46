import { useState, useEffect } from "react";
import axios from 'axios';
import Interno from "./Interno";
import ModalInterno from "./ModalInterno";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import Card from "./Card";
import { FaSearchengin } from 'react-icons/fa'
import { GrAdd } from 'react-icons/gr'
import ImeiSearch from "./ImeiSearch";
import Tooltip from './Tooltip'

function Internos({ getActivos }) {

    // STATE

    const [ficha, setFicha] = useState("");
    const [sector, setSector] = useState("");
    const [pabellon, setPabellon] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [nombres, setNombres] = useState("");
    const [fechaIngreso, setFechaIngreso] = useState("");

    //ERROR
    const [errorMensaje, setErrorMensaje] = useState("");

    //MODAL VARIABLES 
    const [isError, setIsError] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isImeiSearch, setIsImeiSearch] = useState(false);

    //Paginado
    const [pagina, setPagina] = useState(1);
    const [filtro, setFiltro] = useState({
        fichaCriminologia: -1,
        sector: '',
        pabellon: -1,
        apellidos: '',
        nombres: '',
        fechaIngreso: null,
        activo: true,
    })

    const handleInternoClick = (internoSelect) => {
        setInternoSeleccionado({
            "fichaCriminologia": internoSelect.fichaCriminologia,
            "sector": internoSelect.sector,
            "pabellon": internoSelect.pabellon,
            "apellidos": internoSelect.apellidos,
            "nombres": internoSelect.nombres,
            "fechaIngreso": internoSelect.fecha_ingreso,
            "activo": internoSelect.activo
        })
        setIsOpen(true);
    };

    const handleExcelClick = async () => {
        try {
            const response = await fetch('http://localhost:8080/unidad/46/excel'); // Reemplaza la URL con tu endpoint de generación de Excel
            const blob = await response.blob();
            // const response = await axios.get('http://localhost:8080/unidad/46/excel', {
            //     responseType: 'blob' // Configura el tipo de respuesta como blob
            // });

            const url = URL.createObjectURL(blob);

            // Crea un enlace temporal para descargar el archivo Excel
            const link = document.createElement('a');
            link.href = url;
            link.download = 'prueba.xls'; // Nombre del archivo Excel
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error al descargar el archivo Excel', error);
        } finally {
            console.log("Archivo descargado.");
        }

    }

    const handleNewInterno = () => {
        if (ficha && sector && pabellon && apellidos && nombres && fechaIngreso) {
            const nuevoInterno = {
                fichaCriminologia: ficha,
                sector: sector,
                pabellon: pabellon,
                apellidos: apellidos,
                nombres: nombres,
                fechaIngreso: fechaIngreso,
                activo: true,
            };

            //Se llama al servicio para ingresar nuevo interno
            axios.put('http://localhost:8080/unidad/46/internos', nuevoInterno)
                .then(response => {
                    getInternosFromService();
                    getActivos();
                })
                .catch(error => {
                    let err = error.response.data.mensaje;
                    setErrorMensaje(err ? err : "Ocurrió un error en la aplicación.");
                    setIsError(true);
                })

            // resetear los campos de entrada después de agregar un nuevo interno
            setFicha("");
            setSector("");
            setPabellon("");
            setApellidos("");
            setNombres("");
            setFechaIngreso("");

        } else {
            alert("Se deben ingresar todos los campos");
        }
    };


    const [internoSeleccionado, setInternoSeleccionado] = useState();


    function getInternosFromService(page, internoParam) {

        const internoBuscar = {
            fichaCriminologia: -1,
            sector: '',
            pabellon: -1,
            apellidos: '',
            nombres: '',
            fechaIngreso: null,
            activo: true,
        };

        axios.post('http://localhost:8080/unidad/46/internos/' + page + '-10', internoParam ? internoParam : internoBuscar)
            .then(response => {
                setDatos(response.data.internos);
            })
            .catch(error => {
                console.log(error.response.data.mensaje);
                console.log(error.response.data.state);
                setIsError(true);
            })
    }

    function nextPage() {
        var newPagina = pagina;
        if (datos.length > 0) {
            console.log("Subo Pagina")
            newPagina = pagina + 1;
            setPagina(newPagina);
        } else {
            console.log("No hay mas datos");
        }
        getInternosFromService(newPagina, filtro)
    }



    const previousPage = () => {
        var newPagina = pagina;
        if (pagina > 1) {
            console.log("Bajo Pagina")
            newPagina = pagina - 1;
            setPagina(newPagina);
        } else {
            console.log("Estás en la primer página");
        }
        getInternosFromService(newPagina, filtro)
    }

    const refreshInternos = () => {
        var page = pagina;
        if (!datos) {
            page = 1;
        }
        console.log(fechaIngreso);
        const internoDto = {
            fichaCriminologia: ficha ? ficha : -1,
            sector: sector ? sector : '',
            pabellon: pabellon ? pabellon : -1,
            apellidos: apellidos ? apellidos : '',
            nombres: nombres ? nombres : '',
            fechaIngreso: fechaIngreso ? fechaIngreso : null,
            activo: true,
        }
        setFiltro(internoDto)
        getInternosFromService(page, internoDto)
    }

    useEffect(() => {
        getInternosFromService(1);
    }, [])

    const [datos, setDatos] = useState([]);

    return (
        <>
            <table className="text-center">
                <thead>
                    <tr>
                        <TableHeader>Ficha Criminología</TableHeader>
                        <TableHeader>Sector</TableHeader>
                        <TableHeader>Pabellón</TableHeader>
                        <TableHeader>Apellidos</TableHeader>
                        <TableHeader>Nombres</TableHeader>
                        <TableHeader>Fecha de ingreso</TableHeader>
                        <TableHeader>Estado</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    <>
                        <tr>
                            <TableBody>
                                <input
                                    className="text-center border-2 border-red-200 p-1"
                                    placeholder="Ficha Criminología"
                                    value={ficha}
                                    onChange={(e) => setFicha(e.target.value)}
                                    onKeyDown={(e) => { if (e.key == 'Enter') { refreshInternos() } }}
                                    required={true} />
                            </TableBody>
                            <TableBody>
                                <input
                                    className="text-center border-2 border-red-200 p-1"
                                    placeholder="Sector"
                                    value={sector}
                                    onChange={(e) => setSector(e.target.value)}
                                    onKeyDown={(e) => { if (e.key == 'Enter') { refreshInternos() } }}
                                    required />
                            </TableBody>
                            <TableBody>
                                <input
                                    className="text-center border-2 border-red-200 p-1"
                                    placeholder="Pabellón"
                                    value={pabellon}
                                    onChange={(e) => setPabellon(e.target.value)}
                                    onKeyDown={(e) => { if (e.key == 'Enter') { refreshInternos() } }}
                                    required />
                            </TableBody>
                            <TableBody>
                                <input
                                    className="text-center border-2 border-red-200 p-1"
                                    placeholder="Apellidos"
                                    value={apellidos}
                                    onChange={(e) => setApellidos(e.target.value)}
                                    onKeyDown={(e) => { if (e.key == 'Enter') { refreshInternos() } }}
                                    required />
                            </TableBody>
                            <TableBody>
                                <input
                                    className="text-center border-2 border-red-200 p-1"
                                    placeholder="Nombres"
                                    value={nombres}
                                    onChange={(e) => setNombres(e.target.value)}
                                    onKeyDown={(e) => { if (e.key == 'Enter') { refreshInternos() } }}
                                    required />
                            </TableBody>
                            <TableBody>
                                <input
                                    className="text-center border-2 border-red-200 p-1"
                                    placeholder="Fecha ingreso"
                                    type="datetime-local"
                                    value={fechaIngreso}
                                    onChange={(e) => setFechaIngreso(e.target.value)}
                                    onKeyDown={(e) => { if (e.key == 'Enter') { refreshInternos() } }}
                                    required />
                            </TableBody>

                            <TableBody>
                                <Tooltip text="Nuevo Interno">
                                    <button
                                        className="text-center rounded-lg bg-red-500 text-white font-bold p-3 pl-3 pr-4 hover:bg-pallete-bgHeader hover:text-black border-2 border-red-200"
                                        type="submit"
                                        onClick={handleNewInterno}
                                    >
                                        <GrAdd className="text-white" />
                                    </button>
                                </Tooltip>
                                <Tooltip text="imei">
                                    <button
                                        className="text-center rounded-lg bg-orange-700 text-white p-3 pl-3 pr-4 hover:bg-pallete-bgHeader hover:text-black border-2 border-red-200"
                                        type="submit"
                                        onClick={() => setIsImeiSearch(true)}>
                                        <FaSearchengin />
                                    </button>
                                </Tooltip>
                            </TableBody>
                        </tr>
                    </>
                    {
                        datos.map((inter, index) => {
                            return <Interno key={inter.fichaCriminologia} interno={inter} handleModal={handleInternoClick} />
                        })}
                </tbody>
            </table>
            <span className="flex justify-center">
                <button
                    onClick={previousPage}
                    className="text-center rounded-lg bg-green-700 text-white p-3 pl-3 pr-4 hover:bg-pallete-bgHeader hover:text-black border-2 border-red-200"
                >
                    Anterior
                </button>
                <button
                    onClick={nextPage}
                    className="text-center rounded-lg bg-green-700 text-white p-3 pl-3 pr-4 hover:bg-pallete-bgHeader hover:text-black border-2 border-red-200"
                >
                    Proxima
                </button>
            </span>
            <div className="flex justify-center">
                <button
                    className="text-center rounded-lg bg-green-700 text-white p-3 pl-3 pr-4 hover:bg-pallete-bgHeader hover:text-black border-2 border-red-200"
                    onClick={handleExcelClick}
                >
                    Excel
                </button>
            </div>

            <ModalInterno isOpen={isOpen} closeModal={() => setIsOpen(false)} >
                <Card interno={internoSeleccionado} getActivos={getActivos} />
            </ModalInterno>

            <ModalInterno isOpen={isError} closeModal={() => setIsError(false)} >
                <div className="text-red-500 text-3xl font-bold text-center">
                    Se ha producido el siguiente error:
                </div>
                <div className="text-2xl text-center m-3">
                    {errorMensaje}
                </div>
            </ModalInterno>

            <ModalInterno isOpen={isImeiSearch} closeModal={() => setIsImeiSearch(false)}>
                <ImeiSearch />
            </ModalInterno>
        </>
    )

}

export default Internos

