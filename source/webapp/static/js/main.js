const BASE_URL = 'http://localhost:8000/';
const BASE_API_URL = BASE_URL + 'api/';

function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}


async function makeRequest(url, method='GET', data=undefined) {
    let opts = {method, headers: {}};

    if (!csrfSafeMethod(method))
        opts.headers['X-CSRFToken'] = getCookie('csrftoken');

    if (data) {
        opts.headers['Content-Type'] = 'application/json';
        opts.body = JSON.stringify(data);
    }

    let response = await fetch(url, opts);

    if (response.ok) {  // нормальный ответ
        return response;
    } else {            // ошибка
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
}

async function calculateAdd(event) {
    event.preventDefault();
    try {
            let response = await makeRequest(BASE_API_URL + `add/`, 'POST', {
            'A': document.getElementById('A').value,
            'B': document.getElementById('B').value
        });
        let data = await response.json();
        console.log(data);
        showResult(data, 'answer');
    }
    catch (error) {
        error = await error.response
        response= await error
        response= await response.json()
        showResult(response, 'error')
    }
}

async function calculateSubtract(event) {
    event.preventDefault();
    try {
            let response = await makeRequest(BASE_API_URL + `subtract/`, 'POST', {
            'A': document.getElementById('A').value,
            'B': document.getElementById('B').value
        });
        let data = await response.json();
        console.log(data);
        showResult(data, 'answer');
    }
    catch (error) {
        error = await error.response
        response= await error
        response= await response.json()
        showResult(response, 'error')
    }
}

async function calculateMultiply(event) {
    event.preventDefault();
    try {
            let response = await makeRequest(BASE_API_URL + `multiply/`, 'POST', {
            'A': document.getElementById('A').value,
            'B': document.getElementById('B').value
        });
        let data = await response.json();
        console.log(data);
        showResult(data, 'answer');
    }
    catch (error) {
        error = await error.response
        response= await error
        response= await response.json()
        showResult(response, 'error')
    }
}

async function calculateDivide(event) {
    event.preventDefault();
    try {
            let response = await makeRequest(BASE_API_URL + `divide/`, 'POST', {
            'A': document.getElementById('A').value,
            'B': document.getElementById('B').value
        });
        let data = await response.json();
        console.log(data);
        showResult(data, 'answer');
    }
    catch (error) {
        error = await error.response
        response= await error
        response= await response.json()
        showResult(response, 'error')
    }
}

window.addEventListener('load', function () {
    const addBtn = document.getElementById('add');
    const subBtn = document.getElementById('subtract');
    const mulBtn = document.getElementById('multiply');
    const divBtn = document.getElementById('divide');
    addBtn.onclick=calculateAdd;
    subBtn.onclick=calculateSubtract;
    mulBtn.onclick=calculateMultiply;
    divBtn.onclick=calculateDivide;
});

async function showResult(data, key) {
    result = document.getElementById('result');
    if (key==='error') {
        result.textContent = `Error: ${data[key]}`
        result.style['color'] = 'red'
    } else if (key==='answer') {
        result.textContent = `Result: ${data[key]}`
        result.style['color'] = 'green'
    }

}