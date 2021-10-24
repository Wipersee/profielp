import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {isAuth} from './common/auth'
import Login from './pages/login/Login'
import Main from './pages/map/Main'
import './common/normilize.css'
import 'antd/dist/antd.css';


const App = () => {
  return <Router>
    <Switch>
      <Route exact path='/' render={() => (
        isAuth() ? (
          <Main />
        ) : (
          <Redirect to="/login"/>
        )
      )} />
      <Route path="/login" component={Login}/>
    </Switch>
  </Router>
}

export default App;
