import React from 'react'
import ReactDOM from 'react-dom'
import SocialCard from './SocialCard'

// Post postsContainer
let postsContainer = document.querySelectorAll('[data-container="posts"]')

if (postsContainer.length > 0) {

  // Get json data
  let request = new XMLHttpRequest()
  request.open('GET', '/assets/scripts/posts.json')
  request.responseType = 'json'
  request.send()

  // When data is returned...
  request.onload = function() {
    // @Data returned
    let data = request.response
    // Loop through data
    for(let i in data) {
      // Create a div...
      let eachDiv = document.createElement("DIV")
      // With Bootstrap classes
      eachDiv.setAttribute("class", "col-md-8 offset-md-2")
      // Add each created div to that container
      postsContainer[0].appendChild(eachDiv)

      // Render each div as a react component
      ReactDOM.render( <SocialCard data={data[i]} />, eachDiv )
    }
  }
}

/* Just a bit of fun for the console log for nosey devs */
console.log("%cFound what you're looking for? Get in touch if you want to hire me. ;)", "background: #C35B5B; color: white; font-size: small");
