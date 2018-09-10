"use strict"

var fs = require('fs')

class Person {
  constructor(arr) {
    this.id = arr[0]
    this.first_name = arr[1]
    this.last_name = arr[2]
    this.email = arr[3]
    this.phone = arr[4]
    this.created_at = new Date(arr[5]).toDateString()
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.settingPeople()
    this._converted = this.convertFile()
  }

  get people() {
    // return this._people
    let obj = {
      people: this._people,
      size : this._people.length
    }
    return obj
  }
 

  get file() {
    return this._file
  }

  addPerson(first_name, last_name, email, phone) {

    let id = Number(this._people[this._people.length - 1].id)+ 1
    let created_at = new Date().toISOString()
    let personArr = [id, first_name, last_name, email, phone, created_at]
    let person = new Person(personArr)
    this._converted.push(personArr.join(','))
    this._people.push(person)

    this.save()
  }

  convertFile() {
    
    let converted = fs.readFileSync(this._file, 'utf8')
      .toString()
      .split("\n")
         
    return converted
  }

  settingPeople() {
    let peopleArr = []

    let converted = this.convertFile()
         
    for (let i = 1; i < converted.length; i++) {
      let person = new Person(converted[i].split(','))
      peopleArr.push(person)
    }
    return peopleArr
  }

  save() {
    let saving = fs.writeFileSync(this._file, this._converted.join("\n"), 'utf8')
    return saving
  }

}

let parser = new PersonParser('people.csv')

// parser.addPerson('Indira','Dayooooo','indidayo@mail.com','09845671423')
// parser.addPerson('Max','Kosasih','mak@mail.com','765234892534')

console.log(parser.people.people[203]);


console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
