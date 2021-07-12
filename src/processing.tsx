import csv_parse from 'csv-parse/lib/sync';


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


/**
 * 
 * @param csv_file 
 * @param encoding utf-8 by default
 * @param kb_to_load The number of kilobytes to read. Hopefully the column headings are contained within this first chunk or the function will fail.
 * @returns 
 */
export default async function get_csv_sample(csv_file:File, encoding="utf-8", lines_to_load=4):Promise<Array<Array<string | number>> | undefined>{
	//let decoder = new TextDecoder('utf-8')
	console.log("will try to read")
	let input;
	try{
		input = await load_lines_from_file(csv_file);
	}catch(e){
		return undefined;
	}
	return csv_parse(
		input.join("\r\n"),
		{
			cast:true,
			trim:true,
			skip_empty_lines: true
		}
	)
}


export async function load_lines_from_file(file:File, max_lines_to_load=100, min_lines_to_load=1, encoding="utf-8"):Promise<string[]>{
	// let offset = 0;
	// let chunk_size = Math.min(1024, file.size); // Load 1kib at a time
	let text_loaded = "";
	let lines_loaded = [];

	// while(true){
	// 	if(offset+chunk_size>file.size){
	// 		if(lines_loaded.length>=min_lines_to_load){
	// 			return lines_loaded;
	// 		}else{
	// 			throw new Error("could not load the specified minimum number of lines");
	// 		}
	// 	}
	// 	let slice = file.slice(offset, offset+chunk_size); 
	// 	// Only default UTF-8 decoding is possible with the Blob.text() function. 
	// 	// But hopefully this is fine, I have never seen a CSV file that couldn't be UTF-8 decoded.
	// 	let chunk_text = await slice.text(); 
	// 	text_loaded += chunk_text;
	// 	let lines = text_loaded.split(/\r?\n/);
	// 	lines_loaded.push(...lines.slice(0,-1))
	// 	text_loaded = lines.slice(-1)[0]
	// 	offset+=chunk_size;
	// 	if(lines_loaded.length>=max_lines_to_load){
	// 		return lines_loaded.slice(0, max_lines_to_load);
	// 	}
	// }

	let reader = file.stream().pipeThrough(new TextDecoderStream(encoding)).getReader();
	while(true){
		let {done, value} = await reader.read();
		if(done){
			if(lines_loaded.length>=min_lines_to_load){
				console.log(`loaded ${lines_loaded.length} lines from ${file.name}`)
				return lines_loaded.slice(0, max_lines_to_load);;
			}else{
				throw new Error("could not load the specified minimum number of lines");
			}
		}
		text_loaded += value;
		let chunk_lines = text_loaded.split(/\r?\n/);
		lines_loaded.push(...chunk_lines.slice(0,-1));
		if(lines_loaded.length>=max_lines_to_load){
			reader.cancel(); // not sure if this is needed but we can make it explicit anyway.
			console.log(`loaded ${lines_loaded.length} lines from ${file.name}`)
			return lines_loaded.slice(0, max_lines_to_load);
		}
		text_loaded = chunk_lines[chunk_lines.length-1];
	}	
	
}

