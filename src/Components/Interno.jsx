import TableBody from './TableBody'

function Interno(props) {

    const sendDataToModal = () => {
        return props.handleModal({
            "fichaCriminologia": props.interno.fichaCriminologia,
            "sector": props.interno.sector,
            "pabellon": props.interno.pabellon,
            "apellidos": props.interno.apellidos,
            "nombres": props.interno.nombres,
            "fecha_ingreso": props.interno.fechaIngreso,
            "activo": props.interno.activo
        })
    }

    return (
        <>
            <tr key={props.interno.fichaCriminologia} className="hover:bg-pallete-bgList" onClick={sendDataToModal}>
                <TableBody>{props.interno.fichaCriminologia}</TableBody>
                <TableBody>{props.interno.sector}</TableBody>
                <TableBody>{props.interno.pabellon}</TableBody>
                <TableBody>{props.interno.apellidos}</TableBody>
                <TableBody>{props.interno.nombres}</TableBody>
                <TableBody>{props.interno.fechaIngresoString}</TableBody>
                <TableBody color={props.interno.activo ? 'text-green-500 font-bold' : 'text-red-500 font-bold'}>{props.interno.activo ? "ACTIVO" : "INACTIVO"}</TableBody>
            </tr>
        </>
    )
}
export default Interno;

// className="px-4 py-2" className="table-auto w-full mb-4"