// Ionic & system imports
import { CreateAnimation, IonButton, IonCol, IonContent, IonGrid, 
  IonImg, IonInput, IonPage, IonRow, IonText, 
  useIonViewWillLeave } from '@ionic/react';
  import { useEffect, useState } from 'react';
  import { Prompt } from 'react-router';

// Components imports
import CoolDown from './CoolDown';
import MainPart from './MainPart';
import PicturePage from './PicturePage';
import WarmUp from './WarmUp';

// Backend & authentication related imports
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app } from '../test-credentials';
import { rpc } from '../rpc';

// UI logistics imports
import workout from '../images/workout.png';
import finish from '../images/finish.png';
import './WorkoutStyle.css';

interface WorkoutStrucutre {
  title: string,
  time: string,
  date: string,
  precombination: string[][]
}

interface ContainerProps {
  
  loading: boolean,
  empty:boolean,
  precombination?:string[][],
  title?: string
  sendWorkoutToApp?: (workout:WorkoutStrucutre) => void,
}


const defaultProps: ContainerProps = {
  loading:true,
  empty:true,
  sendWorkoutToApp: (workout:WorkoutStrucutre) => {}
}

const WorkoutExp: React.FC<ContainerProps> = ({ loading, empty, title, precombination, sendWorkoutToApp }) => {
  const [goal, setGoal] = useState("")
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
    if(stage == "finish") {
      handleSubmit()
    }
    if(stage == "nogoal") {
      setStartWorkout(!startWorkout)
    }

    if((empty == false) && (title) && (precombination)) {
      for(let i = 0; i < precombination?.length; i++){
        if(i == 0){ setCombination1(precombination[i]) } 
        if(i == 1){ setCombination2(precombination[i]) } 
        if(i == 2){ setCombination3(precombination[i]) } 
        if(i == 3){ setCombination4(precombination[i]) } 
        if(i == 4){ setCombination5(precombination[i]) } 

      }
      setGoal(title)
      if((stage !== "warmup") && 
      (stage !== "mainpart") && (stage !== "mainpart2") 
      && (stage !== "mainpart3") && (stage !== "mainpart4") 
      && (stage !== "mainpart5") && (stage !== "takepicture") && 
      (stage !== "cooldown") && (stage !== "warmup") && (stage !== "finish")){
        setStage("warmup")

      }
      setStartWorkout(true)
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
                      <IonText>אימון פעיל</IonText>
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
                    <IonCol className="center">
                      {
                        minutes == 1 ? (
                          <IonText>דקה אחת חלפה</IonText>
                        ):
                        (<IonText>{minutes} דקות חלפו</IonText>)
                      }
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol size="8" pull="2">
                      <div className="headerBorder"></div>
                    </IonCol>
                  </IonRow>
                  {                  
                  
                  stage == "warmup" ? (
                    <WarmUp sendStageToParent={sendStageToParent} />):
                  
                  stage == "mainpart" ? (<MainPart key="firstmain" mainNumber={1} punchesarr={combination1} sendCombinationToParent={sendCombinationToParent} sendStageToParent={sendStageToParent} />): 
                  
                  stage == "mainpart2" ? (<MainPart key="secondmain" mainNumber={2} punchesarr={combination2} sendCombinationToParent={sendCombinationToParent} sendStageToParent={sendStageToParent} />): 
                  
                  stage == "mainpart3" ? (<MainPart key="thirdmain" mainNumber={3} punchesarr={combination3} sendCombinationToParent={sendCombinationToParent} sendStageToParent={sendStageToParent} />): 

                  stage == "mainpart4" ? (<MainPart key="fourthmain" mainNumber={4} punchesarr={combination4} sendCombinationToParent={sendCombinationToParent} sendStageToParent={sendStageToParent} />): 

                  stage == "mainpart5" ? (<MainPart key="fifthmain" mainNumber={5} punchesarr={combination5} sendCombinationToParent={sendCombinationToParent} sendStageToParent={sendStageToParent} />): 

                  stage == "takepicture" ? (<PicturePage sendStageToParent={sendStageToParent} />): 

                  stage == "cooldown" ? (<CoolDown sendStageToParent={sendStageToParent} />): 

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
                                                      עבודה טובה!
                                                    </IonText>
                                                  </IonCol>
                                                </IonRow>
                                                <IonRow>
                                                  <IonCol>
                                                    <IonText>
                                                      לא לשכוח לשלוח את הסרטון לאדם שיכול לעזור לך להשתפר!
                                                    </IonText>
                                                  </IonCol>
                                                </IonRow>
                                                <IonRow className="logoRow">
                                                  <IonCol> 
                                                        <IonButton routerLink='/feed' expand="block" className="finishButton">שמירת האימון</IonButton>
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
                      <h1 className="center">נתחיל מלכתוב את מטרת האימון שלך</h1>
                  </IonCol>
              </IonRow>
              <IonRow>
                  <IonCol size="8" pull="2" className="center">מחשבה על מטרה לפני האימון עוזרת למקד אותו ולהפיק ממנו את המיטב</IonCol>
              </IonRow>
              <IonRow>
                <IonCol pull="2" size="8">
                  <IonInput color="primary" value={goal} placeholder="מטרת האימון..." onIonChange={e =>   setGoal(e.detail.value!)}>
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
                            <IonButton onClick={() => {setStartWorkout(true); setStage("warmup")}} expand="block">נתחיל</IonButton>
                        </IonCol>
                      </IonRow>
                      </CreateAnimation>
                ) :
                (
                  <IonRow className="placement">
                        <IonCol pull="2" size="8">
                            <IonButton expand="block">נתחיל</IonButton>
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
      }
      <Prompt
        when={!block}
        message={block => (
            `האימון הולך להפסיק באמצע ביציאה מהדף. להמשיך?`
          )}
      />
            </IonContent>

  </IonPage>
  );
};

WorkoutExp.defaultProps = defaultProps;

export default WorkoutExp; 
