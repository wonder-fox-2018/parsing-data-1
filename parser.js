"use strict"

var fs = require('fs');
var peopleAttributes = fs.readFileSync('people.csv', 'utf-8').split('\n')[0].split(',');
var peopleDataRaw = fs.readFileSync('people.csv', 'utf-8').split('\n').slice(1);
var peopleDataReady = [];

for (var i = 0; i < peopleDataRaw.length; i++) {
    peopleDataReady.push(peopleDataRaw[i].split(','));
}

// console.log(peopleDataReady);

class Person {
    constructor(id, first_name, last_name, email, phone, created_at) {
        for (var i = 0; i < peopleAttributes.length; i++) {
            this[peopleAttributes[i]] = arguments[i];
        }
    }
}

class PersonParser {
    constructor(file) {
        this._file = file;
        this._fileName = 'people.csv';
        this._people = [];
    }

    loadPerson() {
        for (var i = 0; i < this._file.length; i++) {
            var parameterOfPerson = this._file[i];
            var newbie = new Person(Number(parameterOfPerson[0]), parameterOfPerson[1], parameterOfPerson[2], parameterOfPerson[3], parameterOfPerson[4], new Date(parameterOfPerson[5]));
            this.addPerson(newbie);
        }

        return this._people;
    }

    getPeople() {
        return this._people;
    }

    addPerson(newPerson) {
        this._people.push(newPerson);
    }

    save() {
        var newestPeople = [];
        for (var i = 0; i < this._people.length; i++) {
            var peopleValues = Object.values(this._people[i]);
            peopleValues[peopleValues.length-1] = peopleValues[peopleValues.length-1].toISOString();

            var allStringValues = peopleValues.join(',');
            newestPeople.push(allStringValues + '\n');
        }

        newestPeople.unshift('id,first_name,last_name,email,phone,created_at' + '\n');

        var reallyReady = '';
        for (var i = 0; i < newestPeople.length; i++) {
            reallyReady = reallyReady + newestPeople[i];
        }

        var peopleDataRaw = fs.writeFileSync('people.csv', reallyReady, 'utf-8');
    }
}

// Jika di run:
// 1. this._people akan terisi sebanyak 200 object instance Class Person
// 2. Ketika personParser.addPerson() dijalankan, jumlah object yg ada pada array this._people akan menjadi 201
// 3. Ketika personParser.save() dijalankan, maka data people.csv akan diupdate sesuai dengan data pada array this._people (dan sesuai format csv)

var personParser = new PersonParser(peopleDataReady);
personParser.loadPerson();
personParser.addPerson(new Person(201, 'Lano', 'Rollinsgs', 'GGlandit@quam.com', '1-633-389-7173', new Date()));
// console.log(personParser.getPeople());
console.log(personParser.save());
console.log(`There are ${personParser.getPeople().length} people in the file ${personParser._fileName}`);