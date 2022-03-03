// Ionic & system imports
import { IonContent, IonPage, IonImg } from '@ionic/react';

// Backend & authentication related imports
import { onAuthStateChanged } from 'firebase/auth';
import { app } from '../test-credentials';
import { auth } from '../test-credentials'

// UI logistics imports
import './Splash.css';
import logo from '../images/logo.png';


const Splash: React.FC = () => {

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await window.history.replaceState(null, "New Page Title", "/feed");
      await window.location.reload();

      // ...
    } else {
      await window.history.replaceState(null, "New Page Title", "/login");
      await window.location.reload();

    }
  })
    
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container logo">
          <IonImg src={logo} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Splash;
