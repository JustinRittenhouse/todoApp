// element.addEventListener('action', callback_func)
myStorage = window.localStorage;


// target the unordered list
let todoListElement = document.getElementById('todoList')

// function that creates event listeners
const createEvents = ( el ) => {
    // add mouseenter event listener
    el.addEventListener('mouseenter', (e) => {
        e.target.classList.add('active')
    })
    // add mouseleave event listener
    el.addEventListener('mouseleave', (e) => {
        e.target.classList.remove('active')
    })

    // add click event listener
    el.addEventListener( 'click', () => {
        if (el.classList.contains('active')) {
            el.classList.remove('active')
            el.classList.add('disabled')
            el.style.textDecoration = 'line-through';
        } else if (el.classList.contains('disabled')) {
            el.classList.remove('disabled')
            el.classList.add('active')
            el.style.textDecoration = null
        }
    } )
}

let input = document.getElementById( 'todoInputField' );
let form = document.getElementById( 'todoForm' );

// Set up count to name list items.
if ( localStorage.getItem( 'count' ) === null ) {
    var count = 0
} else {
    for ( let i = 0; i < parseInt(localStorage.getItem( 'count' )) + 1; i++ ) {
        let li = localStorage.getItem( i )
        let el = document.createElement('li')
        el.classList.add('list-group-item')
        el.innerText = li
        createEvents( el );
        todoListElement.appendChild( el )
} }

form.addEventListener( 'submit', ( e ) => {
    // prevent page refresh
    e.preventDefault();

    // create new dom element using JavaScript
    let li = document.createElement('li')
    let stuff = document.createElement('li')

    // add the nevessary classes to the list element
    li.classList.add('list-group-item')

    // set the intter text of the list element to the input field's value
    li.innerText = input.value

    // stick all of our events to the list item
    createEvents( li );

    // add li to local storage
    localStorage.setItem( count, li.innerText )

    // get ready for next list item and set to localStorage
    count++
    localStorage.setItem( 'count', count )

    // add the item into the unordered list
    todoListElement.appendChild(li);

    // clear the todo input field text
    input.value = '';
} )

let clearButton = document.getElementById( 'clearButton' )

clearButton.addEventListener( 'click', () => {
        todoListElement.innerHTML = ""
        for (let i = 0; i < localStorage.getItem( count ) + 1; i++ ) {
            localStorage.removeItem( i )
        }
        count = 0
    } )
