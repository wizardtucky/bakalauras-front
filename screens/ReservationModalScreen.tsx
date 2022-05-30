import { Button, Switch } from 'react-native'
import { Text, View } from '../components/Themed'
import { useRootStore } from '../store'
import { createParkingItem, editParkingItem, getParkingItems, reserveParkingItem } from '../lib/api'
import tw from '../lib/tailwind'
import MapView, { Marker } from 'react-native-maps'
import { useState } from 'react'
import { ParkingItem } from '../lib/api'
import moment from 'moment';

export default function ReservationModalScreen({ route, navigation }) {
  const { type, item } = route.params

  const [rootState, setRootState] = useRootStore()

  const onSubmit = async () => {
    try {
      await reserveParkingItem(item.id, rootState.user!.id)

      const items = await getParkingItems()
      setRootState({
        ...rootState,
        items,
      })
      navigation.goBack()
    } catch (err) {
      console.log('Failed to researve parking spot', err)
    }
  }

  const onUnReserve = async () => {
    try {
      0
      await reserveParkingItem(item.id, 0)

      const items = await getParkingItems()
      setRootState({
        ...rootState,
        items,
      })
      navigation.goBack()
    } catch (err) {
      console.log('Failed to researve parking spot', err)
    }
  }

  const isItemReserved = (): boolean => {
    return item.userWhoReserved !== 0
  }

  const isAdditionalInfoPanelVisible = (item: ParkingItem) => item.disabledSpot || item.smallCarSpot || item.paidSpot

  return (
    <View style={tw`flex`}>
      <MapView
        style={tw`w-full h-[120px]`}
        region={{
          latitude: item.latitude,
          longitude: item.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.01,
        }}
        pitchEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}
        scrollEnabled={false}
      >
        <Marker
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
          pinColor={item.userWhoReserved === 0 ? 'green' : 'red'}
        />
      </MapView>
      {/* <Text style={tw`tp-title-large`}>Reserve</Text> */}
      {(
              <View
                style={tw`flex bg-surface-1 tp-label-medium rounded-[12px] p-[16px] mt-[16px]`}
              >
                <Text style={tw`tp-title-medium mb-[16px]`}>
                  Parking info:
                </Text>
                {item.paidSpot && <Text>Paid spot</Text>}
                {item.smallCarSpot && <Text>Small car spot</Text>}
                {item.disabledSpot && <Text>Disabled people spot</Text>}
                {item.creationTime && <Text>{moment(item.creationTime).format('MMM DD, HH:mm:ss')}</Text>}
              </View>
            )}
      <View style={tw`flex items-center py-[48] px-[24]`}>
        {
          isItemReserved()
            ? (<Button disabled={rootState.user?.id !== item.userWhoReserved}
              title={'Cancel reservation'}
              onPress={onUnReserve}
            />)
            :
            (<Button disabled={isItemReserved()}
              title={'Reserve'}
              onPress={onSubmit}
            />)
        }
      </View>
    </View>
  )
}
