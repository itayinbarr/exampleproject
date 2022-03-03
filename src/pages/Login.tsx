// Ionic & system imports
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonPage, IonRow, IonTitle, } from '@ionic/react';
import { Redirect } from 'react-router';

// Backend & authentication related imports
import { auth } from '../test-credentials';
import { onAuthStateChanged, signInWithEmailAndPassword, signInWithRedirect } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { rpc } from '../rpc';

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
import { mail, lockClosed } from 'ionicons/icons';
import { useState } from 'react';

const provider = new GoogleAuthProvider();

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

 /* firebase code */

 function handleSubmit() {
  signInWithEmailAndPassword(auth, email, pass)
  
.then((userCredential) => {
  // Signed in 
  const user = userCredential.user;
<Redirect to="/feed" />
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
      signInWithRedirect(auth, provider);
  
  }
  
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const userObject = {
        full_name: user.displayName,
        email: user.email,
        firebase_token: user.uid
      }

      rpc.auth.userAuth(userObject);

    } else {
      window.history.replaceState(null, "New Page Title", "/feed");
    }
  })


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
                <IonTitle className="title" size="large">כניסה</IonTitle>
              </IonCol>
            </IonRow>
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
                <IonCol offset="2" className="forgot">
                  <a href="/forgotpass">שכחתי סיסמה</a>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="googleRow">
                <div className="center">{error}</div>
              </IonCol>
              </IonRow>
              <IonRow>
                <IonCol pull="1" className="center">
                  <IonButton onClick={() => {
                    handleSubmit();
                  }
                    } color="primary">כניסה</IonButton>
                </IonCol>
                <IonCol push="1">
                <div className="center"><IonButton href="/signup" color="secondary">הרשמה</IonButton></div>
              </IonCol>
              </IonRow>
              { /*
            <IonRow>
              <IonCol>
                <div className="center">או באמצעות</div>
              </IonCol>
            </IonRow> 
                   
            <IonRow className="googleRow">
                <IonCol className="center">
                  <IonButton onClick={handleGoogle} color="dark" fill="outline">
                    <IonIcon icon={logoGoogle}></IonIcon>
                    
                  </IonButton>
                </IonCol>
              </IonRow>
              */
}
          </IonGrid>
      </IonContent>
    </IonPage>

    
  );
};

export default Login;