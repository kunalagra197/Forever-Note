import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';

export const NotesItem = (props) => {
    const context=useContext(noteContext);
    const {deleteNote}=context;
    const {note,updateNote} = props;
    
    return (
        <div className="col-md-3" >
            <div className="card my-3 bg-light" style={{"maxWidth":"18rem"}}>
               
                    <div class="card-header"><h5>{note.title}</h5></div>
                    <div class="card-body">
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash btn"  onClick={()=>{
                        deleteNote(note._id)
                        props.showAlert("Deleted Successfully","success")
                    }}></i>
        
                    <i className="fa-solid fa-pen btn"  onClick={()=>{
                        updateNote(note)
                        
                    }}></i>
                    </div>
                
            </div>
        </div>
       
    )
}
