import { init_badge_gallery_page } from './badge_gallery'
import { init_new_badge_page } from './new_badge_controls'
import { init_badge_show_page } from './badge_show'
import { init_badge_print_page } from './badge_print'


window.addEventListener('load', function() {
  let badge_gallery_container_el = document.querySelector('#badge-gallery')
  if (badge_gallery_container_el !== null) {
    init_badge_gallery_page()
  }

  let new_badge_container_el = document.querySelector('#new-badge-container')
  if (new_badge_container_el !== null) {
    init_new_badge_page()
  }

  let show_badge_container_el = document.querySelector('#show-badge-container')
  if (show_badge_container_el !== null) {
    init_badge_show_page()
  }

  let print_badge_container_el = document.querySelector('#print-badge-container')
  if (print_badge_container_el !== null) {
    init_badge_print_page()
  }

  // hack to prevent css transitions from firing on initial load
  let body = document.querySelector('body')
  body.classList.remove('preload')
})
