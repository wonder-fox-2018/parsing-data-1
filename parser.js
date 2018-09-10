"use strict"
const fs = require('fs');

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(id,first_name,last_name,email,phone,created_at) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.email = email;
    this.phone = phone;
    this.created_at = created_at;
  }
}

class PersonParser {

  constructor(file) {
    this._file = file // tipe datanya string
    this._people = [] // yang punya personParser 
    this.people = this._file; // manggil setter people , jadi gak pakai invoke (). nilainya menjadi parameter di set people 
   
  }

 
 
  set people(file){

    var result = []
    var dataLength = fs.readFileSync(file, 'utf-8').split('\n').length
        for (var i = 1; i < dataLength; i++) {      
          var dataFormat = fs.readFileSync('./people.csv', 'utf-8').split('\n')[i].split(',')
          this._people.push(new Person(dataFormat[0], dataFormat[1], dataFormat[2], dataFormat[3], dataFormat[4], new Date(dataFormat[5])))
        }
    //parser.people = result
    // gak ada return 
    // set / assign property yang ada di class
    //this._people = data
  }
  get people() {    
    // harus ada return 
    // tidak ada parameter 
    // tidak untuk assign property 
    return this._people
  }

  addPerson(person) {   
    // tugasnya adalah memasukkan object Person baru kedalam this._pople  
    this._people.push(person) 
    return this._people
  }

  save(){   
    var strings = ''
    for (var i = 0; i < this._people.length; i++) {
        for (var key in this._people[i]) {
            //console.log(this._people[i][key], 'aa')
            //fs.writeFileSync('newPeople.csv', this._people[i][key])
            strings += this._people[i][key]+','
        }
        strings = strings.substring(0, strings.length-1)
        strings += '\n'
        
    }
    var header = fs.readFileSync('./people.csv', 'utf-8').split('\n')[0];
    strings = header + '\n'+ strings.toString()
   //console.log(strings)
    fs.writeFileSync('newPeople.csv', strings)
  }

}
let parser = new PersonParser('people.csv')

console.log(parser.people);  // kalau dia gak ada = , maka otomatis manggil getter. dan tidak pakai invoke()

parser.addPerson(new Person('xxx', 'Hadi','NW','hadi@mail.com','08989898878',new Date()))
console.log(parser.people[200])
parser.save()



console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
