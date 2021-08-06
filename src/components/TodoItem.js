import { React, useContext, useState} from 'react'
import   Context                      from '../context'
import   trashbinicon                 from '../images/trashbinicon.png'
import   editimg                      from '../images/editimg.png'


export const TodoItem = (props) => {
    const { toggleTodo }          = useContext(Context)
    const [isEditing, setEditing] = useState(false)     
    const [value, setValue]       = useState('')


    function acceptSubmit(event, id)                    // get data from form and hand it over for processing
    {
        event.preventDefault()
        if (value.trim())
        {
            {props.onRename(id, value.toString())}
            setValue('')
        }
        setEditing(false)
    }
    
// ======================================== Component to Render ======================================== 
    
    
    return (      
        <div className="card mt-2">
            <div className={props.todo.isDone? "card-body donetodo" : "card-body"}>
                <div className="input-group row">
                    <div className="input-group-prepend col-1">
                        <div className="input-group-text justify-content-center">
                        <input type="checkbox"
                               className="form-check-input" 
                               aria-label="Checkbox for following text input"
                               checked={props.todo.isDone}
                               onChange={() => toggleTodo(props.todo.id, !props.todo.isDone)}/>
                        </div>
                    </div>
                    {
                     isEditing?         // binary operator: if edit mode is on there appears form else just a todo title
                        <form onSubmit={event => acceptSubmit(event, props.todo.id)} className="col-3">
                            <div className="form-group">
                                <input 
                                    type="text"
                                    className="form-control "
                                    placeholder="New todo title..."
                                    value={value}
                                    onChange={event => setValue(event.target.value)}
                                />                    
                            </div>
                        </form> : 
                         <span className="col-3">
                            {props.todo.isChanged? `${props.todo.title} (changed)` : props.todo.title}
                         </span>
                    }
                     
                    <span className="col-6 ">
                        {props.todo.addedOn}
                    </span> 
                    <button 
                        className="btn btn-outline-secondary btn-sm col-1" 
                        onClick={() => {setEditing(!isEditing); setValue(props.todo.title)}} //turn on/off edit mode
                        >
                            <img width="20px" height="20px" src={editimg}/>
                    </button>   
                    <button 
                        className="btn btn-outline-danger btn-sm col-1" 
                        onClick={() => props.onMvToTrash(props.todo.id)}
                        >
                            <img width="20px" height="20px" src={trashbinicon}/>
                    </button>                   
                </div>
            </div>
        </div>
    )
}