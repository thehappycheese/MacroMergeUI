import React from 'react';

let styles:any = {
	outer:(min:number,max:number) => {return{
		display:"grid",
		gridTemplateColumns:`1fr minmax(${min}px, ${max}px) 1fr`,
		height:"100%"
	}},
	inner:{
		display:"grid"
	}
}

type LayoutCentreColumnPropTypes = {
	children:React.ReactNode,
	min:number,
	max:number
}
export default function LayoutCentreColumn({children,min, max}:LayoutCentreColumnPropTypes){
	return (
		<div style={styles.outer(min, max)}>
			<div></div>
			<div style={styles.inner}>
				{children}
			</div>
			<div></div>
		</div>
	);
}