"use strict"



class Person {
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id,
    this.firstName = first_name,
    this.lastName = last_name,
    this.email = email,
    this.phone = phone,
    this.createdAt = created_at
  }
}

class PersonParser extends Person {

  constructor(file) {
    super()
    this._file = file
    this._people = null
  }
  parsingData () {
    const fs = require('fs')
    var data = fs.readFileSync('./people.csv','utf-8').split('\n')
    var arrData = []

    for (let i =0; i < data.length; i++) {
      arrData.push([])
      arrData[i] = data[i].split(',')
    }
    return arrData
  }

  get people() {
    return this._people
  }

  set people(newPeople) {
    this._people = newPeople
  }

  addPerson(classPerson) {
    let arr = Object.values(classPerson)
    let arrPeople = this._people,
        res = ''
    arrPeople.push(arr)
    
    for (let i =0; i < arrPeople.length; i++) {
      res += arrPeople[i].join(',')
      res += '\n'
    }
    
    // return res
    this.writeFile(res)
  }

  writeFile(data) {
    const fs = require('fs')
    fs.writeFileSync('./people.csv',data,'utf-8')
  }

}

let parser = new PersonParser('people.csv')


// console.log(parser.people)
parser.people = parser.parsingData()
// console.log(parser.people)

let person1 = new Person('201','John','Doe','johndoe@mail.com','1-666-123-7777','2018-09-13T03:53:40-07:00')
// console.log(parser.parsingData())
console.log(parser.addPerson(person1))
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
