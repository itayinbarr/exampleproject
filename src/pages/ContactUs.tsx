// Ionic & system imports
import { IonGrid, IonRow, IonCol, IonContent, IonImg, IonPage, IonIcon, IonButton, IonHeader, IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/react';
import React from 'react';

// UI logistics imports
import settings from '../images/settings.png';
import { chevronForward } from 'ionicons/icons';
import './Settings.css';

  const ContactUs: React.FC = () => {

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
                    <IonCardTitle>צרו קשר</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                נשמח לשמוע ממך! <br />
                appmydojo@gmail.com
                </IonCardContent>
          </IonCard>
          </IonContent>
  </IonPage>
      );
}

export default ContactUs;
