// REACT
import React from 'react'
import { Container, Row } from 'react-bootstrap'

// ESTILO
import '../../assets/css/Style.css'
import './Home.css'

// PÁGINAS/COMPONENTES
import Banners from '../../components/macro/Banners/Banner'
import CarouselProducts from '../../components/macro/CarouselProducts/CarouselProducts'
import Title from '../../components/micro/Title/Title'
function Home(props) {

    return (
        <>
            <Container fluid className="py-4 mx-0 home">
                {/* BANNERS  */}
                <Title title="Destaques" class="mb-4" h1/>
                <Row className='row-banner'>
                    <Banners banner/>
                </Row>
                
                <Title title="Eventos"  class="my-4" h1/>
                <Row className='row-banner'>
                <Banners />
                </Row>

                {/* CAROUSEL'S DE PRODUTOS  */}
                <Container className="home-carousel">
                    <p className="mt-5 mb-0 title-carousel card-caption-mvp">Skins mais vendidas</p>
                    <CarouselProducts />

                    <p className="mt-5 mb-0 title-carousel card-caption-mvp">Top armas</p>
                    <CarouselProducts />

                    <p className="mt-5 mb-0 title-carousel card-caption-mvp">Top facas</p>
                    <CarouselProducts />
                </Container>
            </Container>
        </>
    )
}

export default Home