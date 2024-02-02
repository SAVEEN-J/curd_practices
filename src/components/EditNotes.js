import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import UpdateNotes from './UpdateNotes';

function EditNotes() {
    const [options,setOptions]=useState([]);
    const [selectoptions,setSelectOptions]=useState("Nill");

// console.log(options);
    //get id from backed
    useEffect(()=>{
        axios
        .get('http://localhost:3005/notes/')
       .then(responce =>setOptions(responce.data));
    //    console.log(options.id);

    },[]);
    
    let selectHandler=(event)=>{
        setSelectOptions(event.target.value);

    }
  return (
<Container>

    <Row>
        <Col md={{ span: 6, offset: 3 }}>
            <h2>Edit Notes </h2>
        </Col>
    </Row>
    <Row>
        <Col>
        <label htmlFor="SelectID"> Select An ID to Edit &nbsp; : &emsp;</label>
      
              <select id="SelectID" onChange={selectHandler} value={selectoptions} >
             <option>Nill</option>
              {
           
                options.map(option=>(
                 <option key={option.id}> {option.id}</option>
                
                ))
              }
               
            </select><br/><br/>
            <h3> Your Are Selected ID is &#160; : {selectoptions} </h3> 
           {selectoptions >=1 && <UpdateNotes />} 
        </Col>

    </Row>
</Container>
  )
}

export default EditNotes;