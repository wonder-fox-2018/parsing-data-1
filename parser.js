"use strict"
var fs = require('fs');
class Person  {
  constructor(id,fname,lname,email,phone,create){
    this.id = id
    this.first_name = fname
    this.last_name  = lname
    this.email      = email
    this.phone      = phone
    this.created_at = create
  }
  
}

class PersonParser {

  constructor(file) {
    // Person , orang singular 
    // People, orang jamak 
    this.file = file
    this._people = [];
    this.fetchPerson()
  }

  get people() {
    return this._people
  }


  fetchPerson() {
    const tmp = []
    const file = fs.readFileSync(this.file , 'utf8').split('\n')
    for (let i = 0; i < file.length; i++) {
      const value = file[i].split(',')
      const hasilObj = new Person(value[0],value[1],value[2],value[3],value[4],value[5])
      this._people.push(hasilObj) // langsung push ke property this._people
    }

    // fetchPerson()
    // looping semua data di file tersebut
    // buat variable temporary untuk menampung data person
    // setiap data loopingnya masukkan person baru ke variable temp yang kita buat
    // return variable tersebut
    // return [1, 2, 3]
    // consol.log(personParse.people =) [1,2,3]
  }

  
 

  addPerson(obj) {
    //console.log("obj => ",obj); 
    this._people.push(obj)
    
  }

  save(){
    var tmp = ''
    for (let i = 0; i < this.people.length; i++) {
      let day = new Date()
        let rubahTanggal = new Date(this.people[i].created_at)
        let tanggal = rubahTanggal.getDate()
        let bulan = rubahTanggal.getMonth()
        let tahun = rubahTanggal.getFullYear()
        tmp += this.people[i].id + ',' + this.people[i].first_name + ',' +  this.people[i].last_name
             + ',' + this.people[i].email + ',' +  this.people[i].phone + ',' +  tanggal +'-'+ bulan+'-'+ tahun 
             if(i !== this.people.length-1) {  //handle buat baris baru
               tmp += '\n'
             }
    }
    fs.writeFileSync(this.file,tmp)
    return 'Tambah data berhasil'
  }
}

let parser = new PersonParser('people.csv')
parser.addPerson(new Person(209,'yuli','Ismail','cek@mail.com',1234567,Date())); 
console.log(parser.save());

console.log(`There are ${parser.people.length} people in the file '${parser.file}'.`)
