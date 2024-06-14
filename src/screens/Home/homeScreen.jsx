import React from 'react'
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import useMovies from '../../hooks/useMovies';
import MovieCard from '../../components/cards/movieCard';
import { colors } from '../../helpers/colors';
import SearchInput from '../../components/forms/searchInput';
import { useNavigation } from '@react-navigation/native';
import { ROUTE_NAMES } from '../../helpers/routes';

const HomeScreen = () => {
    const navigation = useNavigation()
    const { movies, loading, refreshing, hasMore, searchTerm, setSearchTerm, loadMoreMovies, refreshMovies } = useMovies();
    return (
        <View style={styles.container}>
            <View style={{ padding: 16 }}>

                <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            </View>
            <FlatList
                style={{ paddingHorizontal: 16 }}
                data={movies}
                keyExtractor={(item) => item.imdbID}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <MovieCard item={item} onPress={() => navigation.navigate(ROUTE_NAMES.DETAILS, { id: item.imdbID })} />
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
        backgroundColor: colors.white
    },
});