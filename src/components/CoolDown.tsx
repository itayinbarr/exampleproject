// Ionic & system imports
import { CreateAnimation, IonButton, IonCol, IonDatetime, IonIcon, IonRow, IonTitle } from '@ionic/react';
import { useEffect, useState } from 'react';

// UI logistics imports
import './WorkoutStyle.css';
import { pause, play, stop } from 'ionicons/icons';

interface ContainerProps {
  sendStageToParent: (message:string) => void,
}


const defaultProps: ContainerProps = {
  sendStageToParent: (message:string) => {},
}

const CoolDown: React.FC<ContainerProps> = ({ sendStageToParent }) => {
    const [showTimer, setShowTimer] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('00:00:30');
    const [displayPicker, setDisplayPicker] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);
    const [animateStart, setAnimateStart] = useState(false)
    const [timerPause, setTimerPause] = useState(false)
    function handleTimerStop() {
        setTimeout(() => {setAnimateStart(false);  
            setTimerPause(false)    
        }, 200);
        setTimeout(() => {  setDisplayPicker(true); setTimeLeft(0);
        }, 450);
        }

    function handleTimerStart () {
        setTimeout(() => {setAnimateStart(true);            
        }, 200);
        setDisplayPicker(false);
        var a = selectedDate.split(':');
        var convertedSeconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]); 
        setTimeLeft(convertedSeconds);
        setShowTimer(false);
    }
    
    useEffect(() => {
        // exit early when we reach 0
        if (!timeLeft) return;
        if(timeLeft == 1){
            setTimeout(() => {setAnimateStart(false);            
            }, 1200);
            setTimeout(() => {setDisplayPicker(true); 
                       
            }, 1450);
            
            const lastInterval = setInterval(() => {
                clearInterval(lastInterval)
                }, 1000);


        }
    
        // save intervalId to clear the interval when the
        // component re-renders
        
        if(!timerPause) {
            const intervalId = setInterval(() => {
                setTimeLeft(timeLeft - 1);
                }, 1000);
                
                return () => {clearInterval(intervalId)};

        }
        if(timerPause) {
            setTimeout(() => {setAnimateStart(false);            
            }, 200);
        }
        if(!displayPicker) {
            setTimeout(() => {setAnimateStart(true);}, 200);

        }
    
        // clear interval on re-render to avoid memory leaks
        // add timeLeft as a dependency to re-rerun the effect
        // when we update it
    }, [timeLeft, displayPicker, timerPause]);

  return (
      <>
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
        <IonTitle>מתיחות וסיום</IonTitle>
        </IonCol>
    </IonRow>
    <IonRow className="center timerTitle">
    <IonCol>
        <h1>טיימר מתיחות</h1>
    </IonCol>
    </IonRow>
    <IonRow>
        <IonCol className="timerStyle">
            {
                displayPicker ? (
                    <>
                <IonDatetime className='pickerRighter'
                    displayFormat="mm:ss"
                    value={selectedDate}
                    onIonChange={(e) => setSelectedDate(e.detail.value!)}
                >
                </IonDatetime> 
                <IonRow>
                    <IonCol>
                        <IonButton size='large' color='light' fill="clear" onClick={handleTimerStart}><IonIcon className="logoTitle" icon={play}></IonIcon></IonButton>
                    </IonCol>
                </IonRow>
            </>
                ) :(
                    timeLeft < 10 ? (<><IonRow>
                        <IonCol>
                        <div className={!animateStart ? 'timeleftBefore':'timeleftBigger'}>00:0{timeLeft}</div>
                    </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol >
                        <IonButton size='large' color='light' fill="clear" onClick={handleTimerStop}><IonIcon className="logoTitle"  icon={stop}></IonIcon></IonButton>

                            
                            </IonCol>
                            {
                                timerPause ? (
<IonCol>
                            <IonButton size='large' color='light' fill="clear" onClick={() => {setTimerPause(false);}}><IonIcon className="logoTitle"  icon={play}></IonIcon></IonButton>
                            </IonCol>
                                ) :
                                (
                                    <IonCol>
                            <IonButton size='large' color='light' fill="clear" onClick={() => {setTimerPause(true)}}><IonIcon className="logoTitle"  icon={pause}></IonIcon></IonButton>
                            </IonCol>
                                )
                            }
                            </IonRow></>):
                    (                    <><IonRow>
                        <IonCol>
                        <div className={!animateStart ? 'timeleftBefore':'timeleftBigger'}>00:{timeLeft}</div>
                    </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>
                        <IonButton size='large' color='light' fill="clear" onClick={handleTimerStop}><IonIcon className="logoTitle"  icon={stop}></IonIcon></IonButton>

                            
                            </IonCol>
                            {
                                timerPause ? (
<IonCol>
                            <IonButton size='large' color='light' fill="clear" onClick={() => {setTimerPause(false);}}><IonIcon className="logoTitle"  icon={play}></IonIcon></IonButton>
                            </IonCol>
                                ) :
                                (
                                    <IonCol>
                            <IonButton size='large' color='light' fill="clear" onClick={() => {setTimerPause(true)}}><IonIcon className="logoTitle"  icon={pause}></IonIcon></IonButton>
                            </IonCol>
                                )
                            }
                            
                            </IonRow></>
                    )
                )
            }
                
        </IonCol>
    </IonRow>
    <IonRow className="warmuplowerNav">
        <IonCol>
        <IonRow>
                    <IonCol size="12">
                      <div className="headerBorder"></div>
                    </IonCol>
                  </IonRow>
    <IonRow>
        <IonCol className='center'>
        <IonButton color='light' fill='outline' onClick={() => {
           
           sendStageToParent("takepicture")
            }}>אחורה</IonButton>
        </IonCol>
        
        <IonCol className='center'>
        <IonButton color='light' fill='outline' onClick={() => {sendStageToParent("finish")}}>סיום האימון</IonButton>
        </IonCol>
    </IonRow>
        </IonCol>

    
    </IonRow>
    </CreateAnimation>
    </>
  );
};

CoolDown.defaultProps = defaultProps;

export default CoolDown; 
