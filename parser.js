"use strict"

let fsConnect = require('fs')
let dataCsv = fsConnect.readFileSync('people.csv', 'utf8')

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at
  }

}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = this.fetchPerson()
  }

  get people() {
    return this._people
  }

  get file() {
    return this._file
  }
  
  fetchPerson() {
    let splitDataCsv = dataCsv.split('\n')
    
    let tmp = []
    for(let i = 1; i < splitDataCsv.length; i++) {
      let pecahCsv = splitDataCsv[i].split(',')
      let data = new Person(pecahCsv[0], pecahCsv[1], pecahCsv[2], pecahCsv[3], pecahCsv[4], pecahCsv[5])
      tmp.push(data)
    }

    return tmp
  }

  addPerson(data) {
    this._people.push(data)
  }

  save(){
    let tmp = ''
    for(let i = 0; i < this._people.length; i++) {
      tmp += this._people[i].id + ',' + this._people[i].first_name + ',' + this._people[i].last_name + ',' + this._people[i].email + ',' + this._people[i].phone + ',' + this._people[i].created_at + '\n'
    }
    console.log(tmp)
    fsConnect.writeFileSync('people.csv', tmp)
  }

}

let parser = new PersonParser('people.csv') 
parser.addPerson(new Person(201, 'Zainal', 'Abidin', 'Email Gua', 'Phone Gw', 'Created at Guwah')) // Add New Person
parser.save() // Save Person Add
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)