// Ionic & system imports
import { IonGrid, IonRow, IonCol, IonContent, 
  IonImg, IonPage, IonIcon, IonButton, IonHeader, 
  IonToolbar, IonCard, IonCardContent, IonCardHeader, IonCardTitle, } from '@ionic/react';
import React from 'react';

// UI logistics imports
import settings from '../images/settings.png';
import { chevronForward } from 'ionicons/icons';
import './Settings.css';

  const About: React.FC = () => {

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
                  <IonCardTitle>למה התכנסנו?</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                    זיהינו את הצורך להשתפר בזמן המינימלי להצלחה מקסימלית בתחום אומנויות הלחימה
              </IonCardContent>
          </IonCard>
          <IonCard>
              <IonCardHeader>
                  <IonCardTitle>איך אנחנו עושים את זה?</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
              אנחנו מספקים את הפלטפורמה הנרדשת ליצירת אווירת הדוג'ו בכל חלל פוטנציאלי לאימון

              </IonCardContent>
          </IonCard>
          <IonCard>
              <IonCardHeader>
                  <IonCardTitle>מי אנחנו?</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                  
           
           4 שותפים עסקיים האחראים על מחלקות שונות על מנת להפוך את ה MyDojo לאבן דרך בתחום אימוני הבית באומנות הלחימה השונות. 
<br />
מנכ''ל - איתי ענבר

<br />
סמנכ''ל תפעול - אריאל הלפטר

<br />
סמנכ״ל שיווק ומשפט - עדי כהן

<br />
סמנכ״ל טכנולוגיה - אביב בן יוסף

              </IonCardContent>
          </IonCard>
          </IonContent>
  </IonPage>
      );
}

export default About;
