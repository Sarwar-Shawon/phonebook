/**
 * @copyright Sarwar Hoshen.
 */

import React from 'react'

import {
    Nav, Navbar,
} from 'react-bootstrap/esm/index'

import '../../css/main.css'
import { navigate } from "@reach/router"

/**
 */
class NavHdr extends React.PureComponent
{
    /**
     */
    constructor( props )
    {
        super( props )
    }

    /**
     */
    render()
    {

        return (
            <Navbar sticky="top" fixed="top" expand="lg" variant="light" className="navbarDiv" >

                <Navbar.Brand href='/' >
                    <div className="brandName">Phonebook</div>
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav"/>

                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto">

                        <Nav.Link href="#"
                                  onSelect={ () => navigate('contact') }
                                  style={{color:this.props.contact ? "#155799" :"#b7b7b7"}}
                        >
                            Contacts

                        </Nav.Link>

                        <Nav.Link href="#"
                                  onSelect={ () => navigate('factorial') }
                                  style={{color:this.props.factorial ? "#155799" :"#b7b7b7"}}
                        >
                            Find Factorial

                        </Nav.Link>

                    </Nav>

                </Navbar.Collapse>

            </Navbar>
        )
    }
}   // NavHdr

/**
 */
export default NavHdr
