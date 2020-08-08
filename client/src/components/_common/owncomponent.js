
import React from 'react';

import {
    Form
} from 'react-bootstrap/esm/index'

/**
 */
class TextInput extends React.PureComponent
{
    /**
     */
    constructor( props )
    {
        super( props );
    }

    /**
     */
    render()
    {
        return (

            <Form.Control
                as={this.props.as}
                size={this.props.size}
                type={this.props.type}
                placeholder={this.props.placeholder}
                value={this.props.val}
                onChange={(val)=>this.props.onChange(val)}
                className={this.props.className}
                disabled={this.props.disabled ? this.props.disabled  : false }
            />
        )
    }
}	// class PhoneNumber

export {TextInput}
