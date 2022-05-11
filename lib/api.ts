const BASE_URL =
  'http://parkingapi-env.eba-hn86hsmh.us-east-1.elasticbeanstalk.com/'

const apiFetch = async <T>(path: string, options: any = {}, json = true) => {
	const response = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  })

	if (!response.ok) {
		throw new Error(`${response.status} ${response.statusText}`)
	}

	if (json) {
		return await response.json() as unknown as T 
	}

	return response.text() as unknown as T
}

export const login = async (email: string, password: string) => {
	const data = await apiFetch<{ user: { id: number, email: string } }>('session', {
		method: 'POST',
		body: JSON.stringify({
			email,
			password,
		}),
	})

	return data
}

export interface RegisterOptions {
	email: string
	password: string
	firstName: string
	lastName: string
	username: string
}

export interface RegisterResponse extends RegisterOptions {
	id: number
}

export const register = async (params: RegisterOptions) => {
  const data = await apiFetch<RegisterResponse>('users', {
    method: 'POST',
    body: JSON.stringify(params),
  })

  return data
}

export interface ParkingItem {
  id: number
  userId: number
  userWhoReserved: number
  paidSpot?: boolean
  disabledSpot?: boolean
  smallCarSpot?: boolean
  address: string
  latitude: number
  longitude: number
  creationTime: string
}

export const getParkingItems = async () => {
  const data = await apiFetch<ParkingItem[]>('parking')

  return data
}

export const createParkingItem = async (item: ParkingItem) => {
  const data = await apiFetch<ParkingItem[]>('parking', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })

  return data
}

export const editParkingItem = async (item: ParkingItem) => {
  const data = await apiFetch<ParkingItem[]>('parking', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(item),
  })

  return data
}

export const deleteParkingItem = async (id: number) => {
  const data = await apiFetch<ParkingItem[]>(`parking/${id}`, {
    method: 'DELETE',
  }, false)

  return data
}

export const reserveParkingItem = async (id: number, reservedUserId: number) => {
  const data = await apiFetch<ParkingItem[]>(
    `parking/${id}/${reservedUserId}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )

  return data
}