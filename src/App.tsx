//import React from 'react';
import './App.css';

import { Stepper, Step, StepLabel, Button, Paper, ButtonGroup } from '@material-ui/core';
import UploadTab from './Components/UploadTab';
import LayoutCentreColumn from './Components/LayoutCentreColumn';
import JoinAndOverlapTab from './Components/JoinAndOverlapTab';
import { useAppSelector, root_actions, useAppDispatch, fetch_column_details_from_csvs } from './store';
import { useRef } from 'react';




function App() {
	let current_step = useAppSelector(store => store.current_step);
	let file_list = useRef<FileList|null>(null);
	let dispatch = useAppDispatch();
	return (

		<LayoutCentreColumn min={800} max={1500}>
			<input
				accept=".csv"
				style={{ display: 'none' }}
				id="raised-button-file"
				multiple
				type="file"
				onChange={e=>{
					dispatch(fetch_column_details_from_csvs(e.target.files));
					file_list.current = e.target.files;
				}}
			/>
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
							<UploadTab />,
							<JoinAndOverlapTab />
						][current_step]
					}
				</div>
			</div>
		</LayoutCentreColumn>

	);
}

export default App;
