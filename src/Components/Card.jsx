import TableHeader from "./TableHeader"
import TableBody from './TableBody'
import { useEffect, useState } from "react"
import ModalInterno from "./ModalInterno";
import axios from 'axios';
import { BsCheck2Circle } from 'react-icons/bs'

function Card({ interno, getActivos }) {

    //HOOKS
    const [numero, setNumero] = useState("");
    const [compania, setCompania] = useState("");
    const [depositante, setDepositante] = useState("");
    const [dniDepositante, setDniDepositante] = useState("");
    const [accesorios, setAccesorios] = useState("");
    const [imei, setImei] = useState("");
    const [marca, setMarca] = useState("");
    const [modelo, setModelo] = useState("");
    const [estado, setEstado] = useState();
    const [fechaIngreso, setFechaIngreso] = useState();
    const [fechaEgreso, setFechaEgreso] = useState();

    const [celularSeleccionado, setCelularSeleccionado] = useState();

    //MODAL
    const [isOpen, setIsOpen] = useState(false);
    const [isDiscontinuado, setIsDiscontinuado] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    const [celulares, setCelulares] = useState([]);
    const [celAEliminar, setCelAEliminar] = useState({});

    const emptyCelular = {
        numero: "",
        compania: "",
        depositante: "",
        dniDepositante: "",
        accesorios: "",
        imei: "",
        marca: "",
        modelo: "",
        fechaIngreso: "",
        fechaEgreso: "",
        fichaCriminologia: interno.fichaCriminologia
    }
    const [filtrosCelular, setFiltrosCelular] = useState(emptyCelular)


    const handleNewCelular = () => {

        if (numero && compania && depositante && dniDepositante && accesorios && imei && marca && modelo && fechaIngreso) {
            const nuevoCelular = {
                numero: numero,
                compania: compania,
                depositante: depositante,
                dniDepositante: dniDepositante,
                accesorios: accesorios,
                imei: imei,
                marca: marca,
                modelo: modelo,
                activo: true,
                fechaIngreso: fechaIngreso,
                fechaEgreso: fechaEgreso,
                fichaCriminologia: interno.fichaCriminologia
            }

            // Agregar en la base
            setCelulares([...celulares, nuevoCelular]);

            axios.put('http://localhost:8080/unidad/46/celular', nuevoCelular)
                .then(response => {
                    setIsCreate(true);
                    setCelAEliminar({});
                    getActivos();
                })
                .catch(error => {
                    // console.log(error);
                    // console.log(error.response.data.mensaje);
                    // console.log(error.response.data.state);
                    // setIsError(true);
                    // setDataList([])
                })

            // blanqueo
            setNumero("");
            setCompania("");
            setDepositante("");
            setDniDepositante("");
            setAccesorios("");
            setImei("");
            setMarca("");
            setModelo("");
            setEstado("");
        } else {
            alert("Se debe completar todos los campos con *.")
        }

    }

    const handleDismiss = (e, cel) => {
        setCelAEliminar(cel);
        setIsOpen(true);
    }

    const discontinuarCelular = () => {
        axios.post('http://localhost:8080/unidad/46/celular/discontinuar/' + celAEliminar.id)
            .then(response => {
                setIsDiscontinuado(true);
                setCelAEliminar({});
                getActivos();
            })
            .catch(error => {
                // console.log(error);
                // console.log(error.response.data.mensaje);
                // console.log(error.response.data.state);
                // setIsError(true);
                // setDataList([])
            })
    }

    const getCelulares = (celFilter) => {
        axios.post('http://localhost:8080/unidad/46/celular/' + interno.fichaCriminologia, celFilter ? celFilter : emptyCelular)
            .then(response => {
                setCelulares(response.data);
            })
            .catch(error => {
                // console.log(error);
                // console.log(error.response.data.mensaje);
                // console.log(error.response.data.state);
                // setIsError(true);
                // setDataList([])
            })
    }

    const refreshCelulares = () => {
        var filtro = {
            numero: numero ? numero : '',
            compania: compania ? compania : '',
            depositante: depositante ? depositante : '',
            dniDepositante: dniDepositante ? dniDepositante : '',
            accesorios: accesorios ? accesorios : '',
            imei: imei ? imei : '',
            marca: marca ? marca : '',
            modelo: modelo ? modelo : '',
            fechaIngreso: fechaIngreso ? fechaIngreso : '',
            fechaEgreso: fechaEgreso ? fechaEgreso : '',
            fichaCriminologia: interno.fichaCriminologia
        }
        getCelulares(filtro);
    }

    useEffect(() => {
        getCelulares();
    }, [])

    return (<>
        <div className="text-center text-3xl font-bold">{interno.apellidos.toUpperCase()}{', '}{interno.nombres.toUpperCase()}</div>
        <table className="text-center">
            <thead>
                <tr>
                    <TableHeader>Número: </TableHeader>
                    <TableHeader>Compañía: </TableHeader>
                    <TableHeader>Depositante:</TableHeader>
                    <TableHeader>Dni Depositante:</TableHeader>
                    <TableHeader>Accesorios</TableHeader>
                    <TableHeader>IMEI</TableHeader>
                    <TableHeader>Marca</TableHeader>
                    <TableHeader>Modelo</TableHeader>
                    <TableHeader>Fecha Ingreso</TableHeader>
                    <TableHeader>Fecha Egreso</TableHeader>
                    <TableHeader>Estado</TableHeader>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <TableBody>
                        <input
                            className="text-center border-2 border-red-200 p-1"
                            placeholder="Número"
                            value={numero}
                            onKeyDown={(e) => { if (e.key == 'Enter') { refreshCelulares() } }}
                            onChange={(e) => setNumero(e.target.value)}
                        />
                    </TableBody>
                    <TableBody>
                        <input
                            className="text-center border-2 border-red-200 p-1"
                            placeholder="Compañía"
                            value={compania}
                            onKeyDown={(e) => { if (e.key == 'Enter') { refreshCelulares() } }}
                            onChange={(e) => setCompania(e.target.value)}
                        />
                    </TableBody>
                    <TableBody>
                        <input
                            className="text-center border-2 border-red-200 p-1"
                            placeholder="Depositante"
                            value={depositante}
                            onKeyDown={(e) => { if (e.key == 'Enter') { refreshCelulares() } }}
                            onChange={(e) => setDepositante(e.target.value)}
                        />
                    </TableBody>
                    <TableBody>
                        <input
                            className="text-center border-2 border-red-200 p-1"
                            placeholder="Dni Depositante"
                            value={dniDepositante}
                            onKeyDown={(e) => { if (e.key == 'Enter') { refreshCelulares() } }}
                            onChange={(e) => setDniDepositante(e.target.value)}
                        />
                    </TableBody>
                    <TableBody>
                        <input
                            className="text-center border-2 border-red-200 p-1"
                            placeholder="Accesorios"
                            value={accesorios}
                            onKeyDown={(e) => { if (e.key == 'Enter') { refreshCelulares() } }}
                            onChange={(e) => setAccesorios(e.target.value)}
                        />
                    </TableBody>
                    <TableBody>
                        <input
                            className="text-center border-2 border-red-200 p-1"
                            placeholder="Imei"
                            value={imei}
                            onKeyDown={(e) => { if (e.key == 'Enter') { refreshCelulares() } }}
                            onChange={(e) => setImei(e.target.value)}
                        />
                    </TableBody>
                    <TableBody>
                        <input
                            className="text-center border-2 border-red-200 p-1"
                            placeholder="Marca"
                            value={marca}
                            onKeyDown={(e) => { if (e.key == 'Enter') { refreshCelulares() } }}
                            onChange={(e) => setMarca(e.target.value)}
                        />
                    </TableBody>
                    <TableBody>
                        <input
                            className="text-center border-2 border-red-200 p-1"
                            placeholder="Modelo"
                            value={modelo}
                            onKeyDown={(e) => { if (e.key == 'Enter') { refreshCelulares() } }}
                            onChange={(e) => setModelo(e.target.value)}
                        />
                    </TableBody>
                    <TableBody>
                        <input
                            className="text-center border-2 border-red-200 p-1"
                            placeholder="Fecha ingreso"
                            type="date"
                            value={fechaIngreso}
                            onChange={(e) => setFechaIngreso(e.target.value)}
                            onKeyDown={(e) => { if (e.key == 'Enter') { refreshInternos() } }}
                            required />
                    </TableBody>
                    <TableBody>
                        <input
                            className="text-center border-2 border-red-200 p-1"
                            placeholder="Fecha Egreso"
                            type="date"
                            value={fechaEgreso}
                            onChange={(e) => setFechaIngreso(e.target.value)}
                            onKeyDown={(e) => { if (e.key == 'Enter') { refreshInternos() } }}
                            required />
                    </TableBody>
                    <TableBody>
                        <input
                            className="text-center rounded-lg bg-red-500 text-white py-2 px-4 hover:bg-pallete-bgHeader hover:text-black border-2 border-red-200 text-2xl"
                            type="submit"
                            value="+"
                            onClick={handleNewCelular}
                        />
                        {/* <button
                            className="text-center rounded-lg bg-green-700 text-white py-2 px-4 hover:bg-pallete-bgHeader hover:text-black border-2 border-red-200 text-2xl ml-1"
                            type="submit"
                            onClick={handleNewCelular}
                        >+</button> */}
                    </TableBody>
                </tr>
                {/* Activos */}
                {celulares
                    .filter(cel => cel.activo)
                    .map((cel) => {
                        return (
                            <tr key={cel.id}>
                                <TableBody>{cel.numero}</TableBody>
                                <TableBody>{cel.compania}</TableBody>
                                <TableBody>{cel.depositante}</TableBody>
                                <TableBody>{cel.dniDepositante}</TableBody>
                                <TableBody>{cel.accesorios ? cel.accesorios : '---------'}</TableBody>
                                <TableBody>{cel.imei}</TableBody>
                                <TableBody>{cel.marca}</TableBody>
                                <TableBody>{cel.modelo}</TableBody>
                                <TableBody>{cel.fechaIngreso}</TableBody>
                                <TableBody>{cel.fechaEgreso}</TableBody>
                                <TableBody>
                                    <div className="text-green-500 font-bold">ACTIVO {' '}
                                        <span onClick={(e) => handleDismiss(e, cel)}>
                                            <button className="bg-red-500 p-1 pl-3 pr-3 text-white rounded-full">X</button>
                                        </span>
                                    </div>
                                </TableBody>
                            </tr>)
                    })
                }
                {/* Modal de confirmacion de dar de baja un celular */}
                <tr>
                    <th className="t-center text-3xl font-bold mt-3 mb-4 pl- flex justify-center">Histórico</th>
                </tr>
                {/* Inactivos */}
                {celulares
                    .filter(cel => !cel.activo)
                    .map((cel, index) => {
                        return (
                            <tr key={cel.id}>
                                <TableBody>{cel.numero}</TableBody>
                                <TableBody>{cel.compania}</TableBody>
                                <TableBody>{cel.depositante}</TableBody>
                                <TableBody>{cel.dniDepositante}</TableBody>
                                <TableBody>{cel.accesorios}</TableBody>
                                <TableBody>{cel.imei}</TableBody>
                                <TableBody>{cel.marca}</TableBody>
                                <TableBody>{cel.modelo}</TableBody>
                                <TableBody>{cel.fechaIngreso}</TableBody>
                                <TableBody>{cel.fechaEgreso}</TableBody>
                                <TableBody><div className="text-red-500 font-bold">INACTIVO</div></TableBody>
                            </tr>)
                    })
                }
            </tbody>
        </table >
        <ModalInterno isOpen={isOpen} closeModal={() => setIsOpen(false)} confirmar={true} confirmarNombre="¡SI!" confirmarAction={discontinuarCelular}>
            <div className="text-3xl text-center">Desea dar de baja el celular?</div>
            <div className="text-center mt-2">
                <div>
                    <div className="font-bold">NUMERO</div>
                    {celAEliminar.numero}
                </div>
                <div>
                    <div className="font-bold" >MARCA</div>
                    {celAEliminar.marca}
                </div>
                <div>
                    <div className="font-bold">MODELO</div>
                    {celAEliminar.modelo}
                </div>
                <div>
                    <div className="font-bold">IMEI</div>
                    {celAEliminar.imei}
                </div>
            </div>
        </ModalInterno>
        <ModalInterno isOpen={isDiscontinuado}
            closeModal={() => {
                setIsDiscontinuado(false);
                setIsOpen(false);
                getCelulares();
            }}
        >
            <div className="p-10">
                <div className="font-bold text-3xl text-center flex justify-center">
                    El celular se ha dado de baja correctamente!
                </div>
                <div className="text-green-700 text-8xl flex justify-center">
                    <BsCheck2Circle />
                </div>
            </div>
        </ModalInterno>

        <ModalInterno isOpen={isCreate}
            closeModal={() => {
                setIsCreate(false);
                getCelulares();
            }}
        >
            <div className="p-10">
                <div className="font-bold text-3xl text-center flex justify-center">
                    Se ha creado correctamente!
                </div>
                <div className="text-green-700 text-8xl flex justify-center">
                    <BsCheck2Circle />
                </div>
            </div>
        </ModalInterno>
    </>)
}

export default Card;