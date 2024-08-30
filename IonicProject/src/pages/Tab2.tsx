import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  SelectChangeEventDetail,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { IonSelectCustomEvent } from '@ionic/core';
import Pokemon from '../types/Pokemon';
import './Tab2.css';

const Tab2: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const ITEMS_PER_PAGE = 12;

  const handleSelectHouse = (e: IonSelectCustomEvent<SelectChangeEventDetail>) => {
    const filter = e.detail.value;
    setSelectedFilter(filter);

    const newFilteredPokemons = pokemons.filter((element: Pokemon) => {
      if (filter === 'All') {
        return true;
      } else if (element.apiTypes.some(type => type.name.toLowerCase() === filter.toLowerCase())) {
        return true;
      }
      return false;
    });

    setFilteredPokemons(newFilteredPokemons);
    setCurrentPage(0);
  };

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const request = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
        const response = await request.json();
        setPokemons(response);
        setFilteredPokemons(response);
        setLoading(false);
      } catch (error) {
        console.log('Erreur lors de la récupération des données', error);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, []);

  const uniqueTypes = Array.from(
    new Set(
      pokemons.flatMap((pokemon: Pokemon) => pokemon.apiTypes.map(type => type.name))
    )
  );

  const startIndex = currentPage * ITEMS_PER_PAGE;
  const paginatedPokemons = filteredPokemons.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if ((currentPage + 1) * ITEMS_PER_PAGE < filteredPokemons.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle slot="start">POKEMON FAMILY</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonSelect
            value={selectedFilter}
            onIonChange={handleSelectHouse}
          >
            <div slot="label">Select a type</div>
            <IonSelectOption value="All">All Types</IonSelectOption>
            {uniqueTypes.map((type, index) => (
              <IonSelectOption key={index} value={type.toLowerCase()}>
                {type}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonGrid>
          {paginatedPokemons.map((pokemon, index) => (
            index % 3 === 0 && (
              <IonRow key={index}>
                {paginatedPokemons.slice(index, index + 3).map((p, i) => (
                  <IonCol key={i} size="4">
                    <IonCard>
                      <IonImg src={p.image} style={{ width: '80%', height: 'auto', margin: 'auto' }} />
                      <IonCardHeader>
                        <IonCardTitle style={{ textAlign: 'center' }}>{p.name}</IonCardTitle>
                      </IonCardHeader>
                      <IonCardContent>
                        <IonRow>
                          {p.apiTypes.map((type, typeIndex) => (
                            <IonCol key={typeIndex} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: 'auto' }}>
                              <h6>{type.name}</h6>
                              <IonImg src={type.image} style={{ width: '30%' }} />
                            </IonCol>
                          ))}
                        </IonRow>
                      </IonCardContent>
                      <IonRow style={{ marginBottom: '10px', padding: '0 16px' }}>
                        <IonButton expand="block" style={{ width: '100%' }} routerLink={`/details/${p.id}`}>Voir plus</IonButton>
                      </IonRow>
                    </IonCard>
                  </IonCol>
                ))}
              </IonRow>
            )
          ))}
        </IonGrid>

        <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px' }}>
          <IonButton onClick={handlePreviousPage} disabled={currentPage === 0}>
            Précédent
          </IonButton>
          <IonButton onClick={handleNextPage} disabled={(currentPage + 1) * ITEMS_PER_PAGE >= filteredPokemons.length}>
            Suivant
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
