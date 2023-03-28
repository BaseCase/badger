window.addEventListener('load', function() {
  go()
  let body = document.querySelector('body')
  body.classList.remove('preload')
})

function go() {
  let new_badge_el = document.querySelector('#new-badge-container')
  if (new_badge_el != null) {
    go_create_badge_page()
  }
}

function go_create_badge_page() {
  let state = {
    is_button_down: false,
    is_progress_bar_visible: false,
    progress_pct: 0,
    badge_colors: [],
  }


  let big_button_el = document.querySelector('#the-big-button')
  let progress_bar_container_el = document.querySelector('#progress-bar-container')
  let progress_bar_el = progress_bar_container_el.querySelector('.bar')
  let badge_el = document.querySelector('#the-badge')


  big_button_el.addEventListener('mousedown', function (event) {
    if (!state.is_progress_bar_visible) {
      progress_bar_container_el.classList.remove('hidden')
      state.is_progress_bar_visible = true
      state.progress_pct = 15
    }
    start_filling_animation()
    state.is_button_down = true
  })

  window.addEventListener('mouseup', function (event) {
    state.is_button_down = false
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

      draw_progress_bar()

      if (state.progress_pct >= 100.0) {
        add_new_color()
        return
      }

      if (state.is_button_down
        || (state.progress_pct > 0 && state.progress_pct < 100)) {
        requestAnimationFrame(animate)
      }

      previous_timer = timer
    }

    requestAnimationFrame(animate)
  }






  function add_new_color() {
    // lotta stuff happens here!
    //    1. badge appears
    //    2. badge gets first color
    //    3. the remaining two buttons and the 5 color pips appear
    //    4. bar drains to 0
    //   OR, if it's not the first color:
    //    1. new color appears
    //    2. color pip fills
    //    3. bar drains to 0

    let new_color = generate_random_color()
    state.badge_colors.push(new_color)
    state.is_button_down = false
    state.progress_pct = 0.0

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

  function draw_progress_bar() {
    let get_intense = (state.progress_pct > 85 && state.is_button_down)
    progress_bar_el.classList.toggle('almost-full', get_intense)
    progress_bar_el.style.width = `${state.progress_pct}%`
  }

  function draw_badge() {
    let stripes = Array.from(badge_el.querySelectorAll('.badge-stripe'))
    let width_pct = 100.0 / state.badge_colors.length

    for (let idx=0; idx < state.badge_colors.length; ++idx) {
      let stripe = stripes[idx]
      let color = state.badge_colors[idx]
      stripe.style.x = `${idx * width_pct}%`
      stripe.style.width = `${width_pct}%`
      stripe.style.fill = color
      stripe.classList.add('animate-color-adding')
    }
  }

  function generate_random_color() {
    let h = Math.floor(Math.random() * 360)
    let s = Math.floor(Math.random() * 80) + 20
    let l = Math.floor(Math.random() * 70) + 30

    return `hsl(${h} ${s}% ${l}%)`
  }
}
