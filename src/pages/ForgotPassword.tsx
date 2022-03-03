// Ionic & system imports
import { IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, } from '@ionic/react';

// UI logistics imports
import './ForgotPassword.css';
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
import { mail, lockClosed, logoFacebook, logoGoogle, chevronForward } from 'ionicons/icons';
import { useEffect, useState } from 'react';

// Backend & authentication related imports
import { app } from '../test-credentials';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
const auth = getAuth(app);

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState("");



  function handleSubmit() {
    sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    alert("נשלח אליך מייל עם קישור לאיפוס הסיסמה")
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert("שגיאה, נסה מאוחר יותר")
    // ..
  });
  }



  return (
    <IonPage>
      <IonToolbar>
        <IonButton href="/login" fill="clear" className="topBackBtn">
            <IonIcon color="primary" slot="icon-only" icon={chevronForward} />
        </IonButton>
      </IonToolbar>
      <IonContent fullscreen>
          <IonGrid className="container">
            <IonRow>
              <IonCol>
                <IonTitle className="title" size="large">שכחתי סיסמה</IonTitle>
              </IonCol>
            </IonRow>
              <IonRow>
                <IonCol pull="2" size="8">
                  <IonInput color="primary" value={email} placeholder=" כתובת דוא״ל" onIonChange={e => setEmail(e.detail.value!)}>
                  <IonIcon size="small" color="secondary" icon={mail}></IonIcon>
                  </IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol className="center">
                  <p>אימייל יישלח אליך עם הסיסמה שלך.</p>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol pull="1" size="10" className="center">
                  <IonButton onClick={handleSubmit} expand="block" color="primary">שליחה</IonButton>
                </IonCol>
              </IonRow>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ForgotPassword;
