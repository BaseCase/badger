import { draw_badge } from './draw_badge'


function init_badge_show_page() {
  let badge_el = document.querySelector('.badge')
  draw_badge(badge_el, window.badge_colors, false)


  let badge_tpl = document.querySelector('#tpl-badge-to-print')
  let printable_badges = document.querySelectorAll('.badge-placeholder')
  Array.from(printable_badges).forEach(function(container) {
    let badge = badge_tpl.content.firstElementChild.cloneNode(true)
    container.appendChild(badge)
    draw_badge(badge, window.badge_colors, false)
  })
}


export { init_badge_show_page }
