
import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import CreateNotes from './components/CreateNotes';
import ReadNotes from './components/ReadNotes';
import {Link,Route, BrowserRouter as Router,Routes} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import EditNotes from './components/EditNotes';
import DeleteNotes from './components/DeleteNotes';
import Home from './components/Home';
import { Button, Row } from 'react-bootstrap';

 

//connet to json server

// function Note({note}) {
//   // console.log(note);
//   return( 
  
//       <li>{ note.content } <h6>{ note.important }</h6></li> 
//   )
  
// }
function EditNotes({notes,setNotes}) {
 console.log("NOTES",notes);
   const[selectedNote,setSelectedNote] = useState(null);
   const[formdata,setFormdata] = useState({});

 const handleNoteSelection = (note)=>{
  setSelectedNote(note);
  setFormdata(note);

 }

 let handleInputChange=(e)=>{
  setFormdata({
    ...formdata,
    content:e.target.value
  })
}
  let handleSelectChange=(e)=>{
    setFormdata({
      ...formdata,
      important:e.target.value
    })

 }
 const editSubmit =async(event)=>{
  event.preventDefault();
  try {
    const responce = await axios .put(`http://localhost:3005/api/notes/${selectedNote._id}`,formdata)
//featch the data again
const updateNotes = notes.map(note=>{
  if(note._id == selectedNote._id){
    return responce.data;
  }
  return note;
})
setNotes(updateNotes);
    
  } catch (error) {
    console.error(error);
  }
 }
  return(
    <Container>
      <Row>
      <h2>Edit</h2>
      </Row>
      <Row>
        <ul>
      {notes.map(value=>
        <li key={value._id}>
{value.important ?   <b>{value.content}</b>  :value.content}
      
          <Button onClick={()=>handleNoteSelection(value)}>edit</Button>

        <Button>Delete</Button>
        </li>
       

      )
      }
      {/* {
        notes.map((value,index,array)=>(
          <li key={value.id}>{value.content}</li>
        ))
      } */}
      </ul>
      {selectedNote &&(
            <form onSubmit={editSubmit}>
              <input type='text' placeholder='note' value={formdata.content} onChange={handleInputChange}  /> 
              <select value={formdata.important} onChange={handleSelectChange}>
                <option>select</option>
                <option value={true}>true</option>
                <option value={false}>false</option>

              </select>
              <Button type='submit'>Update</Button>
            </form>

      )
      }
      </Row>
  
    </Container>
  
  )
  
}
function App() {

 
  //define a states
  // const[notes,setNotes] = useState(props.notes);
  const[notes,setNotes] = useState([]);
  //content
  const[newnotescontent,setnewNotesContent] = useState('');
  //importance
  const[newnotesimportance,setnewnotesImportance] = useState('');
//read data filter
  const[showStatus,setShowStatus]=useState('all')
  const padding ={
    padding:15
   };
//get data from backend
useEffect(()=>{
  // setNotes(props.notes);
  // featch from json server
//read 
  axios
  .get('http://localhost:3005/api/notes')
 .then(responce =>setNotes(responce.data));
  // .then(responce =>console.log(responce.data));
},[]);
// ,[notes,showStatus]
//create referencr
const newNoteRef =useRef(null);

  //create
  let addNote =(event)=>{
    event.preventDefault();

    let noteObject ={
      id:notes.length+1,
      content:newnotescontent,
        importance:newnotesimportance==='true',
    }
    // send data to json 
    axios
    .post('http://localhost:3005/api/notes',noteObject)
    // .then(responce =>setNotes(responce.data));
    // setNotes(notes.concat(noteObject))
    // clear text
    setnewNotesContent("");
    setnewnotesImportance("");
    newNoteRef.current.focus(); //its go to first text box
  }
  
  let handleNoteChange=(event)=>{
    setnewNotesContent(event.target.value);
   
  }
  let handleChangeImportant=(event)=>{
    setnewnotesImportance(event.target.value);

  }
  let handleStatuChange = (event) => {
      
    setShowStatus(event.target.value);
 
    //  console.log(event.target.value);
  }

    
  return (

<Router>


   
    <Navbar bg="light" data-bs-theme="dark">
    {/* <h2 style={{text: "lightblue",textAlign:"center"}}>CURD OPERATION</h2> */}
        <Container >
        
        <Nav className="me-auto">
    <Link style={padding}to="/">Home </Link>
    <Link style={padding}to="/read">Read Notes</Link>
    <Link  style={padding}to="/create">Create Notes</Link>
    <Link style={padding} to="/edit">Edit Notes</Link>
    <Link style={padding} to="/delete">Delete Notes</Link>
    </Nav>
    </Container>
      </Navbar>
    
   <Routes>
  <Route path='/' element={<Home />}></Route>
  <Route path='/read' element={<ReadNotes notes={notes} showStatus={showStatus} handleStatuChange={handleStatuChange}/>}></Route>
  <Route path='/create' element={<CreateNotes addNote={addNote} newnotescontent={newnotescontent} newNoteRef={newNoteRef} handleNoteChange ={handleNoteChange} handleChangeImportant ={handleChangeImportant} newnotesimportance={newnotesimportance}/>}></Route>
  {/* <Route path='/edit' element={<EditNotes/>}></Route> */}
  <Route path='/edit' element={<EditNotes notes={notes} setNotes={setNotes} />}></Route>

  <Route path='/delete' element={<DeleteNotes/>}></Route>
  {/* <Route path='/read/edit/:id' element={<EditNotes/>}></Route> */}


  </Routes>
 {/* <h2>Create Notes</h2> */}
    
    </Router>
    )
};

export default App;
