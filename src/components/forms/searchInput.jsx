import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { colors } from '../../helpers/colors'

const SearchInput = ({searchTerm,setSearchTerm,placeholder}) => {
  return (
 <TextInput
        style={styles.searchInput}
        placeholder={placeholder}
        value={searchTerm}
        onChangeText={setSearchTerm}
      />
  )
}

export default SearchInput

const styles = StyleSheet.create({
    searchInput: {
        height: 40,
        borderColor: colors.gray62,
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius:8
      },
})