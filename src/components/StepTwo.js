import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import '../css/StepTwo.css'
import { Animated } from "react-animated-css";
import ScrollAnimation from 'react-animate-on-scroll';

function StepTwo() {
    /* Initializing state */
    const [CompanyName, setCompanyName] = useState('')
    const [errCompanyName, setErrCompanyName] = useState('');
    const [JobTitle, setJobTitle] = useState('')
    const [errJobTitle, setErrJobTitle] = useState('');
    const [Email, setEmail] = useState('')
    const [errEmail, setErrEmail] = useState('');
    const [YearsOfExp, setYearsOfExp] = useState('')
    const [errYearsOfExp, setErrYearsOfExp] = useState('');
    const [TermsAndCond, setTermsAndCond] = useState(false);
    const [ErrStep1Values, setErrStep1Values] = useState('');

    const { push } = useHistory();

    /* updating state values based on onchange */
    const handleCompanyChange = (e) => {
        setCompanyName(e.target.value)
    }
    const handleJobTitleChange = (e) => {
        setJobTitle(e.target.value)
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }
    const handleYearsOfExpChange = (e) => {
        setYearsOfExp(parseInt(e.target.value))
    }
    const handleCheckBoxChange = (e) => {
        setTermsAndCond(!TermsAndCond)
    }

    /* job title field to accept only alphabhets */
    const onKeyPress = (event) => {
        if ((event.charCode <= 65 && event.charCode <= 90) || (event.charCode <= 97 && event.charCode <= 122)) {
            event.preventDefault();
        };
    }

    /* Validate the input fields */
    const validateFields = () => {
        if (!CompanyName && !Email && !JobTitle && !YearsOfExp) {
            setErrCompanyName('Please enter company name');
            setErrEmail('Please enter Email Id');
            setErrJobTitle('Please enter job title');
            setErrYearsOfExp('Please enter Years Of Experience');
        }
        if (!CompanyName) {
            setErrCompanyName('Please enter company name');
            return false;
        }
        if (!Email) {
            setErrEmail('Please enter Email Id');
            return false;
        }
        if (!JobTitle) {
            setErrJobTitle('Please enter job title');
            return false;
        }
        if (!YearsOfExp) {
            setErrYearsOfExp('Please enter Years Of Experience');
            return false;
        }
        if (!TermsAndCond) {
            return false;
        }
        return true;
    }

    /* onsubmit function  */
    const handleStep2Submit = (e) => {
        e.preventDefault();/* prevents page loading */
        const step1values = JSON.parse(localStorage.getItem('mycred'));
        if (!step1values) {
            setErrStep1Values('Please fill personal details.');
        } else {
            if (validateFields()) {
                /* Storing the items in localstorage */
                localStorage.setItem('mycred', JSON.stringify({ ...step1values, 'Companyname': CompanyName, 'JobTitle': JobTitle, 'Email': Email, 'YearsOfExp': YearsOfExp, 'TermsAndCond': TermsAndCond }))
                push("/stepthree");
            }
        }
    }

    /* Back button function */
    const handleClick = () => {
        push('/stepone')
    }
    /* Setting the existing state */
    useEffect(() => {
        if (Location.pathname = '/steptwo') {
            const step2StateValues = JSON.parse(localStorage.getItem('mycred'));
            if (step2StateValues) {
                setCompanyName(step2StateValues.Companyname);
                setJobTitle(step2StateValues.JobTitle);
                setEmail(step2StateValues.Email);
                setYearsOfExp(step2StateValues.YearsOfExp);
            }
        }
    }, [])
    return (
        <div>
            {ErrStep1Values ? <span style={{ color: 'red', marginLeft: '0px' }}>{ErrStep1Values}</span> : <span style={{ visibility: 'hidden', marginLeft: '-57px' }}>Hidden</span>}
            <ScrollAnimation animateIn='fadeIn' animateOut='fadeOut'>
                <Animated animationIn="fadeIn" animationInDelay={0.3} animationInDuration={0.8} isVisible={true}>
                    <Form onSubmit={handleStep2Submit} className="step1Form">
                        <Row className="Step1Row" style={{ paddingTop: '40px' }}>
                            <Col xs={1} md={2}></Col>
                            <Col xs={1} md={8}>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="5">Company Name</Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="text" placeholder="Enter Compay Name" className="CompanyName" id="CompanyName" autoFocus value={CompanyName || ''} onChange={handleCompanyChange} />
                                        {errCompanyName ? <span style={{ color: 'red', marginLeft: '-30px' }}>{!CompanyName ? errCompanyName : ''}</span> : <span style={{ visibility: 'hidden', marginLeft: '-57px' }}>Hidden</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="5">Email</Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="email" placeholder="Enter Email Id" name="Email" className="Email" id="Email" value={Email || ''} onChange={handleEmailChange} />
                                        {errEmail ? <span style={{ color: 'red', marginLeft: '-57px' }}>{!Email ? errEmail : ''}</span> : <span style={{ visibility: 'hidden', marginLeft: '-57px' }}>Hidden</span>}
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row}>
                                    <Form.Label column sm="5">Job Title</Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="text" placeholder="Job Title" name="JobTitle" className="JobTitle" id="JobTile" onKeyPress={onKeyPress} value={JobTitle || ''} onChange={handleJobTitleChange} />
                                        {errJobTitle ? <span style={{ color: 'red', marginLeft: '-57px' }}>{!JobTitle ? errJobTitle : ''}</span> : <span style={{ visibility: 'hidden', marginLeft: '-57px' }}>Hidden</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm="5">Years Of Experience</Form.Label>
                                    <Col sm="7">
                                        <Form.Control type="number" placeholder="Years Of Experience" name="YearsOfExp" className="YearsOfExp" id="YearsOfExp" value={YearsOfExp || ''} onChange={handleYearsOfExpChange} />
                                        {errYearsOfExp ? <span style={{ color: 'red', marginLeft: '-10px' }}>{!YearsOfExp ? errYearsOfExp : ''}</span> : <span style={{ visibility: 'hidden', marginLeft: '-57px' }}>Hidden</span>}
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} style={{ paddingBottom: '15px' }}>
                                    <Form.Label column sm="5" />
                                    {TermsAndCond ?
                                        <Form.Check type="checkbox" className={TermsAndCond} id="TermsAndCond" onChange={handleCheckBoxChange} label="I accept the Terms and Condtions" defaultChecked={TermsAndCond} /> :
                                        <Form.Check type="checkbox" style={{ color: 'red' }} className={TermsAndCond} id="TermsAndCond" onChange={handleCheckBoxChange} label="I accept the Terms and Condtions" defaultChecked={TermsAndCond} />
                                    }
                                </Form.Group>
                            </Col>
                        </Row>
                        <hr className="hrline" />
                        <>
                            <Row style={{ dispaly: 'flex', justifyContent: 'space-between' }}>
                                <button className="btn btn-default" onClick={handleClick} style={{ marginBottom: '15px', background: 'rgba(193, 204, 202, 0.66)', borderColor: 'transparent', marginLeft: '35px' }}>&ensp;Back&ensp;</button>
                                <button className="btn btn-primary" style={{ background: '#1abc9c', marginBottom: '15px', borderColor: 'transparent', marginRight: '-75px' }}>&ensp;Next&ensp;</button>
                            </Row>
                        </>
                    </Form>
                </Animated>
            </ScrollAnimation>
        </div>
    )
}

export default React.memo(StepTwo);