// REACT
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Nav, Col, Button, Container, Modal } from 'react-bootstrap'

// ESTILO
import '../../../../assets/css/Style.css'
import './Requests.css'

// PÁGINAS/COMPONENTES
import RequestsItems from './../RequestsItems/RequestsItems'
import cursor from '../../../../assets/images/icones/icon-cursor.png'
import Moment from 'react-moment';

function Requests() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8080/pedidos/order-history/2`)
            .then((response) => {
                setRequests(response.data);
            })
            .catch((erro) => {
                console.log("Ocorreu um erro " + erro)
            });
    }, []
    )

    function Status(bool) {
        if (bool == 0) {
            return "Em andamento";
        } else {
            return "Finalizado";
        }
    }

    // LISTAR OS PEDIDOS DE UM CLIENTE
    function GetRequests() {
        return requests.map(
            (request, i) =>
                <Nav key={i} className="list-group flex-row request-style py-1" defaultActiveKey="/home" as="ul">
                    <Col className="col-2" >
                        <Nav.Item as="li"> {request.id} </Nav.Item>
                    </Col>

                    <Col className="col-2">
                        <Nav.Item as="li">
                            <Moment format="DD/MM/YYYY">
                                {request.dataRegistro}
                            </Moment>
                        </Nav.Item>
                    </Col>

                    <Col className="col-2 requests-resp" >
                        <Nav.Item as="li"> R$ {(request.valorLiquido.toFixed(2)).toString().replace(".", ",")} </Nav.Item>
                    </Col>

                    <Col className="col-2 requests-resp" >
                        <Nav.Item as="li"> {Status(request.status)} </Nav.Item>
                    </Col>

                    <Col className="col-2" >
                        <Button variant="primary" onClick={handleShow} className="me-2 request-button">
                            <img className="arrow" src={cursor} />
                        </Button>
                    </Col>
                    <Container className="col-9">
                        <Modal className="request-modal" show={show} onHide={handleClose}>
                            <RequestsItems id={request.id}/>
                        </Modal>
                    </Container>
                </Nav>
        )

    }

    // PEDIDOS - TÍTULO
    return (
        <>
            <Nav className="list-group flex-row card-caption-mvp py-2" defaultActiveKey="/home" as="ul">
                <Col className="col-2" >
                    <Nav.Item as="li" className=""> Pedido </Nav.Item>
                </Col>

                <Col className="col-2">
                    <Nav.Item as="li" className=""> Data </Nav.Item>
                </Col>

                <Col className="col-2 requests-resp">
                    <Nav.Item as="li" className=""> Preço </Nav.Item>
                </Col>

                <Col className="col-2 requests-resp">
                    <Nav.Item as="li" className=""> Status </Nav.Item>
                </Col>

                <Col className="col-2" >
                    <Nav.Item as="li" className=""> Abrir </Nav.Item>
                </Col>
            </Nav>
            {GetRequests()}
        </>
    )
}

export default Requests