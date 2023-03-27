window.addEventListener('load', function() {
  go()
})

function go() {
  let new_badge_el = document.querySelector('#new-badge-container')
  if (new_badge_el != null) {
    new_badge_el.classList.remove('preload')
    go_create_badge_page()
  }
}

function go_create_badge_page() {
  let state = {
    is_button_down: false,
    is_progress_bar_visible: false,
  }

  let big_button_el = document.querySelector('#the-big-button')
  let progress_bar_container_el = document.querySelector('#progress-bar-container')

  big_button_el.addEventListener('mousedown', big_button_down)
  window.addEventListener('mouseup', big_button_up)

  function big_button_down(event) {
    if (!state.is_progress_bar_visible) {
      progress_bar_container_el.classList.remove('hidden')
      state.is_progress_bar_visible = true
    }

    state.is_button_down = true
  }

  function big_button_up(event) {
    state.is_button_down = false
  }
}
