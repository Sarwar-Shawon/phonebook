/**
 * @copyright Sarwar Hoshen.
 */

import React from 'react';
import {Router} from "@reach/router"

import 'bootstrap/dist/css/bootstrap.min.css'

import Contact_Home  from './components/contacts/home'
import Factorial_Home  from './components/factorial/home'
/**
 */
class App extends React.PureComponent {
    /**
     */
    constructor(props)
    {
        super(props)
    }

    /**
     */
    render()
    {
        return (

            <Router>

                <Contact_Home path='/'/>
                <Contact_Home path='/contact'/>
                <Factorial_Home path='/factorial'/>

            </Router>
        )
    } // render

    /**
     */
    componentDidMount()
    {

    }

    /**
     */
    componentWillUnmount()
    {

    }

} // class App

export default App

