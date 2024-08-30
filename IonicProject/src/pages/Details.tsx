import { IonCard, IonCol, IonContent, IonGrid, IonHeader, IonImg, IonItem, IonLabel, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Pokemon from '../types/Pokemon';
 
const Details: React.FC = () => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const { index } = useParams<{ index: string }>();
 
  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const request = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${index}`);
        const response = await request.json();
        setPokemon(response);
      } catch (error) {
        console.log(error, 'Erreur lors de la récupération des données');
      }
    };
    fetchPokemon();
  }, [index]);
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Détails du Pokémon</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {pokemon ? (
          <IonGrid>
            <IonRow>
              <IonCol>
                <IonCard style={{ width: '25%', margin: 'auto', marginTop: '10px' }}>
                  <IonItem>
                    <IonImg src={pokemon.image} alt={`Image de ${pokemon.name}`} />
                  </IonItem>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonCard style={{ width: '50%', margin: 'auto', marginTop: '5px', textAlign: 'center' }}>
                  <IonItem>
                    <IonLabel>
                      <h1 style={{textAlign: 'center'}}>{pokemon.name}</h1>
                      <IonRow>
                        <IonCol style={{textAlign: 'center'}}>
                          <p>{pokemon.apiTypes[0].name}</p>
                          <IonImg src={pokemon.apiTypes[0].image} style={{width: '10%', height: 'auto', margin: 'auto'}}></IonImg>
                        </IonCol>
                        {pokemon.apiTypes[1] && (
                          <IonCol style={{textAlign: 'center'}}>
                            <p>{pokemon.apiTypes[1].name}</p>
                            <IonImg src={pokemon.apiTypes[1].image} style={{width: '10%', height: 'auto', margin: 'auto'}}></IonImg>
                          </IonCol>
                        )}
                      </IonRow>
                      <IonRow style={{textAlign: 'center', marginBottom: '20px'}}>
                        <IonCol>HP : {pokemon.stats.HP}</IonCol>
                        <IonCol>ATTACK : {pokemon.stats.attack}</IonCol>
                        <IonCol>DEFENSE : {pokemon.stats.defense}</IonCol>
                      </IonRow>
                      <IonRow style={{textAlign: 'center'}}>
                        <IonCol>SPECIAL ATTACK : {pokemon.stats.special_attack}</IonCol>
                          <IonCol>SPECIAL DEFENSE : {pokemon.stats.special_defense}</IonCol>
                          <IonCol>SPEED : {pokemon.stats.speed}</IonCol>
                      </IonRow>
                    </IonLabel>
                  </IonItem>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        ) : (
          <p>Chargement...</p>
        )}
      </IonContent>
    </IonPage>
  );
};
 
export default Details;