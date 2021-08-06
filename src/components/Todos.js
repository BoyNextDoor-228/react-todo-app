import   React                   from 'react'
import { TodoItem }              from './TodoItem'
import { useState, useEffect }   from 'react'
import   Context                 from '../context'
import   axios                   from 'axios';
import { LoaderGif }             from './loader_gif'

export const Todos = () => {
    const [todos, setTodos]         = useState([])
    const [value, setValue]         = useState('')
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {                               // get todos which are not in trash
        axios.get("http://localhost:4200/todos", {
            params: {
              isInTrash: false
            }
          }).then((resp) => {
          const recievedData = resp.data;
          setTodos(recievedData);
          setIsLoading(false)
        });
      }, [setTodos]);
  
    function addTodo(title)                         // add todo to state and on database
    {
        let ID = new Date().getTime()
        setTodos( todos.concat([{
        id: ID,
        title,
        isDone: false, 
        isInTrash: false,
        isChanged: false,
        addedOn: new Date(ID).toLocaleString() 
        }]))

        axios.post("http://localhost:4200/todos",
        {
            id: ID,
            title,
            isDone: false,
            isInTrash: false,
            addedOn: new Date(ID).toLocaleString()  
  })

    }

    function acceptSubmit(event)                    // get data from form and hand it over for adding in db
    {
        event.preventDefault()
        if (value.trim())
        {
            {addTodo(value.toString())}
            setValue('')
        }
    }

    function toggleTodo(id, newIsDone)              // toggle-untoggle todo isDone flag
    {   
        axios.patch(`http://localhost:4200/todos/${id}`, { isDone: newIsDone })
        setTodos(todos.map(todo => {if (todo.id === id) todo.isDone = !todo.isDone; return todo }))
    }

    function moveAllTodosToTrashbin()               // move ALL done todos to trashbin  
    {
        if (window.confirm("Are you sure you want to move done todos to trashbin?"))
        {
            todos.forEach( todo => {if (todo.isDone) { moveTodoToTrashbin(todo.id) } })
            setTodos(todos.filter(todo => todo.isDone === false))
        }       
    }

    function moveTodoToTrashbin(id)                 // move single todo to trashbin
    {
        axios.patch(`http://localhost:4200/todos/${id}`, { isInTrash: true })
        setTodos(todos.map(todo => {if (todo.id === id) todo.isInTrash = true; return todo }))
        setTodos(todos.filter(todo => todo.isInTrash === false))
    }

    function overwriteTodoTitle(id, title)          // edit single todo title
    {
        axios.patch(`http://localhost:4200/todos/${id}`, { title: title, isChanged: true })
        todos.forEach(todo => {if (todo.id === id) {todo.title = title; todo.isChanged = true} })
        setTodos(todos)
    }
    
// ======================================== Component to Render ========================================
    if (isLoading) { return <LoaderGif/> }          // display loader if component haven't loaded yet

    return (
        <Context.Provider value = {{ toggleTodo }}>
        <div className="container mw-100">
            <div className="row">
                <div className="col-8">
                    <form onSubmit={acceptSubmit}>
                        <div className="form-group pt-2 ">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Add new todo..."
                                value={value}
                                onChange={event => setValue(event.target.value)}
                            />                    
                        </div>
                    </form>
                </div>
                <div className="col-4">
                    <button 
                        className="btn btn-secondary btn-sm mt-2 w-100 p-2"
                        onClick={() => moveAllTodosToTrashbin()}>
                        Move done todos to trashbin
                    </button>
                </div>
            </div>
        </div>
        {
         todos.length?                                  // binary operator: display todos if todos array isn't empty 
            <ul> {todos.map(todo => {
            {
                if (!todo.isInTrash)
                {
                    return <TodoItem 
                    todo={todo}
                    key={todo.id}                        
                    onMvToTrash={moveTodoToTrashbin}
                    onRename={overwriteTodoTitle}
                    />   
                }
            }
             })}
            </ul> : 
            <h1 className="text-center pt-4">
                No Todos!
            </h1>
        }
    </Context.Provider>
    )
}