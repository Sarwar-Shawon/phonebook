/**
 * @copyright Sarwar Hoshen.
 */

import React from 'react'

import { Router } from "@reach/router"

import NavHdr from "../_common/nav_hdr";


/**
 */
class Factorial_Home extends React.PureComponent
{
    /**
     */
    constructor( props )
    {
        super( props )
        this.state = {

            inp_num: '',
            result: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    /**
     */
    render()
    {
        return (

            <div style={{paddingTop: 0}}>

                <NavHdr factorial={true} />

                <div style={{flex:1 , marginTop: 10,
                    textAlign: 'center' ,
                    justifyContent:'center',

                }}>
                    <h1>Factorial Calculator</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type="number"
                               style={{width: 200}}
                               value={this.state.value}
                               onChange={(event)=>this.setState({inp_num: event.target.value })}
                               placeholder="Enter a number..." />
                        <br />
                        <button style={{width: 200 , marginTop: 10}}>
                            Calculate Factorial
                        </button>

                    </form>
                    <h2>Factorial: {this.state.result}</h2>
                </div>

            </div>
        )
    }   // render

    /**
     */
    handleSubmit = (event) =>
    {
        event.preventDefault();

        if(!this.state.inp_num)
        {
            alert("please enter the number")
            return
        }

        const resp = this.factorial(this.state.inp_num)

        this.setState({result: resp})

    }
    /**
     */
    factorial = (n) =>
    {
        let fact = 1

        if (n == 0 || n == 1)
            return 1

        for (let i = n; i >= 1; i--)
        {
            fact = fact * i;
        }

        return fact

    }

    /**
     */
    findFactorial()
    {

        if (this.state.inp_num === 0) {
            return 1;
        }
        return( this.state.inp_num * this.findFactorial(this.state.inp_num - 1));
    }

}   // class Factorial_Home

/**
 */
export default Factorial_Home