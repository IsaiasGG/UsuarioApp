import React, { useState, useEffect } from 'react';
import { Button, Table } from 'reactstrap';

const TablaUsuario = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarUsuario }) => {
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;
    const [datosPaginados, setDatosPaginados] = useState([]);

    // Función para manejar los datos paginados
    const obtenerDatosPaginados = () => {
        const inicio = (paginaActual - 1) * elementosPorPagina;
        const fin = inicio + elementosPorPagina;
        const datosActuales = data.slice(inicio, fin);
        setDatosPaginados(datosActuales);
    };

    useEffect(() => {
        obtenerDatosPaginados();
    }, [data, paginaActual]);

    const enviarDatos = (usuario) => {
        setEditar(usuario);
        setMostrarModal(!mostrarModal);
    };

    return (
        <>
            <Table striped responsive>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Edad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {datosPaginados.length < 1 ? (
                        <tr>
                            <td colSpan="4">No hay registros</td>
                        </tr>
                    ) : (
                        datosPaginados.map((item) => (
                            <tr key={item.id}>
                                <td>{item.nombre}</td>
                                <td>{item.correo}</td>
                                <td>{item.edad}</td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2"
                                        onClick={() => enviarDatos(item)}
                                    >Editar</Button>
                                    <Button color="danger" size="sm"
                                        onClick={() => eliminarUsuario(item.id)}
                                    >Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </Table>
        </>
    );
};

export default TablaUsuario;
