"use strict"
var fs = require('fs')
// var personTitleHead = fs.readFileSync('people.csv').toString().split("\n")[0].split(',')
// var personData = fs.readFileSync('people.csv').toString().split("\n").length
// total 201 data include personTitleHead
// console.log(personTitleHead)
var personDataAwal = fs.readFileSync('people.csv').toString().split("\n")[0]
var personDataTotal = fs.readFileSync('people.csv').toString().split("\n").slice(1)
// console.log(personDataTotal)
var personDataFixed = [] 
for ( var i = 0; i < personDataTotal.length; i++) {
  personDataFixed.push(personDataTotal[i].split(','))
}
// console.log(personDataFixed)

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.people = personDataFixed;
  }

  get people() {
    return this._people
  }
  set people(people) {
    for ( var i = 0; i < people.length; i++) {
      var argumented = people[i];
      this._people.push(new Person(argumented[0], argumented[1], argumented[2], argumented[3], argumented[4], new Date(argumented[5])))
    }
  }

  addPerson(person) {
    this.people.push(person)
  }

  save() {
    var peopleData = []
    peopleData.push(personDataAwal + '\n')
    for ( var i = 0; i < this.people.length; i++) {
      var arrPeople = Object.values(this.people[i])
      arrPeople[arrPeople.length-1] = arrPeople[arrPeople.length-1].toISOString()

      var arrPeopleNew = arrPeople.join(',');
      peopleData.push(arrPeopleNew + '\n'); 
    }
    var strPeopleData = ''
    for ( var i = 0; i < peopleData.length; i++) {
      strPeopleData += peopleData[i]
    }
    // this.people = Object.values(this.people).toString().split("\n").join()
    var peopleDataResult = fs.writeFileSync('people.csv', strPeopleData, 'utf-8')
  }


}


let personParser = new PersonParser(personDataFixed)
// console.log(personParser)
personParser.people
personParser.addPerson(new Person(201, 'bambang', 'prince', 'email.com', '1-231-432-1919', new Date()))
personParser.save()
// console.log(personParser.convToObj)

// console.log(personParser.people[personParser.people.length - 1])
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
