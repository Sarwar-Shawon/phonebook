/**
 * @copyright Sarwar Hoshen.
 */

import React from 'react'


import {
    Image,
    Button,
    Row,
    Col,
    Form,
    Modal, Alert
} from 'react-bootstrap'

import NavHdr from '../_common/nav_hdr'
import { Router } from "@reach/router"
import {TextInput} from '../_common/owncomponent'
import {confirmAlert} from "react-confirm-alert"

import {getContactList,getContact, addContact , deleteContact , updateContact} from '../../api'

import ContentLoader from 'react-content-loader'
import 'react-confirm-alert/src/react-confirm-alert.css'

/**
 */
class Contact_Home extends React.PureComponent
{
    /**
     */
    constructor( props )
    {
        super( props )
        this.state = {

            new_contact_modal: false,
            bLoad: false,
            selContact: null,
            allContacts: [],
            editContact: null,
            phone_number: ''
        }
    }

    /**
     */
    render()
    {
        if(this.state.bLoad)
        {

            return(
                <div>
                    <NavHdr contact={true} />
                    <div style={{
                        display: 'flex',
                        padding: 32,
                        marginLeft: "auto",
                        marginRight: "auto",
                        alignItems: 'center',
                        justifyContent:'center'

                    }}>
                        <ContentLoader
                            height={400}
                            speed={0.5}
                            primaryColor="#f3f3f3"
                            secondaryColor="#ecebeb"
                        >
                            <rect x="0" y="13" rx="4" ry="4" width="400" height="9"/>
                            <rect x="0" y="29" rx="4" ry="4" width="100" height="8"/>
                            <rect x="0" y="50" rx="4" ry="4" width="400" height="10"/>
                            <rect x="0" y="65" rx="4" ry="4" width="400" height="10"/>
                            <rect x="0" y="79" rx="4" ry="4" width="100" height="10"/>
                            <rect x="0" y="99" rx="5" ry="5" width="400" height="200"/>
                        </ContentLoader>
                    </div>
                </div>
            )
        }

       return(

           <div>
               <NavHdr contact={true} />

               <div style={{margin: 20}}>

                   <div style={{flexDirection: "row", display: "flex"}}>

                       <h3 style={{flex: 1}}> Contacts List</h3>

                       <Button onClick={() => this.setState({new_contact_modal:true})} variant="info">
                           Add New Contact
                       </Button>
                   </div>

                   {
                       this.state.errMsg ?
                           <Alert variant="danger" onClose={() => this.setState({errMsg: ""})} dismissible>
                               {this.state.errMsg}
                           </Alert>
                           : null
                   }
                   <div style={{flexDirection: "row", display: "flex", marginTop: 20}}>

                       <div style={{flex: 1,margin: 10}}>
                           <TextInput
                               placeholder="Search from db by phone number"
                               type="text"
                               size="lg"
                               val={this.state.phone_number}
                               type={'string'}
                               onChange={(val) => this.setState({phone_number: val.target.value})}
                           />

                       </div>

                       <Button style={{margin: 10}} onClick={() => this.loadContact() } variant="info">
                           Search
                       </Button>



                   </div>

                   <div style={{marginTop: 20}}>
                       <Row>
                           {
                               !this.state.allContacts.length ?

                                   <Col xs="12" md="12" lg="12" key={this.props.key}>
                                       <div className="bodyDetailsDiv"
                                            style={{fontSize:20 , color: '#5e5960'}}
                                       >
                                           No Contact List are Stored
                                       </div>
                                   </Col>

                                   :
                               this.state.allContacts.map((item, key)=>(

                                   <ContactCard key={key}
                                                item={item}
                                                onEdit={ (item)=> this.setState({editContact: item}) }
                                                onDelete={this.deleteContact}

                                   />
                               ))
                           }
                       </Row>

                   </div>

                   {
                       this.state.new_contact_modal ?
                           <Contact_Add {...this.state}
                                        loadContact={this.loadContact}
                                        hideModal={()=> this.setState({new_contact_modal: false}) }
                                        badd={true}
                           />
                           :
                           null
                   }
                   {
                       this.state.editContact ?
                           <Contact_Add {...this.state}
                                        loadContact={this.loadContact}
                                        hideModal={()=> this.setState({editContact: null , phone_number: ''}) }
                                        badd={false}
                                        contact={this.state.editContact}
                           />
                           :
                           null
                   }
               </div>
           </div>
       )
    }   // render
    /**
     */
    componentDidMount()
    {

        this.loadContact()
            .then()
            .catch()
    }
    /**
     */
    loadContact = async () =>
    {
        try
        {

            const pattern = /\+?(88)?0?1[356789][0-9]{8}\b/g;


            if(this.state.phone_number && !pattern.test(this.state.phone_number))
            {
                this.setState({errMsg: "Please enter the correct BD phone number format"})
                return
            }

            this.setState({bLoad: true})

            const resp = this.state.phone_number ?  await getContact({number: this.state.phone_number}) : await getContactList()

            // console.log("all contacts", resp)

            this.setState({allContacts: resp , bLoad: false })

        }
        catch (err)
        {

            return Promise.reject(err)
        }

    };

