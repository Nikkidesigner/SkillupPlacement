import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import "./App.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import StudentHome  from "./components/home/student/StudentHome.jsx";
import  Notifications  from "./components/home/student/Notifications/Notifications.jsx";
import  Profile from "./components/home/student/Profile/Profile.jsx";


import Welcome from "./components/welcome/Welcome.jsx";

import About from "./components/about/About.jsx";
import  Contact  from "./components/contact/Contact.jsx";
import Team  from "./components/team/Team.jsx";
import Testimonal from "./components/home/student/testimonal/Testimonal.jsx";
import Login from "./components/login/Login.jsx";
import Register from "./components/Register/Register.jsx";

function App() {
  return (
    <>
    <Router>
      <Switch>
        {/*common routes */}
        <Route exact path='/about' component={About} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/team' component={Team} />
        <Route exact path='/testimonals' component={Testimonal} />


        {/*welcome page */}
        <Route exact path='/' component={Welcome} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/Register' component={Register} />



        {/*student routes*/}
        <Route exact path='/student/home' component={StudentHome} />
        <Route exact path='/student/notifications' component={Notifications} />
        <Route exact path='/student/Profile' component={Profile} />
        

      </Switch>
    </Router>
  </>
  )
}


export default App
