import {init_new_badge_page} from "./new_badge_controls";


window.addEventListener('load', function() {
  let new_badge_container_el = document.querySelector('#new-badge-container')
  if (new_badge_container_el != null) {
    init_new_badge_page()
  }

  // hack to prevent css transitions from firing on initial load
  let body = document.querySelector('body')
  body.classList.remove('preload')
})
