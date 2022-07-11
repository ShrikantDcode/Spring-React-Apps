import React, { useEffect } from 'react';

function makeRequest(url, timeout = 2000, callback = function() {}) {
    // the rest of the function
}

function checkArgs(...args) {
    console.log(args.length); //2
    console.log(arguments.length); //2
    console.log(args[0], arguments[0]); //a a
    console.log(args[1], arguments[1]); //b b
}

function VariableDeclaration(props) {

    useEffect(() => {
        for(var i = 1; i<2; i++){
            console.log('> '+i);
        }
        console.log('>> '+i); //no error
        for(let k = 1; k<2; k++){
            console.log('- '+k);
        }
        //console.log('-- '+k);//'k' is not defined

        let re1 = /ab/i,
        // throws an error in ES5, okay in ES6
        re2 = new RegExp(re1, "g");
        console.log(re1.test("AB"));  // true case sensitive i
        console.log(re2.test("AB"));  // false global g
        
        let name = "Nicholas",
        message = `Hello, ${name}.
        How are you?`;
        console.log(message);       // "Hello, Nicholas."
                                    //          How are you?  
        checkArgs("a", "b");
       
        var suffix = " name";
        var person = {
            ["first" + suffix]: "Nicholas",
            ["last" + suffix]: "Zakas"
        };
        console.log(person["first name"]);      // "Nicholas"
        console.log(person["last name"]);       // "Zakas"
    },[]);

    return (
        <div>
            
        </div>
    );
}

export default VariableDeclaration;