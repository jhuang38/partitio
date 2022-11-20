import React from "react"

export default function InputGroup({input_name='', input_type='text', input_id='', input_placeholder='', input_ref=null}) {
    return (
        <div className = 'inputgroup'>
            <label for={input_id}>{input_name}</label>
            <input ref = {input_ref} type = {input_type} id = {input_id} placeholder={input_placeholder} required/>
        </div>
    )
}