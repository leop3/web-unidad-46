import { useState } from "react";
import TableHeader from "./TableHeader";
import ImeiFound from "./ImeiFound";
import axios from 'axios';

function ImeiSearch(props) {


    const [dataImei, setDataImei] = useState("");

    const [dataList, setDataList] = useState([]);

    function searchInternos() {
        // return setDataList(data);
        var response = []
        axios.get('http://localhost:8080/unidad/46/internos/imei/' + dataImei)
            .then(response => {
                console.log("Response: ")
                console.log(response.data)
                return setDataList(response.data);
            })
            .catch(error => {
                console.log(error.response.data.mensaje);
                console.log(error.response.data.state);
                setIsError(true);
                setDataList([])
            })

    }

    return (<>
        <h2 className="font-bold text-center text-2xl">Busqueda por IMEI</h2>

        <input
            placeholder="Ingrese IMEI"
            className="text-center flex justify-center m-auto border-2 border-red-200 p-2 mt-2 rounded-lg"
            value={dataImei}
            onChange={(e) => setDataImei(e.target.value)}
            onKeyPress={(e) => { if (e.key == 'Enter') { searchInternos() } }}
        />

        <table className="text-center">
            <thead>
                <tr>
                    <TableHeader>FICHA CRIMINOLOGIA</TableHeader>
                    <TableHeader>APELLIDOS</TableHeader>
                    <TableHeader>NOMBRES</TableHeader>
                    <TableHeader>ESTADO INTERNO</TableHeader>
                    <TableHeader>IMEI</TableHeader>
                    <TableHeader>ESTADO CELULAR</TableHeader>
                </tr>
            </thead>
            <tbody>{
                dataList.map((inter) => {
                    return <ImeiFound interno={inter} />
                })
            }
            </tbody>

        </table>
    </>)
}

export default ImeiSearch;