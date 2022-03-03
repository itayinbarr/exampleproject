// Ionic & system imports
import { IonGrid, IonRow, IonCol, IonContent, IonImg, IonPage, IonIcon, IonInput, IonButton, IonHeader, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import React from 'react';
import { useState } from 'react';

// Backend & authentication related imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../test-credentials';

// UI logistics imports
import { chevronForward } from 'ionicons/icons';
import './Settings.css';
import settings from '../images/settings.png';

  const Feedback: React.FC = () => {
    const [idea, setIdea] = useState<string>();
    const [uuid, setUuid] = useState(".");

        /*firebase code */
        const auth = getAuth(app);

        onAuthStateChanged(auth, (user) => {
          if (user) {
            const uid = user.uid;
            setUuid(uid);

            // ...
          } else {
            // User is signed out
            // ...
          }
        }); 

        

        async function handleSubmit () {
                  const ideaObject = {
                  uid:uuid,
                  title: idea,
                }
                //TODO sending you the idea
              await console.log(ideaObject)
              window.location.replace("/settings");
              window.location.reload();
            
  
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
                    <IonCardTitle>משוב והצעות לשיפור</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                    <form onSubmit={handleSubmit}>
                        יש לך רעיון שיעיף את החוויה באימון? חסר לך משהו? נשמח לשמוע.
                        <IonInput  value={idea} onIonChange={e => setIdea(e.detail.value!)} placeholder="יש לי רעיון..."></IonInput>
                        <IonButton type="submit" expand="block">שליחה</IonButton>
                    </form>
                </IonCardContent>
          </IonCard>
          </IonContent>
  </IonPage>
      );
}

export default Feedback;
