function draw_badge(badge_el, colors, animate=true) {
  let stripes = Array.from(badge_el.querySelectorAll('.badge-stripe'))
  let width_pct = 100.0 / colors.length

  for (let idx=0; idx < colors.length; ++idx) {
    let stripe = stripes[idx]
    let color = colors[idx]
    stripe.style.x = `${idx * width_pct}%`
    stripe.style.width = `${width_pct}%`
    stripe.style.fill = color

    if (animate) {
      stripe.classList.add('animate-color-adding')
    }
  }
}


export { draw_badge }
