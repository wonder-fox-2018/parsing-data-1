"use strict"



class Person {
  constructor(id, first_name,last_name,email,phone, createdAt) {
    this.id = id,
    this.firstName = first_name,
    this.lastName = last_name,
    this.email = email,
    this.phone = phone,
    this.createdAt = new Date(createdAt)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this._size = null
  }
  parsingData () {
    const fs = require('fs')
    var data = fs.readFileSync('./people.csv','utf-8').split('\n')
    var header = data[0]
    var rows = data.slice(1)
    var arrData = []

    for (let i =0; i < rows.length; i++) {
      arrData[i] = rows[i].split(',')
    }
    
    let temp;
    for (let i=0; i < arrData.length; i++) {
        var id = Number(arrData[i][0]),
            firstName = arrData[i][1],
            lastName = arrData[i][2],
            email = arrData[i][3],
            phone = arrData[i][4],
            date = arrData[i][5];
        this._size++

        temp = new Person(id, firstName, lastName, email, phone, date)
        arrData[i] = temp
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
        classPerson.id = this._size+1
        classPerson.createdAt = new Date
        arrPeople.push(classPerson)
        for (let i =0; i < arrPeople.length; i++) {
          var arrPerson = Object.values(arrPeople[i])
          res += arrPerson.join(',')
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
console.log(parser.people)

let person2 = new Person(null,'Jean','Doe','jeandoe@mail.com','1-666-123-7777', new Date)
// console.log(parser.parsingData())
console.log(parser.addPerson(person2))
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
