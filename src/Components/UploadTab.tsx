import { Button, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel, Typography , Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import * as XLSX from 'xlsx'
import format_file_size from '../format_file_size';
import { ReactStateSetter } from '../type_utils';


type UploadTabPropTypes = {
	file_list: File[];
	set_file_list: ReactStateSetter<File[]>;
	primary_file: number;
	set_primary_file: ReactStateSetter<number>;
};

export default function UploadTab({file_list, set_file_list, primary_file, set_primary_file}:UploadTabPropTypes) {
	const theme = useTheme();

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
					set_file_list(Array.from(e.target.files || []));
					set_primary_file(0);
				}}
			/>

			<label htmlFor={"raised-button-file"}>
				<Button variant="contained" component="span" style={{margin:"10px 0" }}>
					Select Files
				</Button>
			</label>

			<TableContainer component={Paper} style={{marginTop:"20px", padding:"10px"}}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell variant="head">File Name</TableCell>
							<TableCell variant="head">Size</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{
							file_list.length>0
							?
							file_list.map(item=>
								<TableRow key={item.name}>
									<TableCell>{item.name}</TableCell>
									<TableCell>{format_file_size(item.size, "SI-Full")}</TableCell>
								</TableRow>
							)
							:
							<TableRow><TableCell>...</TableCell><TableCell>...</TableCell></TableRow>
						}
					</TableBody>
				</Table>
			</TableContainer>

		</div>
	);
}