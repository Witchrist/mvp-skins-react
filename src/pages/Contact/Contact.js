// REACT
import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

// ESTILO
import '../../assets/css/Style.css'
import './Contact.css'

// PÁGINAS/COMPONENTES
import email from '../../assets/images/icones/icon-email-contato.png'
import tel from '../../assets/images/icones/icon-whatapp-contato.png'
import discord from '../../assets/images/icones/icon-discord-contato.png'


function Contact(props) {

    return (
        <>
            <Container className="contact">
                <Row className="pt-5">
                    <h1 className="contact-h1">Como podemos te ajudar?</h1>
                    <p className="pb-5">Entre em contato por uma das redes abaixo</p>
                </Row>

                <Row className="pb-5">
                    <Col className="contact-infos px-5">
                        <img className="py-2 contact-icon" src={email} alt="" />
                        <p>E-mail</p>
                        <p>Tem alguma dúvida? Mande uma e-mail para a nossa equipe!</p>
                        <a href="#" className="contact-link"><p>mvpskins@gmail.com</p></a>

                    </Col>

                    <Col className="contact-infos px-5">
                        <img className="py-2 contact-icon" src={tel} alt="" />
                        <p>WhatsApp</p>
                        <p>Você pode nos enviar mensagem a qualquer hora.</p>
                        <a href="#" className="contact-link"><p>(11) 95151-5151</p></a>

                    </Col>

                    <Col className="contact-infos px-5">
                        <img className="py-2 contact-icon" src={discord} alt="" />
                        <p>Discord</p>
                        <p>Entre em nosso servidor para ter acesso à mais informações.</p>
                        <a href="#" className="contact-link"><p>Clique aqui</p></a>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Contact