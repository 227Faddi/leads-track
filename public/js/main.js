const deleteBtn = document.querySelectorAll('.deleteBtn')
const notContacted = document.querySelectorAll('.notContacted')
const contacted = document.querySelectorAll('.contacted')


document.addEventListener('DOMContentLoaded', function () {
  const modalKey = 'modalShown';
  // Check if the modal has been shown in this session
  const myModal = new bootstrap.Modal(document.getElementById('welcomeModal'));
  myModal.show();
  if (!sessionStorage.getItem(modalKey)) {
    // Set the flag in session storage so the modal doesn't show again during the session
    sessionStorage.setItem(modalKey, 'true');
  }
});


Array.from(deleteBtn).forEach((element) =>{
  element.addEventListener('click', deleteLead)
})

async function deleteLead(){
  const leadId = this.parentNode.getAttribute('data-id');
  try{
    const response = await fetch('/deleteLead', {
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
    const response = await fetch('/contacted', {
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
    const response = await fetch('/notContacted', {
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