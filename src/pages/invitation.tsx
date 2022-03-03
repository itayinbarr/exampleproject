// Ionic & system imports
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRouterOutlet, IonRow, IonText, IonTitle, } from '@ionic/react';

// Backend & authentication related imports
import { app } from '../test-credentials';
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// UI logistics imports
import './Login.css';
import login from '../images/login.png';

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
import '../theme/variables.css';
import { mail, lockClosed, logoFacebook, logoGoogle } from 'ionicons/icons';
import { SetStateAction, useEffect, useState } from 'react';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const Invite: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

 /* firebase code */



   function handleSubmit() {
     signInWithEmailAndPassword(auth, email, pass)
   .then((userCredential) => {
     // Signed in 
     const user = userCredential.user;
     window.history.replaceState(null, "New Page Title", "/feed");
      window.location.reload();

     // ...
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
setError(errorMessage);
   });
   }
   function handleGoogle() {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      window.history.replaceState(null, "New Page Title", "/feed");
      window.location.reload();
      // ...
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  }


  return (

                  <IonPage>
      <IonContent fullscreen>
          <IonGrid className="ccontainer">
            <IonRow>
              <IonCol>
              <IonImg className="image" src={login} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonTitle className="title" size="large">הוזמנת לדוג׳ו!</IonTitle>
              </IonCol>
            </IonRow>
            <IonRow><IonCol><div className="center">להצטרפות, היכנס למשתמש שלך</div></IonCol></IonRow>
              <IonRow>
                <IonCol pull="2" size="8">
                  <IonInput color="primary" value={email} placeholder=" כתובת דוא״ל" onIonChange={e =>   setEmail(e.detail.value!)}>
                  <IonIcon size="small" color="secondary" icon={mail}></IonIcon>
                  </IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol pull="2" size="8">
                  <IonInput color="primary" value={pass} type="password" placeholder=" סיסמה" onIonChange={e =>   setPass(e.detail.value!)}>
                  <IonIcon size="small" color="secondary" icon={lockClosed}></IonIcon>
                  </IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="googleRow">
                <div className="center">{error}</div>
              </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="center">
                  <IonButton onClick={handleSubmit} color="primary">כניסה</IonButton>
                </IonCol>
              </IonRow>

            <IonRow>
              <IonCol>
                <div className="center">או באמצעות</div>
              </IonCol>
            </IonRow>
            <IonRow className="googleRow">
                <IonCol className="center">
                  <IonButton onClick={handleGoogle} color="dark" fill="outline">
                    <IonIcon icon={logoGoogle}></IonIcon>
                    GOOGLE
                  </IonButton>
                </IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>

    
  );
};

export default Invite;