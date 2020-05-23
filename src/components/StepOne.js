import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import '../css/StepOne.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Animated } from "react-animated-css";
import ScrollAnimation from 'react-animate-on-scroll';

function StepOne() {
    /* Initializing state */
    const [fullName, setFullName] = useState('');
    const [errFullName, setErrFullName] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [errPhoneNumber, setErrPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const [errGender, setErrGender] = useState('');
    const [country, setCountry] = useState('India');
    const [errCountry, setErrCountry] = useState('');
    const [states, setStates] = useState('India');
    const [errStates, setErrStates] = useState('Tamilnadu');
    
    const { push } = useHistory();

    /* updating state values based on onchange */
    const handleNameChange = (e) => {
        setFullName(e.target.value)
    }
    const handleNumChange = (e) => {
        /* check phone number length */
        if (e.target.value.length < 11) {
            setphoneNumber(e.target.value)
        } else {
            e.preventDefault();
        }
    }
    const handleRadioChange = (e) => {
        setGender(e.target.value)
    }
    const handleSelectChange = (e) => {
        setCountry(e.target.value)
    }
    const handleStatesChange = (e) => {
        setStates(e.target.value)
    }

    /* Validate the input fields */
    const validateFields = () => {
        if (!fullName && !phoneNumber && !gender) {
            setErrFullName('Please enter full name');
            setErrPhoneNumber('Please enter phone number');
            setErrGender('Please select gender');
            setErrCountry('Please select country');
        }
        if (!fullName) {
            setErrFullName('Please enter full name');
            document.getElementById('fullName').focus();
            return false;
        }
        if (!phoneNumber) {
            setErrPhoneNumber('Please enter phone number');
            document.getElementById('phoneNumber').focus();
            return false;
        }
        if (!gender) {
            setErrGender('Please select gender');
            return false;
        }
        if (!country) {
            setErrCountry('Please select country');
            return false;
        }
        if (!states) {
            setErrStates('Please select state');
            return false;
        }
        return true;
    }

    /* onsubmit function  */
    const handleSubmit = (e) => {
        e.preventDefault();/* prevents page loading */
        if (validateFields()) {
            const mycred = {
                FullName: fullName,
                PhoneNumber: phoneNumber,
                Gender: gender,
                Country: country,
                State: states
            }
            localStorage.setItem("mycred", JSON.stringify(mycred));/* Storing the items in localstorage */
            push("/steptwo");/* next page */
        }
    }
    const Location = useLocation();
    /* Setting the existing state */
    useEffect(() => {
        if (Location.pathname = '/stepone') {
            const step1StateValues = JSON.parse(localStorage.getItem('mycred'));
            if (step1StateValues) {
                setFullName(step1StateValues.FullName);
                setphoneNumber(step1StateValues.PhoneNumber);
                if (step1StateValues.Gender === 'male') {
                    setGender(step1StateValues.Gender);
                }
                if (step1StateValues.Gender === 'female') {
                    setGender(step1StateValues.Gender);
                }
                if (step1StateValues.Gender === 'other') {
                    setGender(step1StateValues.Gender);
                }
            }
        }
    }, [])
    return (
        <div>
            <ScrollAnimation animateIn='fadeIn' animateOut='fadeOut'>
                <Animated animationIn="fadeIn" animationInDelay={0.3} animationInDuration={0.8} isVisible={true}>
                    <Form onSubmit={handleSubmit} className="step1Form">
                        <Row className="Step1Row">
                            <Col xs={1} md={2}></Col>
                            <Col xs={1} md={8}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="5">Full Name</Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="text" placeholder="Enter Full Name" className="fullName" id="fullName" autoFocus value={fullName} onChange={handleNameChange} />
                                        {errFullName ? <span style={{ color: 'red', marginLeft: '-50px' }}>{!fullName ? errFullName : ''}</span> : <span style={{ visibility: 'hidden', marginLeft: '-57px' }}>Hidden</span>}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="5">Phone Number</Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="number" placeholder="Enter Phone number" className="phoneNumber" id="phoneNumber" value={phoneNumber} onChange={handleNumChange} onKeyDown={e => (e.keyCode === 69 || e.keyCode === 190) && e.preventDefault()} />
                                        {errPhoneNumber ? <span style={{ color: 'red', width: '215px', marginLeft: '-30px' }}>{!phoneNumber ? errPhoneNumber : ''}</span> : <span style={{ visibility: 'hidden', marginLeft: '-57px' }}>Hidden</span>}
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={4}></Col>
                            <Col md={8}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3" style={{ textAlign: 'left', paddingLeft: '32px' }}>Gender</Form.Label>
                                    <Col sm="8">
                                        <ul id="group1">
                                            <li>
                                                <input type="radio" value="male" className="Male" checked={gender === 'male' ? true : false} name="group1" onChange={handleRadioChange} />
                                                <label>Male</label>
                                            </li>
                                            <li>
                                                <input type="radio" value="female" name="group1" className="female" checked={gender === 'female' ? true : false} onChange={handleRadioChange} />
                                                <label>Female</label>
                                            </li>
                                            <li>
                                                <input type="radio" value="other" name="group1" className="other" checked={gender === 'other' ? true : false} onChange={handleRadioChange} />
                                                <label>Other</label>
                                            </li>
                                        </ul>
                                        {errGender ? <span className="genderErr" style={{ color: 'red', marginLeft: '-170px' }}>{!gender ? errGender : ''}</span> : <span style={{ visibility: 'hidden', marginLeft: '-57px' }}>Hidden</span>}
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={3}></Col>
                            <Col md={9}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="3" className="text-right" style={{ marginLeft: '14px' }}>Country</Form.Label>
                                    <Col sm="7" style={{ marginLeft: '-14px' }}>
                                        <Form.Control as="select" size="md" className="step1selecttag" custom value={country} onChange={handleSelectChange}>
                                            <option>India</option>
                                        </Form.Control>
                                        {errCountry ? <span style={{ color: 'red' }}>{!country ? errCountry : ''}</span> : <span style={{ visibility: 'hidden', marginLeft: '-57px' }}>Hidden</span>}
                                    </Col>
                                </Form.Group>
                            </Col>
                        </Row>
                        <br />
                        <Row>
                            <Col md={4}></Col>
                            <Col md={4}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="5">State</Form.Label>
                                    <Col sm="7" style={{ paddingLeft: '9px' }}>
                                        <Form.Control as="select" size="md" custom className="states" value={states} onChange={handleStatesChange}>
                                            <option>Tamilnadu</option>
                                        </Form.Control>
                                        {errStates ? <span style={{ color: 'red' }}>{!states ? errStates : ''}</span> : <span style={{ visibility: 'hidden', marginLeft: '-57px' }}>Hidden</span>}
                                    </Col>
                                </Form.Group>
                            </Col>
                            <Col md={4}></Col>
                        </Row>
                        <hr className="hrline" />
                        <>
                            <Row>
                                <Col md={{ offset: 11 }} style={{ marginBottom: '15px', marginRight: '-130px' }}>
                                    <button className="btn btn-primary" style={{ background: '#1abc9c', borderColor: 'transparent' }}>&ensp;Next&ensp;</button>
                                </Col>
                            </Row>
                        </>
                    </Form>
                </Animated>
            </ScrollAnimation>
        </div >
    )
}
export default React.memo(StepOne);
