import { configureStore,createAsyncThunk,createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import get_csv_sample from "./processing";


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
	column_actions:ColumnAction[];
	status:string;
}

export interface StateType {
	current_step:number,
	files:FileAction[],
}

export const fetch_column_details_from_csv = createAsyncThunk<FileAction, {file:File,index:number}, {}>(
	"fetch_column_details_from_csv",
	async ({file, index}, thunkAPI) => {

		let sample = undefined;
		try{
			sample = await get_csv_sample(file)
		}catch(e){
			console.log(`Failed to retrieve column names for file ${file.name}`)
		}
		
		return {
			file:{
				name:file.name,
				size:file.size,
				id:index
			},
			column_actions:(sample)?sample[0].map(item=>({name:item.toString()})):[],
			status:"ok"
		}
	}
);

export const fetch_column_details_from_csvs = createAsyncThunk<FileAction[], File[], {}>(
	"fetch_column_details_from_csvs",
	async (files:File[], thunkAPI) => {
		
		// A particularly delicious async call will wait until we got the columns from all csv inputs:
		let samples = await Promise.all(
			files.map(file=>get_csv_sample(file))
		);

		return files.map((item, index) => ({
				file:{
					name: item.name,
					size: item.size,
					id:   index
				},
				column_actions:(samples[index])?(samples[index] as (string|number)[][])[0].map(item=>({name:item.toString()})):[]
			})
		);
	}
);

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

		move_file_to_top:(state, action:PayloadAction<number>)=>{
				let new_file_list = [...state.files];
				let [primary_file] = new_file_list.splice(action.payload, 1);
				state.files = [primary_file, ...new_file_list];
		},

		set_column_drop:(state, action:PayloadAction<{row_index:number, column_index:number, drop:boolean}>)=>{
			let file = state.files[action.payload.column_index];
			if (file.column_actions)
				file.column_actions[action.payload.row_index].drop=action.payload.drop;
		},

		set_column_rename:(state, action:PayloadAction<{row_index:number, column_index:number, rename:string}>)=>{
			let file = state.files[action.payload.column_index];
			if (file.column_actions)
				file.column_actions[action.payload.row_index].rename=action.payload.rename;
		},
		add_blank_file:(state,action:PayloadAction<{file:File, index:number}>)=>{
			state.files[action.payload.index] = {
				file:{
					name: action.payload.file.name,
					size: action.payload.file.size,
					id:   action.payload.index
				},
				column_actions:[],
				status:"waiting"
			}
		}

	},
	extraReducers: (builder) => {
		builder.addCase(fetch_column_details_from_csvs.fulfilled, (state, action) => {
			state.files = action.payload;
		})
		builder.addCase(fetch_column_details_from_csvs.rejected, (state, action) => {
			state.files = [];
		})
	},
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
