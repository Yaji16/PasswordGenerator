//DOM elements
const result = document.getElementById('result');

const lengthSetting = document.getElementById('length');
const uppercaseSetting = document.getElementById('uppercase');
const lowercaseSetting = document.getElementById('lowercase');
const numberSetting = document.getElementById('numbers');
const symbolSetting = document.getElementById('symbols');

const generateBtn = document.getElementById('generate');
const copyBtn = document.getElementById('clipboard');

const randFunc = {
    upper: getRandomUpper,
    lower: getRandomLower,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

//button functions

//generate password on clicking the generate button
generateBtn.addEventListener('click', () => {
    const length = +lengthSetting.value;
    const hasLower = lowercaseSetting.checked;
    const hasUpper = uppercaseSetting.checked;
    const hasNumber = numberSetting.checked;
    const hasSymbol = symbolSetting.checked;

    result.innerText = generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);

});

//copt the password on clicking clipboard button
copyBtn.addEventListener('click', () => {
    const textarea = document.createElement('textarea');
    const password = result.innerText;

    if(!password){
        return ;
    }
    textarea.value = password;
    document.body.appendChild(textarea);
    textarea.select();
    navigator.clipboard.writeText(textarea.value);
    textarea.remove();
    alert('Your password has been copied to the clipboard!');
});

//generate password function - can this be further randomized?
function generatePassword(len, lower, upper, number, symbol){
    //1. init pw variable
    //2. filter out unchecked types
    //3. loop over length and call generator function for each type
    //4. add final pw to pw variable and return
    let generatedPassword = '';
    const countTypes = lower + upper + number + symbol;

    const typesArr = [{upper}, {lower}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );

    if(countTypes === 0){
        return '';
    }
    console.log('TypesArr: ',typesArr);

    for(let i=0; i<len; i+=countTypes){
        
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randFunc[funcName]();
            console.log(generatedPassword);
        });
    }
    const finalPassword = generatedPassword.slice(0,len);
    return finalPassword;
}

//Generator functions

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}


function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random() * symbols.length)];
}
