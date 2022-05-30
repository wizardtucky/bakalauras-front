import { Button, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import tw from '../lib/tailwind'
import { login } from '../lib/api'

import { Text, View } from '../components/Themed'
import { useRootStore } from '../store'

export default function AuthScreen({ navigation }) {
  const [rootState, setRootState] = useRootStore()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      const response = await login(data.email, data.password)
      setRootState({
        ...rootState,
        user: response.user,
      })
    } catch (err) {
      alert("Incorrect email or password")
      console.log('Incorrect email or password', err)
    }
  }

  return (
    <View style={tw`flex items-center py-[48] px-[24]`}>
      <Text style={tw`tp-headline-medium mb-[50]`}>Login</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tw`w-full h-[12] px-[12] border border-outline`}
            placeholder='Email'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='email'
      />

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tw`w-full my-[16] h-[12] px-[12] border border-outline`}
            placeholder='Password'
            
            secureTextEntry={true}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='password'
      />

      <Button title='Login' onPress={handleSubmit(onSubmit)} />
      <Text>Don't have an account?</Text>
      <Button title='Register' onPress={() => navigation.navigate('Register')} />
    </View>
  )
}
