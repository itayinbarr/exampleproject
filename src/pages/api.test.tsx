// Ionic & system imports
import { IonContent, IonPage, IonButton } from '@ionic/react';
import { useState } from 'react';

// Backend & authentication related imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../test-credentials';

// UI logistics imports
import './Feed.css';

const Test: React.FC = () => {
  const [username, setUsername] = useState("");
  const auth = getAuth(app);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      if(user.displayName !== null) {
        setUsername(user.displayName)
  
      }
      else if((user.displayName == null) &&(user.email !== null)){setUsername(user.email)}
      const uid = user.uid;
      // ...
    } else {
      // User is signed out
      // ...
    }
  }); 
  return (
    <IonPage>
    <IonContent>
      <IonButton></IonButton>
      
      </IonContent>
  </IonPage>

  );
};

export default Test;
