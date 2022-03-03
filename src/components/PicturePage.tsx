
// Ionic & system imports
import { CreateAnimation, IonButton, IonCol, IonImg, IonRow, IonText } from '@ionic/react';
import { useEffect, useState } from 'react';

// UI logistics imports
import './WorkoutStyle.css';
import takepicture from '../images/takepicture.png';

interface ContainerProps {
  sendStageToParent: (message:string) => void,
}


const defaultProps: ContainerProps = {
  sendStageToParent: (message:string) => {},
}

const PicturePage: React.FC<ContainerProps> = ({ sendStageToParent }) => {
    const [showTimer, setShowTimer] = useState(false);
    const [selectedDate, setSelectedDate] = useState<string>('00:00:30');
    const [displayPicker, setDisplayPicker] = useState(true);
    const [timeLeft, setTimeLeft] = useState(0);

    function handleTimerStop() {
    setDisplayPicker(true);
    setTimeLeft(0)
    }
    function handleTimerStart () {
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
    <IonRow className="center pictureTitle">
    <IonCol>
        <h1>זמן לפידבק</h1>
    </IonCol>
    </IonRow>
    <IonRow>
        <IonCol size="10" pull="1" className='center'>
            <IonText>
                הדרך הכי מהירה להשתפר היא 
            </IonText>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol size="10" pull="1" className='center'>
            <IonText className="bestWay">בעזרת אחרים</IonText>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol size="10" pull="1" className='center'>
            <IonText>
                זה הרגע לעצור לפני המתיחות ולצלם את תוצאות העבודה של היום.
            </IonText>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol>
            <IonImg className='takepictureimg' src={takepicture}></IonImg>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol size="10" pull="1" className='center'>
            <IonText className='afterClass'>
                לאחר האימון, המאמן/חברים יוכלו לראות את העבודה שלך ולעזור לך להשתפר.
            </IonText>
        </IonCol>
    </IonRow>
    <IonRow>
        <IonCol className='center'>
            <IonText>
                בסיום הקלטת הסרטון, חזרו לכאן והמשיכו. 
            </IonText>
        </IonCol>
    </IonRow>
    <IonRow className='lowerMarginer'>

    </IonRow>
    <IonRow className="picturelowerNav">
        <IonCol>
        <IonRow>
                    <IonCol size="12">
                      <div className="headerBorder"></div>
                    </IonCol>
                  </IonRow>
    <IonRow>
        <IonCol className='center'>
        <IonButton color='light' fill='outline' onClick={() => {
           
           sendStageToParent("mainpart")
            }}>אחורה</IonButton>
        </IonCol>
        
        <IonCol className='center'>
        <IonButton color='light' fill='outline' onClick={() => {sendStageToParent("cooldown")}}>הבא</IonButton>
        </IonCol>
    </IonRow>
        </IonCol>

    
    </IonRow>

    </CreateAnimation>
    </>
  );
};

PicturePage.defaultProps = defaultProps;

export default PicturePage; 
