import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';

function DeleteNotes() {
  
    const [options,setOptions]=useState([]); 
    const [selectoptions,setSelectOptions]=useState('');
    const [note,setNote] = useState(null); 
    const [content,setContent] = useState('');
    const [important,setImportant] = useState(false);
    useEffect(()=>{
      fetchNotes();


    }, []);

     useEffect(()=>{
      const selectedNotes=options.find((note)=> note.id ==selectoptions)
      if (selectedNotes) {
    
         setNote(selectedNotes);
         setContent(selectedNotes.content);
         setImportant(selectedNotes.important);
      }
  
  },[selectoptions, options])

    const fetchNotes= async() => {
     
      const responce = await axios.get('http://localhost:3005/api/notes/');
 
    setOptions(responce.data);
    }
    
    let selectHandler=(event)=>{
        const id =parseInt(event.target.value);
        setSelectOptions(id);
    }
  

  const handleUpdateSubmit= async (event) => {
    event.preventDefault();
    try{
      await axios.delete(`http://localhost:3005/api/notes/${selectoptions}`,);
      setContent('');
      setImportant('Nill');
    fetchNotes();

       } catch (error){
console.error('Error Deleting note:',error);
    }

  }
  return (
<Container>

<Row>
  <Col  md={{ span: 6, offset: 3 }}>
  <h2>Delete Notes</h2>

  </Col>
  </Row>
    <Row>
        <Col>
        <label htmlFor="SelectID"> Select An ID to Delete &nbsp; : &emsp;</label>
      
              <select id="SelectID" onChange={selectHandler} value={selectoptions} >
             <option>Nill</option>
              {
           
                options.map((value,index)=>(
                 <option key={value.id}> {value.id}</option>
                
                ))
              }
               
            </select><br/><br/>
     
        </Col>

    </Row>
    <Row>
      {selectoptions &&(  

   
    <form onSubmit={handleUpdateSubmit}>

<label htmlFor="fnots">Notes content &emsp;&emsp;: &emsp; </label>
<input type="text" id="fnots" name="fnots"
  value={content} onChange={(event)=>setContent(event.target.value)} />
   <br/><br/>

 <label htmlFor="drop"> Select Important &#160;&#160;&#160;&#160;: &emsp;</label>
 <select id="drop" onChange={(event)=>setImportant(event.target.value)} value={important}>.
 <option value=''>Nill</option>
   <option value={true} >True</option>
  <option   value={false} >False</option>
 </select>
 <br/><br/>

<button type='submit'> Delete Notes</button>

</form>
   )
   }
    </Row>
</Container>
  )
}

export default DeleteNotes

