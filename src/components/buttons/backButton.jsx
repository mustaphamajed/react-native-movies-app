import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { arrowBack } from '../../helpers/images'
import { colors } from '../../helpers/colors'

const BackButton = ({onPress}) => {
  return (
    <Pressable onPress={onPress}>
          <Image source={arrowBack} style={{width:20,height:20 ,backgroundColor:colors.white} } resizeMode='contain'/>
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({})