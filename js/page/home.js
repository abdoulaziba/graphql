import { fetchData } from "../../utils/utils.js"
import { queryUser, queryXpTotal, queryCurrentAndLastProject, querySkills, queryProject } from "../../graphql/query.js"
import { radarChart } from "../components/radar_chart.js"
import { columnChart } from "../components/column_chart.js"

export default class Home {
    constructor() {
        this.userInfo = {}
        this.totalXP = 0
        this.lastProject = {}
        this.skills = []
        this.projects = []
    }

    async GetUserInfos() {
        const token = document.cookie

        try {
            const responseUserInfo = await fetchData(token, queryUser)
            const responseTotalXP = await fetchData(token, queryXpTotal)
            const responseLastProject = await fetchData(token, queryCurrentAndLastProject)
            const responseSkills = await fetchData(token, querySkills)
            const responseProjects = await fetchData(token, queryProject)
            
            console.log(responseUserInfo)
            console.log(responseTotalXP)
            console.log(responseLastProject)
            console.log(responseSkills)
            console.log(responseProjects)
            
            this.userInfo = responseUserInfo.data.user[0]
            this.totalXP = Math.round(parseInt(responseTotalXP.data.transaction_aggregate.aggregate.sum.amount)/1000)
            this.lastProject = responseLastProject.data.progress[0]
            if (this.lastProject.group.status == "working") {
                this.lastProject.group.status = "working on"
            }
            this.skills = responseSkills.data.transaction
            this.projects = responseProjects.data.xp_view
            
            console.log(this.userInfo)
            console.log(this.totalXP)
            console.log(this.lastProject)
            console.log(this.skills)
            console.log(this.projects)

        } catch (error) {
            console.log("Invalid Token:", error)
        }
    }

    settinglogout() {
        const logout = document.getElementById("logout_button")
        logout.addEventListener("click", () => {
            console.log("enterlogin")
            document.cookie = null
            window.location.pathname = '/'
        })
    }

    async renderComponents() {
        try {
            await columnChart(this.projects)
            await radarChart(this.skills)
            this.settinglogout()
        } catch (error) {
            console.error("Error rendering charts:", error)
        }
    }


    async getHTML() {
        await this.GetUserInfos()
        document.title = 'home';
        return `
            <nav>
                <div class="graphql">
                    <div class="logo">
                        <!-- <img class="g_img" src="https://cdn.iconscout.com/icon/premium/png-256-thumb/graphql-2892022-2399460.png" alt=""> -->
                        <img class="g_img" src="../../assets/img/graphql_logo_white.png" alt="" class="g_img">
                        <h2>GraphQL</h2>
                    </div>
                    <div class="logout_button">

                        <button class="Btn" id="logout_button">

                            <div class="sign">
                            <svg viewBox="0 0 512 512">
                                <path
                                d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"
                                ></path>
                            </svg>
                            </div>

                        </button>  

                    </div>            
                </div>
            </nav>

            <div class="div_principal">

                <div class="section_1">

                    <!-- <div class="logo">
                        <img src="/div_positionning_prime/graphql_logo_white.png" alt="" class="g_img">
                        <h2>GraphQL</h2>
                    </div> -->

                    <div class="info">
                        <img src="//ui-avatars.com/api/?name=${this.userInfo.login}=100&rounded=true&color=fff&background=random" alt="">
                        <h4>${this.userInfo.firstName} ${this.userInfo.lastName}</h4>
                        <div class="infoUser">
                            <div><h4 style="color:#ec9c61">Username:</h4> ${this.userInfo.login}</div>
                            <div><h4 style="color:#ec9c61">Email:</h4>${this.userInfo.email}</div>
                            <div><h4 style="color:#ec9c61">Campus:</h4>${this.userInfo.campus}</div>
                        </div>
                    </div>

                </div>

                <div class="section_2">
                    <h3>Hello, <span style="color:#ec9c61">${this.userInfo.firstName} ${this.userInfo.lastName}</span>!</h3>

                    <div class="second_div">

                        <div class="third_div_1">

                            <div class="third_div_1_1">
                            <div class="level">${this.userInfo.events[0].level}</div>
                            Level
                            </div>

                            <div class="third_div_1_2" id="skills">
                                
                            </div>

                        </div>

                        <div class="third_div_2">

                            <div class="third_div_2_1">

                                <div class="third_div_2_1_1">
                                    <div class="xp" id="xps">${this.totalXP}</div>
                                    kB
                                </div>
            
                                <div class="third_div_2_1_2">
                                    <div class="last_project">You're ${this.lastProject.group.status} <span style="color:#ec9c61">${this.lastProject.group.object.name}</span></div>
                                </div>

                            </div>

                            <div class="third_div_2_2" id="projects">

                                
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        `
    }
}

