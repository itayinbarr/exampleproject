// Ionic & system imports
import { IonButton, IonCard, IonCardContent, IonCardHeader, 
  IonCardSubtitle, IonCardTitle, IonCol, IonContent, 
  IonGrid, IonIcon, IonImg, IonPage, IonRow, IonText } from '@ionic/react';

// UI logistics imports
import { chevronBack } from 'ionicons/icons';
import { Facebook } from 'react-content-loader';
import './WorkoutStyle.css';
import finish from '../images/finish.png';

interface ContainerProps {
  loading: boolean,
  empty: boolean
  title?: string,
  combinations?: string[],
  time?: string,
  date?: string,
  hour?: string,
}
const defaultProps: ContainerProps = {
  loading:true,
  empty:true,
  title: "אין לך תבניות עדיין",
  combinations: ["0", "0", "0", "0"],
  time: "0",
  date: "0",
  hour: "0",
}

const WorkoutHome: React.FC<ContainerProps> = ({ loading, empty, title, combinations, time, date, hour }) => {
  return (
  <IonPage>
    <IonContent fullscreen className='homeBack'>
          <IonGrid className="pageProps">
            <IonRow>
              <IonCol>
                <IonImg className="logoImage" src={finish}></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
            <IonCol className='center'>
                <h1>אימון חדש</h1>
              </IonCol>
            </IonRow>
            <IonRow className="upperNav">
              <IonCol>
                <IonButton routerLink="/emptyworkout" expand="block" color="light" fill="clear">התחל אימון ריק</IonButton>
              </IonCol>
              <IonCol>
                <IonButton routerLink="/templates" expand="block" color="light" fill="clear">לכל התבניות</IonButton>
              </IonCol>
            </IonRow>
            <IonRow className="templateRow">
              <IonCol>
                <IonCard>
                {
                  loading ? (<Facebook />) :
                  (
                    empty ? (
                      <div>
                        <IonCardHeader>
                          <IonCardTitle className='center'>אין לך תבניות אחרונות</IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent className='center'>
                          <IonButton routerLink="/newtemplate" >צור תבנית</IonButton>
                          <IonButton routerLink="/emptyworkout" color="tertiary">התחל אימון ריק</IonButton>
                        </IonCardContent>
                      </div>
                    ) :
                    (
                      <IonGrid>
                    <IonRow>
                    <IonCardHeader>
                      <IonCardSubtitle>התבנית האחרונה שלך</IonCardSubtitle>
                      <IonCardTitle>{title}</IonCardTitle>
                    </IonCardHeader>
                    </IonRow>
                    <IonCardContent>
                        <IonRow>
                        <IonCol>
                        <IonText className="infoName">קומבינציה</IonText>
                      <br />
                      <IonText className="infoName">
                        { 
                          combinations?.map(function(d, idx){
                            return (
                                <IonText color="tretiary" key={idx}>{d}, </IonText>
                                )
                          })
                  
                        }
                      </IonText>
                      </IonCol>
                        </IonRow>
                        <IonRow>
                          <IonCol size="4" pull='2'>
                              <IonText className="infoName" color="primary">זמן</IonText>
                              <br />
                              <IonCardTitle className="infoTitle">{time}</IonCardTitle>  
                              <IonText>דקות</IonText>
                          </IonCol>
                          <IonCol size="4" pull='2'>
                                <IonText className="infoName" color="primary">אימון אחרון</IonText>
                                <br />
                                <IonCardTitle class="infoTitle">{date}</IonCardTitle>
                                <IonText>{hour}</IonText>
                          </IonCol>
                        </IonRow>
                        <IonRow>
                        <IonCol className="ion-align-self-center" size="12">
                            <IonButton routerLink="/lasttemplate" fill="outline" size="large" expand='block'>
                              <IonIcon slot="end" icon={chevronBack} />
                              בחר/י בתבנית
                            </IonButton>
                          </IonCol>
                        </IonRow>
                    </IonCardContent>
                    </IonGrid>
                    )
                  )
                }
                

                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow className="guideRow">
              <IonCol>
                <IonButton routerLink="/tutorial" color='secondary' expand="block">איך מבצעים אימון עם האפליקציה?</IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>          
      </IonContent>
      </IonPage>
  );
};

WorkoutHome.defaultProps = defaultProps;

export default WorkoutHome;
