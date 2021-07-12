



export default class FileStore{
	_uid_counter = 0;
	_store:{uid:number,file:File}[] = [];
	constructor(uid_counter=0,store){
		this._uid_counter=uid_counter;
		this._store =store
	}
	add_file(new_file:File){
		if(this._store.some(item=>item.file.name===new_file.name)){
			throw new Error("File with the same name is already in the store.")
		}
		this._uid_counter++;
		this._store.push(
			{
				uid:this._uid_counter,
				file:new_file
			}
		)
		return this._uid_counter;
	}
	get_file(uid:number){
		return this._store.find(item=>item.uid===uid)
	}
	remove_file(uid:number){
		this._store = this._store.filter(item=>item.uid!==uid)
	}
	clear(){
		this._store = [];
	}
}