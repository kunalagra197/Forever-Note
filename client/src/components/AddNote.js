import React, { useContext,useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import TextField from '@mui/material/TextField';
import noteContext from '../context/notes/noteContext'
export const AddNote = (props) => {
    const context=useContext(noteContext);
    const {addNote}=context;
    const [note,setNote]=useState({title:"",description:"",edate:""})
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
      setSelectedDate(date.toDate()); 
      // setSelectedDate(date); // Convert to a Date object
      //date.format("YYYY-MM-DD HH:MM").toDate()
      // console.log(date.toDate());
      note.edate = date.toDate();
      // console.log(selectedDate);
    };
    const handleClick=(e)=>{
        e.preventDefault();
        addNote(note.title,note.description,note.edate);
        setNote({title:"",description:"",edate:""})
        props.showAlert("Added Successfully","success")
    }
   
    const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div className="container">
    <h2 style={{"font-family":"sans-serif"}}>Add a Note</h2>
    <form className="my-3">
  <div className="mb-4 my-4">
    <label htmlFor="title" className="form-label" style={{"font-family":"cursive"}}>Title:</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={5} value={note.title} required/>
  
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label" style={{"font-family":"cursive"}}>Description:</label>
    <input type="text" className="form-control" id="description" name="description"  onChange={onChange} minLength={5} value={note.description} required/>
  </div>
  <div className="mb-3">
  <label htmlFor="reminder" className="form-label" style={{"font-family":"cursive"}}>Reminder:</label>
 <div> 
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disablePast
        onChange={handleDateChange}
        value={selectedDate}
  
      />
    
    </LocalizationProvider>
    </div>
  </div>
  
  <button disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
    
    </div>

  )
}
