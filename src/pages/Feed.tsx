// Ionic & system imports
import { IonContent, IonHeader, IonPage, IonToolbar, IonImg, 
  IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle, 
  IonText, IonModal, IonButton, useIonViewWillLeave } from '@ionic/react';
import { useEffect, useState } from 'react';

// Components imports
import TrainCard from '../components/TrainCard';

// Backend & authentication related imports
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from '../test-credentials';
import { rpc } from '../rpc';

// UI logistics imports
import './Feed.css';
import feed from '../images/feed.png';
import { Facebook } from 'react-content-loader'

const Feed: React.FC = () => {

  // ------- CONSTS -------

  // UI Logistics consts
  const [loading, setLoading] = useState(true)
  const [scroll, setScroll] = useState(false);

  // Authentication consts
  const [uuid, setUuid] = useState(".");
  const [isGoogle, setIsGoogle] = useState(false);
  const auth = getAuth(app);

  // User personalization consts
  const [username, setUsername] = useState("");
  const [dojo, setDojo] = useState("")


  // Workout window consts
  const [workoutCard, setWorkoutCard] = useState(false)
  const [cardNum, setCardNum] = useState(0)
  const [cardTitle, setCardTitle] = useState("מכות רצח")
  const [cardDate, setCardDate] = useState("0/0/00")
  const [cardPreComb, setCardPreComb] = useState([["lol"]])
  const [cardComb, setCardComb] = useState(["מרפק", "אפרקאט", "הוק", "קרוס", "ג׳אב"])
  const [cardTime, setCardTime] = useState("0")
  const [cardHour, setCardHour] = useState("10:32")
  const [newTemplate, setNewTemplate] = useState(
    {
        title: "",
        time: "",
        date: "",
        precombination: [["."]]
      }
    );
  // Backend data consts
  const [data, setData] = useState(
    {
      full_name: "",
      email: "",
      dojo: "",
      workouts: [
        {
          id:0,
          title: "",
          time: "",
          date: ""
        }
      ],
      firebase_token: ""}
    );
    
  // ------- STATE -------

  // Authentication state 
  onAuthStateChanged(auth, async(user) => {
    if (user) {
      if(user.displayName !== null) {
        setUsername(user.displayName)
      
        setIsGoogle(true);
      }
      const uid = user.uid;
      setUuid(uid);
      // ...
    } else {
      // User is signed out
      // ...
    }
  }); 

  // Authentication state 
  useEffect(() => {

    // Get username from server
    const getName = async() => {
      const obj = {firebase_token:uuid}
      const data = await rpc.feed.getUserFeed(obj);
      setUsername(data.full_name)
      /*setDojo(data.dojo)*/
    }

    // Get feed data from server
    const getData = async() => {
      const obj = {firebase_token:uuid}
      const data = await rpc.feed.getUserFeed(obj);
      setLoading(false)
      setData(data)
      /*
      if (data.hasOwnProperty(dojo) == true) {
        
        setDojo(data.dojo.logo_url);
      } 
      else {
        setDojo("no")
      }
      */
    }

    // Checks if connected via google
    if((uuid !== ".") && (!isGoogle)) {
      getName()
    }

    if((uuid !== ".")) {
        getData()
    }
    else console.log("Loading data from server")


}, [uuid]);

useIonViewWillLeave(() => {
  setScroll(false); 
 });

// ------- FUNCTIONS -------

// Workout structure for server communication purposes
interface WorkoutStrucutre {
  title: string,
  time: string,
  date: string,
  precombination: string[][]
}

// Turn workout to a template
async function handleNewTemplate(title:string, precombination:string[][]) {
  const newTemplateObject = {
    //TODO remember you need to create an id number for the workout
    uid:uuid,
    title: title,
    precombination: precombination
  }
  await rpc.workouts.createWorkout(newTemplateObject);
}

// Handling transferring data from card to the window
function handleWorkoutCard(num: number, title: string, time: string, date: string) {
  //setCardComb()
  setCardHour(date)
  setCardDate(date.slice(0, 4))
  setCardNum(num)
  setCardTitle(title)
  setCardTime(time)
  setWorkoutCard(true)
}

// Rendering the combinations to modal
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
              <IonImg className={scroll ? "logoShrink" : "logo"} src={feed}></IonImg>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol className="center">
              <h1>יומן אימונים</h1>
              <p>שלום לך, {username}</p>
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
          data.workouts.length > 0 ? (
          uuid !== null ? 
          (
            data.workouts.slice(0).reverse().map((item, idx)=>{
              return (
                <IonCol size="6">
                <div key={data.workouts.length - idx}> 
                  <div onClick={() => handleWorkoutCard(data.workouts.length - idx, item.title, item.time, item.date)}>
                    <TrainCard trainNum={data.workouts.length - idx} title={item.title} time={item.time} date={item.date} />
                  </div>
                </div>
                </IonCol>
              );
            })
          ) 
          : (
            <div></div>
          )
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
                <IonImg className="cardImage" src={feed}></IonImg>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol className="center">
                <IonText color="primary">אימון מספר {cardNum}</IonText>
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
            <IonRow > 
              <IonCol size="5" pull="1">
                <IonCard>
                  <IonCardContent>
                    <IonText className="infoName" color="primary">תאריך</IonText>
                    <br />
                    <IonCardTitle class="infoTitle">{cardDate}</IonCardTitle>
                    <IonText>{cardHour}</IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol size="5" pull='1'>
                <IonCard>
                  <IonCardContent>
                  <IonText className="infoName" color="primary">זמן</IonText>
                    <br />
                    <IonCardTitle className="infoTitle">{cardTime}</IonCardTitle>  
                    <IonText>דקות</IonText>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
                {/* Combinations rendering */}

            {renderCombinations()}
            <IonRow className="center">
              <IonCol size="4.5" pull="1.5"><IonButton onClick={()=>{handleNewTemplate(cardTitle, cardPreComb)}} expand='block'>הפוך לתבנית</IonButton></IonCol>
              <IonCol size="4.5" pull="1.5"><IonButton expand='block' color="secondary">מחק אימון</IonButton></IonCol>
            </IonRow>
          </IonGrid>
        </IonCardContent>
      </IonContent>
      <IonButton onClick={() => {setScroll(false); setWorkoutCard(false); 
 }}>סגור</IonButton>
    </IonModal>
    </IonContent>
  </IonPage>

  );
};

export default Feed;
