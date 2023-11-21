import { useEffect, useState } from "react"
import { Modal, ModalBody, ModalHeader, Form, FormGroup, Input, Label, ModalFooter, Button} from "reactstrap"

const modeloUsuario = {
    id : 0,
    nombre: "",
    correo: "",
    Edad: 0
}


const ModalUsuario = ({ mostrarModal, setMostrarModal, guardarUsuario, editar, setEditar, editarUsuario}) => {

    const [usuario, setUsuario] = useState(modeloUsuario);

    const actualizarDato = (e) => {

        console.log(e.target.name + " : " + e.target.value)
        setUsuario(
            {
                ...usuario,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {

        if (!usuario.nombre.trim() || !usuario.correo.trim() || !usuario.edad) {
            alert("Por favor, completa todos los campos.");
            return; 
        }

        if (!usuario.correo.includes('@')) {
            alert("Ingresa un correo válido.");
            return; 
        }

        if (isNaN(usuario.edad) || usuario.edad <= 0 || usuario.edad > 150) {
            alert("Ingresa una edad válida.");
            return; 
        }

        if (usuario.id == 0) {
            guardarUsuario(usuario)
        } else {
            editarUsuario(usuario)
        }

        setUsuario(modeloUsuario)

    }

    useEffect(() => {
        if (editar != null) {
            setUsuario(editar)
        } else {
            setUsuario(modeloUsuario)
        }
    }, [editar])

    const cerrarModal = () => {

        setMostrarModal(!mostrarModal)
        setEditar(null)
    }


    return (

        <Modal isOpen={mostrarModal}>
            <ModalHeader>

                {usuario.id == 0 ? "Nuevo Usuario" : "Editar Usuario"}
                
            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={usuario.nombre}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input name="correo" onChange={(e) => actualizarDato(e)} value={usuario.correo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Edad</Label>
                        <Input name="edad" onChange={(e) => actualizarDato(e)} value={usuario.edad}/>
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos }>Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal } >Cerrar</Button>
            </ModalFooter>
        </Modal>

        )
}

export default ModalUsuario