import React, { useState } from 'react';
import Success from './Success';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../css/StepThree.css';
import { Animated } from "react-animated-css";
import ScrollAnimation from 'react-animate-on-scroll';

function StepThree() {
    /* Initializing state */
    const [value, setValue] = useState('')
    const [randomValue, setRandomValue] = useState(Math.floor(10000 + Math.random() * 90000))
    const [errValue, setErrValue] = useState('')
    const [ErrStepValues, setErrStepValues] = useState('');
    const [successPage, setSuccessPage] = useState(false);

    const { push } = useHistory();
    const BoxStyle = {
        padding: '0px 15px'
    }

    /* updating state values based on onchange */
    const handleValueChange = (e) => {
        setValue(e.target.value)
        setErrValue('')
    }

    /* onsubmit function  */
    const handleSubmit = (e) => {
        e.preventDefault();/* prevents page loading */
        /* Check whether first two pages has been filled */
        if (!JSON.parse(localStorage.getItem('mycred'))) {
            setErrStepValues('Please fill step 1 and step 2 values first')
        } else {
            const stepvalues = JSON.parse(localStorage.getItem('mycred'));
            if (!stepvalues.FullName && !stepvalues.PhoneNumber) {
                setErrStepValues('Please fill step 1 values first.');
            } else {
                if (!stepvalues.CompanyName && !stepvalues.JobTitle) {
                    setErrStepValues('Please fill Personal Details and Company details first.');
                } else {
                    if (value == randomValue) {
                        setSuccessPage(true)/* If values is correct pass true to open success page */
                    } else {
                        setErrValue('Incorrect Please try again.')
                    }
                }
            }
        }
    }

    /* Back button function */
    const handleClick = () => {
        push('/steptwo')
    }

    return (
        <div>
            <ScrollAnimation animateIn='fadeIn' animateOut='fadeOut'>
                <Animated animationIn="fadeIn" animationInDelay={0.3} animationInDuration={0.8} isVisible={true}>
                    <Form onSubmit={handleSubmit} className="step3Form">
                        {ErrStepValues ? <span style={{ color: 'red', marginLeft: '150px' }}>{ErrStepValues}</span> : <span style={{ visibility: 'hidden' }}>Hidden</span>}
                        <div style={{ paddingLeft: '166px', paddingTop: '15px' }}>
                            <span style={BoxStyle}>{randomValue.toString().split('').splice(0, 1)}</span>
                            <span style={BoxStyle}>{randomValue.toString().split('').splice(1, 1)}</span>
                            <span style={BoxStyle}>{randomValue.toString().split('').splice(2, 1)}</span>
                            <span style={BoxStyle}>{randomValue.toString().split('').splice(3, 1)}</span>
                            <span style={BoxStyle}>{randomValue.toString().split('').splice(4, 1)}</span>
                        </div>
                        <br />
                        <Col sm={{ span: 5, offset: 5 }}>
                            <Form.Control type="number" placeholder="Enter the OTP" className="value" id="value" autoFocus value={value} onChange={handleValueChange} />
                        </Col>
                        {errValue ? <span style={{ color: 'red', paddingLeft: '180px', paddingTop: '10px' }}>{errValue}</span> : ''}
                        <hr className="hrline" />
                        <>
                            <Row style={{ dispaly: 'flex', justifyContent: 'space-between' }}>
                                <button className="btn btn-default" onClick={handleClick} style={{ marginBottom: '15px', background: 'rgba(193, 204, 202, 0.66)', borderColor: 'transparent', marginLeft: '35px' }}>&ensp;Back&ensp;</button>
                                <button className="btn btn-primary" style={{ background: '#1abc9c', borderColor: 'transparent', marginBottom: '15px', marginRight: '-75px' }}>&ensp;Sign Up&ensp;</button>
                            </Row>
                        </>
                    </Form>
                    {successPage ?
                        <Success /> : ''}
                </Animated>
            </ScrollAnimation>
        </div>
    )
}

export default React.memo(StepThree);
