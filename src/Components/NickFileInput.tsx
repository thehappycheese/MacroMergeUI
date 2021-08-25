import IconButton from "@material-ui/core/IconButton";
import PublishIcon from '@material-ui/icons/Publish';
import DeleteIcon from '@material-ui/icons/Delete';
import "./NickFileInput.css"
import Paper from "@material-ui/core/Paper";
import format_file_size from "../format_file_size";
import FileStore from "../FileStore";


type NickFileInputPropTypes = {
	files: FileStore;
	onChange: (all_uids:number[], new_uids:number[]) => void;
	accept?: string;
};

export default function NickFileInput({files, onChange, accept=""}:NickFileInputPropTypes){
	return (
		<div className="NickFileInput">
			<label 
				className="NickFileInput-Dropzone"
				onDropCapture={(e)=>{
					e.preventDefault()
					e.stopPropagation()
					e.currentTarget.style.borderColor="";
					e.currentTarget.style.backgroundColor="";

					let new_uids = Array.from(e.dataTransfer.items ?? [])
						.filter(item=>item.kind==="file")
						.map(item=>item.getAsFile())
						.filter((item):item is File=>item!==null)
						.map(files.add_file);
					onChange(files.get_all_uids(), new_uids)
				}}
				onDragOverCapture={(e)=>{
					e.stopPropagation()
					if(Array.from(e.dataTransfer.items).some(item=>item.kind==='file')){
						e.preventDefault();
					//if(e.dataTransfer.types.includes("text/csv")){
						e.currentTarget.style.borderColor="white";
						e.currentTarget.style.backgroundColor="rgba(255,255,255,0.1)";
						e.dataTransfer.dropEffect="copy";
					}else{
						e.dataTransfer.dropEffect="none";
					}
				}}
				onDragLeaveCapture={(e)=>{
					e.stopPropagation()
					e.currentTarget.style.borderColor="";
					e.currentTarget.style.backgroundColor="";
				}}
			>
				<div/>
				<PublishIcon style={{ fontSize: 50 }}/>
				<div style={{marginLeft:"30px"}}>
					<div style={{fontSize:"1.5em"}}>Click Here to Select Files</div>
					<div style={{color:"grey"}}>or drag and drop here</div>
				</div>
				<div/>
				<input 
					type="file"
					hidden
					accept={accept}
					multiple
					onChange={(e)=>{
						let new_uids = Array.from(e.target.files ?? [])
							//.filter((item):item is File=>item!==null)
							.map(files.add_file);
						onChange(files.get_all_uids(), new_uids);
						(e.target as any).value = null;
					}}
				/>
			</label>
			{
				
				<Paper className="NickFileInput-FileGrid">
					<div></div>
					<div className="NickFileInput-FileGridHeader">File Name</div>
					<div className="NickFileInput-FileGridHeader">Size</div>
					<div></div>
					<div></div>
					{
						files.map((item,index)=>[
							<div key={"lpad"+index}></div>,
							<div key={item.name+item.size+"name"} className="NickFileInput-FileGridCell">{item.name}</div>,
							<div key={item.name+item.size+"size"} className="NickFileInput-FileGridCell">{format_file_size(item.size)}</div>,
							<IconButton
								 key={item.name+item.size+"remove"}
								 onClick={
									(remove_file_index => 
										(e:React.MouseEvent) => onChange(files.filter((item, item_index)=>item_index !== remove_file_index))
									)(index)
								}
							>
								<DeleteIcon />
							</IconButton>,
							<div key={"rpad"+index}></div>
						]).flat()
					}
				</Paper>
			}
		</div>
	);
}

