
import { useEffect, useState } from "react"
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap"
import ModalUsuario from "./componentes/ModalUsuario"
import TablaUsuario from "./componentes/TablaUsuario"

const App = () => {

    const [usuarios, setUsuarios] = useState([])
    const [mostrarModal, setMostrarModal] = useState(false);
    const [editar, setEditar] = useState(null)
    const [paginaActual, setPaginaActual] = useState(1);
    const elementosPorPagina = 10;


    const mostrarUsuarios = async (pagina) => {
        const response = await fetch(`api/usuario/Listar?pagina=${pagina}&elementosPorPagina=${elementosPorPagina}`);

        if (response.ok) {
            const data = await response.json();
            setUsuarios(data);
        } else {
            console.log("Error al listar los usuarios");
        }
    };


    useEffect(() => {
        mostrarUsuarios(paginaActual);
    }, [paginaActual]);

    const paginaSiguiente = () => {
        setPaginaActual(paginaActual + 1);
    };

    const paginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };



    const guardarUsuario = async (usuario) => {

        const response = await fetch("api/usuario/Guardar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(usuario)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarUsuarios();
        }
    }

    const editarUsuario = async (usuario) => {

        const response = await fetch("api/usuario/Editar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(usuario)
        })

        if (response.ok) {
            setMostrarModal(!mostrarModal);
            mostrarUsuarios();
        }
    }

    const eliminarUsuario = async (id) => {

        var respuesta = window.confirm("Desea eliminar el siguiente usuario?")

        if (!respuesta) {
            return;
        }


        const response = await fetch("api/usuario/Eliminar/" + id, {
            method: 'DELETE',
        })

        if (response.ok) {
            mostrarUsuarios();
        }
    }


    return (
        <Container>
            <Row className="mt-5">

                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de Usuario</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success"
                                onClick={() => setMostrarModal(!mostrarModal)}
                            >Nuevo Usuario</Button>
                            <hr></hr>
                            <TablaUsuario data={usuarios}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}

                                eliminarUsuario={eliminarUsuario}
                            />
                            <span style={{ marginRight: '5px' }}>
                                <Button color="primary" onClick={paginaAnterior} disabled={paginaActual === 1}>
                                    Anterior
                                </Button>
                            </span>
                            <Button color="primary" onClick={paginaSiguiente}>
                                Siguiente
                            </Button>
                        </CardBody>
                    </Card>
                </Col>
              
            </Row>

            <ModalUsuario
                mostrarModal={mostrarModal}

                setMostrarModal={setMostrarModal}
                guardarUsuario={guardarUsuario}


                editar={editar}
                setEditar={setEditar}
                editarUsuario={editarUsuario}
            />
        </Container>
    )

}

export default App;