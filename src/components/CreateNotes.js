import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function CreateNotes({addNote,newnotescontent,handleNoteChange,newNoteRef,handleChangeImportant,newnotesimportance}) {
  return (
    <Container>
      
      <Row>
    <Col  md={{ span: 6, offset: 3 }}>
    <h2>Create Notes</h2>
    </Col>
  </Row>

<form onSubmit={addNote}>

<label htmlFor="fnots">Notes content &emsp;&emsp;: &emsp; </label>
  <input type="text" id="fnots" name="fnots"
   value={newnotescontent}
    onChange={handleNoteChange}
    ref={newNoteRef}
    /><br/><br/>


  {/* <label for="fimportant">Notes Important:  </label>
  <input type="text" id="fimportant" name="fimportant" 
  value={newnotesimportance}
   onChange={handleChangeImportant}/>
   <br/> */}
   <label htmlFor="Onoff"> Select Important &#160;&#160;&#160;&#160;: &emsp;</label>
   <select id="Onoff" onChange={handleChangeImportant} value={newnotesimportance} >
    <option>Select</option>
    <option>True</option>
    <option>False</option>

   </select><br/><br/>


  {/* <input type="text" id="fimportant" name="fimportant" value={newnotesimportance} onChange={(e)=>setnewnotesImportance(e.target.value)}/><br/> */}
 
 

  <button type='submit'>  Add Notes</button>

</form>


{/* <form onSubmit={addNote}>
<label for="fnots">Notes:</label><br/>
  <input type="text" id="fnots" name="fnots" value={newnotes} /><br/>
  <label for="fname">First name:</label><br/>
  <input type="text" id="fname" name="fname" value="John" /><br/>
  <label for="lname">Last name:</label><br/>
  <input type="text" id="lname" name="lname" value="Doe" /><br/><br/>
  <input type="submit" value="Submit" />
</form> */}
    </Container>
  )
}

export default CreateNotes;
