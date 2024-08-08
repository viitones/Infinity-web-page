const elements = document.querySelectorAll(".hidden")

const myObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show")
      myObserver.unobserve(entry.target)
    }
  })
})

elements.forEach((e) => {
  myObserver.observe(e)
})