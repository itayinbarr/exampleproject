
// Ionic & system imports
import { IonGrid, IonRow, IonCol, IonContent, IonImg, IonPage, 
  IonIcon, IonHeader, IonToolbar, IonLabel, IonItem, IonList } from '@ionic/react';
import { useState } from 'react';
import React from 'react';

// Backend & authentication related imports
import { getAuth, signOut } from "firebase/auth";
import { app } from '../test-credentials';

// UI logistics imports
import settings from '../images/settings.png';
import { book, chatboxEllipses, construct, helpCircle, 
  informationCircle, logOut } from 'ionicons/icons';
import './Settings.css';

const auth = getAuth(app);
  const Settings: React.FC = () => {
    const [admin, setAdmin] = useState(false);

function handleSignOut() {
  signOut(auth).then(() => {
    window.history.replaceState(null, "New Page Title", "/login");
    window.location.reload();

  }).catch((error) => {
    alert("error!")
  });
}

    

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonImg className="image" src={settings} />
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol className="center">
                  <h1>הגדרות</h1>
                  </IonCol>
                </IonRow>
                <IonRow>
                  <IonCol size="8" pull="2">
                    <div className="border"></div>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
          <IonList>
          <IonItem routerLink="/dojopage" button onClick={() => { }}>
                <IonIcon slot="end" color="primary" size="large" icon={informationCircle}></IonIcon>
              <IonLabel color="primary">דף הדוג׳ו</IonLabel>
            </IonItem>
          { 
                                    !admin ? 
                                    (
                                      <IonItem routerLink="/adminpanel" button onClick={() => { }}>
                                      <IonIcon slot="end" color="primary" size="large" icon={construct}></IonIcon>
                                      <IonLabel color="primary">פאנל מנהל</IonLabel>
                                    </IonItem>
                                        ) 
                                        : (
                                            
                                        <div></div>
                                    )
                                    }
            <IonItem button routerLink="/contactus" onClick={() => { }}>
                <IonIcon slot="end" color="primary" size="large" icon={chatboxEllipses}></IonIcon>
              <IonLabel color="primary">צרו קשר</IonLabel>
            </IonItem>
            {/*
            <IonItem button routerLink="/feedback" onClick={() => { }}>
                <IonIcon slot="end" color="primary" size="large" icon={bulb}></IonIcon>
              <IonLabel color="primary">משוב והצעות לשיפור</IonLabel>
            </IonItem> */}
            <IonItem button routerLink="/aboutus">
                <IonIcon slot="end" color="primary" size="large" icon={helpCircle}></IonIcon>
              <IonLabel color="primary">אודות</IonLabel>
            </IonItem>
            {/*
            <IonItem button href="/edituser" onClick={() => { }}>
                <IonIcon slot="end" color="primary" size="large" icon={person}></IonIcon>
              <IonLabel color="primary">עריכת פרטי חשבון</IonLabel>
            </IonItem>
            */}
            <IonItem routerLink="/legal" button onClick={() => { }}>
                <IonIcon slot="end" color="primary" size="large" icon={book}></IonIcon>
              <IonLabel color="primary">מסמכים משפטיים</IonLabel>
            </IonItem>
            <IonItem button onClick={handleSignOut}>
                <IonIcon slot="end" color="primary" size="large" icon={logOut}></IonIcon>
              <IonLabel color="primary">התנתק</IonLabel>
            </IonItem>
          </IonList>
          </IonContent>
  </IonPage>
      );
}

export default Settings;
