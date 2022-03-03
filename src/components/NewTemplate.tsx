// Ionic & system imports
import { CreateAnimation, IonButton, IonCol, IonContent, IonGrid, 
  IonImg, IonInput, IonPage, IonRow, IonText, useIonViewWillLeave } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Prompt } from 'react-router';

// Components imports
import CombinationChoose from './CombinationChoose';

// Backend & authentication related imports
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../test-credentials';
import { rpc } from '../rpc';

// UI logistics imports
import workout from '../images/workout.png';
import finish from '../images/finish.png';
import './WorkoutStyle.css';



interface ContainerProps {
  loading: boolean,
  empty:boolean,
  combination?:string[][],
  title?: string
  sendTemplateToApp?: (message:WorkoutStrucutre) => void,
}
interface WorkoutStrucutre {
  title: string,
  time: string,
  date: string,
  precombination: string[][]
}

const defaultProps: ContainerProps = {
  loading:true,
  empty:true,
  sendTemplateToApp: (message:WorkoutStrucutre) => {}
}

const NewTemplate: React.FC<ContainerProps> = ({ loading, empty, title, combination, sendTemplateToApp }) => {
  const [goal, setGoal] = useState("")
  const [warmup, setWarmup] = useState("")
  const [main, setMain] = useState("")
  const [takePhoto, setTakePhoto] = useState("")
  const [cooldown, setCoolDown] = useState("")
  const [startWorkout, setStartWorkout] = useState(false)
  const [block, setBlock] = useState(false)
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [stage, setStage] = useState('goalFirst')
  const [combination1, setCombination1] = useState(['מרפק', 'אפרקאט','הוק','קרוס','גאב'])
  const [combination2, setCombination2] = useState(['מרפק', 'אפרקאט','הוק','קרוס','גאב'])
  const [combination3, setCombination3] = useState(['מרפק', 'אפרקאט','הוק','קרוס','גאב'])
  const [combination4, setCombination4] = useState(['מרפק', 'אפרקאט','הוק','קרוס','גאב'])
  const [combination5, setCombination5] = useState(['מרפק', 'אפרקאט','הוק','קרוס','גאב'])
  const [Hrs,setHrs] = useState(0);
  const [Mins,setMins] = useState(0);


    /*firebase code */
    const auth = getAuth(app);
    const [uuid, setUuid] = useState(".");

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
    

  useIonViewWillLeave(async () => {
    setBlock(false);
    window.location.reload()
   });

   useEffect(() => {
    if(seconds === 60){
        setSeconds(0);
        setMinutes(minutes + 1);
    } 
    seconds >= 0 && setTimeout(() => setSeconds(seconds + 1), 1000);
  }, [seconds]);


  
  useEffect(() => {
    if(stage == "finish"){
      handleSubmit()
    }

    if(stage == "nogoal") {
      setStartWorkout(!startWorkout)
    }
  }, [stage]);


  useEffect(() => {
    function areEqual(array1:string[], array2:string[]) {
      if (array1.length === array2.length) {
        return array1.every((element: string) => {
          if (array2.includes(element)) {
            return true;
          }
    
          return false;
        });
      }
    
      return false;
    }
    if(stage == "cooldown"){
      if(areEqual(combination1, combination2)) { setCombination2(["Don't Include"]);}
      if(areEqual(combination1, combination3)) { setCombination3(["Don't Include"]) }
      if(areEqual(combination1, combination4)) { setCombination4(["Don't Include"]) }
      if(areEqual(combination1, combination5)) { setCombination5(["Don't Include"])}
    
      if(areEqual(combination2, combination3)) { setCombination3(["Don't Include"]) }
      if(areEqual(combination2, combination4)) { setCombination4(["Don't Include"]) }
      if(areEqual(combination2, combination5)) { setCombination5(["Don't Include"]) }
    
      if(areEqual(combination3, combination4)) { setCombination4(["Don't Include"]) }
      if(areEqual(combination3, combination5)) { setCombination5(["Don't Include"]) }
    
      if(areEqual(combination4, combination5)) { setCombination5(["Don't Include"]) }
    
    }
  }, [stage]);

async function handleSubmit () {
        
  var finalCombos = [];
  if(!combination1.includes("Don't Include")){
    finalCombos.push(combination1)
  }
  if(!combination2.includes("Don't Include")){
    finalCombos.push(combination2)
  }
  if(!combination3.includes("Don't Include")){
    finalCombos.push(combination3)
  }
  if(!combination4.includes("Don't Include")){
    finalCombos.push(combination4)
  }
  if(!combination5.includes("Don't Include")){
    finalCombos.push(combination5)
  }
  const newWorkoutObject = {
    //TODO remember you need to create an id number for the workout
    uid:uuid,
    title: goal,
    time: minutes,
    date: Date.now() + Hrs + ":" + Mins,
    combinations: finalCombos
  }
    
        setBlock(true);
        var date = new Date;
        var hrs = date.getHours();
        var mins = date.getMinutes();
        setHrs(hrs)
        setMins(mins)
                const workoutObject = {
                //TODO remember you need to create an id number for the workout
                uid:uuid,
                title: goal,
                time: minutes,
                date: Date.now() + Hrs + ":" + Mins
              }
              //TODO sending you the workout
            await rpc.workouts.createWorkout(workoutObject);
            window.location.replace("/feed");
            window.location.reload();


    }


const sendStageToParent = (message:string) => { 
  // the callback. Use a better name
  setStage(message)
}; 
const sendCombinationToParent = (message:string[], index:number) => { // the callback. Use a better name
  if((index == 1) && (combination1 !== message) && (combination2 !== message) && (combination3 !== message) && (combination4 !== message) && (combination5 !== message)){
    setCombination1(message)
  }
  if((index == 2) && (combination1 !== message) && (combination2 !== message) && (combination3 !== message) && (combination4 !== message) && (combination5 !== message)){
    setCombination2(message)
  }
  if((index == 3) && (combination1 !== message) && (combination2 !== message) && (combination3 !== message) && (combination4 !== message) && (combination5 !== message)){
    setCombination3(message)
  }
  if((index == 4) && (combination1 !== message) && (combination2 !== message) && (combination3 !== message) && (combination4 !== message) && (combination5 !== message)){
    setCombination4(message)
  }
  if((index == 5) && (combination1 !== message) && (combination2 !== message) && (combination3 !== message) && (combination4 !== message) && (combination5 !== message)){
    setCombination5(message)
  }
}; 

  return (
    <IonPage>
      <IonContent fullscreen className={stage}>
      <IonGrid className="expText">
                  <IonRow className="headerMargin">
                    <IonCol className="center">
                      <IonText>בניית תבנית</IonText>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol className="center">
                      <IonText className='logoTitle'>{goal !== "" ? (
                        <>{goal}</>
                      ):(<>lol</>)}</IonText>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="8" pull="2">
                      <div className="headerBorder"></div>
                    </IonCol>
                  </IonRow>
                  {                  
                  
                  stage == "mainpart" ? (<CombinationChoose key="firstmain" mainNumber={1} punchesarr={combination1} sendCombinationToParent={sendCombinationToParent} sendStageToParent={sendStageToParent} />): 
                  
                  stage == "mainpart2" ? (<CombinationChoose key="secondmain" mainNumber={2} punchesarr={combination2} sendCombinationToParent={sendCombinationToParent} sendStageToParent={sendStageToParent} />): 
                  
                  stage == "mainpart3" ? (<CombinationChoose key="thirdmain" mainNumber={3} punchesarr={combination3} sendCombinationToParent={sendCombinationToParent} sendStageToParent={sendStageToParent} />): 

                  stage == "mainpart4" ? (<CombinationChoose key="fourthmain" mainNumber={4} punchesarr={combination4} sendCombinationToParent={sendCombinationToParent} sendStageToParent={sendStageToParent} />): 

                  stage == "mainpart5" ? (<CombinationChoose key="fifthmain" mainNumber={5} punchesarr={combination5} sendCombinationToParent={sendCombinationToParent} sendStageToParent={sendStageToParent} />): 


                  stage == "finish" ? 
                                    (
                                      <CreateAnimation
    duration={300}
    iterations={1}
    fromTo={[
      { property: 'transform', fromValue: 'translateX(0px)', toValue: 'translateX(0px)' },
      { property: 'opacity', fromValue: '0', toValue: '1' }
    ]}
  play={true}>
                                        <div>
                                            <IonRow>
                                              <IonCol className='center'>
                                                <IonRow>
                                                  <IonCol>
                                                    <IonImg className='takepictureimg' src={finish}></IonImg>
                                                  </IonCol>
                                                </IonRow>
                                                <IonRow>
                                                  <IonCol>
                                                    <IonText className='finishTitle'>
                                                      סיימנו את בניית התבנית
                                                    </IonText>
                                                  </IonCol>
                                                </IonRow>
                                                
                                                <IonRow className="logoRow">
                                                  <IonCol> 
                                                        <IonButton routerLink="/feed" expand="block" className="finishButton">שמירת התבנית</IonButton>
                                                  </IonCol>
                                                </IonRow>
                                              </IonCol>
                                            </IonRow>
                                        </div>
                                        </CreateAnimation>
                                    ) :
                  (<div></div>)

                  }
                </IonGrid>
      {
        empty ? 
        (
        !startWorkout ? (
          <CreateAnimation
    duration={300}
    iterations={1}
    fromTo={[
      { property: 'transform', fromValue: 'translateX(0px)', toValue: 'translateX(0px)' },
      { property: 'opacity', fromValue: '0', toValue: '1' }
    ]}
  play={true}>
        <div>
          <IonGrid>
              <IonRow>
                  <IonCol>
                      <IonImg className="image" src={workout}></IonImg>
                  </IonCol>
              </IonRow>
              <IonRow>
                  <IonCol size="8" pull="2">
                      <h1 className="center">נתחיל מלכתוב את מטרת התבנית שלך</h1>
                  </IonCol>
              </IonRow>
              <IonRow>
                  <IonCol size="8" pull="2" className="center">מחשבה על מטרה לפני האימון עוזרת למקד אותו ולהפיק ממנו את המיטב</IonCol>
              </IonRow>
              <IonRow>
                <IonCol pull="2" size="8">
                  <IonInput color="primary" value={goal} placeholder="מטרת התבנית..." onIonChange={e =>   setGoal(e.detail.value!)}>
                  </IonInput>
                </IonCol>
              </IonRow>
              {
                goal !== "" ? (
                  <CreateAnimation
  duration={300}
  iterations={1}
  fromTo={[
    { property: 'transform', fromValue: 'translateX(0px)', toValue: 'translateX(0px)' },
    { property: 'opacity', fromValue: '0', toValue: '1' }
  ]}
play={true}>
                      <IonRow>
                        <IonCol pull="2" size="8" className="center">
                            <IonButton onClick={() => {setStartWorkout(true); setStage("mainpart")}} expand="block">נמשיך</IonButton>
                        </IonCol>
                      </IonRow>
                      </CreateAnimation>
                ) :
                (
                  <IonRow className="placement">
                        <IonCol pull="2" size="8">
                            <IonButton expand="block">נמשיך</IonButton>
                        </IonCol>
                      </IonRow>
                )
              }
              
          </IonGrid>
        </div>
        </CreateAnimation>
        ) 
        :
        (
          <div></div>
        )

          
          
        ) 
        :
        (
          <div>אימון מוגדר מראש</div>
        ) 
      }
      <Prompt
        when={!block}
        message={block => (
            `כתיבת התבנית תיפסק באמצע. להמשיך?`
          )}
      />
            </IonContent>

  </IonPage>
  );
};

NewTemplate.defaultProps = defaultProps;

export default NewTemplate; 
