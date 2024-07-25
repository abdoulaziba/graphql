export {
    backToHome,
    session_expired,
    fetchData,
    parseJwt,
    setError,
}

function parseJwt(token) {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
}

function backToHome(route) {
    if (route == "/login" || route == "/") {
        const token_payload = parseJwt(document.cookie)
        if (token_payload) {
            window.location.href = "/home"
        }
    }
}

function session_expired() {
    const token_payload = parseJwt(document.cookie)
    if (!token_payload) {
        return true
    }
    return false
}

async function fetchData(token, query) {
    const DOMAIN = "https://learn.zone01dakar.sn"

    const response = fetch (`${DOMAIN}/api/graphql-engine/v1/graphql`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({query: query})
    })

    return (await response).json()
}

function setError(token) {
    console.log(token)
    const form = document.getElementById('log_in')
    const div = document.createElement("div")
    div.className = "alert"
    div.id = "alert_mess"
    div.innerHTML = `
        <p style="color:red">${token}</p> 
    `
    form.appendChild(div)
    setTimeout(() => {
        const alertMess = document.getElementById('alert_mess');
        if (alertMess) {
            alertMess.remove();
        }
    }, 1000);
}