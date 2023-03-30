function init_new_badge_page() {
  let state = {
    is_button_down: false,
    progress_pct: 0,
    badge_colors: [],
  }


  let big_button_el = document.querySelector('#the-big-button')
  let progress_bar_container_el = document.querySelector('#progress-bar-container')
  let progress_bar_el = progress_bar_container_el.querySelector('.bar')
  let badge_el = document.querySelector('#the-badge')
  let save_and_share_el = document.querySelector('.save-and-share')
  let delete_and_restart_el = document.querySelector('.delete-and-restart')
  let vignetting_effect_overlay_el = document.querySelector('#vignetting-effect-overlay')


  function on_button_press(event) {
    if (big_button_el.classList.contains('disabled')) return;
    if (event.button !== 0) return;   // left click only

    start_filling_animation()
    state.is_button_down = true
  }
  big_button_el.addEventListener('mousedown', on_button_press)
  big_button_el.addEventListener('touchstart', on_button_press)

  function on_button_release(event) {
    state.is_button_down = false
  }
  window.addEventListener('mouseup', on_button_release)
  window.addEventListener('touchend', on_button_release)

  save_and_share_el.addEventListener('click', function(event) {
    event.preventDefault()
    if (save_and_share_el.classList.contains('disabled')) return;

    alert("This doesn't do anything yet!!")
  })

  delete_and_restart_el.addEventListener('click', function(event) {
    event.preventDefault()
    if (save_and_share_el.classList.contains('disabled')) return;

    alert("This doesn't do anything yet!!")
  })


  function start_filling_animation() {
    let previous_timer = null

    function animate(timer) {
      if (previous_timer == null) {
        previous_timer = timer
      }
      let elapsed = timer - previous_timer

      let fill_rate = fill_rate_curve()
      let growth = elapsed / 1000.0 * fill_rate
      state.progress_pct += growth
      state.progress_pct = Math.min(100.0, state.progress_pct)
      state.progress_pct = Math.max(0.0, state.progress_pct)

      if (state.progress_pct >= 100.0) {
        add_new_color()
        return
      }

      draw_progress_bar()

      if (state.is_button_down
        || (state.progress_pct > 0 && state.progress_pct < 100)) {
        requestAnimationFrame(animate)
      }

      previous_timer = timer
    }

    requestAnimationFrame(animate)
  }

  function draw_progress_bar() {
    let get_intense = (state.progress_pct > 85 && state.is_button_down)
    progress_bar_el.classList.toggle('almost-full', get_intense)
    progress_bar_el.style.width = `${state.progress_pct}%`

    if (get_intense) {
      let blur = `${state.progress_pct}px`
      let spread = `${state.progress_pct}px`
      let darkness = `${state.progress_pct}%`
      vignetting_effect_overlay_el.style.boxShadow = `inset 0 0 ${blur} ${spread} rgb(0, 0, 0, ${darkness}`
    } else {
      vignetting_effect_overlay_el.style.boxShadow = 'none'
    }
  }

  function draw_badge() {
    let stripes = Array.from(badge_el.querySelectorAll('.badge-stripe'))
    let turn_pips = Array.from(document.querySelectorAll('.turn-pip'))
    let width_pct = 100.0 / state.badge_colors.length

    for (let idx=0; idx < state.badge_colors.length; ++idx) {
      let stripe = stripes[idx]
      let pip = turn_pips[idx]
      let color = state.badge_colors[idx]
      stripe.style.x = `${idx * width_pct}%`
      stripe.style.width = `${width_pct}%`
      stripe.style.fill = color
      stripe.classList.add('animate-color-adding')
      pip.style.borderStyle = 'solid'
      pip.style.borderColor = 'white'
      pip.style.backgroundColor = color
    }
  }


  function add_new_color() {
    if (state.badge_colors.length < 5) {
      state.badge_colors.push(generate_random_color())
    }
    state.is_button_down = false
    state.progress_pct = 0.0

    save_and_share_el.classList.toggle('disabled', state.badge_colors.length === 0)
    delete_and_restart_el.classList.toggle('disabled', state.badge_colors.length === 0)
    big_button_el.classList.toggle('disabled', state.badge_colors.length >= 5)
    big_button_el.toggleAttribute('disabled', state.badge_colors.length >= 5)

    draw_badge()
    draw_progress_bar()
  }

  function fill_rate_curve() {
    if (state.is_button_down) {
      let remaining = 100.0 - state.progress_pct
      return (remaining * remaining) * 0.03 + 3
    } else {
      return -25.0
    }
  }

  function generate_random_color() {
    let h = Math.floor(Math.random() * 360)
    let s = Math.floor(Math.random() * 80) + 20
    let l = Math.floor(Math.random() * 70) + 30

    return `hsl(${h} ${s}% ${l}%)`
  }
}


export { init_new_badge_page }
