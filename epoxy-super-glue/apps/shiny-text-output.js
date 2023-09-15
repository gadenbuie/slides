/* global EpoxyHTML */
function sendUpdatesToEpoxy (id) {
  return (event, value) => {
    if (typeof value === 'undefined') {
      value = { [event.target.id]: event.target.value }
    }
    if (typeof value === 'function') {
      value = value(event)
    }

    const data = { [id]: value }
    EpoxyHTML.update_all(data, true)
  }
}

function initApp () {
  const initData = {
    output: {
      greetings: document.getElementById('greetings').value,
      company: document.getElementById('company').value,
      year: document.getElementById('year').value
    }
  }
  EpoxyHTML.update_all(initData)
  Object.keys(initData.output).forEach(inputId => {
    document
      .getElementById(inputId)
      .addEventListener('input', sendUpdatesToEpoxy('output'))
  })
}

initApp()
// document.documentElement.setAttribute('data-bs-theme', 'dark')
