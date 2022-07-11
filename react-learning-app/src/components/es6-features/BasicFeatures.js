import React, { useEffect } from 'react';

const arrayDestructuring = () => {    
    let numbers = [1, 2, 3, 4];
    let [one, two] = numbers; //array destructuring
    console.log(one+'  '+two); // 1 2
    return <h3> {one} </h3>
}
const stringDestructuring = () => {
    this.props = { id: 10, name: 'shri', location: 'Latur' };
    let { id, name } = this.props; // object destructuring
    console.log(id+ '  '+name);
}

const mixed = () => {
    let node = {
        type: "Identifier",
        name: "foo",
        loc: {
            start: {
                line: 1,
                column: 1
            },
            end: {
                line: 1,
                column: 4
            }
        },
        range: [0, 3]
    };
    
    let {
        loc: { start },
        range: [ startIndex ]
    } = node;
    
    console.log(start.line);   // 1
    console.log(start.column); // 1
    console.log(startIndex);   // 0
} 

const spreadOperator = () => {
    //Array
    let fruits = ['Apple','Orange','Banana'];
    let copiedList = [...fruits];
    console.log(copiedList); // ['Apple','Orange','Banana']
    //Object
    var obj1 = { id: 101, name: 'Jhon' }
    var obj2 = { age: 25, country: 'USA'}
    const employee = { ...obj1, ...obj2 }
    console.log(employee); //{ "id": 101, "name": "Jhon", "age": 25, "country": "USA" }
}

const someObj = {
    name: 'Shri',
   // [abc]: 'Latur', // es6 way to declare dynamic property
    doSomeThing_oldway: function() { console.log('Hey');},
    doSomeThing_newway() { console.log('heyyyyy'); }  // es6 way to declare method to object property
}

function* generator(i) {
    yield i;
    yield i + 10;
}

const main = () => { // arrow function
    return arrayDestructuring();
}

export default function BasicFeatures() {

    useEffect(() => {
        console.log(someObj.doSomeThing_newway());

        const gen = generator(10);
        console.log(gen.next().value); // output: 10
        console.log(gen.next().value); // output: 20
        
    }, []);

    return (
        <div>
            {main()}
        </div>
    );
}
