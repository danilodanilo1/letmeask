import {Home} from './pages/Home'
import { NewRoom } from './pages/NewRoom';
import './styles/global.scss'
import {BrowserRouter, Route, Switch} from "react-router-dom"
import { AuthContextProvier } from './contexts/AuthContext';
import Room from './pages/Room';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvier>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
          <Route path="/rooms/:id" component={Room} />
        </Switch>
      </AuthContextProvier>
    </BrowserRouter>
  );
}

export default App;
