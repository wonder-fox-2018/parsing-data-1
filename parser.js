"use strict"


// console.log(file);

class Person {
  constructor(id, firstName, lastName, email, phone, createdAt) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.createdAt = createdAt;
  }
}

class PersonParser {
  constructor(file) {
    this.file = file;
    this.people = this.convertToCSV();
  }

  convertToCSV() {
    let allData = this.file;

    // PERLINE:
    let resultLine = allData.split('\n')

    // PERVARIABLE ke dalam array:
    let allPeople = [];
    for (let j=1; j<resultLine.length; j++) {
      allPeople.push(resultLine[j].split(','))
    }

    let arrayOfObject = [];

    for (let m=1; m<allPeople.length; m++) {
      let id = allPeople[m][0];
      let firstName = allPeople[m][1];
      let lastName = allPeople[m][2];
      let email= allPeople[m][3];
      let phone = allPeople[m][4];
      let createdAt = allPeople[m][5];
      arrayOfObject.push(new Person(id, firstName, lastName, email, phone, createdAt));
    }
    return arrayOfObject;
  }

  addPerson(data) {
    // console.log(data);
    this.people.push(data);
  }

  save() {
    let result = '';
    let objValues = Object.values(this.people);
    // console.log(objValues);


    for (let i=0; i<objValues.length; i++) {
      result += objValues[i].id + ',' + objValues[i].firstName + objValues[i].lastName + ',' + objValues[i].email + 
      ',' + objValues[i].phone + ',' + objValues[i].createdAt + '\n'
    }
    // console.log(result);
    
    fs.writeFileSync('./people.csv', result)
  }


}

var fs = require('fs');
var file = fs.readFileSync('./people.csv', 'utf-8'); 
let parser = new PersonParser(file);

// console.log(parser.people);
parser.addPerson(new Person('201', 'Hedya', 'Febritanti', 'hedya.feb@gmail.com', '0816297325', '2012-07-15T12:06:16-07:00'))
parser.save();



// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)


