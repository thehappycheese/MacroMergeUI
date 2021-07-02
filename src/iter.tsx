
/**
 * returns a series of arrays;
 * keeps going if one array is longer than the other; will be filled with `undefined`
 */
export function * zip_undefined<T>(arr:T[][]){

	let max_len = arr.reduce((acc,cur)=>Math.max(acc,cur.length),0)
	for(let i = 0;i<max_len;i++){
		yield arr.map(item=>item[i])
	}
}