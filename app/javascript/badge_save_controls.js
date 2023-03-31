function show_badge_save_modal(badge_colors) {
  let overlay_el = document.querySelector('#full-window-overlay')

  overlay_el.classList.add('obscuring-for-modal')
  overlay_el.addEventListener('click', function(event) {
    event.preventDefault()
    cancel_modal()
  })


  function cancel_modal() {
    overlay_el.classList.remove('obscuring-for-modal')
  }
}


export { show_badge_save_modal }
