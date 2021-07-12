import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';
import { zip_undefined } from '../iter';
import { useAppSelector } from '../store';
import CellManipulator from './CellManipulator';





export default function JoinAndOverlapTab(){
	let file_actions = useAppSelector(store=>store.files)
	let file_actions_filtered = file_actions.filter(item=>item.column_actions!==undefined)
	return (
		<div className="App-Tab">
			{
				file_actions.length>0 
				&&
				<TableContainer component={Paper} style={{marginTop:"20px", padding:"10px", width:"auto"}}>
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