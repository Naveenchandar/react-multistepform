import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

function LoginPage() {
    return (
        <div>
            <Row>
                <Form>
                    <Col>
                        <Form.Group as={Row}>
                            <Form.Label column sm="5">
                                Email
                            </Form.Label>
                            <Col sm="7">
                                <Form.Control type="email" placeholder="Enter Email" name="CompanyName" className="CompanyName" id="CompanyName" autoFocus />
                            </Col>
                        </Form.Group>
                    </Col>
                </Form>
            </Row>
        </div>
    )
}
export default LoginPage;
