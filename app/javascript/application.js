import { init_new_badge_page } from './new_badge_controls'
import { init_badge_show_page } from './badge_view_and_print_controls'


window.addEventListener('load', function() {
  let new_badge_container_el = document.querySelector('#new-badge-container')
  if (new_badge_container_el !== null) {
    init_new_badge_page()
  }

  let show_badge_container_el = document.querySelector('#show-badge-container')
  if (show_badge_container_el !== null) {
    init_badge_show_page()
  }

  // hack to prevent css transitions from firing on initial load
  let body = document.querySelector('body')
  body.classList.remove('preload')
})
