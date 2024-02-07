import React from 'react'
import Note from './Note';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function ReadNotes({notes,showStatus,handleStatuChange}) {


    let filterNotes=(notes,status)=>{
        switch (status) {
          case 'all':
           return notes;
          case 'imp':
          return notes.filter(note =>note.important===true);
          case 'nonimp':
            return notes.filter(note =>note.important===false);
            case 'on':
              return notes.filter(note =>note.selectbutton==="on");
        }
        
          }
    const notesFilter=filterNotes(notes,showStatus)

  return (
    <>

        

 
 <Container>
  <Row>
    <Col  md={{ span: 6, offset: 3 }}>
    <h2>Read Notes</h2>
    </Col>
  </Row>

 
 <h3>Data filter </h3>
 
 <Row xs="auto" md={5}>
  <Col> <label>
    <input type='radio' name='filter' 
    value="all" 
    checked={showStatus ==='all'} 
    onChange={handleStatuChange}/> All notes
    </label>
    </Col> 
    <Col>
    <label>
         <input type='radio' name='filter' 
           value="imp" 
           checked={showStatus ==='imp'} 
           onChange={handleStatuChange}/>Important notes
    </label>
    </Col>
    <Col>
    <label>
    <input type='radio' name='filter' value="nonimp" 
    checked={showStatus ==='nonimp'} 
    onChange={handleStatuChange}/>Non important notes
    </label>
    </Col>
    <Col>
    <label>
    <input type='radio' name='filter' value="on"
     checked={showStatus ==='on'} 
     onChange={handleStatuChange}/>current notes in ON
    </label>
    </Col>
    </Row>
   
 <ul>

        {notesFilter.map((notedata,index,next) =>(
            <Note key={notedata.id} note={notedata} />
                ))}

 </ul>
 </Container>
    </>
  )
}

export default ReadNotes