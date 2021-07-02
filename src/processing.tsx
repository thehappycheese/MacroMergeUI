import csv_parse from 'csv-parse';


// function* iter_file_slice(file:File, number_of_bytes:number){
// 	let offset_start = 0;
// 	let offset_end = number_of_bytes;
	
// 	while (offset_end<file.size){
// 		yield file.slice(offset_start, offset_end)
// 		offset_start+=number_of_bytes;
// 		offset_end+=number_of_bytes;
		
// 	}
// 	if(offset_start<file.size){
// 		yield file.slice(offset_start, file.size-1)
// 	}
// }

export default async function get_column_names(csv_file:File, encoding="utf-8", kb_to_laod=4){
	//let decoder = new TextDecoder('utf-8')
	
	return await new Promise(async (resolve, reject)=>{
		let reader = csv_file.slice(0,1024*kb_to_laod);
		let parser = csv_parse();
		
		parser.on('readable',()=>{
			let data;
			data = parser.read();
			if(data){
				resolve(data)
			}else{
				reject("no data")
			}
		});
		parser.on("error",(e)=>{
			reject("Parser error")
		})
		parser.write(new Uint8Array(await reader.arrayBuffer()),encoding)
	});

}