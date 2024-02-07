import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import { useParams } from 'react-router';


function EditNotes() {
  // const [notes,setNotes]=useState([]);
  const{id}=useParams();
    const [options,setOptions]=useState([]); //fecthh data from bakend 
    const [selectoptions,setSelectOptions]=useState('');// its stored in selecting id
    const [note,setNote] = useState(null); //we find the selected and compare to backend and store the data
    const [content,setContent] = useState('');
    const [important,setImportant] = useState(false);


// console.log(options);
    //get ALL id from backed
    useEffect(()=>{
      fetchNotes();
      //   axios
      //   .get('http://localhost:3005/notes/')
      //  .then(responce =>setOptions(responce.data));
    //    console.log(options.id);

    }, []);//[]run ontime only

     //find select id and notes id are same 
     useEffect(()=>{
      const selectedNotes=options.find((note)=> note.id ==selectoptions)
      if (selectedNotes) {
        //  console.log(selectedNotes.important);
         setNote(selectedNotes);
         setContent(selectedNotes.content);
         setImportant(selectedNotes.important);
      }
  
  },[selectoptions, options])
//get all data from json server
    const fetchNotes= async() => {
     
      const responce = await axios.get('http://localhost:3005/api/notes/');
    //  .then(responce =>setOptions(responce.data));
    setOptions(responce.data);
    }
    
    let selectHandler=(event)=>{
        const id =parseInt(event.target.value);
        setSelectOptions(id);
    }
  

  const handleUpdateSubmit= async (event) => {
    event.preventDefault();
    try{
      await axios.put(`http://localhost:3005/api/notes/${selectoptions}`,{
        ...note,
        content,
        important:important =='true'
      });
       } catch (error){
console.error('Error updating note:',error);
    }

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
           
                options.map((value,index)=>(
                 <option key={value.id}> {value.id}</option>
                
                ))
              }
               
            </select><br/><br/>
            {/* <h3> Your Are Selected ID is &#160; : {selectoptions} </h3> 
           {selectoptions >=1 && <UpdateNotes selectoptions={selectoptions} options={options} />}  */}
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
   <option value={true} >True</option>
  <option   value={false} >False</option>
 </select>
 <br/><br/>

<button type='submit'>  Update Notes</button>

</form>
   )
   }
    </Row>
</Container>
  )
}

export default EditNotes;