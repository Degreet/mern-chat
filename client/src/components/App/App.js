import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Auth from '../Auth/Auth'
import Chat from '../Chat/Chat'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Auth />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/chat">
          <Chat />
        </Route>
      </Switch>
    </Router>
  )
}
