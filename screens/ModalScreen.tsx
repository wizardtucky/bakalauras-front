import { Button, Switch } from 'react-native'
import { Text, View } from '../components/Themed'
import { useRootStore } from '../store'
import { createParkingItem, editParkingItem, getParkingItems } from '../lib/api'
import tw from '../lib/tailwind'
import MapView, { Marker } from 'react-native-maps'
import { useState } from 'react'

export default function ModalScreen({ route, navigation }) {
  const { type, item } = route.params

  const isEdit = type !== 'create'
  const latitude = isEdit ? item.latitude : route.params.latitude
  const longitude = isEdit ? item.longitude : route.params.longitude

  const [state, setState] = useState({
    isPaid: isEdit ? item.paidSpot : false,
    isRetarded: isEdit ? item.disabledSpot : false,
    isSmol: isEdit ? item.smallCarSpot : false,
  })

  const [rootState, setRootState] = useRootStore()

  const onSubmit = async () => {
    try {
      if (isEdit) {
        await editParkingItem({
          ...item,
          disabledSpot: state.isRetarded,
          smallCarSpot: state.isSmol,
          paidSpot: state.isPaid,
        })
      } else {
        await createParkingItem({
          id: 0,
          latitude,
          longitude,
          address: 'Vilnius',
          userId: rootState.user!.id,
          disabledSpot: state.isRetarded,
          smallCarSpot: state.isSmol,
          paidSpot: state.isPaid,
          creationTime: new Date().toISOString(),
        })
      }

      const items = await getParkingItems()
      setRootState({
        ...rootState,
        items,
      })
      navigation.goBack()
    } catch (err) {
      console.log('Failed to create parking spot', err)
    }
  }

  return (
    <View style={tw`flex`}>
      <MapView
        style={tw`w-full h-[120px]`}
        region={{
          latitude,
          longitude,
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
            latitude,
            longitude,
          }}
          // pinColor={m.userWhoReserved === 0 ? 'green' : 'red'}
        />
      </MapView>
      <Text>{isEdit && `Edit: ${item.address}`}</Text>
      <View style={tw`flex items-center py-[48] px-[24]`}>
        <Text style={tw`w-full`}>
          <Text>Is this a paid spot?</Text>
          <Switch
            style={tw`ml-[auto]`}
            value={state.isPaid}
            onValueChange={(e) => setState({ ...state, isPaid: e })}
          />
        </Text>

        <Text style={tw`w-full`}>
          <Text>Is this a disabled spot?</Text>
          <Switch
            style={tw`ml-[auto]`}
            value={state.isRetarded}
            onValueChange={(e) => setState({ ...state, isRetarded: e })}
          />
        </Text>

        <Text style={tw`w-full`}>
          <Text>Is this a spot for small cars?</Text>
          <Switch
            style={tw`ml-[auto]`}
            value={state.isSmol}
            onValueChange={(e) => setState({ ...state, isSmol: e })}
          />
        </Text>

        <Button
          title={type === 'create' ? 'Create parking spot' : 'Save'}
          onPress={onSubmit}
        />
      </View>
    </View>
  )
}
