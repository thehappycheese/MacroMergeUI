//import React from 'react';
import './App.css';

import { Stepper, Step, StepLabel, Button, Paper, ButtonGroup } from '@material-ui/core';
import LayoutCentreColumn from './Components/LayoutCentreColumn';
import JoinAndOverlapTab from './Components/JoinAndOverlapTab';
import { useAppSelector, root_actions, useAppDispatch, fetch_column_details_from_csvs } from './store';
import { useEffect, useState } from 'react';
import NickFileInput from './Components/NickFileInput';
import FileStore from './FileStore';




function App() {
	let current_step = useAppSelector(store => store.current_step);
	
	// The list of actual File objects is not kept in the redux store,
	//   because redux is offended by non-serialisable DOM File objects
	let [real_file_list, set_real_file_list] = useState<FileStore>(new FileStore());
	let dispatch = useAppDispatch();

	useEffect(()=>{
		dispatch(fetch_column_details_from_csvs(real_file_list ?? []))
	},[dispatch, real_file_list])

	

	
	return (

		<LayoutCentreColumn min={800} max={1500}>
			<div className="App">
				<header className="App-Header">
					<h1>Merge Tool</h1>
				</header>
				<Paper style={{ padding: 10 }} >

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
						<Button onClick={() => dispatch(root_actions.prev_step())}>Previous</Button>
						<Button variant="contained" onClick={() => dispatch(root_actions.next_step())}>Next</Button>
					</ButtonGroup>

				</Paper>
				<div className="App-Main">
					{
						[
							<div className="App-Tab" >
								<NickFileInput files={real_file_list??[]} onChange={e=>set_real_file_list(e)} accept=".csv"/>
							</div>,
							<JoinAndOverlapTab />
						][current_step]
					}
				</div>
			</div>
		</LayoutCentreColumn>

	);
}

export default App;
