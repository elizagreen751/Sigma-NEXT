function check_guess(guessed_word, answer) { //should be on server side
    guessed_word = guessed_word.map(guessed_word => guessed_word.toUpperCase());
    let result = [];
    let c = 0;
    for (let i in guessed_word) {
        if (i == answer[c]) {
            result.push(2);
        }
        else if (answer.filter(element => element === i).length > 0) {
            result.push(1);
        } 
        else {
            result.push(0);
        }
        c += 1;
    }
    return result;
}// array of 0 1 or 2 
function process_guess(result,tries) {
    
    console.log('running');
    // Get the current row's input elements
    // Apply styling based on the result array
    for (let i = 0; i < result.length; i++) {
        const inputElement = document.getElementById(`input_row${tries}_col${i}`);   
        console.log(inputElement)
        if (result[i] === 0) {
            inputElement.style.backgroundColor = 'red';
            inputElement.style.color = 'white';
        } else if (result[i] === 1) {
            inputElement.style.backgroundColor = 'yellow';
        } else if (result[i] === 2) {
            inputElement.style.backgroundColor = 'green';
            inputElement.style.color = 'white';
        }
    }
}

function cloneTemplate(tries) {
    const template = document.getElementById('template');

    const clone = template.cloneNode(true);
    clone.style.display = 'table';
    
    clone.removeAttribute('id');
    const inputElements = clone.querySelectorAll('input');
    inputElements.forEach((input, index) => {
        input.id = `input_row${tries}_col${index}`;
    });
    return {
        clonedTable: clone,
        inputIds: [
            `input_row${tries-1}_col0`,
            `input_row${tries-1}_col1`,
            `input_row${tries-1}_col2`,
            `input_row${tries-1}_col3`,
            `input_row${tries-1}_col4`
        ]
    };
}

function pick_answer(){
    const words = [
        "apple", "brave", "crane", "drift", "eagle", "flame", "grape", "honey", "ivory", "jolly",
        "kneel", "lemon", "mango", "noisy", "ocean", "piano", "quilt", "raven", "stone", "tiger",
        "uncle", "vigor", "waltz", "xenon", "youth", "zebra", "adore", "bacon", "candy", "depot",
        "ember", "fancy", "glide", "hover", "inbox", "jumps", "karma", "lunar", "march", "noble",
        "optic", "pearl", "quack", "risky", "spice", "toast", "ultra", "vivid", "whale", "xerox",
        "yield", "zesty", "aloft", "bloom", "crisp", "daisy", "eager", "flick", "grind", "hatch",
        "index", "jewel", "knees", "latch", "meaty", "nerdy", "ozone", "pride", "quest", "ridge",
        "scoop", "thump", "urban", "venom", "wrath", "xylem", "yacht", "zonal", "angel", "blaze",
        "climb", "drape", "entegamer", "feast", "gleam", "haste", "ideal", "jolly", "karma", "lobby",
        "mirth", "nudge", "orbit", "plain", "quick", "roast", "siren", "tulip", "unity", "vapor"
    ]
    const answer = words[Math.floor(Math.random() * 100)].split('')
    return answer
}//This should not be a function 
const body=document.getElementById('body')
body.appendChild(cloneTemplate(2).clonedTable);
let current_input_elements=cloneTemplate().inputElements;
process_guess([0,2,1,1,2],2);
