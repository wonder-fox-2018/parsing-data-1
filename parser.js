"use strict"
const fs = require('fs')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor([id, firstName, lastName, email, phone, createdAt]){
    this.id = Number(id),
    this.first_name = firstName,
    this.last_name = lastName,
    this.email = email,
    this.phone = phone,
    this.created_at = new Date(createdAt)
  }
}

class PersonParser {
  constructor(file) {
    this._file = file
    this._people = []
  }

  get people() {
    return this._people
  }

  readFile() {
    let datas = fs.readFileSync(`./${this._file}`, 'utf-8').split('\n')
    for (let i = 1; i < datas.length; i++) {
      let data = datas[i].split(',')
      let person = new Person(data)
      this._people.push(person)
    }
  }

  addPerson(firstName, lastName, email, phone){
    let id = this._people.length +1 
    let createdAt = new Date()
    let newPerson = new Person([id, firstName, lastName, email, phone, createdAt])
    this._people.push(newPerson)    
  }
  save(){
    let result = [['id,first_name,last_name,email,phone,created_at']]
    for (let i = 0; i < this._people.length; i++) {
      let data = `${this._people[i].id},${this._people[i].first_name},${this._people[i].last_name},${this._people[i].email},${this._people[i].phone},${this._people[i].created_at.toISOString()}`
      // console.log(data);
      result.push(data)
    }
    let persons = result.join('\n')
    fs.writeFileSync(`./${this._file}`, persons, 'utf-8' )
  }
}

let parser = new PersonParser('people.csv')
parser.readFile()
// parser.addPerson('dwi', 'wicaksono', 'dwi@mail.com', '08569990455') <<< add data to CSV
// parser.save()   <<< save file


console.log(`There are ${parser._people.length} people in the file '${parser._file}'.`)