    /**
     */
    deleteContact = (contact) =>
    {
        try
        {
            // console.log("contact", contact)

            confirmAlert({
                title: "Do you want to delete this contact",
                message: 'From Profile',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => {

                            this.processDelete(contact)
                                .then()
                                .catch()
                        }
                    },
                    {
                        label: 'NO',
                        onClick: () => {}
                    }
                ]
            });

        }
        catch (err)
        {

            return {err}
        }

    };

  /**
     */
    processDelete = async (contact) =>
    {
        try
        {

            const resp_data = await deleteContact(contact._id)

            // console.log("delete contacts", resp_data)

            if(resp_data.resp && resp_data.resp.toLowerCase() === 'ok')
                this.setState({allContacts : this.state.allContacts.filter(x=> x.number !== contact.number ) })


        }
        catch (err)
        {

            return {err}
        }

    };



    /**
     */
    // addToConatacts = (contact) =>
    // {
    //     try
    //     {
    //         this.setState({allContacts: [...this.state.allContacts , contact ]})
    //     }
    //     catch (err)
    //     {
    //
    //         return {err}
    //     }
    //
    // };

}   // class Contact_Home

/**
 */
class Contact_Add extends React.PureComponent
{
    /**
     */
    constructor( props )
    {
        super( props )

        this.state = {

            phone_number: this.props.contact ? this.props.contact.number :"",
            usr_name: this.props.contact ? this.props.contact.name : "",
            errMsg: ""
        }
    }

    /**
     */
    render()
    {
        return(

            <div>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    show={true}
                    onHide={() => this.props.hideModal()}
                    animation={true}
                >
                    <div style={{padding: 32}}>
                        {
                            this.state.errMsg ?
                                <Alert variant="danger" onClose={() => this.setState({errMsg: ""})} dismissible>
                                    {this.state.errMsg}
                                </Alert>
                                : null
                        }
                        <div style={{flexDirection: "row", display: "flex"}}>

                            <h3 style={{flex: 1}}> Add New Contact </h3>

                            <Button onClick={() => this.props.hideModal() } variant="danger">
                                close
                            </Button>

                        </div>

                        <div style={{marginTop: 10}}>
                            <Form.Group>
                                <TextInput
                                    placeholder="Phone number"
                                    type="text"
                                    size="lg"
                                    val={this.state.phone_number}
                                    type={'string'}
                                    onChange={(val) => this.setState({phone_number: val.target.value})}
                                />
                            </Form.Group>
                            <Form.Group>
                                <TextInput
                                    placeholder="Name"
                                    type="text"
                                    size="lg"
                                    val={this.state.usr_name}
                                    onChange={(val) => this.setState({usr_name: val.target.value})}
                                />
                            </Form.Group>
                            {
                                this.props.badd ?
                                    this.state.bedit ?
                                        <Form.Group>
                                            <Button variant="light">
                                                Creating...
                                            </Button>
                                        </Form.Group>
                                        :
                                        <Form.Group>
                                            <Button onClick={() => this.addContact()} variant="success">
                                                Add Contact
                                            </Button>
                                        </Form.Group>
                                        : null
                            }
                            {
                                this.props.contact ?

                                        this.state.bedit ?
                                            <Form.Group>
                                                <Button variant="light">
                                                    Updating...
                                                </Button>
                                            </Form.Group>
                                            :
                                            <Form.Group>
                                                <Button onClick={() => this.editContact()} variant="success">
                                                    Update Contact
                                                </Button>
                                            </Form.Group>
                                    : null
                            }


                        </div>
                    </div>
                </Modal>
            </div>
        )

    }   // render

