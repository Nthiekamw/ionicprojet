import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonImg,
  IonItem,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  SelectChangeEventDetail,
} from '@ionic/react';
import { IonSelectCustomEvent } from '@ionic/core';
import { useCallback, useEffect, useState } from 'react';
import Movie from '../types/Movie';
import './Tab3.css';
 
const Tab3: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  // Effect pour récupérer les films
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`http://movies-api.julienpoirier-webdev.com/search/movies/${searchQuery}`);
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results); // Initialement, aucun filtre n'est appliqué
      } catch (error) {
        console.log(error, 'Erreur lors de la récupération des données');
      }
    };
 
    fetchMovies();
  }, [searchQuery]);
 
  // Effect pour appliquer le filtre après la récupération des films et genres
  useEffect(() => {
    const newFilteredMovies = movies.filter((movie: Movie) => {
      if (selectedFilter === 'All') {
        return true;
      } else {
        // Check if any genre matches the selected filter
        return movie.genres.some(genre => genre.name.toLowerCase() === selectedFilter.toLowerCase());
      }
    });
 
    setFilteredMovies(newFilteredMovies);
  }, [selectedFilter, movies]);
 
  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
<<<<<<< Updated upstream
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" />
=======
          <IonTitle slot='start'>Movies</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonItem>
          <IonSelect
            value={selectedFilter}
            onIonChange={(e: IonSelectCustomEvent<SelectChangeEventDetail>) => setSelectedFilter(e.detail.value)}
          >
            <IonSelectOption value='All'>All Categories</IonSelectOption>
            {genres.map((genre) => (
              <IonSelectOption key={genre.id} value={genre.name.toLowerCase()}>
                {genre.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        <IonSearchbar
          value={searchQuery}
          onIonInput={e => setSearchQuery(e.detail.value!)}
          placeholder='Search for a movie'
        />
        <IonGrid>
          <IonRow>
            {filteredMovies.map((movie, index) => (
              <IonCol key={index} size="12" size-md="6">
                <IonCard>
                  <IonImg
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    style={{ height: '400px', objectFit: 'cover' }}
                  />
                  <IonCardHeader>
                    <IonCardTitle>{movie.title}</IonCardTitle>
                    <IonCardSubtitle>{movie.release_date}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>{movie.overview.length > 100 ? `${movie.overview.substring(0, 100)}...` : movie.overview}</p>
                  </IonCardContent>
                </IonCard>
                <IonButton expand="block" style={{width: '100%'}} routerLink={`/detailsmovie/${movie?.id}`}>Voir plus</IonButton>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
>>>>>>> Stashed changes
      </IonContent>
    </IonPage>
  );
};
 
export default Tab3;