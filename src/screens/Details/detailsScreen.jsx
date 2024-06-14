import { View, Text, ActivityIndicator, ScrollView, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { fetchMovieDetails } from '../../service/omdbService'
import { colors } from '../../helpers/colors'
import BackButton from '../../components/buttons/backButton'
import { placeholderImage } from '../../helpers/images'

const DetailsScreen = () => {
    const navigation = useNavigation()
    const { params } = useRoute()
    const [movieDetails, setMovieDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const details = await fetchMovieDetails(params.id);
        setMovieDetails(details);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    getMovieDetails();
  }, [params.id]);
  if (loading) {
    return <ActivityIndicator size="large" color={colors.blue} />;
  }

  if (!movieDetails) {
    return (
      <View style={styles.container}>
        <Text>Movie details not found</Text>
      </View>
    );
  }
  return (
      <View style={styles.container}>
          <View style={{marginTop:20}}>
          <BackButton onPress={()=>navigation.goBack()}/>
          </View>
          <ScrollView contentContainerStyle={{paddingBottom:10}} showsVerticalScrollIndicator={false}>
              
             <Image source={movieDetails.Poster !== 'N/A'?{ uri: movieDetails.Poster }:placeholderImage} style={styles.poster} resizeMode={movieDetails.Poster === 'N/A'&&'center'} />
          <Text style={styles.title}>{movieDetails.Title}</Text>
          <Text style={styles.year}>({movieDetails.Year})</Text>
          <Text style={styles.director}>Directed by: {movieDetails.Director}</Text>
          <Text style={styles.actors}>Actors: {movieDetails.Actors}</Text>
          <Text style={styles.plot}>{movieDetails.Plot}</Text>
          <Text style={styles.boxOffice}>Box Office: {movieDetails.BoxOffice}</Text>
          <Text style={styles.awards}>Awards: {movieDetails.Awards}</Text>
          <Text style={styles.ratingsHeader}>Ratings:</Text>
          {movieDetails.Ratings.map((rating, index) => (
            <Text key={index} style={styles.rating}>
              {rating.Source}: {rating.Value}
            </Text>
          ))}
          </ScrollView>
              
        </View>
  )
}

export default DetailsScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
        paddingHorizontal: 16,
        backgroundColor: colors.white,
      
    },
    poster: {
      width: '100%',
      height: 300,
      resizeMode: 'contain',
      marginVertical: 16,
    },
    title: {
      fontSize: 24,
        fontWeight: 'bold',
      color:colors.darkText
    },
    year: {
      fontSize: 18,
      color: 'gray',
      marginBottom: 8,
    },
    director: {
      fontSize: 16,
      marginBottom: 8,
    },
    actors: {
      fontSize: 16,
      marginBottom: 8,
    },
    plot: {
      fontSize: 16,
      marginBottom: 16,
    },
    boxOffice: {
      fontSize: 16,
      marginBottom: 8,
    },
    awards: {
      fontSize: 16,
      marginBottom: 8,
    },
    ratingsHeader: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    rating: {
      fontSize: 16,
      marginBottom: 4,
    },
  });