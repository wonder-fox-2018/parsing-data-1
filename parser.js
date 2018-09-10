"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, date) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.date = date; 
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = [];
    this.properties;
    this.data;
    this.size;
  }

  get file() {
    return this._file;
  }

  get people() {
    let obj = {
      size : this.size,
      data : this._people
    }

    return obj;
  }
  

  addPerson(person) {
    this._people.push(person);
    this.size++;
  }

  save() {
    let newCSV = this.properties.join(',');
    
    
    for (let i = 0; i < this._people.length; i++) {
      let person = this._people[i];
      newCSV += '\n' + this.toCSV(person);
    }

    fs.writeFileSync(this._file, newCSV);
  }

  toCSV(person) {
    debugger;
    let values = Object.values(person);
    //convert back to string
    values[5] = values[5].toISOString();
    debugger;
    return values.join(',');
  }

  convertCSVtoArray() {
    let tables = fs.readFileSync(this._file, 'utf-8');

    let splitted = tables.split('\n');

    let splitLine = [];

    for (let i = 0; i < splitted.length; i++) {
      splitLine.push(splitted[i].split(','));
    }

    this.properties = splitLine.shift();
    this.data = splitLine; 

    for (let i = 0; i < this.data.length; i++) {
      let currData = this.data[i];
      this._people.push(new Person(Number(currData[0]), currData[1], currData[2], currData[3], currData[4], new Date (currData[5])));
    }
    this.size = this._people.length;
  }


}

let parser = new PersonParser('people.csv')



parser.convertCSVtoArray();
parser.save();
console.table(parser._people);
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)

//uncomment to test addPerson()e
/* console.log(parser.convertCSVtoArray());

let testPerson = new Person('12121212121212', 'qwqwqwqqq', 'qsqsqsqs', 'sqsqsqsqs', 'swswws');
parser.addPerson(testPerson);
parser.save();


console.table(parser.people); */