import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { zip_undefined } from '../iter';
import { useAppSelector } from '../store';
import CellManipulator from './CellManipulator';
import "./JoinAndOverlapTab.css";




export default function JoinAndOverlapTab(){
	let file_actions = useAppSelector(store=>store.files)

	// useEffect(()=>{
	// 		const get_columns = async () => {
	// 			let result:string[][] = [];
	// 			for await (let item of file_actions){
	// 				let col_names = await get_column_names(item)
	// 				result.push(col_names as string[])
	// 			}
	// 			set_column_names(result)
	// 		}
	// 		get_columns();
	// 	},
	// 	[file_list.value]
	// );

	return (
		<div className="App-Tab">
			{
				file_actions.length>0 
				&&
				<TableContainer component={Paper}>
					<Table className='main_table'>
						<TableHead>
							<TableRow>
								{
									file_actions.map(file_action =>
										<TableCell>{file_action.file.name}</TableCell>
									)
								}
							</TableRow>
						</TableHead>
						<TableBody>
							{[...zip_undefined(file_actions.map(item=>item.column_actions))].map((column_actions, row_index) => (
								//todo fix key as index here
								<TableRow key={row_index}> 
									{column_actions.map((column_action, column_index)=>
										column_action
										?
										<CellManipulator 
											row_index={row_index}
											column_index={column_index}
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