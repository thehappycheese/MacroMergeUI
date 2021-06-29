import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button'
import {  useEffect, useState } from 'react';
import { zip_undefined } from '../iter';
import get_column_names from '../processing'
import CellManipulator from './CellManipulator';



export default function JoinAndOverlapTab(props:{
	file_list:File[],
	primary_file:number
}){
	let [column_names, set_column_names] = useState<string[][]>([])

	useEffect(()=>{
			const get_columns = async () => {
				let result:string[][] = [];
				for await (let item of props.file_list){
					let col_names = await get_column_names(item)
					result.push(col_names as string[])
				}
				set_column_names(result)
			}
			get_columns();
		},
		[props.file_list]
	);

	return (
		<div className="App-Tab">
			{column_names.length>0 &&
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow>
								{
									props.file_list
									.map(item =>
										<TableCell>{item.name}</TableCell>
									)
								}
							</TableRow>
						</TableHead>
						<TableBody>
						{[...zip_undefined(column_names)].map((column_names, row_index) => (
							//todo fix key as index here
							<TableRow key={row_index}> 
								{column_names.map((column_name, column_index)=>
									column_name
									?
									<CellManipulator 
										id={row_index}
										primary={column_index===1}
										name={column_name}
										new_name={{value:column_name, set:()=>{}}}
										drop={{value:true, set:()=>{}}}
										action={{value:"merge", set:()=>{}}}
									/>
									:
									<TableCell></TableCell>
								)}
							</TableRow> 
						))}
						</TableBody>
					</Table>
				</TableContainer>
			}
		</div>
	);
}