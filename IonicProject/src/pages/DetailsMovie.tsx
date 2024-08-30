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
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import Movie from '../types/Movie';

const DetailsMovie: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const request = await fetch(`http://movies-api.julienpoirier-webdev.com/infos/movies/${id}`);
        const data = await request.json();
        setMovie(data);
      } catch (error) {
        console.log('Erreur lors de la récupération des données', error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const goBack = () => {
    history.push('/tab3');
  };

  return (
    <IonPage>
      <IonHeader translucent={true}>
        <IonToolbar>
          <IonTitle slot='start'>Détails du Film</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent
        style={{
          backgroundImage: movie ? `url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <IonGrid style={{width: '80%'}}>
          <IonRow>
            <IonCol size="12">
              {movie ? (
                <IonCard style={{ background: 'rgba(255, 255, 255, 0.8)' }}>
                  <IonImg
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt={movie.title}
                    style={{ height: '500px', objectFit: 'cover' }}
                  />
                  <IonCardHeader>
                    <IonCardTitle>{movie.title}</IonCardTitle>
                    <IonCardSubtitle>{new Date(movie.release_date).toLocaleDateString()}</IonCardSubtitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p><strong>Nom original :</strong> {movie.original_title}</p>
                    <p><strong>Tagline :</strong> {movie.tagline}</p>
                    <p><strong>Durée :</strong> {movie.runtime} minutes</p>
                    <p><strong>Synopsis :</strong> {movie.overview}</p>
                    <p><strong>Genres :</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Pays de production :</strong> {movie.production_countries.map(country => country.name).join(', ')}</p>
                    <p><strong>Langues parlées :</strong> {movie.spoken_languages.map(language => language.name).join(', ')}</p>
                    <p><strong>Budget :</strong> ${movie.budget.toLocaleString()}</p>
                    {movie.belongs_to_collection && (
                      <p><strong>Collection :</strong> {movie.belongs_to_collection.name}</p>
                    )}
                  </IonCardContent>
                </IonCard>
              ) : (
                <p>Chargement...</p>
              )}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol size="12" className="ion-text-center">
              <IonButton onClick={goBack} color="primary">
                Retour à la liste des films
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default DetailsMovie;