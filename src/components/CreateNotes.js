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
   <label htmlFor="Onoff"> Select Important &#160;&#160;&#160;&#160;: &emsp;</label>
   <select id="Onoff" onChange={handleChangeImportant} value={newnotesimportance} >
    <option>Select</option>
    <option>True</option>
    <option>False</option>

   </select><br/><br/>
 

  <button type='submit'>  Add Notes</button>

</form>
    </Container>
  )
}

export default CreateNotes;
