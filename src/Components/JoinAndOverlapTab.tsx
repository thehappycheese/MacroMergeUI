import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import {  useEffect, useState } from 'react';
import { zip_undefined } from '../iter';
import get_column_names from '../processing'
import { ReactStateValueSetterPair } from '../type_utils';
import CellManipulator from './CellManipulator';
import "./JoinAndOverlapTab.css";


type JoinAndOverlapTabPropTypes = {
	file_list: ReactStateValueSetterPair<File[]>;
};

export default function JoinAndOverlapTab({file_list}:JoinAndOverlapTabPropTypes){
	let [column_names, set_column_names] = useState<string[][]>([])

	useEffect(()=>{
			const get_columns = async () => {
				let result:string[][] = [];
				for await (let item of file_list.value){
					let col_names = await get_column_names(item)
					result.push(col_names as string[])
				}
				set_column_names(result)
			}
			get_columns();
		},
		[file_list.value]
	);

	return (
		<div className="App-Tab">
			{column_names.length>0 &&
				<TableContainer component={Paper}>
					<Table className='main_table'>
						<TableHead>
							<TableRow>
								{
									file_list.value
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
										primary={column_index!==0}
										name={column_name}
										new_name={{value:"", set:()=>{}}}
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