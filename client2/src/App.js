import './App.css';
import { Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import LandingPage from './component/views/LandingPage/LandingPage';
import LoginPage from './component/views/LoginPage/LoginPage';
import RegisterPage from './component/views/RegisterPage/RegisterPage';
import PostPage from './component/views/PostPage/PostPage';
import Auth from './hoc/auth';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route exact path="/post" component={Auth(PostPage, true)} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
