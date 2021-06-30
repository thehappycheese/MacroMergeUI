import { Button, Typography , Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import format_file_size from '../format_file_size';
import { ReactStateValueSetterPair as StateValueSetterPair } from '../type_utils';


type UploadTabPropTypes = {
	file_list: StateValueSetterPair<File[]>;
};


export default function UploadTab({file_list}:UploadTabPropTypes) {
	
	const  set_primary_file = (index:number)=>{
		let new_file_list = [...file_list.value];
		let [primary_file] = new_file_list.splice(index, 1);
		file_list.set(()=>[primary_file, ...new_file_list]);
	}

	return (
		<div className="App-Tab" >
			
			<Typography variant="h6">Upload Inputs</Typography>

			<p>Use the upload button below to select files to upload</p>

			<input
				accept="*"
				style={{ display: 'none' }}
				id="raised-button-file"
				multiple
				type="file"
				onChange={(e) => {
					file_list.set(Array.from(e.target.files || []));
				}}
			/>
			
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
							file_list.value.length>0
							?
							file_list.value.map((item, row_index)=>
								<TableRow key={item.name}>
									<TableCell>{item.name}</TableCell>
									<TableCell>{format_file_size(item.size, "SI-Full")}</TableCell>
									<TableCell>
										{
											row_index===0
											?
											<>Target Segmentation</>
											:
											<Button variant="outlined" onClick={(e)=> set_primary_file(row_index)}>
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