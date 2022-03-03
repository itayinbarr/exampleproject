// UI logistics imports
import { IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, 
  IonCol, IonGrid, IonIcon, IonRow, IonText } from '@ionic/react';
import { chevronBack } from 'ionicons/icons';

interface ContainerProps {
  trainNum: number;
  title: string;
  time: string;
  date:string
}

const TrainCard: React.FC<ContainerProps> = ({ trainNum, title, time, date }) => {
  return (
    <IonCard>
            <IonGrid>
<IonRow>

    <IonCardHeader>
      <IonCardSubtitle>אימון מספר {trainNum} </IonCardSubtitle>
      <IonCardTitle color="tertiary">{title}</IonCardTitle>
    </IonCardHeader>
    </IonRow>

        <IonRow>
          <IonCol className="ion-align-self-center" size="8" pull="1">
            <IonText color='primary'>{date}</IonText>
          </IonCol>
          <IonCol  size="3">
            <IonIcon size="large" icon={chevronBack} color="primary" />
          </IonCol>
        </IonRow>
</IonGrid>

  </IonCard>
  );
};

export default TrainCard;
