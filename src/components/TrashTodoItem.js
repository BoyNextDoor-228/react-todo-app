import { React, useContext } from 'react'
import   getbackicon         from '../images/getbacktodo.png'
import   Context             from '../context'

export const TrashTodoItem = (props) => {
    const { deleteTodo }  = useContext(Context)
    const { getTodoBack } = useContext(Context)


// ======================================== Component to Render ========================================    
    return (
        <div className="card mt-2">
            <div className="card-body">
                <div className="input-group row">
                    <div className="input-group-prepend col-1">
                    </div>                    
                    <span className="col-9 text-center">
                        {props.trashTodo.title} 
                    </span> 
                    <button 
                        className="btn btn-outline-danger btn-sm col-1" 
                        onClick={ () => getTodoBack(props.trashTodo.id) }
                        >
                            <img width="20px" height="20px" src={getbackicon} alt="get todo back"/>
                    </button>                    
                    <button 
                        className="btn btn-outline-danger btn-sm col-1" 
                        onClick={ () => deleteTodo(props.trashTodo.id) }>
                            &times;
                    </button>
                </div>
            </div>
        </div>
    )
}