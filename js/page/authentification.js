import { session_expired, setError } from "../../utils/utils.js"

export default class Authentification {
    constructor() {
        this.credentials = {}
    }

    connectInput() {
        const informations = document.getElementById('log_in')

        informations.addEventListener('input', (event) => {
            this.credentials[event.target.id] = event.target.value
        })
        
        informations.addEventListener('click', (event) => {
            event.preventDefault()
            if (event.target.id === "login") {
                console.log(this.credentials)
                this.login()
            }
        })
    }

    async login() {

        const DOMAIN = "https://learn.zone01dakar.sn"

        try {
            const response = await fetch (`${DOMAIN}/api/auth/signin`, {
                method: "POST",
                headers: {
                    "Authorization": "Basic " + btoa(unescape(encodeURIComponent((this.credentials.nickname + ":" + this.credentials.password)))),
                    "Content-Type": "application/json"
                }
            })

            console.log(response)

            
            
            const token = await response.json()
            
            document.cookie = token;
            
            if (!response.ok) {
                setError(token.error)
                // return
            }

            // console.log(token)
            
            document.getElementById('log_in').reset();
            
            if (!session_expired()) {
                window.location.pathname = "/home"
            }
            
        } catch (error) {
            console.log("Invalid Enter")
        }
    }

    getHTML() {
        document.title = "login"
       return `
        <form id="log_in">

                    <div class="logo_login">
                        <!-- <img class="g_img" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/graphql-2892022-2399460.png" alt=""> -->
                        <img class="g_img" src="graphql_logo_white.png" alt="" class="g_img">
                        <h2>GraphQL</h2>
                    </div>

            <label for="username">Username</label>
            <input type="text" placeholder="Email or Username" id="nickname" required>

            <label for="password">Password</label>
            <input type="password" placeholder="Password" id="password" required>

            <button id="login">Log In</button>
        </form>
        `
    }
}
