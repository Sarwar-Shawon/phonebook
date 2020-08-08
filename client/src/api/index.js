import axios from 'axios'

const url = "https://phonebook-task.herokuapp.com/"

/**
 * Get all contacts
 */
export const getContactList = async ()=>
{

    try
    {
        const _resp = await axios.get('/api/contacts', {
            headers: { 'content-type': 'application/json' },
        })

        console.log("all data", _resp)

        if(_resp.status === 200 && _resp.data && _resp.data.resp )
        {
            return _resp.data.resp

        }

        return []
    }
    catch (err)
    {
        return Promise.reject(err)
    }

}
/**
 * Get all contacts
 */
export const getContact = async (params)=>
{

    try
    {
        const _resp = await axios.post('/api/getcontact', params,{
            headers: { 'content-type': 'application/json' },

        })

        console.log("all data", _resp)

        if(_resp.status === 200 && _resp.data && _resp.data.resp )
        {
            return _resp.data.resp

        }

        return []
    }
    catch (err)
    {
        return Promise.reject(err)
    }

}

/**
 * add new contacts
 */
export const addContact = async (params)=>
{

    try
    {
        const _resp = await axios.post('api/contact', params, {

            headers: { 'content-type': 'application/json'}

        })

        console.log("add contact", _resp)

        return _resp.data
    }
    catch (err)
    {
        return Promise.reject(err)
    }

}

/**
 * delete a contact
 */
export const deleteContact = async (id)=>
{

    try
    {
        const _resp = await axios.delete(`api/contact/${id}`, {

            headers: { 'content-type': 'application/json'}

        })

        console.log("delete contact", _resp)

        return _resp.data
    }
    catch (err)
    {
        return Promise.reject(err)
    }

}

/**
 * Update a contact
 */

export const updateContact = async (params)=>
{

    try
    {
        const _resp = await axios.put(`api/contact/${params.id}`, params ,{

            headers: { 'content-type': 'application/json'}

        })

        console.log("update contact", _resp)

        return _resp.data
    }
    catch (err)
    {
        return Promise.reject(err)
    }

}