    /**
     */
    addContact = async () =>
    {
        try
        {

            if(this.ErrorCheck())
                return

            this.setState({bedit: true})

            const contact = {

                name: this.state.usr_name,
                number: this.state.phone_number
            }
            const resp_data = await addContact(contact)

            // console.log("edit contacts", resp_data)

            this.setState({bedit: false})
            this.props.hideModal()

            if(resp_data.resp && resp_data.resp.toLowerCase() === "ok")
            {
                await this.props.loadContact()
                return
            }
            this.ShowAlert(resp_data.resp)


        }
        catch (err)
        {

            console.warn("err", err)
            return {err}
        }

    };
    /**
     */
    editContact = async () =>
    {
        try
        {
            if(this.ErrorCheck())
                return

            this.setState({bedit: true})

            const contact = {
                _id: this.props.contact._id,
                name: this.state.usr_name,
                number: this.state.phone_number
            }

            // console.log("edit params", contact)

            const resp_data = await updateContact(contact)

            // console.log("edit contacts", resp_data)

            this.setState({bedit: false})

            if(resp_data.resp && resp_data.resp.toLowerCase() === "ok")
            {
                this.props.hideModal()
                await this.props.loadContact()
            }


        }
        catch (err)
        {

            return {err}
        }

    };

    /**
     */
    ShowAlert = (title) =>
    {

        confirmAlert({
            title: title,
            buttons: [
                {
                    label: 'Ok',
                    onClick: () => {}
                }
            ]
        });

    };
    /**
     */
    ErrorCheck = () =>
    {

        let _check = false

        const pattern = /\+?(88)?0?1[356789][0-9]{8}\b/g;

        if(!this.state.usr_name)
        {
            this.setState({errMsg: "Please enter the name"})
            _check = true
        }
        if(!this.state.phone_number)
        {
            this.setState({errMsg: "Please enter the phone number"})
            _check = true

        }
        if(!pattern.test(this.state.phone_number))
        {
            this.setState({errMsg: "Please enter the correct BD phone number format"})
            _check = true

        }

        return _check

    };

}   // class Contact_Add

/**
 */
class ContactCard extends React.PureComponent
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
        const {item} = this.props

        return(

            <Col xs="12" md="12" lg="12" key={this.props.key}>
                <div className="bodyDetailsDiv">

                    <div style={{flex: 1}}>
                        <div className="infoDescription">Name</div>
                        <div className="valueProfile">{item.name}</div>
                    </div>
                    <div style={{flex: 1}}>
                        <div className="infoDescription">Number</div>
                        <div className="valueProfile">{item.number}</div>
                    </div>

                    <div>
                        <Button  onClick={ ()=> this.props.onEdit(item) }
                                 variant="warning"
                                 className="bodyDetailsButton"
                        >
                            Edit
                        </Button>

                        <Button onClick={() => this.props.onDelete(item)}
                                variant="danger"
                                className="bodyDetailsButton"
                        >
                            Delete
                        </Button>
                    </div>


                </div>
            </Col>
        )

    }   // render



}   // class Contact_Add





/**
 */
export default Contact_Home
