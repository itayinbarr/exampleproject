// Ionic & system imports
import { IonCard, IonCardHeader, IonCardSubtitle, 
  IonCardTitle, IonCol, IonGrid, IonIcon, IonRow } from '@ionic/react';

// UI logistics imports
import { chevronBack } from 'ionicons/icons';

interface ContainerProps {
  trainNum: number;
  title: string;
  time: string;
  date:string
}

const TemplateCard: React.FC<ContainerProps> = ({ trainNum, title, time, date }) => {
  return (
    <IonCard>
            <IonGrid>
              <IonRow>
                <IonCol size="10">

                

<IonRow>

    <IonCardHeader>
      <IonCardSubtitle>תבנית מספר {trainNum} </IonCardSubtitle>
      <IonCardTitle color="tertiary">{title}</IonCardTitle>
    </IonCardHeader>
    </IonRow>
        </IonCol>
        <IonCol size="1" className="ion-align-self-center">
          <IonIcon size="large" icon={chevronBack} color="primary" />
        </IonCol>
        </IonRow>

</IonGrid>

  </IonCard>
  );
};

export default TemplateCard;
