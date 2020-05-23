import React from 'react';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree'
import { Route, NavLink, useLocation, Redirect } from 'react-router-dom';
import '../css/NavBar.css'
import ScrollAnimation from 'react-animate-on-scroll';

function NavBar() {
    const location = useLocation();
    return (
        <div>
            <nav className="navhead">
                <ScrollAnimation delay={1000}
                    animateIn='fadeInDown'
                    initiallyVisible={false}>
                    <ul>
                        <li className={location.pathname === "/" ? "active" : ""}>
                            <NavLink to="/stepone" activeClassName="active">Personal Details</NavLink>
                        </li>
                        <li className={location.pathname === "/step2" ? "active" : ""}>
                            <NavLink to="/steptwo" activeClassName="active">Company Details</NavLink>
                        </li>
                        <li className={location.pathname === "/result" ? "active" : ""}>
                            <NavLink to="/stepthree" activeClassName="active">Verification</NavLink>
                        </li>
                    </ul>
                </ScrollAnimation>
            </nav>
            <Route exact path='/steptwo' component={StepTwo} />
            <Route exact path='/stepthree' component={StepThree} />
            <Route exact path='/stepone' component={StepOne} />
            <Route exact path='/' component={StepOne}>
                <Redirect exact from="/" to="/stepone" />
            </Route>
        </div>
    )
}

export default NavBar
