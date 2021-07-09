import { Checkbox, Select, TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { useAppSelector, root_actions, useAppDispatch } from "../store";




type CellManipulatorPropTypes = {
	column_index:number,
	row_index:number
}

export default function CellManipulator({column_index, row_index}:CellManipulatorPropTypes) {

	let column_action = useAppSelector(store=>store.files[column_index].column_actions[row_index])
	let dispatch = useAppDispatch();
	
	return (
		<TableCell style={{padding:"0px"}}>
			<div style={{display:"flex"}}>
				<Checkbox checked={!column_action.drop} onChange={(e)=>dispatch(root_actions.set_column_drop({row_index, column_index, drop:!e.target.checked}))} />
				<TextField 
					disabled={column_action.drop ?? false}
					label={column_action.name} value={column_action.rename || ""}
					onChange={(e) => dispatch(
						root_actions.set_column_rename({row_index, column_index, rename:e.target.value})
					)}
				/>
				{
					column_index!==0
					&&
					<Select
						disabled={column_action.drop}
						onChange={()=>{}}
						value="aggregate"
					>
						<MenuItem>Join</MenuItem>
						<MenuItem>Intersect Interval</MenuItem>
						<MenuItem>Aggregate</MenuItem>
					</Select>
				}
			</div>
		</TableCell>
	);
}