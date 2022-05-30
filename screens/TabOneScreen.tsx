import { Button } from 'react-native'
import MapView, { MapEvent, Marker } from 'react-native-maps'
import tw from '../lib/tailwind'
import { Text, View } from '../components/Themed'
import { RootTabScreenProps } from '../types'
import { useRootStore } from '../store'
import { createParkingItem, getParkingItems } from '../lib/api'
import { useEffect } from 'react'

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<'ParkingMap'>) {
  const [rootState, setRootState] = useRootStore()

  useEffect(() => {
    getParkingItems().then((items) => {
      setRootState({
        ...rootState,
        items,
      })
      console.log(items)
    })
  }, [])

  const onLongPress = async (e: MapEvent) => {
    const cord = e.nativeEvent.coordinate

    navigation.navigate('Modal', {
      type: 'create',
      latitude: cord.latitude,
      longitude: cord.longitude,
    })
  }

  return (
    <View style={tw`bg-primary flex flex-1 items-center content-center flex`}>
      <MapView
        style={tw`w-full h-full`}
        onLongPress={onLongPress}
        // initialRegion={{
        //   latitude: 40.665364,
        //   longitude: -74.213377,
        //   latitudeDelta: 0.0043,
        //   longitudeDelta: 0.0034,
        // }}
      >
        {rootState.items.map((m, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: m.latitude, longitude: m.longitude }}
            pinColor={m.userWhoReserved === 0 ? 'green' : 'red'}
            onPress={() => {
              navigation.navigate('Reservation', {
                item: m,
              })
            }}
          >
            {/* <MyCustomMarkerView {...marker} /> */}
          </Marker>
        ))}
      </MapView>
    </View>
  )
}
