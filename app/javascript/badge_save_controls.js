import { draw_badge } from './draw_badge'


function show_badge_save_modal(badge_colors) {
  let overlay_el = document.querySelector('#full-window-overlay')
  let modal_el = document.querySelector('#save-badge-modal')
  let badge_el = modal_el.querySelector('.badge')
  let cancel_btn_el = modal_el.querySelector('.cancel')


  overlay_el.classList.add('obscuring-for-modal')
  modal_el.classList.add('active')
  draw_badge(badge_el, badge_colors, false)


  overlay_el.addEventListener('click', cancel_modal)
  cancel_btn_el.addEventListener('click', cancel_modal)


  function cancel_modal(event) {
    event.preventDefault()
    overlay_el.classList.remove('obscuring-for-modal')
    modal_el.classList.remove('active')
  }
}


export { show_badge_save_modal }
