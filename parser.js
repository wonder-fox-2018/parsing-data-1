"use strict"

class Person {
	
	constructor(id, fName, lName, email, phone, createdAt) {
		this._id = id;
		this._fName = fName;
		this._lName = lName;
		this._email = email;
		this._phone = phone;
		this._createdAt = createdAt;
	}

	get convertion() {
		return `${this._id},${this._fName},${this._lName},${this._email},${this._phone},${this._createdAt}`;
	}

}

class PersonParser {

	constructor(file) {
		this._file = file;
		this._people = [];
	}

	get people() {
		const fs = require('fs');
		let peoples = fs.readFileSync(this._file, 'utf8');
		let list = peoples.split('\n');
		let listPeoples = [];

		for(let i = 0; i < list.length; i++) {
			listPeoples[i] = list[i].split(',');
		}

		for (let i = 1; i < listPeoples.length; i++) {
			let date = new Date(listPeoples[i][5]);
			let persons = new Person(listPeoples[i][0], listPeoples[i][1], listPeoples[i][2], listPeoples[i][3], listPeoples[i][4], date);
			this._people.push(persons);
		  }
		
		return this._people;
	}

	addPerson(objPeople) {
		this._people.push(objPeople.convertion);
		return this._people;
	}

	save() {
		const fs = require('fs');
		fs.appendFileSync(this._file, this._people + "\n", "utf8");
	}

}

let parser = new PersonParser('./people.csv');

let id201 = new Person(201, "Khairul", "Baharuddin", "arul.21@hotmail.com", "081355829581", new Date());
let id202 = new Person(202, "arul", "djaduls", "arul@gmail.com", "0811002019", new Date());

parser.addPerson(id201);
parser.addPerson(id202);
parser.save();

console.log(`There are ${ parser.people.length } people in the file '${parser._file}'.`)