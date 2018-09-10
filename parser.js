"use strict"
var fs=require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id, first_name, last_name, email, phone, created_at){
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
    this._files = fs.readFileSync(file,'utf-8').split('\n')
    this._people = []
    //console.log(this._files)
    for (let i=0; i<this._files.length; i++){
      this._files[i]=this._files[i].split(',')
      this._people.push(new Person(this._files[i][0],this._files[i][1],this._files[i][2],this._files[i][3],this._files[i][4], new Date(this._files[i][5])))
    }
    //console.log(this._people)
  }

  get people() {
    return this._people
  }

  addPerson( obj ) {
    // dari obj, masukkan obj nya kedalam this._people yang bertype array 
    this._people.push( obj )
  }

  static IndonesiaDate(date) {
    return date.getDate(),date.getMonth(),date.getFullYear()
  }

  save () {
    let sementara=''
    for (let i=0; i<this._people.length; i++){
      sementara = sementara + this._people[i]['id']+','+this._people[i]['first_name']+','+this._people[i]['last_name']+','+this._people[i]['email']+','+this._people[i]['phone']+','+this._people[i]['created_at']+'\n'
    }
    console.log(sementara)
    fs.writeFileSync('people.csv', sementara)
  }
}

let parserObj = new PersonParser('people.csv')
parserObj.addPerson(new Person('201','Abdul','Mumin','abdmukmin@mail.com','2134125','2018-09-10T06:08:44-07:00'))
parserObj.addPerson(new Person('202','Abdul','Rafi','abdRafi@mail.com','234324','2018-09-10T06:08:44-07:00'))
console.log(parserObj.save())


//var addMe = new PersonParser.addPerson()
console.log(`There are ${parserObj.people.length} people in the file '${parserObj._file}'.`)
