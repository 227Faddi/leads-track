const deleteBtn = document.querySelectorAll('.deleteBtn')
const notContacted = document.querySelectorAll('.notContacted')
const contacted = document.querySelectorAll('.contacted')
const leadDetails = document.querySelectorAll('.lead-details') 

Array.from(deleteBtn).forEach((element) =>{
  element.addEventListener('click', deleteLead)
})

async function deleteLead(){
  const leadId = this.parentNode.getAttribute('data-id');
  try{
    const response = await fetch('/leads/deleteLead', {
      method: 'delete',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': leadId
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}

Array.from(notContacted).forEach((element) =>{
  element.addEventListener('click', leadContacted)
})

async function leadContacted(){ 
  const leadId = this.parentNode.getAttribute('data-id');
  try{
    const response = await fetch('/leads/markContacted', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': leadId
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}

Array.from(contacted).forEach((element) =>{
  element.addEventListener('click', leadNotContacted)
})

async function leadNotContacted(){
  const leadId = this.parentNode.getAttribute('data-id');
  try{
    const response = await fetch('/leads/markUnContacted', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'itemFromJS': leadId
      })
    })
    const data = await response.json()
    console.log(data)
    location.reload()
  }catch(err){
    console.log(err)
  }
}


// SCROLL RELOAD FIX
// Save scroll position before the page unloads
window.addEventListener('beforeunload', () => {
  localStorage.setItem('scrollPosition', window.scrollY);
});

// Restore scroll position after the page loads
window.addEventListener('load', () => {
  const scrollPosition = localStorage.getItem('scrollPosition');
  if (scrollPosition !== null) {
      window.scrollTo(0, parseInt(scrollPosition, 10));
      localStorage.removeItem('scrollPosition'); // Clear the saved position
  }
});