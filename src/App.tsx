import {Home} from './pages/Home'
import { NewRoom } from './pages/NewRoom';
import './styles/global.scss'
import {BrowserRouter, Route} from "react-router-dom"
import { AuthContextProvier } from './contexts/AuthContext';

function App() {

  return (
    <BrowserRouter>
      <AuthContextProvier>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvier>
    </BrowserRouter>
  );
}

export default App;
