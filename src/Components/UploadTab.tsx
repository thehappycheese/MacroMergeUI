import { Button, Radio, RadioGroup, FormControl, FormLabel, FormControlLabel } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import * as XLSX from 'xlsx'
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
		<div className="App-Panel UploadTab-Main" >
			<form>
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
					<Button variant="contained" component="span">
						Select Files to Upload
					</Button>
				</label>
				<FormControl component="fieldset" style={{ display: "block", padding: theme.spacing(2) }}>
					{
						file_list &&
						<RadioGroup
							name="primary_file"
							value={primary_file}
							onChange={(e) => {
								set_primary_file(parseInt(e.target.value))
							}}
						>
							{file_list.map((item, index) => <FormControlLabel key={index} value={index} control={<Radio />} label={item.name} />)}
						</RadioGroup>
					}
				</FormControl>
				<Button onClick={(e) => {
					let file = file_list[primary_file];
					if(!(file ?? false)) return;
					let form_data = new FormData();
					form_data.append("file", file)
					
					fetch("/get_columns",{method:"POST", body:form_data})
						.then(resp=>resp.json())
						.then(json=>{
							console.log(JSON.stringify(json, null, 2))
						})
					// console.log("will try to read ", file.name);
					// var reader = new FileReader();
					// reader.onload = function (e) {
						
					// 	if (e?.target?.result === null) return;
					// 	var data = new Uint8Array((e.target as any).result as any);
					// 	var workbook = XLSX.read(data, {sheetRows:10, type: 'array' });
					// 	var array = XLSX.utils.sheet_to_json(workbook.Sheets["Sheet1"])
					// 	debugger;
					// };
					// reader.readAsArrayBuffer(file);
				
				}}>go 1</Button>
			</form>
		</div>
	);
}