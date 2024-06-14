import React from 'react'
import RootNavigation from './src/navigation/rootNavigation'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
    return (
        <SafeAreaProvider>
            <SafeAreaView style={{flex:1}}>
                
            <RootNavigation />
</SafeAreaView>
        </SafeAreaProvider>
  )
}

export default App