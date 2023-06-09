function ModalInterno(props) {

    return (
        <>
            {props.isOpen && (
                <div className="fixed inset-0 flex items-center justify-center opacity-100 transition-opacity ease-out duration-300">
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gray-900 opacity-50"></div>
                    <div className="bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all mx-auto mr-5 ml-5">
                        <div className="sm:overflow-auto">
                            <div>
                                {props.children}
                            </div>
                            <div className="flex justify-center m-2">
                                <button
                                    hidden={!props.confirmar}
                                    className="text-center rounded-lg bg-green-500 text-bold text-white py-2 px-7 mr-1 hover:bg-pallete-bgHeader hover:text-black"
                                    onClick={props.confirmarAction}
                                >
                                    {props.confirmarNombre}
                                </button>
                                <button
                                    onClick={props.closeModal}
                                    className="text-center rounded-lg bg-red-500 text-white py-2 px-4 hover:bg-pallete-bgHeader hover:text-black"
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ModalInterno;