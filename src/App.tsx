// Ionic & system imports
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupConfig,
  
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useEffect, useState } from 'react';


// Components imports
import Feed from './pages/Feed';
import Settings from './pages/Settings';
import ContactUs from './pages/ContactUs';
import Feedback from './pages/Feedback';
import About from './pages/About';
import EditUser from './pages/EditUser';
import Legal from './pages/Legal';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ForgotPassword from './pages/ForgotPassword';
import AdminPanel from './pages/AdminPanel';
import Test from './pages/api.test';
import Invite from './pages/invitation';
import Splash from './pages/Splash';
import WorkoutHome from './components/WorkoutHome';
import TemplatesPage from './components/TemplatesPage';
import WorkoutExp from './components/WorkoutExp';
import DojoPage from './pages/DojoPage';
import Tutorial from './components/Tutorial';
import NewTemplate from './components/NewTemplate';

// Backend & authentication related imports
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './test-credentials';
import { rpc } from './rpc';

// UI logistics imports
import { barbell, home, settings } from 'ionicons/icons';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';


setupConfig({
  mode: 'ios',
});
const App: React.FC = () => {
  const [cardComb, setCardComb] = useState(["מרפק", "אפרקאט", "הוק", "קרוס", "ג׳אב"])
  const [cardTime, setCardTime] = useState("0")
  const [cardDate, setCardDate] = useState("0/0/00")
  const [cardHour, setCardHour] = useState("10:32")
  const [uuid, setUuid] = useState(".");
  const [loading, setLoading] = useState(false)
  const [templatesList, setTemplatesList] = useState(
    {
      full_name: "",
      email: "",
      dojo: "",
      workouts: [
        {
          title: "",
          time: "",
          date: "",
          combinations: [["."], ["."], ["."], ["."], [","]]
        }
      ],
      firebase_token: ""}
    );
    
    const [doneWorkout, setDoneWorkout] = useState(
      {
          title: "",
          time: "",
          date: "",
          precombination: [["."]]
        }
      );
  const [logged, setLogged] = useState(false);

  /* firebase code */

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
      setUuid(uid);
        setLogged(true)
        window.history.replaceState(null, "New Page Title", "/feed");

        // ...
      } else {
        setLogged(false)
        window.history.replaceState(null, "New Page Title", "/login");
      }
    })
}, );

useEffect(() => {

  // Get username from server
  const getName = async() => {
    const obj = {firebase_token:uuid}
    const data = await rpc.feed.getUserFeed(obj);
    /*setDojo(data.dojo)*/
  }

  // Get feed data from server
  const getData = async() => {
    const obj = {firebase_token:uuid}
    const data = await rpc.feed.getUserFeed(obj);
    setLoading(false)
    setTemplatesList(data)
    /*
    if (data.hasOwnProperty(dojo) == true) {
      
      setDojo(data.dojo.logo_url);
    } 
    else {
      setDojo("no")
    }
    */
  }

  if((uuid !== ".")) {
      getData()
  }
  else console.log("Loading data from server")


}, [uuid]);

interface WorkoutStrucutre {
  title: string,
  time: string,
  date: string,
  precombination: string[][]
}
const sendWorkoutToApp = (workout:WorkoutStrucutre) => { // the callback. Use a better name
  setDoneWorkout(workout)
}; 

const sendTemplateToApp = (workout:WorkoutStrucutre) => { // the callback. Use a better name
  setDoneWorkout(workout)
}; 


return(
<IonApp dir="rtl">
{
                               logged ? 
                               (
                                <IonReactRouter>
                                <IonTabs>
                                  <IonRouterOutlet>
                                  <Route exact path="/">
                                      <Redirect to="/splash" /> 
                                    </Route>
                                    <Route exact path="/splash">
                                      <Splash />
                                      </Route>
                                    <Route exact path="/test">
                                      <Test />
                                    </Route>
                                   
                                    <Route exact path="/dojopage">
                                      <DojoPage />
                                    </Route>
                                    <Route exact path="/feed">
                                      <Feed />
                                    </Route>
                                    <Route exact path="/invite">
                                      <Invite />
                                    </Route>
                                    <Route exact path="/adminpanel">
                                      <AdminPanel />
                                    </Route>
                                    <Route exact path="/workout">
                                      <WorkoutHome empty={true} loading={loading}  />
                                    </Route>
                                    <Route exact path="/templates">
                                    <TemplatesPage loading={loading} data={templatesList.workouts} />
                                    </Route>
                                    <Route exact path="/lasttemplate">
                                      <div>lasttemplate</div>
                                    </Route>
                                    <Route exact path="/newtemplate">
                                      <NewTemplate sendTemplateToApp={sendTemplateToApp}  loading={true} empty={true} />
                                    </Route>
                                    <Route exact path="/tutorial">
                                    <Tutorial />
                                    </Route>
                                    <Route exact path="/emptyworkout">
                                      <WorkoutExp sendWorkoutToApp={sendWorkoutToApp} loading={true} title={doneWorkout.title} precombination={doneWorkout.precombination} empty={true} />
                                    </Route>
                                    <Route exact path="/settings">
                                      <Settings /> 
                                    </Route>
                                    <Route exact path="/contactus">
                                      <ContactUs />
                                    </Route>
                                    <Route exact path="/feedback">
                                      <Feedback />
                                    </Route>
                                    <Route exact path="/aboutus">
                                      <About />
                                    </Route>
                                    <Route exact path="/edituser">
                                      <EditUser />
                                    </Route>
                                    <Route exact path="/legal">
                                      <Legal />
                                    </Route>
                                  </IonRouterOutlet>
                                  <IonTabBar slot="bottom">
                                    <IonTabButton tab="feed" href="/feed">
                                      <IonIcon icon={home} />
                                      <IonLabel>בית</IonLabel>
                                    </IonTabButton>
                                    <IonTabButton tab="workout" href="/workout">
                                      <IonIcon icon={barbell} />
                                      <IonLabel>אימון</IonLabel>
                                    </IonTabButton>
                                    <IonTabButton tab="settings" href="/settings">
                                      <IonIcon icon={settings} />
                                      <IonLabel>הגדרות</IonLabel>
                                    </IonTabButton>
                                  </IonTabBar>
                                </IonTabs>
                              </IonReactRouter>
                               ) 
                              : (
                                <IonReactRouter>
                    <IonRouterOutlet>
                        <Route exact path="/login">
                        <Login />
                      </Route>
                      <Route exact path="/forgotpass">
                        <ForgotPassword />
                      </Route>
                      <Route exact path="/signup">
                        <SignUp />
                      </Route>
                      <Route exact path="/">
                        <Redirect to="/splash" />
                      </Route>
                      <Route exact path="/">
                        <Splash />
                      </Route>
                    </IonRouterOutlet>
                </IonReactRouter>
                              )
                            }
</IonApp>
);
};

export default App;
