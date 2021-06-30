import React, { useState } from 'react';

export type ReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type ReactStateValueSetterPair<T> = {
	value:T,
	set:ReactStateSetter<T>
}

export function useReactStateValueSetterPair<T>(initial_state:T): ReactStateValueSetterPair<T> {
	let [value, set] = useState(initial_state);
	return {value, set}
}