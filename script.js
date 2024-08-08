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


const form = document.querySelector("#form")
const article = document.querySelector(".article-form")
const closeButton = document.querySelector("dialog button")
const modal = document.querySelector("dialog")
const select = document.querySelector("#ask")
const select2 = document.querySelector("#ask2")

form.onsubmit = (e) => {
  e.preventDefault()


  const telefoneParaValidar = telefoneInput.value.replace(/\D/g, '');

  // Verifica se o número tem 10 ou 11 dígitos
  if (telefoneParaValidar.length < 10 || telefoneParaValidar.length > 11) {
      erroTelefone.style.display = 'inline';
      return
  } else {
      erroTelefone.style.display = 'none';
  }


  if (select.value === "" || select2.value === "") {
    alert("Preencha todos os campos!")
    return
  }

  modal.show()

  form.classList.add("none")
  article.classList.add("none")
}

closeButton.addEventListener("click", () => {
  modal.close()
  
  form.reset()
  form.classList.remove("none")
  article.classList.remove("none")
})




const telefoneInput = document.querySelector("#phone")



function formatarTelefone(valor) {
  const apenasNumeros = valor.replace(/\D/g, '');
  
  const limiteNumeros = apenasNumeros.slice(0, 11);

  if (limiteNumeros.length <= 10) {
      return limiteNumeros.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
  } else {
      return limiteNumeros.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
  }
}

telefoneInput.addEventListener('input', function(event) {
  // Formata o valor e define no campo
  telefoneInput.value = formatarTelefone(event.target.value);
});