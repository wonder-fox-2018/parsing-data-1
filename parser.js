"use strict"
const fs=require("fs");

class Person {
  // Look at the above CSV file
  // What attributes should a Person object have?
  constructor(params){
      this._id=params[0];
      this._firstname=params[1];
      this._lastname=params[2];
      this._email=params[3];
      this._phone=params[4];
      this._created_at=new Date(params[5]);
  }
}

class PersonParser {

  constructor(file) {
    this._file = file;
    this._people = null;
   //this._arrPeople=[];
  }
  size(){
    return this._people.length-1;
  }

  setting(){
    this._people=[];
    var strPeople=fs.readFileSync(`${this._file}`,"utf8");
    var arrPeople=strPeople.split("\n");
    for (let i = 1; i < arrPeople.length; i++) {
      let objPerson =arrPeople[i].split(",");
      let _p=new Person(objPerson)
      this._people.push(_p);
    }
    
    //console.log(this._people)
  }
  get people() {
    let obj={
      size: this._people.length
    };
    return obj;
  }
  get file(){
    return this._file;
     
  }
  save(){
    var str="id,first_name,last_name,email,phone,created_at\n";
    for (let i = 0; i < this._people.length; i++) {
       let arr= Object.values(this._people[i]);
       
       arr[5]=arr[5].toISOString();
       str+=arr.join(",");
       str+="\n";
    }
    
   var saved = false;

    saved = fs.writeFileSync("keren.csv", str, 'utf8');
  }
  addPerson(params) {
     //console.log(params._firstname);
     params._id=this._people.length+1;
    this._people.push(params);
    
  }

}

let parser = new PersonParser('people.csv');
parser.setting();
//console.log(parser.people);

var myperson=new Person(['','Rudy','Darmawan','rudy@gmail.com','721123344','2013-08-03T10:54:15-07:00']);
parser.addPerson(myperson);
parser.save();
console.log(`There are ${parser.people.size} people in the file '${parser.file}'.`);
