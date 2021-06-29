import { CardActions, Checkbox, Select } from "@material-ui/core";
import { MenuItem } from "@material-ui/core";
import { TableCell } from "@material-ui/core";
import { type } from "os";
import React from "react";
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
		<TableCell>
			<div><Checkbox checked={props.drop.value} onChange={(e)=>props.drop.set(e.target.value)} />{props.name}</div>
			<input type="text" value={props.new_name.value} onChange={(e) => props.new_name.set(e.target.value || props.name)} />
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

		</TableCell>
	);
}