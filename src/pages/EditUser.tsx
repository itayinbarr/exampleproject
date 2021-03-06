import { IonButton, IonCheckbox, IonCol, IonContent, IonGrid, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonTitle, IonToolbar, } from '@ionic/react';
import './SignUp.css';
import settings from '../images/settings.png';
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
import { mail, lockClosed, chevronForward, person, call } from 'ionicons/icons';
import { useState } from 'react';

const LogOut: React.FC = () => {
    const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [pass, setPass] = useState<string>();
    const [confirmpass, setConfirm] = useState<string>();
    const [phone, setPhone] = useState<string>();
    const [checked, setChecked] = useState(false);
    const handleSubmit = (evt: { preventDefault: () => void; }) => {
      evt.preventDefault();
      alert(`Submitting Name ${email} and ${pass}`)
  }

  return (
    <IonPage>
        <IonHeader>
        <IonToolbar>
            <IonButton href="/settings" fill="clear">
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
                  <IonCol className="center">
                  <h1>?????????? ???????? ??????????</h1>
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
      <IonContent>
          <IonGrid className="ccontainer">
            <form onSubmit={handleSubmit}>
              <IonRow>
                <IonCol pull="2" size="8">
                  <IonInput color="primary" type="text" value={name} placeholder=" ?????????? ???? ??????" onIonChange={e => setName(e.detail.value!)}>
                  <IonIcon size="small" color="secondary" icon={person}></IonIcon>
                  </IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol pull="2" size="8">
                  <IonInput color="primary" type="email" value={email} placeholder=" ?????????? ?????????? ??????????" onIonChange={e => setEmail(e.detail.value!)}>
                  <IonIcon size="small" color="secondary" icon={mail}></IonIcon>
                  </IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol pull="2" size="8">
                  <IonInput color="primary" value={pass} type="password" placeholder=" ?????????? ??????????" onIonChange={e => setPass(e.detail.value!)}>
                  <IonIcon size="small" color="secondary" icon={lockClosed}></IonIcon>
                  </IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol pull="2" size="8">
                  <IonInput color="primary" value={confirmpass} type="password" placeholder=" ?????????? ?????????? ????????" onIonChange={e => setConfirm(e.detail.value!)}>
                  <IonIcon size="small" color="secondary" icon={lockClosed}></IonIcon>
                  </IonInput>
                </IonCol>
              </IonRow>
              <IonRow>
                    <IonCol className="ion-align-self-center" size="3" pull="2" >
                            <IonCheckbox checked={checked} onIonChange={e => setChecked(e.detail.checked)} />
                    </IonCol>
                    <IonCol className="ion-align-self-center">
                            <IonRow>
                                <IonCol>
                                    <IonText>?????? ???? ?????????? ???????????? ?????????? ???????????? ?????????
                                    </IonText>
                                </IonCol>
                            </IonRow>
                    </IonCol>
              </IonRow>
              <IonRow>
                <IonCol pull="2" size="8" className="center">
                  <IonButton expand="block" color="primary">?????????? ????????????</IonButton>
                </IonCol>
              </IonRow>
            </form>
          </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default LogOut;
