import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect } from 'react';

function UpdateNotes({selectoptions,options}) {

  const [note,setNote] = useState({});

// console.log(note);
  // console.log(selectoptions);
//get the note objects of id:selection
// const selectedNotes=options.map(value=>(
 
// ))
    
useEffect(()=>{
    const selectedNotes=options.find((note)=> note.id ==selectoptions)
    if (selectedNotes) {
      // console.log(selectedNotes);
      setNote(selectedNotes)
    }

},[selectoptions,options])

    // let UpdateNotes=(event)=>{
    //     event.preventDefault();

    // }
    let inputContentChange=(e)=>{

    }
    let inputImportantChange=(e)=>{

    }
  return (
    <Container>
      
    {/* <Row>
  <Col  md={{ span: 6, offset: 3 }}>
  <h2>Update Notes</h2>
  </Col>
</Row> */}
<br/>
{/* <form onSubmit={UpdateNotes}> */}
<form >

<label htmlFor="fnots">Notes content &emsp;&emsp;: &emsp; </label>
<input type="text" id="fnots" name="fnots"
  value={note.content}
  onChange={inputContentChange}
//   ref={}
  /><br/><br/>

 <label htmlFor="Onoff"> Select Important &#160;&#160;&#160;&#160;: &emsp;</label>
 <select id="Onoff"
  onChange={inputImportantChange} 
 value={note.important} 
  >
  <option>Select</option>
  <option>True</option>
  <option>False</option>

 </select><br/><br/>

<button type='submit'>  Updates Notes</button>

</form>

  </Container>
  )
}

export default UpdateNotes;