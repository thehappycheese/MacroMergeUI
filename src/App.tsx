//import React from 'react';
import './App.css';

import { Stepper, Step, StepLabel, Button, Paper, ButtonGroup} from '@material-ui/core';
import UploadTab from './Components/UploadTab';
import LayoutCentreColumn from './Components/LayoutCentreColumn';
import JoinAndOverlapTab from './Components/JoinAndOverlapTab';
import { useAppSelector,root_actions, useAppDispatch } from './store';




function App() {
	let current_step = useAppSelector(store=>store.current_step)
	let dispatch = useAppDispatch();
	return (
		
		<LayoutCentreColumn min={800} max={1500}>
			<input
				accept="*"
				style={{ display: 'none' }}
				id="raised-button-file"
				multiple
				type="file"
				onChange={(e) => {
					console.log(e.target.files)
					dispatch(
						root_actions.set_file_list(
							Array.from(e.target.files || [])
							.map((item,index)=>({
								name:item.name,
								size:item.size,
								id:index
							}))
						)
					);
				}}
			/>
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
						<Button onClick={()=>dispatch(root_actions.prev_step)}>Previous</Button>
						<Button variant="contained" onClick={()=>dispatch(root_actions.next_step)}>Next</Button>
					</ButtonGroup>

				</Paper>
				<div className="App-Main">
					{
						[
							<UploadTab/>,
							<JoinAndOverlapTab/>
						][current_step]
					}
				</div>
			</div>
		</LayoutCentreColumn>
	
	);
}

export default App;
