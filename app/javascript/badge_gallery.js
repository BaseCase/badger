import { draw_badge } from './draw_badge'


function init_badge_gallery_page() {
  let badge_els = document.querySelectorAll('.badge')
  let colors = window.badge_colors

  for (let i=0; i<colors.length; ++i) {
    draw_badge(badge_els[i], colors[i], false)
  }
}


export { init_badge_gallery_page }
