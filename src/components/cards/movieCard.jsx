import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../helpers/colors'
import { placeholderImage } from '../../helpers/images'

const MovieCard = ({item}) => {
  return (
    <View style={styles.movieItem}>
    <Image source={item.Poster !== 'N/A'?{ uri: item.Poster }:placeholderImage} style={styles.poster} resizeMode={item.Poster === 'N/A'&&'center'} />
    <View style={styles.movieDetails}>
              <Text style={styles.title}>{item.Title}</Text>
                  
                  <Text style={styles.year}>{item.Year}</Text>
     

    </View>
  </View>
  )
}

export default MovieCard

const styles = StyleSheet.create({
    movieItem: {
        flexDirection: 'row',
        marginBottom: 16,
        paddingBottom:10,
        borderBottomWidth: 1,
        borderBlockColor:colors.gray9E
      },
      poster: {
        width: 50,
          height: 75,
        borderRadius:8
      },
      movieDetails: {
        marginLeft: 16,
        justifyContent: 'space-evenly',
      },
      title: {
        fontSize: 16,
          fontWeight: 'bold',
        color:colors.darkText
      },
      year: {
        fontSize: 14,
        color: colors.gray62,
      },
})