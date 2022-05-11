import { Button, TextInput } from 'react-native'
import { useForm, Controller } from 'react-hook-form'
import tw from '../lib/tailwind'
import { register, RegisterOptions } from '../lib/api'
import { Text, View } from '../components/Themed'
import { useRootStore } from '../store'

export default function RegisterScreen({ navigation }) {
  const [rootState, setRootState] = useRootStore()
  const {
     control,
     handleSubmit,
   } = useForm({
      defaultValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
    })
  
  const onSubmit = async (data: RegisterOptions) => {
    try {
      const response = await register({
        ...data,
        username: 'Du',
      })

      setRootState({
        ...rootState,
        user: {
          id: response.id,
          email: response.email,
        },
      })
    } catch(err) {
      console.log('Incorrect email or password', err)
    }
  }

  return (
    <View style={tw`flex items-center py-[48] px-[24]`}>
      <Text style={tw`tp-headline-medium mb-[50]`}>Register</Text>

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tw`w-full h-[12] my-[16] px-[12] border border-outline`}
            placeholder='firstName'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='firstName'
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tw`w-full h-[12] my-[16] px-[12] border border-outline`}
            placeholder='lastName'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='lastName'
      />

      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            style={tw`w-full h-[12] my-[16] px-[12] border border-outline`}
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
            style={tw`w-full h-[12] my-[16] px-[12] border border-outline`}
            placeholder='Password'
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name='password'
      />

      <Button title='Register' onPress={handleSubmit(onSubmit)} />
      <Text>Already have an account?</Text>
      <Button title='Login' onPress={() => navigation.navigate('Auth')} />
    </View>
  )
}
