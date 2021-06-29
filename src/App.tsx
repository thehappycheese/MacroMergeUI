//import React from 'react';
import './App.css';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Stepper, Step, StepLabel, CssBaseline, Button, Paper, ButtonGroup} from '@material-ui/core';
import { useState } from 'react';
import UploadTab from './Components/UploadTab';
import LayoutCentreColumn from './Components/LayoutCentreColumn';
import JoinAndOverlapTab from './Components/JoinAndOverlapTab';


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
		title:"Run Process",
		content:""
	},

]

//className="App">
function App() {
	let [current_step, set_current_step] = useState<number>(0);
	let [file_list, set_file_list] = useState<File[]>([])
	let [primary_file, set_primary_file] = useState<number>(0)
	
	let prev_step_handler = ()=>{
		switch(current_step){
			case 1:
				set_current_step(0)
		}
	}

	let next_step_handler = ()=>{
		switch(current_step){
			case 0:
				if(file_list.length>0){
					set_current_step(1)
				}else{
					alert("please select some files before proceeding to the next step")
				}
		}
	}

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<LayoutCentreColumn min={800} max={1500}>
				<div className="App">
					<header className="App-Header">
						<h1>Merge Tool</h1>
					</header>
					<Paper style={{padding:10}} >
						
						<Stepper activeStep={current_step} orientation="vertical" style={{ backgroundColor: "transparent" }}>
							{steps.map(({title, content}, index) => {
								return (
									<Step key={title}>
										<StepLabel>{title}</StepLabel>
									</Step>
								);
							})}
						</Stepper>
						<ButtonGroup fullWidth>
							<Button onClick={prev_step_handler}>Previous</Button>
							<Button variant="contained" onClick={next_step_handler}>Next</Button>
						</ButtonGroup>

					</Paper>
					<div className="App-Main">
						{
							[
								<UploadTab file_list={file_list} set_file_list={set_file_list} primary_file={primary_file} set_primary_file={set_primary_file} />,
								<JoinAndOverlapTab file_list={file_list} primary_file={primary_file}/>
							][current_step]
						}
					</div>
				</div>
			</LayoutCentreColumn>
		</ThemeProvider>
	);
}

export default App;
