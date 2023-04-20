// Connection instance to node server
const socket = io('http://localhost:8000');


// Grab the elements
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector('.container');
const members = document.querySelector('#members');
var audio = new Audio('.././Whistle Notification.mp3');

var arr = new Array();

const append = (message, position, name) => {

    

    if (position === 'left') {
        messageContainer.innerHTML += `<div class=" text-black flex flex-col justify-end items-start my-5 px-2 ">
        <div class="w-3/4 md:w-1/2 border p-3 rounded-lg bg-white">
            <p class="w-full"><span class="font-medium">${name}</span></p>
            <p class="rounded-md w-full ">${message}</p>
        </div>
    </div>`
        audio.play();
    }
    if (position === 'right') {
        messageContainer.innerHTML += `<div class=" text-black flex flex-col justify-end items-end my-5 px-2 ">
        <div class="w-3/4 md:w-1/2 border p-3 rounded-lg bg-[#dcf8c6]">
            <p class="w-full"><span class="font-semibold">You</span></p>
            <p class="rounded-md w-full ">${message}</p>
        </div>
    </div>`
        audio.play();
    }
    if (position === 'center') {

        messageContainer.innerHTML += `<div class=" text-black flex justify-center my-2 px-2 ">
        <p class="text-center bg-[#efedec] rounded-md py-1 w-3/4"><span class="font-medium">${name}</span> ${message}</p>
    </div>`
    members.innerHTML = '';
    arr.push(name)
    for (let index = 0; index < arr.length; index++) {
        members.innerHTML += `<div class="p-3 ">
        <p class="border-b-2 py-1">${arr[index]}</p>
    </div>`;

    }
        audio.play();
    }

    if (position === 'dis-center') {
        arr.splice(arr.indexOf(name), 1);
        messageContainer.innerHTML += `<div class=" text-black flex justify-center my-2 px-2 ">
        <p class="text-center bg-[#efedec] rounded-md py-1 w-3/4"><span class="font-medium">${name}</span> ${message}</p>
    </div>`

        members.innerHTML = '';
        for (let index = 0; index < arr.length; index++) {
            members.innerHTML += `<div class="p-3 ">
        <p class="border-b-2 py-1">${arr[index]}</p>
    </div>`;
            audio.play();
        }
    }}

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const message = messageInput.value;
        append(`${message}`, 'right', 'You');
        socket.emit('send', message);
        messageInput.value = '';
    })

    // Get the user name
    const name = prompt("Enter your name to join!");

    socket.emit('new-user-joined', name);

    socket.on('user-joined', name => {
        append(`joined the chat`, 'center', name)
    }, arr => {
        console.log('from arr1', arr)
    });


    socket.on('receive', data => {
        append(`${data.message}`, 'left', data.name)
    });

    socket.on('left', (data, arr) => {
        append(`left the chat`, 'dis-center', name)
    });



