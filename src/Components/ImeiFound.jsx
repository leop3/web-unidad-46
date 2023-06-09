import TableBody from "./TableBody";

function ImeiFound(props) {
    return (
        <>
            <tr key={props.interno.fichaCriminologia}>
                <TableBody>{props.interno.fichaCriminologia}</TableBody>
                <TableBody>{props.interno.apellidos}</TableBody>
                <TableBody>{props.interno.nombres}</TableBody>
                <TableBody>{props.interno.estadoInterno
                    ? <span className="text-green-500 font-bold">Activo</span>
                    : <span className="text-red-500 font-bold">Inactivo</span>}
                </TableBody>
                <TableBody>{props.interno.imei}</TableBody>
                <TableBody>{props.interno.estadoCelular
                    ? <span className="text-green-500 font-bold">Activo</span>
                    : <span className="text-red-500 font-bold">Inactivo</span>}
                </TableBody>
            </tr>
        </>
    )
}

export default ImeiFound;