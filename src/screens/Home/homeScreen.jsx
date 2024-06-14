import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, TextInput, StyleSheet, Image, ActivityIndicator } from 'react-native'
import { fetchMovies } from '../../service/omdbService';
import useMovies from '../../hooks/useMovies';
import MovieCard from '../../components/cards/movieCard';
import { colors } from '../../helpers/colors';
import SearchInput from '../../components/forms/searchInput';

const HomeScreen = () => {
    const { movies, loading, refreshing, hasMore, searchTerm, setSearchTerm, loadMoreMovies, refreshMovies } = useMovies();
  return (
      <View style={styles.container}>
          <View style={{ padding: 16}}>
              
    <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
          </View>
          <FlatList
              style={{paddingHorizontal:16}}
        data={movies}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }) => (
        <MovieCard item={item}/>
        )}
        onEndReached={loadMoreMovies}
        onEndReachedThreshold={0.5}
        ListFooterComponent={loading && <ActivityIndicator size="large" color={colors.blue} />}
        refreshing={refreshing}
        onRefresh={refreshMovies}
      />
  </View>
  )
}

export default HomeScreen
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.white
    },
    
   
  });