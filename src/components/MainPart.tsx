// Ionic & system imports
import { CreateAnimation, IonButton, IonCol, IonDatetime, IonIcon, 
    IonInput, IonItem, IonList, IonRow, IonText, IonTitle } from '@ionic/react';
import { useEffect, useState } from 'react';

// UI logistics imports
import { shuffleOutline, pencilOutline, play, pause, addOutline, shuffle, shuffleSharp } from 'ionicons/icons';
import './WorkoutStyle.css';

interface ContainerProps {
    mainNumber:number,
    punchesarr:string[],
    sendStageToParent: (message:string) => void,
    sendCombinationToParent: (message:string[], index:number) => void
}


const defaultProps: ContainerProps = {
    mainNumber:1,
    sendStageToParent: (message:string) => {},
    sendCombinationToParent: (message:string[], index:number) => {},
    punchesarr:['מרפק', 'אפרקאט','הוק','קרוס','גאב']
}

const MainPart: React.FC<ContainerProps> = ({ mainNumber, sendStageToParent, punchesarr, sendCombinationToParent }) => {
    const [showTimer, setShowTimer] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('00:00:30');
    const [displayPicker, setDisplayPicker] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);
    const [editCombination, setEditCombination] = useState(false)
    const [randomize, setRandomize] = useState(false);
    const [punchComb, setPunchComb] = useState(punchesarr);
    const [one, setOne] = useState("מרפק");
    const [two, setTwo] = useState("אפרקאט");
    const [three, setThree] = useState("הוק");
    const [four, setFour] = useState("קרוס");
    const [five, setFive] = useState("גאב");
    const [slowwork, setSlowWork] = useState(true)
    const [slowwait, setSlowWait] = useState(true)

    const [workTime, setWorkTime] = useState(0)
    const [waitTime, setWaitTime] = useState(0)

    const [goFeature, setGoFeature] = useState(false);
    const [goer, setGoer] = useState(false);
    const [playGo, setPlayGo] = useState(false);

    const [editted, setEddited] = useState(false)


    function handleTimerStart () {
        setDisplayPicker(false);
        var a = selectedDate.split(':');
        var convertedSeconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        setTimeLeft(convertedSeconds);
        setShowTimer(false);
    }

    async function goHandler(){
        if((slowwait && slowwork) && playGo) {
            setGoer(true)
            setWaitTime(Math.floor(Math.random() * (3)) + 3);
            setWorkTime(Math.floor(Math.random() * (3)) + 3);
            setPlayGo(false)
        }
        if(slowwait && !slowwork && playGo) {
            setGoer(true)
            setWaitTime(Math.floor(Math.random() * (3)) + 3);
            setWorkTime(Math.floor(Math.random() * (3)));
            setPlayGo(false)
        }
        if(!slowwait && slowwork && playGo) {
            setGoer(true)
            setWaitTime(Math.floor(Math.random() * (3)));
            setWorkTime(Math.floor(Math.random() * (3)) + 3);
            setPlayGo(false)
        }
        if(!slowwait && !slowwork && playGo){
            setGoer(true)
            setWaitTime(Math.floor(Math.random() * (3)));
            setWorkTime(Math.floor(Math.random() * (3)));
            setPlayGo(false)
        }
        

    }

    useEffect(() => {
        // exit early when we reach 0
        if(goFeature && playGo){
            setTimeout(async () => {
                goHandler();                
            }, 2000);
        }
        if(goFeature && !goer && !playGo && (waitTime > -1)) {

            const waitInterval = setInterval(() => {

                if(waitTime < 1){
                        goHandler()
                        setPlayGo(true);


                }
                else{
                    setWaitTime(waitTime - 1)
                }
                
            }, 1000);
            return () => clearInterval(waitInterval);

            
        }
        if(goFeature && goer && !playGo){
            
            const goerInterval = setInterval(() => {
                if(workTime < 1){
                        setGoer(false);
                }
                else{
                    setWorkTime(workTime - 1);

                }

                
                
            }, 1000);
            
            return () => clearInterval(goerInterval);
        }
        // save intervalId to clear the interval when the
        // component re-renders
        // clear interval on re-render to avoid memory leaks
    }, [waitTime, workTime, goFeature, playGo, goer]);
    
    useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft) return;
        if(timeLeft == 1){
            const lastInterval = setInterval(() => {
                setDisplayPicker(true);
                clearInterval(lastInterval)
                }, 1000);


        }
    
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => {clearInterval(intervalId)};
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft]);
    
    useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft) return;
        if(timeLeft == 1){
            const lastInterval = setInterval(() => {
                setDisplayPicker(true);
                clearInterval(lastInterval)
                }, 1000);


        }
    
        // save intervalId to clear the interval when the
        // component re-renders
        const intervalId = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        }, 1000);
    
        // clear interval on re-render to avoid memory leaks
        return () => {clearInterval(intervalId)};
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft]);

    useEffect(() => {
        if(randomize) {
            setPunchComb(mixGenerator());
            setRandomize(!randomize);
        }
    }, [randomize, punchComb]);
    function handleTimerStop() {
        setDisplayPicker(true);
        setTimeLeft(0)
        }
    function mixGenerator () {
            if(punchComb) {
                let currentIndex = punchComb.length,  randomIndex;
                while (currentIndex != 0) {
        
                    // Pick a remaining element...
                    randomIndex = Math.floor(Math.random() * currentIndex);
                    currentIndex--;
                
                    // And swap it with the current element.
                    [punchComb[currentIndex], punchComb[randomIndex]] = [
                        punchComb[randomIndex], punchComb[currentIndex]];
                  }
            }
            
                return punchComb;
    }
  return (
    
      <div>
          <CreateAnimation
    duration={300}
    iterations={1}
    fromTo={[
      { property: 'transform', fromValue: 'translateX(0px)', toValue: 'translateX(0px)' },
      { property: 'opacity', fromValue: '0', toValue: '1' }
    ]}
  play={true}>
    <IonRow className="headerMargin">
        <IonCol>
        <IonTitle>חלק עיקרי מספר {mainNumber? (mainNumber):(<div></div>)}</IonTitle>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol className='headerMargin' size="8" pull="2">
            <div className="cardBorder"></div>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol size="8" pull="2">
<IonRow>
<IonCol className="center">
    <IonText className='punchTitle' color='light'>מחולל רצפים</IonText>
        </IonCol>
</IonRow>
<IonRow>
<IonCol className="center">
        <IonButton size='small' onClick={() => setRandomize(!randomize)} color="light" fill="outline">
                <IonIcon color="light" slot="icon-only" icon={shuffleSharp} />
            </IonButton>
        </IonCol>
        <IonCol className="center">
        <IonButton size='small' onClick={() => {
            setEddited(true)
            setOne(punchesarr[0])
            setTwo(punchesarr[1])
            setThree(punchesarr[2])
            setFour(punchesarr[3])
            setFive(punchesarr[4])
            setEditCombination(!editCombination)}} color="light" fill="outline">
                <IonIcon color="light" slot="icon-only" icon={pencilOutline} />
            </IonButton>
        </IonCol>
</IonRow>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol className='center' size="8" pull="2">
        {
            editCombination ? (
               
                <IonList>
                    <IonItem>
                        <IonInput color="light" value={one} placeholder={one} onIonChange={e =>   setOne(e.detail.value!)}>
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput color="light" value={two} placeholder={one} onIonChange={e =>   setTwo(e.detail.value!)}>
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput color="light" value={three} placeholder={one} onIonChange={e =>   setThree(e.detail.value!)}>
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput color="light" value={four} placeholder={one} onIonChange={e =>   setFour(e.detail.value!)}>
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput color="light" value={five} placeholder={one} onIonChange={e =>   setFive(e.detail.value!)}>
                        </IonInput>
                    </IonItem>
                    <IonItem>
                        <IonButton size="default" onClick={() => {setPunchComb([one, two, three, four, five]); setEditCombination(false); }}>עדכן שמות</IonButton>
                    </IonItem>
                </IonList>
            ) : (
                editted ? (<IonText className='center punchText'>{punchComb.map(function(d, idx){
                    return (
                        <IonText>{ 
                            idx === (punchComb.length -1) ? (<IonText className='punchText'>{d}</IonText>) : (
                                <IonText>{d}, </IonText>
                            )
                        } </IonText>
                        
                        )
                  })
                    
                }</IonText>) :(
                    <IonText className='punchText'>{ !punchComb ? (<div></div>) : (punchesarr.map(function(d, idx){
                        return (
                            <IonText>{
                                idx === (punchesarr.length -1) ? (<IonText className='punchText'>{d}</IonText>) : (
                                    <IonText>{d}, </IonText>
                                )
                            } </IonText>
                            
                            )
                      }))
                        
                    }</IonText>
                )
            
            )

        }
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol size="8" pull="2">
            <div className="cardBorder"></div>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol size="8" pull="2">
            <div className="cardBorder"></div>
        </IonCol>
    </IonRow>
    <IonRow>
    {
                    goFeature ? (<>
                    <IonCol size="8" pull="2" onClick={() => {setPlayGo(false); setGoFeature(false)}}>
                        <IonText className="punchTitle center">{ 
                                                                    goer ? 
                                                                    (
                                                                        <div>
                                                                            <IonText>צא!</IonText>
                                                                        </div>
                                                                        ) 
                                                                        : (
                                                                            <div className="setScreen">
                                                                                <IonText>היכון</IonText>
                                                                            </div>
                                                                    )
                                                                    }</IonText>

                    </IonCol>
                    
                    </>) : 
                    
                    (<><IonCol size="8" pull="2">
                    <IonRow>
                    <IonCol className='center'>
            <IonText className='punchTitle' color='light'>מזניק אקראי</IonText>
                </IonCol>   
                    </IonRow>
                    <IonRow>
                        <IonCol className="center" size="6">
                            <IonRow>
                                <IonCol><IonText>משך העבודה</IonText>
        </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="speedButton">
                                    { slowwork ? (
                                    <>
                                    <IonText className="checked">ארוך</IonText>
                                    <IonText onClick={() => setSlowWork(false)}> | קצר</IonText>
                                    </>) : (
                                        <>
                                    <IonText onClick={() => setSlowWork(true)}>ארוך | </IonText>
                                    <IonText className="checked">קצר</IonText>
                                    </>)
                                }
                                </IonCol>
                            </IonRow>
                            
                        </IonCol>
                        <IonCol className="center" size="6">
                        <IonRow>
                                <IonCol><IonText>משך הפסקה</IonText>
        </IonCol>
                            </IonRow>
                            <IonRow>
                                <IonCol className="speedButton">
                                    { slowwait ? (
                                    <>
                                    <IonText className="checked">ארוך</IonText>
                                    <IonText onClick={() => setSlowWait(false)}> | קצר</IonText>
                                    </>) : (
                                        <>
                                    <IonText onClick={() => setSlowWait(true)}>ארוך | </IonText>
                                    <IonText className="checked">קצר</IonText>
                                    </>)
                                }
                                </IonCol>
                            </IonRow>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className="headerMargin center" onClick={() => {setGoer(false); setGoFeature(true); setPlayGo(true)}}>
                        <IonIcon className="logoTitle" icon={play}></IonIcon>
                        </IonCol>
                    </IonRow>
                </IonCol>
        
        </>)
                }

        
</IonRow>
    <IonRow>
        <IonCol size="8" pull="2">
            <div className="cardBorder"></div>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol size="8" pull="2">
            <div className="cardBorder"></div>
        </IonCol>
    </IonRow>


    <IonRow>
                    <IonCol className='center' size="8" pull="2">
            <IonText className='punchTitle' color='light'>טיימר</IonText>
                </IonCol>   
                    </IonRow>

    <IonRow>
        <IonCol size="8" pull="2">
            <IonRow>
        {
                displayPicker ? (
                    <>
                    <IonCol size="7.5" className='ion-align-self-center'>
                <IonDatetime
                
                className='mainTimer ion-align-self-center'
                    displayFormat="mm:ss"
                    value={selectedDate}
                    onIonChange={(e) => setSelectedDate(e.detail.value!)}
                    
                >
                </IonDatetime> 
                </IonCol>
                    <IonCol pull="1.5" size="3">
                        <IonButton color='light' fill="clear" onClick={handleTimerStart}><IonIcon icon={play}></IonIcon></IonButton>
                    </IonCol>
            </>
                ) :(
                    timeLeft < 10 ? (
                        <IonCol>
                    <IonRow>
                        <IonCol pull="1" size="9" className='mainTimerOn ion-align-self-center'>00:0{timeLeft}</IonCol>
                        <IonCol size="2">
                        <IonButton  color='light' fill="clear" onClick={handleTimerStop}><IonIcon icon={pause}></IonIcon></IonButton>
                        </IonCol>
                    </IonRow>
                    </IonCol>
                    ):
                    (               
                        <IonCol>   
                    <IonRow>
                        
                        <IonCol pull="1" size="9" className='ion-align-self-center mainTimerOn'>00:{timeLeft}
                        </IonCol>
                        <IonCol size="2">                        <IonButton  color='light' fill="clear" onClick={handleTimerStop}><IonIcon icon={pause}></IonIcon></IonButton>
</IonCol>
                    </IonRow>
                    </IonCol>
                    )
                )
            }</IonRow></IonCol>
    </IonRow>
    <IonRow>
        <IonCol className='pageBottom' size="8" pull="2">
            <div className="cardBorder"></div>
        </IonCol>
    </IonRow>
    </CreateAnimation>

    <IonRow className="mainpartlowerNav">
        <IonCol>
        <IonRow>
                    <IonCol size="12">
                      <div className="headerBorder"></div>
                    </IonCol>
                  </IonRow>
    <IonRow>
        <IonCol  className='center'>
        <IonButton color='light' fill='outline' onClick={() => {
            if(mainNumber == 1) {
                sendCombinationToParent(punchComb ? (punchComb):(['error']), mainNumber); sendStageToParent("warmup")
            }
            if(mainNumber == 2) {
                sendCombinationToParent(punchComb ? (punchComb):(['error']), mainNumber); sendStageToParent("mainpart")
            }
            if(mainNumber == 3) {
                sendCombinationToParent(punchComb ? (punchComb):(['error']), mainNumber); sendStageToParent("mainpart" + 2) 
            }
            if(mainNumber == 4) {
                sendCombinationToParent(punchComb ? (punchComb):(['error']), mainNumber); sendStageToParent("mainpart" + 3)
            }
            if(mainNumber == 5) {
                sendCombinationToParent(punchComb ? (punchComb):(['error']), mainNumber); sendStageToParent("mainpart" + 4)
            }
            
            }}>אחורה</IonButton>
        </IonCol>
        {
            mainNumber !== 5 ? (
<IonCol className='center'>
        <IonButton color='light' fill='outline' onClick={() => {
                sendCombinationToParent(punchComb ? (punchComb):(['error']), mainNumber); sendStageToParent("mainpart" + (mainNumber + 1))
            }}>
                                  <IonIcon size="large" icon={addOutline}></IonIcon>

            </IonButton>
        </IonCol>
            ) :
            (<div></div>)
        }
        
        <IonCol className='center'>
        <IonButton color='light' fill='outline' onClick={() => {sendCombinationToParent(punchComb ? (punchComb):(['error']), mainNumber); sendStageToParent("takepicture")}}>הבא</IonButton>
        </IonCol>
    </IonRow>
        </IonCol>

    
    </IonRow>
    </div>
  );
};

MainPart.defaultProps = defaultProps;

export default MainPart; 
