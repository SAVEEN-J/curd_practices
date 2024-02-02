
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
//read data filter
  const[showStatus,setShowStatus]=useState('all')

//get data from backend
useEffect(()=>{
  setNotes(props.notes);
},[]);

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
  let handleStatuChange = (event) => {
      
    setShowStatus(event.target.value);
 
    //  console.log(event.target.value);
  }
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
    <div>
 
 <h2 style={{backgroundColor: "lightblue"}}>CURD OPERATION</h2>

 <h3>Read Notes</h3>
 <h2 >Notes filter Option</h2>

    <label>
    <input type='radio' name='filter' value="all" 
    checked={showStatus ==='all'} 
    onChange={handleStatuChange}/> All notes
    </label>

    <label>
          <input type='radio' name='filter' value="imp" 
    checked={showStatus ==='imp'} 
    onChange={handleStatuChange}/>Important notes
    </label>

    <label>
    <input type='radio' name='filter' value="nonimp" 
    checked={showStatus ==='nonimp'} 
    onChange={handleStatuChange}/>Non important notes
    </label>

    <label>
    <input type='radio' name='filter' value="on"
     checked={showStatus ==='on'} 
     onChange={handleStatuChange}/>current notes in ON
    </label>


 <ul>
 {notesFilter.map((note=>
     
     <Note key ={note.id} note={note} />

     ))}
 {/* {notes.map(note => 
//  console.log(note.id)
   <Note key ={note.id} note={note} />
  )} */}
 </ul>

 <h2>Create Notes</h2>


<form onSubmit={addNote}>

<label for="fnots">Notes content:  </label>
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
   <label for="Onoff"> Select Important : </label>
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

 
    </div>
    )
};

export default App;
