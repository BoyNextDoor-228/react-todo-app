import { React, useState, useEffect }  from 'react'
import   axios                         from 'axios'
import { TrashTodoItem }               from './TrashTodoItem'
import   Context                       from '../context'
import { LoaderGif }                   from './loader_gif'

export const Trashbin = () => {
    const [trashTodos, setTrashTodos] = useState([])
    const [isLoading, setIsLoading]   = useState(true)

    function deleteTodo(id)
    {
        if (window.confirm("Are you sure you want to delete this todo forever?"))
        {
            axios.delete(`http://localhost:4200/todos/${id}`)
            setTrashTodos(trashTodos.filter(todo => todo.id !== id))
        }  
    }

    function getTodoBack(id)                            // get todo out of trashbin
    {
        axios.patch(`http://localhost:4200/todos/${id}`, { isInTrash: false })
        setTrashTodos(trashTodos.filter(todo => todo.id !== id))
    }

    useEffect(() => {                                   // get todos which are in trash
        axios.get("http://localhost:4200/todos", {
            params: {
              isInTrash: true
            }
          }).then((resp) => {
          const recievedData = resp.data;
          setTrashTodos(recievedData);
          setIsLoading(false)
        });
      }, [setTrashTodos]);


// ======================================== Component to Render ========================================      
    if (isLoading) { return (<LoaderGif/>) }            // display loader if component haven't loaded yet
 
    if (!trashTodos.length) { return <h1 className="text-center pt-4">Trashbin is empty!</h1> } // binary operator: display todos if todos array isn't empty
    
        return (
            <Context.Provider value = {{ deleteTodo, getTodoBack }}>
            <ul> {trashTodos.map(trashTodo => {
                    if (trashTodo.isInTrash)
                    {
                        return <TrashTodoItem 
                        trashTodo={trashTodo}
                        key={trashTodo.id}                
                        />
                    }                 
                 })}
            </ul>           
            </Context.Provider>
        )
}