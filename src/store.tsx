import { PlaylistAddOutlined } from "@material-ui/icons";
import { configureStore,createSlice, PayloadAction } from "@reduxjs/toolkit";
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


export interface ColumnAction{
	name:string;
	drop?:boolean;
	rename?:string;
	action?:MergeAction_Simple | MergeAction_Average | MergeAction_Percentile | JoinAction;
}

/**
 * Points to a file waiting an a FileList of an <input type="file"/>
 */
export interface FilePointer{
	name:string,
	size:number,
	id:number
}

export interface FileAction{
	file:FilePointer;
	column_actions:ColumnAction[]
}

export interface StateType {
	current_step:number,
	files:FileAction[],
}


const RootSlice = createSlice({

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
		},

		set_file_list:(state, action:PayloadAction<{name:string,size:number,id:number}[]>)=>{
			state.files = action.payload.map((item, index)=>(
				{
					file:item,
					column_actions:[]
				}
			))
		},
		initialize_column_actions:(state, action)=>{},

		move_file_to_top:{
			prepare:(index:number)=>({type:"MOVE_FILE_TO_TOP", payload:index}),
			reducer:(state, action:PayloadAction<number>)=>{
				let new_file_list = [...state.files];
				let [primary_file] = new_file_list.splice(action.payload, 1);
				state.files = [primary_file, ...new_file_list];
			}
		},

		set_column_drop:{
			prepare:(row_index:number, column_index:number, drop:boolean)=>({type:"COLUMN_ACTION_SET_DROP", payload:{row_index, column_index, drop}}),
			reducer:(state, action:PayloadAction<{row_index:number, column_index:number, drop:boolean}>)=>{
				state.files[action.payload.column_index].column_actions[action.payload.row_index].drop=action.payload.drop;
			}
		},
		set_column_rename:{
			prepare:(row_index:number, column_index:number, name:string)=>({type:"COLUMN_ACTION_SET_NAME", payload:{row_index, column_index, name}}),
			reducer:(state, action:PayloadAction<{row_index:number, column_index:number, name:string}>)=>{
				state.files[action.payload.column_index].column_actions[action.payload.row_index].name=action.payload.name;
			}
		},
	}
});

export const store = configureStore({
	reducer:RootSlice.reducer,
	devTools:true
});

export const root_actions = RootSlice.actions;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
