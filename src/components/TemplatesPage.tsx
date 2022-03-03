// Ionic & system imports
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle, IonText, IonModal, IonButton, useIonViewWillLeave, IonIcon, CreateAnimation } from '@ionic/react';
import { MutableRefObject, SetStateAction, useEffect, useRef, useState } from 'react';

// Components imports
import TemplateCard from './TemplateCard';

// Backend & authentication related imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../test-credentials';
import { rpc } from '../rpc';

// UI logistics imports
import { addOutline, chevronForward } from 'ionicons/icons';
import workout from '../images/workout.png';
import './TemplatesStyle.css';
import { Facebook } from 'react-content-loader'


interface DataStrucutre {
  title: string,
  time: string,
  date: string,
  
}

interface ContainerProps {
  loading: boolean,
  data: DataStrucutre[]

}
const defaultProps: ContainerProps = {
  loading: true,
  data:  [
      {
        title: "jkjk",
        time: "",
        date: ""
      }
    ]
}

const TemplatesPage: React.FC<ContainerProps> = ({ loading, data }) => {
  
  // ------- CONSTS -------

  // UI Logistics consts
  const [scroll, setScroll] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false)


  // Workout window consts
  const [workoutCard, setWorkoutCard] = useState(false)
  const [cardNum, setCardNum] = useState(0)
  const [cardTitle, setCardTitle] = useState("מכות רצח")
  const [cardDate, setCardDate] = useState("0/0/00")
  const [cardComb, setCardComb] = useState(["מרפק", "אפרקאט", "הוק", "קרוס", "ג׳אב"])
  const [cardTime, setCardTime] = useState("0")
  const [cardHour, setCardHour] = useState("10:32")
  const [cardPreComb, setCardPreComb] = useState([["lol", "lolz", "lols"],["lols"], ["what?"]])
  const [newTemplate, setNewTemplate] = useState(
    {
        title: "",
        time: "",
        date: "",
        precombination: [["."]]
      }
    );
    

useIonViewWillLeave(() => {
  setScroll(false); 
 });

// ------- FUNCTIONS -------

// Handling transferring data from card to the window
function handleWorkoutCard(num: number, title: string, time: string, date: string) {
  //setCardComb()
  //setCardHour()
  setCardDate(date.slice(0, 4))
  setCardNum(num)
  setCardTitle(title)
  setCardTime(time)
  setWorkoutCard(true)
}

function renderCombinations() {
  var rows = [];
  for(let i = 0; i < cardPreComb.length; i++){
    
    rows.push(
<IonRow className='closerRows'>
              <IonCol size="10" pull="1">
                <IonCard>
                  <IonCardContent>
                  <IonText className="infoName" color="primary">קומבינציה</IonText>
                    <br />
                    <IonText className="infoName" color="tertiary">
                      {
                        
                        cardPreComb[i].map(function(d, idx){
                          return (
                            <IonText>{ 
                              idx === (cardPreComb[i].length -1) ? (<IonText className='punchText'>{d}</IonText>) : (
                                  <IonText className='punchText'>{d}, </IonText>
                              )
                          } </IonText>
                              )
                        })
                  
                      }
                    </IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
    )
  }
  return rows
}
return (
  <IonPage>
    {/* Logo, Title & name */}
    <IonHeader>
      <IonToolbar>
        <IonGrid className="pageProps">
            <IonButton routerDirection="back" routerLink="/workout" fill="clear">
                <IonIcon color="primary" slot="icon-only" icon={chevronForward} />
            </IonButton>
          <IonRow>
          </IonRow>
          <IonRow className="ion-align-content-center">
            <IonCol className="center ion-align-self-center">
              <h1 className={"tlogo"}>כל התבניות שלך</h1>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="center">
              <IonButton fill="clear">
                  <IonIcon size="large" icon={addOutline}></IonIcon>
              </IonButton>
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
    <IonContent
    onIonScroll={() => {setScroll(true)}} 
    scrollEvents={true} fullscreen>
      {/* Feed loading code */}
      <IonGrid>
        <IonRow>
      {
        loading ?
        (<Facebook />)
        :
        (
          data.length > 0 ? (
          
            data.slice(0).reverse().map((item, idx)=>{
              return (
                <IonCol size="12">
                <div key={data.length - idx}> 
                  <div onClick={() => handleWorkoutCard(data.length - idx, item.title, item.time, item.date)}>
                    <TemplateCard trainNum={data.length - idx} title={item.title} time={item.time} date={item.date} />
                  </div>
                </div>
                </IonCol>
              );
            })
         
          ) 
          : (
            <div>
              <IonCard>
                <IonCardContent>
                  <div className="center">אין אימונים ביומן</div>
                </IonCardContent>
              </IonCard>
            </div>
          )
        )                  
      }
      </IonRow>
      </IonGrid>
    {/* Workout window */}
    <IonModal isOpen={workoutCard}>
      <IonContent>
        <IonCardContent>
          <IonGrid>
            <IonRow>
              <IonCol>
                { /*
                  dojo == "no" ? (
                    <IonImg className="image" src={feed}></IonImg>
                  ) : (
                    <IonImg className="image" src={dojo}></IonImg>

                  )
                  */
                }
                <IonImg className="cardImage" src={workout}></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="center">
                <IonText color="primary">תבנית מספר {cardNum}</IonText>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="center">
                <h1 color="tertiary">{cardTitle}</h1>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size="8" pull="2">
                <div className="modalBorder"></div>
              </IonCol>
            </IonRow>
            {renderCombinations()}
            <IonRow className="center">
              <IonCol size="4.5" pull="1.5"><IonButton expand='block'>ערוך תבנית</IonButton></IonCol>
              <IonCol size="4.5" pull="1.5"><IonButton expand='block' color="secondary">מחק תבנית</IonButton></IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonContent>
      <IonButton onClick={() => {setScroll(false); setWorkoutCard(false); 
 }}>סגור</IonButton>
    </IonModal>
    </IonContent>
  </IonPage>
)
};

TemplatesPage.defaultProps = defaultProps;

export default TemplatesPage;
