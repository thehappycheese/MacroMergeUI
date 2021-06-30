//import React from 'react';
import './App.css';

import { Stepper, Step, StepLabel, Button, Paper, ButtonGroup} from '@material-ui/core';
import { useState } from 'react';
import UploadTab from './Components/UploadTab';
import LayoutCentreColumn from './Components/LayoutCentreColumn';
import JoinAndOverlapTab from './Components/JoinAndOverlapTab';
import { useReactStateValueSetterPair } from "./type_utils";
import { useAppSelector } from './store';





function App() {
	let current_step = useAppSelector(store=>store.current_step)
	
	let file_list = useReactStateValueSetterPair<File[]>([])
	
	let prev_step_handler = () => {
		switch(current_step){
			case 1:
				set_current_step(0)
		}
	}

	let next_step_handler = ()=>{
		switch(current_step){
			case 0:
				if(file_list.value.length>0){
					set_current_step(1)
				}else{
					alert("please select some files before proceeding to the next step")
				}
		}
	}

	return (
		
		<LayoutCentreColumn min={800} max={1500}>
			<div className="App">
				<header className="App-Header">
					<h1>Merge Tool</h1>
				</header>
				<Paper style={{padding:10}} >

					<Stepper activeStep={current_step} orientation="vertical" style={{ backgroundColor: "transparent" }}>
						{[
							"Upload Inputs",
							"Join & Overlap",
							"Choose Aggregations",
							"Run Process",
						].map(title => {
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
							<UploadTab file_list={file_list}/>,
							<JoinAndOverlapTab file_list={file_list}/>
						][current_step]
					}
				</div>
			</div>
		</LayoutCentreColumn>
	
	);
}

export default App;
