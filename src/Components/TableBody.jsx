function TableBody(props) {
    return (
        <td className="px-4 py-2"><span className={props.color}>{props.children}</span></td>
    )
}

export default TableBody;