import React from 'react'
import './Register.css'
import axios from 'axios'
import { Container, FormGroup, Form, Col, FormLabel, Row } from 'react-bootstrap'
import RegisterForm from '../../components/macro/Forms/Register/RegisterForm'
import ButtonCustom from '../../components/micro/Button/Button.js'
import Title from '../../components/micro/Title/Title'
import { Link } from 'react-router-dom';
import If from '../../components/micro/If/If';
import LoginModal from '../../components/micro/LoginModal/LoginModal';

function Register(props) {

    var confirmPassword = '';

    var formValidated = false;

    const client = {
        nomeCliente: '',
        emailCliente: '',
        numeroTelefone: '',
        tradeLink: '',
        genero: {
            codigoGenero: ''
        },
        dataNascimento: '',
        senhaCliente: ''
    }

    function setPasswordConfirmation(passwordConfirmation) {
        confirmPassword = passwordConfirmation;
        console.log(confirmPassword)
    }

    function createClient(input, description) {
        switch (input) {
            case 'name':
                client.nomeCliente = description;
                break;
            case 'email':
                client.emailCliente = description;
                break;
            case 'phoneNumber':
                client.numeroTelefone = description;
                break;
            case 'trade':
                client.tradeLink = description;
                break;
            case 'gender':
                client.genero.codigoGenero = description;
                break;
            case 'date':
                client.dataNascimento = description;
                break;
            case 'password':
                client.senhaCliente = description;
                break;
            default:
                console.log("campo não identificado " + input);
        }
    }

    const replacePhone = (phone) => {
        var phoneInt = phone
        for (let i = 0; i < phone.length; i++) {
            var result = phone.charAt(i);
            if (result == "(") {
                phoneInt = phone.replace("(", "");
            }
            if (result == ")") {
                phoneInt = phoneInt.replace(")", "")
            }
            if (result == " ") {
                phoneInt = phoneInt.replace(" ", "")
            }
            if (result == "-") {
                phoneInt = phoneInt.replace("-", "")
            }
        }
        return phoneInt;
    }

    function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
        var d = new Date,
            ano_atual = d.getFullYear(),
            mes_atual = d.getMonth() + 1,
            dia_atual = d.getDate(),

            ano_aniversario = +ano_aniversario,
            mes_aniversario = +mes_aniversario,
            dia_aniversario = +dia_aniversario,

            quantos_anos = ano_atual - ano_aniversario;

        if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
            quantos_anos--;
        }

        return quantos_anos < 0 ? 0 : quantos_anos;
    }

    function validateForm() {
        const regexEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

        const phoneInt = replacePhone(client.numeroTelefone)

        const year = client.dataNascimento.substr(0,4)
        const mouth =client.dataNascimento.substr(5,2)
        const day = client.dataNascimento.substr(-2)

        const age = idade(year, mouth, day)

        if (client.nomeCliente == '') {
            alert("NOME INVÁLIDO")
            return false;
        }
        if (client.emailCliente == '' || !regexEmail.test(client.emailCliente)) {
            alert("EMAIL INVÁLIDO")
            return false;
        }
        if (phoneInt == '' || phoneInt.length < 10) {
            alert("TELEFONE INVÁLIDO")
            return false;
        }
        if (client.tradeLink == '') {
            alert("TRADELINK INVÁLIDO")
            return false;
        }
        if (client.genero.codigoGenero == '' || client.genero.codigoGenero == 'Selecione o gênero') {
            alert("GÊNERO DEVE SER PREENCHIDO")
            return false;
        }
        if (client.dataNascimento == '') {
            alert("DATA DE NASCIMENTO INÁLIDA")
            return false;
        }
        if (client.dataNascimento.length > 10 || client.dataNascimento.length < 10){
            alert("DATA DE NASCIMENTO ESTÁ EM UM FORMATO INVÁLIDO")
            return false;
        }
        if (age < 18){
            alert("SÓ É PERMITIDO CADASTRAR-SE CASO SEJA MAIOR DE IDADE")
            return false;
        }
        if (client.senhaCliente == '') {
            alert("SENHA INVÁLIDA")
            return false;
        }
        if (client.senhaCliente != confirmPassword) {
            alert("AS SENHAS DEVEM SER IGUAIS")
            return false;
        }
        return true;
    }

    function submitClient(event) {
        event.preventDefault();
        if (validateForm()) {
            axios.post("http://localhost:8080/cliente", client)
                .then((response) => {
                    console.log(response.data)
                    window.location.href = 'http://localhost:3000'
                })
                .catch((erro) => {
                    console.log("Ocorreu um erro " + erro)
                })
            formValidated = true;
            console.log(formValidated)
            alert("CLIENTE CADASTRADO COM SUCESSO")
            // return(
            //     <>
            //     <div>
            //         {(onClick)=><LoginModal link/>}
            //     </div>
            //     </>
            // )
        }
    }

    return (
        <>
            <Container fluid className='d-flex flex-column registration content-container'>
                <Form className='d-flex flex-column'>
                    <Title title="CADASTRO" class="mt-3" h1 />


                    <Container className="d-flex">
                        <FormGroup className='form-group ' controlId="FormRegisterClient">
                            <Row className='row-input justify-content-center'>
                                <Col xs={12} md={5} className="d-flex box-input my-3 mx-5 p-3">
                                    <FormLabel>Nome</FormLabel>
                                    <RegisterForm name function={createClient} />
                                </Col>
                                <Col xs={12} md={5} className="d-flex box-input my-3 mx-5 p-3">
                                    <FormLabel>E-mail</FormLabel>
                                    <RegisterForm email function={createClient} />
                                </Col>
                            </Row>
                            <Row className='row-input justify-content-center'>
                                <Col xs={12} md={5} className="d-flex box-input my-3 mb-3 mx-5 p-3">
                                    <FormLabel>Telefone</FormLabel>
                                    <RegisterForm phoneNumber function={createClient} />
                                </Col>
                                <Col xs={12} md={5} className="d-flex box-input my-3 p-3 mx-5">
                                    <FormLabel>Trade-Link</FormLabel>
                                    <RegisterForm trade function={createClient} />
                                    <a href='https://www.techtudo.com.br/noticias/2016/02/como-gerar-um-steam-trade-link-para-troca-de-itens-na-plataforma.ghtml'
                                        target='_blank'
                                        className='link-custom'>
                                        Onde obtenho o trade-link?
                                    </a>
                                </Col>
                            </Row>
                            <Row className='row-input justify-content-center'>
                                <Col xs={12} md={5} className="d-flex box-input my-3 mb-3 mx-5 p-3">
                                    <FormLabel>Gênero</FormLabel>
                                    <RegisterForm gender function={createClient} />
                                </Col>
                                <Col xs={12} md={5} className="d-flex box-input my-3 mb-3 mx-5 p-3">
                                    <FormLabel>Data de Nascimento</FormLabel>
                                    <RegisterForm date function={createClient} />
                                </Col>
                            </Row>
                            <Row className='row-input justify-content-center'>
                                <Col xs={12} md={5} className="d-flex box-input my-3 mb-3 mx-5 p-3">
                                    <FormLabel>Crie uma senha</FormLabel>
                                    <RegisterForm password function={createClient} />
                                </Col>
                                <Col xs={12} md={5} className="d-flex box-input my-3 mb-3 mx-5 p-3">
                                    <FormLabel>Repita a senha</FormLabel>
                                    <RegisterForm passwordConfirmation function={setPasswordConfirmation} />
                                </Col>
                            </Row>
                            <Row className='justify-content-center row-input '>
                                <Col xs={12} sm={6} className="my-3 mx-5 p-3 d-flex btn-cancel">
                                    <ButtonCustom navigation route='/' class='btn-secundary-mvp layout-btn' label='cancelar' />
                                </Col>
                                <Col xs={12} sm={6} className="my-3 mx-5 p-3 d-flex btn-submit">
                                    <ButtonCustom class='btn-primary-mvp layout-btn' label='cadastrar' onclick={(event) => submitClient(event)} />
                                </Col>
                            </Row>
                        </FormGroup>
                    </Container>

                </Form>
            </Container>
        </>
    )
}

export default Register