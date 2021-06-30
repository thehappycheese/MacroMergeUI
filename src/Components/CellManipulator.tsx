import { Checkbox, Select, TextField } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { ReactStateValueSetterPair } from "../type_utils";


export type cell_action_name = "join" | "merge"

	type CellManipulatorPropTypes = {
		primary: boolean,
		name: string,
		id: number,
		new_name: ReactStateValueSetterPair < string >,
		drop: ReactStateValueSetterPair < boolean >,
		action: ReactStateValueSetterPair < string >,
	}

export default function CellManipulator(props: CellManipulatorPropTypes) {


	return (
		<TableCell style={{padding:"0px"}}>
			<div style={{display:"flex"}}>
				<Checkbox checked={props.drop.value} onChange={(e)=>props.drop.set(e.target.checked)} />
				<TextField label={props.name} value={props.new_name.value} onChange={(e) => props.new_name.set(e.target.value)}/>
				{
					props.primary
					&&
					
						<Select
							value={props.action.value}
							onChange={(e) => props.action.set(e.target.value as string)}
						>
							<MenuItem value={"join"}>Join</MenuItem>
							<MenuItem value={"merge"}>Merge</MenuItem>
						</Select>
					
				}
			</div>
		</TableCell>
	);
}