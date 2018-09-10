"use strict"
const fs = require('fs')
class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,firstName,lastName,email,phone,time){
    this.id=id
    this.firstName=firstName
    this.lastName=lastName
    this.email=email
    this.phone=phone
    this.time=time
  }
}

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = null
  }
 
  get people() {
    let data=fs.readFileSync('./people.csv','utf-8')
    let dataSplit=data.split('\n')
    dataSplit.splice(0,1)
    let arrayResult=[]
    for(let i=0;i<dataSplit.length;i++){
      //console.log(temp)
      let tempSplit=dataSplit[i].split(",")
      arrayResult.push(new Person(tempSplit[0],tempSplit[1],tempSplit[2],tempSplit[3],tempSplit[4],tempSplit[5]))
    }
    return arrayResult
  }
  set people(data){
    this._people=data
  }
  get file(){
    return this._file
  }

  addPerson(people) {
    // console.log(people)
    this._people.push(people)
  }
  save(){
    console.log('aaaa')
    let hasil='id,first_name,last_name,email,phone,created_at \n'
    for(let i=0;i<this._people.length;i++){
      let temp=`${this._people[i].id}, ${this._people[i].firstName}, ${this._people[i].lastName},  ${this._people[i].email},  ${this._people[i].phone},  ${this._people[i].time}`
      hasil += temp+'\n'
    }

    // console.log(hasil)
   
    // fs.writeFileSync('people.csv', hasil);
  }
}

let parser = new PersonParser('people.csv')
//membaca hasil dari file csv
let hasilRead=parser.people
//setter data baru
parser.people=hasilRead
console.log(parser.file)
let newData=new Person(201,"andre","h","hokandre@mhs.mdp.ac.id","081369011135","10-9-2018")
parser.addPerson(newData)

// console.log(parser.people)
parser.save()
//console.log(parser.people)

//console.log(`There are ${PersonParser.people.size} people in the file '${parser.file}'.`)
