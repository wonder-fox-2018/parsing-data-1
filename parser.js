"use strict"
const fs = require('fs')

// console.log(csv)

class Person {
  constructor(id,firstName,lastName,email,phone,created){
    this.id = id,
    this.first_name = firstName,
    this.last_name = lastName,
    this.email = email,
    this.phone = phone,
    this.created_at = new Date(created)
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
    this.people = file // people.csv
  }

  get people() {
    return this._people
  }

  set people(file) {
    let csv = fs.readFileSync(file,'utf-8').split('\n')
    let output = []
    for(let i = 0 ; i < csv.length ; i ++){
      let current = csv[i].split(',')
      let person = new Person(current[0],current[1],current[2],current[3],current[4],current[5])
      output.push(person)
    }
    this._people = output
  }

  addPerson(person){
    this._people.push(person)
  }

  toCsv(){
    // let output = ''
    // for(let i = 0 ; i < this.people.length ; i ++){
    //   let obj = this.people[i]
    //   let keys = Object.keys(obj)
    //   for(let j = 0 ; j < keys.length ; j ++){
    //     let key = keys[j]
    //     let str = obj[key]
    //     output = output + str
    //     if(j !== keys.length - 1){
    //       output = output + ','
    //     }else if(j === keys.length-1){
    //       output = output + '\n'
    //     }
    //   }
    // }
    // console.log(output)
    let output=''
    for(let i = 0 ; i < this.people.length ; i ++){
      let obj = this.people[i]
      let split = Object.values(obj).toString()
      output = output + split
      if(i !== this.people.length - 1){
        output = output + '\n'
      }
    }
    fs.writeFileSync('people.csv',output)
  }

}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person('201','Marco','Godlike','marcodemigod@mail.com','1-666-666-6969','2018-11-15T16:55:29-08:00')) //add data ke 201
parser.toCsv() // untuk memasukkan ke csv

console.log(`There are ${parser.people.length} people in the file '${parser._file}'.`)
