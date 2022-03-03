import { IonGrid, IonRow, IonCol, IonContent, IonImg, IonPage, IonTitle, IonIcon, IonInput, IonButton, IonRouterOutlet, IonHeader, IonToolbar, IonTextarea, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonChip, IonLabel, IonItem, IonList, IonThumbnail } from '@ionic/react';
import settings from '../images/settings.png';
import { useEffect, useRef, useState } from 'react';
import { book, bug, bulb, chatboxEllipses, chevronBack, chevronForward, closeCircle, closeOutline, information, logOut, notifications, refreshCircle, shuffle, shuffleOutline, stopwatch } from 'ionicons/icons';
import React from 'react';
import './Settings.css';

  const DojoPage: React.FC = () => {

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
                  <IonCardTitle>על הדוג׳ו</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                    זיהינו את הצורך להשתפר בזמן המינימלי להצלחה מקסימלית בתחום אומנויות הלחימה
              </IonCardContent>
          </IonCard>
          
          </IonContent>
  </IonPage>
      );
}

export default DojoPage;
