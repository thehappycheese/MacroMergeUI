
export type FileUID = number;

/**
 * Allows you to exchange a nasty non-serialisable DOM object for a nice serialisable integer.
 * This hopefully stops complaints from redux about putting actual file objects in the store.
 */
export default class FileStore{
	_uid_counter:FileUID = 0;
	_store:{uid:FileUID,file:File}[] = [];
	constructor(store:{uid:FileUID,file:File}[]){
		this._uid_counter = 0;
		this._store = store
	}
	add_file(new_file:File){
		if(this._store.some(item=>item.file.name===new_file.name)){
			throw new Error("File with the same name is already in the list. There is no reliable way to determine if you are uploading the same file twice, or two different files.")
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
	get_file(uid:FileUID){
		return this._store.find(item=>item.uid===uid)?.file;
	}
	get_files(uids:FileUID[]){
		return uids.map(this.get_file);
	}
	get_all_uids(){
		return this._store.map(item=>item.uid);
	}
	/**
	 * Removes a file from the store. Returns true if something was actually removed.
	 * @param uid 
	 * @returns bool True if successful
	 */
	remove_file(uid:FileUID){
		let len = this._store.length;
		this._store = this._store.filter(item=>item.uid!==uid)
		return this._store.length !== len;
	}
	clear(){
		this._store = [];
	}
}

export const file_store = new FileStore([]);