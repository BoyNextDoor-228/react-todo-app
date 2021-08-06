import   React                          from 'react'
import { Switch, BrowserRouter, Route } from 'react-router-dom';
import { Navbar }                       from './components/Navbar'
import { Todos }                        from './components/Todos';
import { Trashbin }                     from './components/Trashbin';


function App() {
  return (
    <BrowserRouter>
      <div className="customContainer mw-100">
        <Navbar></Navbar>
        <Switch>
          <Route path={'/'} exact component={Todos}/>
          <Route path={'/trashbin'} exact component={Trashbin}/>
        </Switch>
     </div>
    </BrowserRouter>
  )
}

export default App;
