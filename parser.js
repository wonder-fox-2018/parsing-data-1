"use strict"
let fs = require('fs')
let Person = require('./person.js')

class PersonParser {

  constructor(file) {
    this._file = file
    this._people = []
    this._size = 0
    this._header
    this.readFile()
  }

  get people() {
    // var obj = {
    //   size : this._size,
    //   data : this._people
    // }
    // return obj
    console.table(this._people) 
  }
  
  get file(){
    return this._file
  }

  //read csv file
  readFile(){
    let rawCsv = fs.readFileSync(this._file,'utf-8')
    let allCsvLines = rawCsv.split('\n')

    this._header = allCsvLines[0].split(',')
    let lines = allCsvLines.slice(1)

    lines.unshift([]) // learn to use reduce old style
    let result = lines.reduce((accumulator,currentLine)=>{
      let column = currentLine.split(',')

      let person = new Person()
      for (let j=0; j<this._header.length; j++) {
          if(this._header[j] == 'id'){
            person[this._header[j]] = Number(column[j]) //convert ids to number
          } 
          else if(this._header[j] == 'created_at') {
            person[this._header[j]] = new Date(column[j]) // convert created_at to js Date
          }
          else person[this._header[j]] = column[j]
      }
      accumulator.push(person)
      this._size++
      return accumulator
    })
    this._people = result
  }

  // crud method
  addPerson(first_name,last_name,email,phone) {
    let newPerson = new Person()
        newPerson.id = this._size+1
        newPerson.first_name = first_name
        newPerson.last_name =  last_name
        newPerson.email = email
        newPerson.phone = phone
        newPerson.created_at = new Date()

    this._people.push(newPerson)
    this._size++
    console.log('Person added :')
    console.table(newPerson)
    this.save()
  }
  
  //writing current this._people data to csv
  save(){  
    let newData = ''
    let newLine = '\n'

    newData += this._header.join(',') + newLine
    for(let i=0;i<this._people.length;i++){
      if(i==0)newData += this.convertToCsv(this._people[i])
      else newData+= newLine + this.convertToCsv(this._people[i])
    }

    fs.writeFileSync(this._file, newData)
  }

  //convert one object to one string (one row in csv)
  convertToCsv(obj){ 
    return Object.values(obj).join(',')    
  }

  search(key,value){
    let result = this._people.find(data=>{
        return data[key] == value
    })
    console.table(result)
  }

  findById(id){
    let result = this._people.find(data=>{
        return data.id == id
    })
    console.table(result)
  }

  removePerson(id){
    let index = this._people.findIndex(data=>{
        return data.id == id;
    })

    if (index != -1) {
        console.log(`removing ...`)
        console.table(this._people[index])
        console.log(`remove data with id ${id} success`)
        this._people.splice(index, 1)
        this._size--
    } else {
        console.log(`failed to remove data with id ${id},${'\n'}id not found`)
    }
    console.log('jumlah data saat ini = '+this.dataCount)

    this.save()
  }

}

let parser = new PersonParser('people.csv')
// console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`) // work

const input = process.argv.slice(2)
const command = input[0]
const content = input.slice(1)

switch (command) {
    case 'people': parser.people
    break;

    case 'addPerson': {
        let first_name = content[0]
        let last_name = content[1]
        let email = content[2]
        let phone = content[3]
        if(first_name,last_name,email,phone){
            parser.addPerson(first_name,last_name,email,phone)
        }
        else( console.log('please fulfill addPerson <firsName> <lastName> <email> <phone>' ))
    }
    break;
        
    case 'search': {
        if(content[0],content[1]) parser.search(content[0],content[1])
        else console.log('please fulfill search <key> <value>')
    }
    break;

    case 'findById': {
        parser.findById(content[0])
    }
    break;

    case 'removePerson': {
        parser.removePerson(content[0])
    }
    break;

    default: {
        console.log('welkommm, please follow this command to use')
        console.log('-------------------------------------------')
        console.log('command : \n')
        console.log('$node parser.js people')
        console.log('$node parser.js search <key> <value>')
        console.log('$node parser.js findById <id>')
        console.log('$node parser.js addPerson <firsName> <lastName> <email> <phone>')
        console.log('$node parser.js removePerson <id>')
    }
    break;
}