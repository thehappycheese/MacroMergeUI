import React from 'react';

export type ReactStateSetter<T> = React.Dispatch<React.SetStateAction<T>>;
export type ReactStateValueSetterPair<T> = {
	value:T,
	set:ReactStateSetter<T>
}