import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function UpdateNotes() {



    
    let UpdateNotes=(event)=>{
        event.preventDefault();

    }
  return (
    <Container>
      
    {/* <Row>
  <Col  md={{ span: 6, offset: 3 }}>
  <h2>Update Notes</h2>
  </Col>
</Row> */}
<br/>
<form onSubmit={UpdateNotes}>

<label for="fnots">Notes content &emsp;&emsp;: &emsp; </label>
<input type="text" id="fnots" name="fnots"
//  value={}
//   onChange={}
//   ref={}
  /><br/><br/>

 <label for="Onoff"> Select Important &#160;&#160;&#160;&#160;: &emsp;</label>
 <select id="Onoff"
//   onChange={} 
//   value={} 
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