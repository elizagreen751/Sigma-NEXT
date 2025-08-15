function cloneTemplate() { //function that creates an extra row.
    console.log('clonning')
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

function process_guess(result) {//when result of guess is recieved, result is the array of 1,2,and 0s
    // Get the current row's input elements
    // Apply styling based on the result array
    console.log('process')
    let num =result.filter(element => element === 2).length;
    for (let i = 0; i < result.length; i++) {
        const inputElement = document.getElementById(`input_row${tries}_col${i}`);   
        console.log(inputElement)
        if (result[i] === 0) {
            inputElement.style.backgroundColor = 'red';
            inputElement.style.color = 'white';
            inputElement.readOnly = true;
        } else if (result[i] === 1) {
            inputElement.style.backgroundColor = 'yellow';
            inputElement.style.color = 'black';
            inputElement.readOnly = true;

        } else if (result[i] === 2) {
            inputElement.style.backgroundColor = 'green';
            inputElement.style.color = 'white';
            inputElement.readOnly = true;
        }
    }
    if(num != 5){
        tries+=1
        body.appendChild(cloneTemplate(5).clonedTable);
    }
    else{
        correct_guess()
    }
}

let tries = 0; //num of tries that user has used
const body = document.getElementById('body')
body.appendChild(cloneTemplate(5).clonedTable);//Creeates first row
const submit=document.getElementById('submit');
submit.addEventListener('click',get_array)//Activates submit button, on click, function check is activated

