import Authentification from "./js/page/authentification.js";
import Router from "./js/router/router.js";
import Home from "./js/page/home.js"

const login = new Authentification()
const home = new Home()

const router = new Router ({
    "/": login,
    "/home": home,
})

router.init()
