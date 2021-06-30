import { configureStore, ConfigureStoreOptions, createSlice, Reducer } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";


interface MergeAction_Simple{
	type:"first"|"last"|"maximum"|"minimum"|"sum"|"longest";
	
}
interface MergeAction_Percentile{
	type:"percentile";
	weighting:"count"|"length";
	percentile:number;
}
interface MergeAction_Average{
	type:"average";
	weighting:"count"|"length";
	add_multiple_of_standard_deviation?:number;
	cap_to_max?:boolean;
	output_standard_deviation?:string;
}

interface JoinAction{
	type:"join";
	target_column:number;
}

interface ColumnAction_Primary{
	keep:boolean;
	rename:string;
}

interface ColumnAction_Secondary{
	keep:boolean;
	rename:string;
	action?:MergeAction_Simple | MergeAction_Average | MergeAction_Percentile | JoinAction;
}

interface FileAction_Primary{
	file:File;
	column_names:string[];
	primary:true;
	column_actions:ColumnAction_Primary[]
}
interface FileAction_Secondary{
	file:File;
	column_names:string[];
	primary:false;
	column_actions:ColumnAction_Secondary[]
}



 export interface StateType {
 	current_step:number,
 	files:[FileAction_Primary,...FileAction_Secondary[]] | [],
 }




const storeSlice = createSlice({
	name:"all_state",
	initialState:{
		current_step:0,
		files:[]
	} as StateType,
	reducers:{
		next_step:(state)=>{
			state.current_step++;
		},
		prev_step:(state)=>{
			state.current_step--;
		}
	}
})


export const store = configureStore({
	reducer:storeSlice.reducer,
	devTools:true
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
