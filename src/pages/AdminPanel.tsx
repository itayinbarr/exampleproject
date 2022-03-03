// Ionic & system imports
import { IonGrid, IonRow, IonCol, IonContent, IonImg, IonPage, IonIcon, IonButton, 
  IonHeader, IonToolbar, IonTextarea, IonCard, IonCardContent, 
  IonCardHeader, IonCardSubtitle, IonCardTitle, IonItem, IonList } from '@ionic/react';
import { useState } from 'react';
import React from 'react';

// Backend & authentication related imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../test-credentials';

// UI logistics imports
import settings from '../images/settings.png';
import { checkmarkCircle, chevronForward, closeCircle } from 'ionicons/icons';
import './Settings.css';

import mock from '../components/mockdb.json';

  const AdminPanel: React.FC = () => {
    const [link, setLink] = useState("google.com");
    const [content, setContent] = useState("לורם איפסום דולור סיט אמט, קונסקטורר אדיפיסינג אלית קולורס מונפרד אדנדום סילקוף, מרגשי ומרגשח. עמחליף גולר מונפרר סוברט לורם שבצק יהול, לכנוץ בעריר גק ליץ, נולום ארווס סאפיאן - פוסיליס קוויס, אקווזמן קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרק - וענוף קוואזי במר מודוף. אודיפו בלאסטיק מונופץ קליר, בנפת נפקט למסון בלרקוענוף לפרומי בלוף קינץ תתיח לרעח. לת צשחמי צש בליא, מנסוטו צמלח לביקו ננבי, צמוקו בלוקריה שיצמה ברורק.")

        /*firebase code */
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            // ...
          } else {
            // User is signed out
            // ...
          }
        }); 

        async function handleYes(){
          await console.log("approved mail")


        }

        async function handleNo(){
          await console.log("approved mail")

        }

    return (
        <IonPage>
          <IonHeader>
            <IonToolbar>
                <IonButton routerDirection="back" routerLink="/settings" fill="clear">
                    <IonIcon color="primary" slot="icon-only" icon={chevronForward} />
                </IonButton>
            </IonToolbar>
            <IonToolbar>
              <IonGrid>
                <IonRow>
                  <IonCol>
                    <IonImg className="image" src={settings} />
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
          <IonCard>
              <IonCardHeader>
                  <IonCardTitle>קישור לחיבור התלמידים</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {link}
                  <br />
                  <IonButton onClick={() =>  navigator.clipboard.writeText(link)}>העתק</IonButton>
              </IonCardContent>
          </IonCard>
          <IonCard>
              <IonCardHeader>
                  <IonCardTitle>מחכים לאישור</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                  <IonList>
                {mock.emails.map((item)=>{
         return (<div key={item.id}> <IonItem color="tretiary">
           <IonGrid>
              <IonRow>
                <IonCol>
                <div className="pendingMail">
                {item.email}
                </div>
               </IonCol>
              </IonRow>
             <IonRow>
               <IonCol size="2">
               <IonButton /*onClick={handleYes}*/ color="primary"><IonIcon icon={checkmarkCircle}></IonIcon></IonButton>
               </IonCol>
               <IonCol size="2">
               <IonButton /*onclick={handleNo}*/ color="secondary"><IonIcon icon={closeCircle}></IonIcon></IonButton>
               </IonCol>
              </IonRow>
           </IonGrid>
           
         
         </IonItem>
                      </div>);
                  })}
                  </IonList>
              </IonCardContent>
          </IonCard>
          <IonCard>
              <IonCardHeader>
                  <IonCardTitle>רשימת רשומים</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                  <IonList>
                {mock.emails.map((item)=>{
         return (<div key={item.id}> <IonItem color="tretiary">{item.email}</IonItem>
                      </div>);
                  })}
                  </IonList>
              </IonCardContent>
          </IonCard>
          <IonCard>
              <IonCardHeader>
                  <IonCardTitle>עריכת הטקסט שבדף הדוג׳ו</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <IonCardSubtitle>הטקסט</IonCardSubtitle>
                <IonTextarea autoGrow value={content} onIonChange={e => setContent(e.detail.value!)}></IonTextarea>
                  <br />
                  <IonButton onClick={() =>  {}}>שמור</IonButton>
              </IonCardContent>
          </IonCard>
          </IonContent>
  </IonPage>
      );
}

export default AdminPanel;
