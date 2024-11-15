import React from 'react'
import { Card, Col, Container,Row } from 'react-bootstrap'
import Header from './Header'
import { FaClock, FaCocktail, FaParking, FaSnowflake, FaUtensils, FaWifi ,FaTshirt} from 'react-icons/fa'

const HotelService = () => {
    return(
        <>
            <Container className='mb-2'>
                <Header title = {"Our Services"}/>
                    <Row className='mt-4' >
                        <h4 className="text-center">
                            Services at <span className='hotel-color'>SanhDieu Hotel</span>
                        <span className="gap-2">
                            <FaClock className='ml-5'/> 24-hour Front Desk
                        </span>
                        </h4>
                    </Row>
                    <hr />
                    <Row xs={1} lg={3} md={2} className='g-4 mt-2'>
                        <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaWifi>Wifi</FaWifi>
                                </Card.Title>
                                <Card.Text>Stay connected with high-speed internet access.</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>

                        <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaUtensils/> Breakfast
                                </Card.Title>
                                <Card.Text>Star.</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>

                        <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaTshirt/> Laundry
                                </Card.Title>
                                <Card.Text>Keep your clothes clean with our laundry service</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>

                        <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaCocktail/> Mini-bar
                                </Card.Title>
                                <Card.Text>Enjoy drink in-room with our service</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>

                        <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaParking/> Parking
                                </Card.Title>
                                <Card.Text>Parking Area</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>

                        <Col>
                        <Card>
                            <Card.Body>
                                <Card.Title className='hotel-color'>
                                    <FaSnowflake/> Air conditioning
                                </Card.Title>
                                <Card.Text>Stay cool and comfortable</Card.Text>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
            </Container>

        </>

    )
}
export default HotelService