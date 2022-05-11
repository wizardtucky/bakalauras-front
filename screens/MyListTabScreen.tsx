import { useEffect, useMemo } from 'react'
import { StyleSheet, FlatList, Button } from 'react-native'
import MapView, { Marker } from 'react-native-maps'

import { Text, View } from '../components/Themed'
import { deleteParkingItem, getParkingItems, ParkingItem } from '../lib/api'
import tw from '../lib/tailwind'
import { useRootStore } from '../store'
import { format } from 'prettier'
import moment from 'moment';

export default function MyListTabScreen({ navigation }) {
  const [rootState, setRootState] = useRootStore()

  const refetchList = async () => {
    const items = await getParkingItems()
    setRootState({
      ...rootState,
      items,
    })
  }

  useEffect(() => {
    refetchList()
  }, [])

  const editItem = async (item: ParkingItem) => {
    navigation.navigate('Modal', {
      type: 'edit',
      item,
    })
  }

  const deleteItem = async (id: number) => {
    await deleteParkingItem(id)
    refetchList()
  }

  const filteredItems = useMemo(
    () => rootState.items.filter((item) => item.userId === rootState.user!.id),
    [rootState.items, rootState.user?.id],
  )

  const isAdditionalInfoPanelVisible = (item: ParkingItem) => item.disabledSpot || item.smallCarSpot || item.paidSpot

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <View
            style={tw`flex w-full tp-body-medium border-b border-secondary-container p-[16]`}
          >
            <Text style={tw`tp-title-medium`}>{item.address}</Text>
            <Text>Latitude: {item.latitude}</Text>
            <Text>Longitude: {item.longitude}</Text>

            {isAdditionalInfoPanelVisible(item) && (
              <View
                style={tw`flex bg-surface-1 tp-label-medium rounded-[12px] p-[16px] mt-[16px]`}
              >
                <Text style={tw`tp-title-medium mb-[16px]`}>
                  Additional info
                </Text>
                {item.paidSpot && <Text>Paid spot</Text>}
                {item.smallCarSpot && <Text>Small car spot</Text>}
                {item.disabledSpot && <Text>Disabled people spot</Text>}
                {item.creationTime && <Text>{moment(item.creationTime).format('MMM DD, HH:mm:ss')}</Text>}
              </View>
            )}

            <View
              style={tw`w-full h-[172px] my-[16px] rounded-[12px] overflow-hidden`}
            >
              <MapView
                style={tw`w-full h-full`}
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
            </View>
            <View style={tw`flex-row justify-between`}>
              <Button onPress={() => deleteItem(item.id)} title='Delete' />
              <Button onPress={() => editItem(item)} title='Edit' />
            </View>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
