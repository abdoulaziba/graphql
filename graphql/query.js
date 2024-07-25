export { 
        queryProject, 
        querySkills, 
        queryUser, 
        queryXp, 
        queryXpTotal, 
        queryCurrentAndLastProject, 
        queryTotalProjet 
}

// les Informationsde l'utilisateur
const queryUser = `{
  user {
    id
    email
    login
    firstName
    lastName
    campus
    auditRatio
    events(where: {eventId: {_eq: 56}}) {
      level
    }
  }
}`

// Xp par projet + Checkpoint + Piscine JS
const queryXp = `{
  transaction(order_by: {createdAt: desc} where: {type: {_eq: "xp"}, eventId: {_eq: 56}}) {
    createdAt
    amount
    object{
      name
    }
  }
}`

// Tous les skills: (ai, algo, backend, css, docker, frontend, game, go, html, js, prog, sql, stats, sys_admin, tcp, unix)
const querySkills = `{
  transaction(
    where: {eventId: {_eq: 56}, _and: {type: {_like: "skill_%"}}}
    distinct_on: type
    order_by: [{type: asc}, {amount: desc}]
  ) {
    type
    amount
  }
}`


// <img src="//ui-avatars.com/api/?name=abdoulaziba&size=100&rounded=true&color=fff&background=random" alt>

// Xp total de l'utilisateur
const queryXpTotal = `{
  transaction_aggregate(
    where: {transaction_type: {type: {_eq: "xp"}}, event: {path: {_eq: "/dakar/div-01"}}}
  ) {
    aggregate {
      sum {
        amount
      }
    }
  }
}`

// 10 projets avec leurs xp sans compter les checkpoints et les piscines
const queryProject = `{
  xp_view: transaction(
  limit: 10, 
    order_by: {createdAt: desc} 
    where: {type: {_eq: "xp"}, path: {_like: "%div-01%"}, _and: [{path: {_nlike: "%piscine%"}}, {path: {_nlike: "%checkpoint%"}}]}
  ) {
    amount
    object {
      name
    }
  }
}`

// Toutes les projets avec leurs xp sans compter les checkpoints et les piscines
const queryTotalProjet = `{
  xp_view: transaction(
    order_by: {createdAt: desc} 
    where: {type: {_eq: "xp"}, path: {_like: "%div-01%"}, _and: [{path: {_nlike: "%piscine%"}}, {path: {_nlike: "%checkpoint%"}}]}
  ) {
    amount
    object {
      name
    }
  }
}`

// Statistiques des projets, dates de creation des groupes et la status
const queryCurrentAndLastProject = `{
  progress(where: {eventId: {_eq: 56}}, order_by: {createdAt: desc}) {
    group {
      status
      createdAt
      object {
        name
      }
    }
  }
}`
