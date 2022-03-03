// Ionic & system imports
import { useState } from 'react';
import { CreateAnimation, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonPage, IonRow, IonSlide, IonSlides, IonText } from '@ionic/react';

// UI logistics imports
import workout from '../images/workout.png';
import finish from '../images/finish.png';
import slide1 from '../images/slide1.png';
import slide2 from '../images/slide2.png';
import slide5 from '../images/slide5.png';
import slide3 from '../images/feed.png';
import slide4 from '../images/slide4.png';
import puncher from '../images/puncher.png';
import combination from '../images/combination.png';
import './TutorialStyle.css';
import { chevronForward } from 'ionicons/icons';

const Tutorial: React.FC = () => {
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    lazy: {
      loadPrevNext: true,
    }
    };
  const [back, setBack] = useState(false);
  const [fade, setFade] = useState(false);


  return (
    <IonPage>
      <CreateAnimation
    duration={300}
    iterations={1}
    fromTo={[
      { property: 'transform', fromValue: 'translateX(0px)', toValue: 'translateX(0px)' },
      { property: 'opacity', fromValue: '1', toValue: '0' }
    ]}
  play={back}>
        <IonButton className='backbutton' routerDirection="back" onClick={() => {setBack(true)}} routerLink="/workout" fill="clear">
                <IonIcon color="primary" slot="icon-only" icon={chevronForward} />
            </IonButton>
            </CreateAnimation>
      <IonContent fullscreen>
        <IonSlides  pager={true} options={slideOpts}>
          <IonSlide>
            <IonGrid>
              <IonRow>
              <CreateAnimation
    duration={300}
    iterations={1}
    fromTo={[
      { property: 'transform', fromValue: 'translateX(0px)', toValue: 'translateX(0px)' },
      { property: 'opacity', fromValue: '0', toValue: '1' }
    ]}
  play={fade}>
                <IonCol>
                
                  <IonImg className='takepictureimg' src={finish}></IonImg> 
                </IonCol>
                </CreateAnimation>
              </IonRow>
              <IonRow>
                <IonCol>
                <h1>המדריך לאימון בעזרת האפליקציה</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonText>להמשך נא להחליק ימינה</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
          <IonGrid>
              <IonRow>
              <CreateAnimation
    duration={300}
    iterations={1}
    fromTo={[
      { property: 'transform', fromValue: 'translateX(0px)', toValue: 'translateX(0px)' },
      { property: 'opacity', fromValue: '0', toValue: '1' }
    ]}
  play={true}>
                <IonCol>
                  <IonImg className='takepictureimg' src={workout}></IonImg>
                </IonCol>
                </CreateAnimation>
              </IonRow>
              <IonRow className='secondslideMargin'>
                <IonCol size="10" pull="1">
                <IonText>אנחנו כאן ללוות אותך לאורך האימון</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                  <h1>ולמצות אותו</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText>בואו נדבר על </IonText>
                <IonText className="feedbackBold">מטרה לאימון, כלים לשיפור העבודה ויצירת רוטינת צילום בשביל פידבק</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
          <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg className='takepictureimg' src={slide1}></IonImg>
                </IonCol>
              </IonRow>
              <IonRow className='secondslideMargin'>
                <IonCol size="10" pull="1">
                <IonText>מטרת האימון</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                  <h1>מטרה יוצרת מיקוד</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText>לאחר כתיבת המטרה, ניתן לחזור אחורה ולשנות אותו.</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
          <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg className='takepictureimg' src={slide2}></IonImg>
                </IonCol>
              </IonRow>
              <IonRow className='secondslideMargin'>
                <IonCol size="10" pull="1">
                <IonText>חימום</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                  <h1>חימום בונה אימון</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText>לרשותך טיימר אותו ניתן לכוון בהתאם לשימוש</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
          <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg className='takepictureimg' src={slide3}></IonImg>
                </IonCol>
              </IonRow>
              <IonRow className='secondslideMargin'>
                <IonCol size="10" pull="1">
                <IonText>חלק עיקרי</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                  <h1>הגיע הזמן לתרגל</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText>בחלק העיקרי יש שני כלים שעוזרים לך לתרגל לבד</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
          <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg className='takepictureimg' src={combination}></IonImg>
                </IonCol>
              </IonRow>
              <IonRow className='secondslideMargin'>
                <IonCol size="10" pull="1">
                <IonText>מייצר רצפים</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                  <h1>מחולל קומבינציות</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText className="feedbackBold">כאן ניתן להכניס רשימת מכות, ולהשתמש בכלי כדי ליצור רצף אקראי וחדש לעבוד איתו.</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText>אם נבחר להפוך את האימון לתבנית, המכות שהכנסנו יישמרו כחלק מהתבנית.</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText className="feedbackBold">בכל תבנית אימון ניתן לשמור עד 5 רצפים!</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
          <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg className='takepictureimg' src={puncher}></IonImg>
                </IonCol>
              </IonRow>
              <IonRow className='secondslideMargin'>
                <IonCol size="10" pull="1">
                <IonText>מזניק אקראי</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                  <h1>להפתיע את עצמך</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText>לפעמים קשה להפתיע את עצמנו כשאין מי שיזניק</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText className="feedbackBold">מערכת המזניק תיצור את גורם ההפתעה ותזניק אותך כשאינך מוכן.</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
          <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg className='takepictureimg' src={slide4}></IonImg>
                </IonCol>
              </IonRow>
              <IonRow className='secondslideMargin'>
                <IonCol size="10" pull="1">
                <IonText>זמן לפידבק</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                  <h1>פידבק זו דרך בטוחה להצלחה</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText>אנו נזכיר אחרי החלק העיקרי לעבור למצלמה בטלפון שלך ולעשות סרטון של ההתקדמות בטכניקה.</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText className="feedbackBold">הכוונה נכונה שווה זהב</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
          <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg className='takepictureimg' src={slide5}></IonImg>
                </IonCol>
              </IonRow>
              <IonRow className='secondslideMargin'>
                <IonCol size="10" pull="1">
                <IonText>מתיחות</IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                  <h1>מתיחות בסוף אימון</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                <IonText>בסוף, לפני שנשמור את האימון נעשה מתיחות ונשתחרר</IonText>
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
          <IonSlide>
          <IonGrid>
              <IonRow>
                <IonCol>
                  <IonImg className='takepictureimg' src={finish}></IonImg>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                  <h1>מוכנים?</h1>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol size="10" pull="1">
                  <IonButton expand='block' size='large' routerDirection="back" routerLink='/workout'>סיום</IonButton>
                  </IonCol>
              </IonRow>
            </IonGrid>
          </IonSlide>
      </IonSlides>
      </IonContent>
  </IonPage>
  );
};

export default Tutorial; 
