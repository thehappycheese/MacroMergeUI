import { Button, Typography , Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import format_file_size from '../format_file_size';
import { useAppSelector, root_actions, useAppDispatch} from '../store';

export default function UploadTab() {

	let file_list = useAppSelector(state=>state.files);
	let dispatch = useAppDispatch();

	return (
		<div className="App-Tab" >
			
			<Typography variant="h6">Upload Inputs</Typography>

			<p>Use the upload button below to select files to upload</p>

			
			
			<label htmlFor={"raised-button-file"}>
				<Button variant="contained" component="span" style={{margin:"10px 0" }}>
					Select Files
				</Button>
			</label>

			<p>Use the buttons on the right to make sure the target segmentation file is at the top:</p>

			<TableContainer component={Paper} style={{marginTop:"20px", padding:"10px"}}>
				<Table>

					<TableHead>
						<TableRow>
							<TableCell variant="head">File Name</TableCell>
							<TableCell variant="head">Size</TableCell>
							<TableCell variant="head"></TableCell>
						</TableRow>
					</TableHead>

					<TableBody>
						{
							file_list.length>0
							?
							file_list.map((file_action, row_index)=>
								<TableRow key={file_action.file.name}>
									<TableCell>{file_action.file.name}</TableCell>
									<TableCell>{format_file_size(file_action.file.size, "SI-Full")}</TableCell>
									<TableCell>
										{
											row_index===0
											?
											<>Target Segmentation</>
											:
											<Button variant="outlined" onClick={(e)=> dispatch(root_actions.move_file_to_top(row_index))}>
												Use as Target
											</Button>
										}
									</TableCell>
								</TableRow>
							)
							:
							<TableRow>
								<TableCell>...</TableCell><TableCell>...</TableCell><TableCell>...</TableCell>
							</TableRow>
						}
					</TableBody>

				</Table>
			</TableContainer>

		</div>
	);
}