import React from 'react'
import "../static/About.css"
function About() {
  
  return (
    <> 
    <div>
      <section id="team" class="team">

<h1 class="heading"><br/> Our Team</h1>

<div class="row">

<div class="card">
  <div class="image">
    <img src={require("../static/dnyaneshPatil.jpg")}/>
  </div>
  <div class="info">
    <h4>Dnyanesh Patil </h4>
    <h4>Full Stack-Web Developer</h4>
  </div>
</div>

<div class="card">
  <div class="image">
    <img  src={require("../static/ShivamDolase.jpg")}/>
  </div>
  <div class="info">
    <h4>Shivam Dolase </h4>
    <h4>Full Stack-Web Developer</h4>
    
  </div>
</div>

<div class="card">
  <div class="image">
    <img src={require("../static/MitaliMore.jpg")} alt=""/>
  </div>
  <div class="info">
    <h4>Mitali More </h4>
    <h4>Full Stack-Web Developer</h4>
    
  </div>
</div>
<div class="card">
  <div class="image">
    <img src={require("../static/AmrutaSawant.jpg")} alt=""/>
  </div>
  <div class="info">
    <h4>Amruta Sawant</h4>
    <h4>Full stack-Web Developer</h4>
    
  </div>
</div>
<div class="card">
  <div class="image">
    <img src={require("../static/Pooja.jpg")} alt=""/>
  </div>
  <div class="info">
    <h4>Pooja Padaswan</h4>
    <h4>Full stack-Web Developer</h4>
    
  </div>
</div>
</div>
</section>

    </div>
    </>
  )
}

export default About