import {Injectable} from '@angular/core';

import {Http} from '@angular/http';
import {Headers} from '@angular/http';
import {User} from '../shared/user/user';

import 'rxjs/add/operator/map';

@Injectable()
export class MongoAPIService {

	private mongoURL: string = "https://api.mlab.com/api/1/databases/tornijuegos/collections/";

	//	API KEY dada por mLab
	private apiKey: string = "aLJE3ELMrsgvIGzXJ5sx_AWmvZ9myEeq";

	users = [];
	games = [];

	constructor(private http: Http) {


		//	Dentro del get tiene que ir la URL completa. Al final se le anade la apikey
		this.http.get(this.mongoURL + "User" + '?apiKey=' + this.apiKey).map(res => res.json()).subscribe(
			data => this.users = data,
			error => console.log("Error loading users."),
			() => console.log("Users loaded.")
		);

		this.http.get(this.mongoURL + "Game" + '?apiKey=' + this.apiKey).map(res => res.json()).subscribe(
			data => this.games = data,
			error => console.log("Error loading games."),
			() => console.log("Games loaded.")
		);
	}



	// f: fields to include: {id:1}  1 yes, 0 no
	// s: sort direction: {id:-1}    1 ASC -1 DESC
	mongoSelectOne(collection: string, field: string, sort: string) {
		return this.http.get(this.mongoURL + collection + '?f=' + field + '&s=' + sort + '&l=1&apiKey=' + this.apiKey)
			.map(res => res.json());
	}

	mongoSelect(collection: string, query: string) {
		return this.http.get(this.mongoURL + collection + '?q=' + query + '&apiKey=' + this.apiKey)
			.map(res => res.json());
	}

	mongoCount(collection: string, query: string) {
		return this.http.get(this.mongoURL + collection + '?q=' + query + '&c=true&apiKey=' + this.apiKey)
			.map(res => res.json());
	}

	mongoInsert(collection: string, fileObj) {
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		return this.http.post(this.mongoURL + collection + "?apiKey=" + this.apiKey,
			JSON.stringify(fileObj), // {"x":1, "y":2}
			{ headers: headers }
		).map(res => res.json());
	}

	mongoUpdate(collection: string, fileID: string, newValueObj) {
		var headers = new Headers();
		headers.append("Content-Type", "application/json");
		return this.http.put(this.mongoURL + collection + '?q=' + fileID + '&apiKey=' + this.apiKey, //{"_id":123}
			JSON.stringify({ "$set": newValueObj }), //{ "x": 3 }
			{ headers: headers }
		).map(res => res.json());
	}
	
	mongoDelete(collection: string, mongoID) {
		return this.http.delete(this.mongoURL + collection + "/" + mongoID + '?apiKey=' + this.apiKey).map(res => res.json());
	}
}
