
import { useEffect, useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
import CreateNotes from './components/CreateNotes';
import ReadNotes from './components/ReadNotes';
import {Link,Route, BrowserRouter as Router,Routes} from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import DeleteNotes from './components/DeleteNotes';
import Home from './components/Home';
import { Button, Row } from 'react-bootstrap';

 
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
    const responce = await axios .put(`https://day-42-deploy.onrender.com/api/notes/${selectedNote._id}`,formdata)
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

  const[notes,setNotes] = useState([]);

  const[newnotescontent,setnewNotesContent] = useState('');

  const[newnotesimportance,setnewnotesImportance] = useState('');

  const[showStatus,setShowStatus]=useState('all')
  const padding ={
    padding:15
   };

useEffect(()=>{

  axios
  .get('https://day-42-deploy.onrender.com/api/notes')
 .then(responce =>setNotes(responce.data));

},[]);

const newNoteRef =useRef(null);


  let addNote =(event)=>{
    event.preventDefault();

    let noteObject ={
      id:notes.length+1,
      content:newnotescontent,
        importance:newnotesimportance==='true',
    }
  
    axios
    .post('https://day-42-deploy.onrender.com/api/notes',noteObject)
 
    setnewNotesContent("");
    setnewnotesImportance("");
    newNoteRef.current.focus(); 
  }
  
  let handleNoteChange=(event)=>{
    setnewNotesContent(event.target.value);
   
  }
  let handleChangeImportant=(event)=>{
    setnewnotesImportance(event.target.value);

  }
  let handleStatuChange = (event) => {
      
    setShowStatus(event.target.value);
 
    }

      return (
<Router>
  
    <Navbar bg="light" data-bs-theme="dark">
   
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
    <Route path='/edit' element={<EditNotes notes={notes} setNotes={setNotes} />}></Route>
  <Route path='/delete' element={<DeleteNotes/>}></Route>
 
  </Routes>
   
    </Router>
    )
};

export default App;
