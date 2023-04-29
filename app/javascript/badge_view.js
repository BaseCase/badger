import { draw_badge } from './draw_badge'


function init_badge_show_page() {
  let badge_el = document.querySelector('.badge')
  draw_badge(badge_el, window.badge_colors, false)
}


export { init_badge_show_page }
