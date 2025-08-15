const server_url='http://192.168.8.215:3000'
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
}//added

function get_array(){
    //when user clicks the submit button
    //relies on tries changing
    //Send user input word to server afterwards
    let guessed_word=[];
    for (let i = 0; i < 5; i++) {
        let inputElement = document.getElementById(`input_row${tries}_col${i}`);   
        guessed_word.push(inputElement.value);}
    console.log(guessed_word)
    // return guessed_word;//add section to send guessed_word to server
    fetch(server_url+'/guess',{
        method:"POST",
        body:JSON.stringify({ guess: guessed_word }),
        headers:{
            'Content-Type':"application/json"
        }
    }).then(process_guess1)
}

let tries = 0; //num of tries that user has used
const body = document.getElementById('body')
body.appendChild(cloneTemplate(5).clonedTable);
//Creeates first row //added

const submit=document.getElementById('submit');
submit.addEventListener('click',get_array)
//Activates submit button, on click, function check is activated//added

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
}//added

function correct_guess(){
    //show a message of victory
    //proposal to add themselved to leaderboard
    //add button to submit leaderboard entry
    //add another button to show leaderboard
    //manipulate html to do this
    const leader_board_form_element=document.getElementById('leaderboard-form')
    leader_board_form_element.style.display='block'
    const leaderboardButton=document.getElementById('leaderboard-submit')
    leaderboardButton.addEventListener('click',post_leaderboard)
}

function process_guess1(response){
    response.json().then(process_guess)}
//create a new row.
//Add communication between server and client.

function post_leaderboard(){
    //read name from input field
    const leaderboardInput=document.getElementById('leaderboard-name') //ccheck this
    const name_to_submit = leaderboardInput.value

    //if name is empty, do nothing
    if(name_to_submit==''){
        return
    }

    //send leaderboar entity to backend to save
    fetch(server_url+'/leaderboard',{
        method: 'POST',
        body: JSON.stringify({name: name_to_submit,
            // word: guessed_word,
            guess_n:tries,
            
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    })


    //show confirmation message
    alert('added');
    const alert_message=document.getElementById("add_to_leaderboard_success_message")
    alert_message.style.display='block'
    const enterboard=document.getElementById("leaderboard-form")
    enterboard.style.display='none'
    const leaderboardsuccess=document.getElementById('leaderboard-success')
    leaderboardsuccess.style.display='block'
    //populate leaderboard from the backend
    //query the server for leaderboard data
    //add elements to the eldaerboard component
    //clear up current guesses
    //show go to leaderboard button"

}
const leaderboardButton = document.getElementById('go-to-leaderboard')//check id
leaderboardButton.addEventListener('click', open_leaderboard)
function open_leaderboard(){
    //hide elements that are no longer applicable
    console.log('hidings')
    // for (let t=5;t<10; t++){ //fix tries
    //     for (let i = 0; i < 5; i++) {
    //         const temp = document.getElementById(`input_row${t}_col${i}`);   
    //         temp.style.display='none';}
    // }
    
    const leaderboard_success=document.getElementById('leaderboard-success')
    leaderboard_success.style.display='none'
    const submit = document.getElementById('submit')
    submit.style.display='none';
    const success_message=document.getElementById('add_to_leaderboard_success_message')
    success_message.style.display='none';

    //show leaderboard table
    const leaderboard = document.getElementById('leaderboard')
    leaderboard.style.display='block';

    //querry the backend for leaderboard data
    fetch(server_url+"/leaderboard").then(process_leaderboard_response)
    //add element to the page to show leaderboard data
    
}

function process_leaderboard_response(res){
    res.json().then(process_leaderboard_json)
}

function process_leaderboard_json(leaderboard_res_json){
    const leaderboard_data=leaderboard_res_json['entries']
    console.log(leaderboard_data)
    //add contents to the page
    const leaderboard_table=document.getElementById('leaderboard-table')
    for (let row_data of leaderboard_data){
        const row=document.createElement('tr')
        const name_cell = document.createElement('td')
        const word_cell = document.createElement('td')
        const score_cell = document.createElement('td')
        name_cell.innerHTML=row_data['name']
        word_cell.innerHTML = row_data['word']
        score_cell.innerHTML=row_data['tries']
        row.appendChild(name_cell)
        row.appendChild(word_cell)
        row.appendChild(score_cell)
        leaderboard_table.appendChild(row)

    }
}
