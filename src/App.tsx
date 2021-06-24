import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, CssBaseline, Button, Paper, ButtonGroup} from '@material-ui/core';
import { useState } from 'react';
import UploadTab from './Components/UploadTab';
import LayoutCentreColumn from './Components/LayoutCentreColumn';
import { AlternateEmail } from '@material-ui/icons';


const theme = createMuiTheme({
	palette: {
	  type: 'dark',
	},
})


let steps = [
	{
		title:"Upload Inputs",
		content:""
	},
	{
		title:"Join & Overlap",
		content:""
	},
	{
		title:"Choose Aggregations",
		content:""
	},
	{
		title:"Download Result",
		content:""
	},

]

//className="App">
function App() {
	let [current_step, set_current_step] = useState<number>(0);
	let [file_list, set_file_list] = useState<File[]>([])
	let [primary_file, set_primary_file] = useState<number>(0)

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<LayoutCentreColumn min={500} max={1024}>
				<div className="App">
					<header className="App-Header">
						<h1>Merge Tool</h1>
					</header>
					<Paper style={{padding:10}} >
						
						<Stepper orientation="vertical" style={{ backgroundColor: "transparent" }}>
							{steps.map(({title, content}, index) => {
								return (
									<Step key={index}>
										<StepLabel>{title}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
						<ButtonGroup fullWidth>
							<Button>Previous</Button>
							<Button variant="contained" onClick={()=>{
								alert("proceeding with upload?")
							}}>Next</Button>
						</ButtonGroup>

					</Paper>
					<div className="App-Main">
						{
							[
								<UploadTab file_list={file_list} set_file_list={set_file_list} primary_file={primary_file} set_primary_file={set_primary_file} />,
								<Tab2/>
							][current_step]
						}
					</div>
				</div>
			</LayoutCentreColumn>
		</ThemeProvider>
	);
}

export default App;
