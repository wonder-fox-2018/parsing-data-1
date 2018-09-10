"use strict"
const fs = require('fs')

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
    this._file = file
    this._people = null
    this.people = this._file;
  }
  // .people dia tidak punya parameter, yg mana otomtis memanggil getter 
  get file(){
    return this._file
  }
  get people() {
    return { 
      size : this._people.length,
      data : this._people
    }
  }
  
  set people(file){
    let data = fs.readFileSync(file, 'utf-8').split('\n')
    let people = []
    for(let i = 0; i < data.length; i++){
      let dataSplited = data[i].split(',')
      people.push(new Person(dataSplited[0],dataSplited[1],dataSplited[2],dataSplited[3],dataSplited[4],dataSplited[5]))
    }
    this._people = people
  }

  addPerson(obj) {
    return this.people.data.push(obj)
  }

  save(){
    let dataToCsv = ''
    let people = this._people
    for(let i = 0 ; i < people.length; i++){
      dataToCsv += `${people[i].id},${people[i].first_name},${people[i].last_name},${people[i].email},${people[i].phone}, ${people[i].created_at}`
      if(i !== people.length-1){
        dataToCsv += '\n'
      }
    }
    // console.log(dataToCsv)
    fs.writeFileSync(this.file,dataToCsv,'utf-8')
  }

}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person(201, 'fransiskus','arnoldy','franshiro@gmail.com','081235928985', new Date()))
// parser.save()
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`)
// console.table(parser.people.data)
parser.save()
