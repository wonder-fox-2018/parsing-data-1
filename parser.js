"use strict"
var fs = require('fs')


class Person {
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id
    this.first_name = first_name
    this.last_name = last_name
    this.email = email
    this.phone = phone
    this.created_at = created_at

    // console.log(this.id)
  }

  // Look at the above CSV file
  // What attributes should a Person object have?
}
class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this.header = []
    // console.log(this._file)
  // this._size = this._people.length

  }
  readfile(){
    let datas =  fs.readFileSync(`./${this._file}`,'utf-8').split("\n")
    this.header = datas[0]
    // console.log(this.header);
    for (var i = 1; i < datas.length-1; i++) {
      let data = datas[i].split(",")
      let person = new Person(data[0],data[1],data[2],data[3],data[4],data[5])
      this._people.push(person)
    }
     console.log(this._people)
  }

  get people() {

    return this._people
  }

  addPerson(first_name,last_name,email,phone) {
    let id = this._people.length+1
    let date = new Date()
    let people = new Person(id,first_name,last_name,email,phone,date) //
    this._people.push(people)
    console.log(this._people)
  }
  save(){
    let data = ""
    data += this.header+"\n"
    // console.log(this.header, "header")
    // console.log(data)
    for (var i = 0; i < this._people.length; i++) {
      // console.log(this._people[i])
       // data += `${this.people[i].id},${this.people[i].first_name},${this.people[i].last_name},${this.people[i].email},${this.people[i].phone},${this.people[i].created_at},\n`
       data += Object.values(this.people[i]).join(",")+"\n"
    }
    let str = data
    // fs.writeFileSync('people.csv', data)
    fs.writeFileSync(`./${this._file}`,str)

  }

}

 let parser = new PersonParser("people.csv")
 parser.readfile()
parser.addPerson('xddxd','fadhila','g@mail.com', '081234567890')
parser.addPerson('fdferwe','fadhila','g@mail.com', '081234567890')


parser.save()
// let Ajin = new Person (10, 'Ajin', 'Fadhila', 'g@mail.com', '081234567890', '2018-06-04T07:04:40-08:00')
// parser.addPerson(Ajin)

// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
