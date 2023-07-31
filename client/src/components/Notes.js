import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import { AddNote } from './AddNote';
import { NotesItem } from './NotesItem';
import { useNavigate } from 'react-router-dom'
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { Dialog } from '@mui/material';
export const Notes = (props) => {
  const context = useContext(noteContext);
  const navigate = useNavigate();
  const { notes, getNote, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem('token')) {
      // console.log("token is there")
      // console.log(localStorage.getItem('token'))
      getNote()

    }
    else {
      navigate('/login')
    }

  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", edate: "" })
  const updateNote = (currentNote) => {
    ref.current.click();
    // console.log(currentNote)
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, edate: currentNote.date })

  }
  const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
      setSelectedDate(date.toDate()); 
      // setSelectedDate(date); // Convert to a Date object
      //date.format("YYYY-MM-DD HH:MM").toDate()
      // console.log(date.toDate());
      note.edate = date.toDate();
      // console.log(selectedDate);
    };
  const handleClick = () => {
    // e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.edate)
    refClose.current.click();
    props.showAlert("Updated Successfully", "success")
    // addNote(note.title,note.description,note.tag);
  }
  const onChange = (e) => {
    return setNote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert} />
      {/* useref is used to refer the DOM the element  */}
      {/* useState is a hook which re-render itself causing an infinite loop but useref doesnt */}
      <button ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-light">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note:</h1>
              <button className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3 my-3">
                <label htmlFor="title" className="form-label"><h6> Title:</h6></label>
                <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} minLength={5} required />

              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label"><h6>Description:</h6></label>
                <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
              </div>
              {/* <div className="mb-3">
              <label htmlFor="reminder" className="form-label"><h6>Reminder:</h6></label>
              <div>
             
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disablePast
                  onChange={handleDateChange}
                  value={selectedDate}
                  disableEnforceFocus
                />
                </LocalizationProvider>  
               
                </div>
              </div> */}
              

            </div>
            <div className="modal-footer bg-light">
              <button ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>

          </div>
        </div>
      </div>
      <div className='container my-5'>
        <h2 className='my-4' style={{ "font-family": "sans-serif" }}>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        <div className='row'>
          {notes.map((note) => {
            return <NotesItem note={note} key={note._id} updateNote={updateNote} showAlert={props.showAlert} />
          })}
        </div>
      </div>
    </>
  )
}
