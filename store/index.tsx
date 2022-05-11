import { createContext, useContext, useState, Dispatch, SetStateAction } from 'react'
import { ParkingItem } from '../lib/api'

export interface RootState {
  user?: {
		id: number
		email: string
	},
	items: ParkingItem[],
}

export type RootStoreValue = readonly [RootState, Dispatch<SetStateAction<RootState>>]

const StoreContext = createContext<RootStoreValue>(undefined as unknown as RootStoreValue)

export const useRootStore = () => useContext(StoreContext)

export const StoreProvider = (props: { children: any }) => {
	const [state, setState] = useState<RootState>({
		user: undefined,
		items: [],
	})

	return (
    <StoreContext.Provider value={[state, setState]}>
      {props.children}
    </StoreContext.Provider>
  )
}