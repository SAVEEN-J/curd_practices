
import { useEffect, useRef, useState } from 'react';
import './App.css';


function Note({note}) {
  // console.log(note);
  return( 
  
      <li>{ note.content } <h6>{ note.important }</h6></li> 
  )
  
}
function App(props) {

 
  //define a states
  // const[notes,setNotes] = useState(props.notes);
  const[notes,setNotes] = useState([]);
  //content
  const[newnotescontent,setnewNotesContent] = useState('');
  //importance
  const[newnotesimportance,setnewnotesImportance] = useState('');

//get data from backend
useEffect(()=>{
  setNotes(props.notes);
});

//create referencr
const newNoteRef =useRef(null);

  //create
  let addNote =(event)=>{
    event.preventDefault();

    let noteObject ={
      id:notes.length+1,
      content:newnotescontent,
        importance:newnotesimportance,
    }

    setNotes(notes.concat(noteObject))
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

  return (
    <div>
 
 <h2>CURD OPERATION</h2>

 <h3>Read Notes</h3>
 <ul>

 {notes.map(note => 
//  console.log(note.id)
   <Note key ={note.id} note={note} />
  )}
 </ul>

 <h2>Create Notes</h2>
<form onSubmit={addNote}>
<label for="fnots">Notes content:  </label>
  <input type="text" id="fnots" name="fnots"
   value={newnotescontent}
    onChange={handleNoteChange}
    ref={newNoteRef}
    /><br/><br/>


  <label for="fimportant">Notes Important:  </label>
  <input type="text" id="fimportant" name="fimportant" 
  value={newnotesimportance}
   onChange={handleChangeImportant}/><br/>
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

 
    </div>
    )
};

export default App;
