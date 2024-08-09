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
const closeSuccessButton = document.querySelector("#success button")
const closeErrButton = document.querySelector("#err button")
const modalSuccess = document.getElementById("success")
const modalErr = document.getElementById("err")
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



  const formData = new FormData(form)
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
    .then(async (response) => {
      if (response.status == 200) {
        form.classList.add("none")
        article.classList.add("none")

        modalSuccess.show()
      } else {
        form.classList.add("none")
        article.classList.add("none")

        modalErr.show()
      }
    })
    .catch(error => {
      console.log(error);
      
      form.classList.add("none")
      article.classList.add("none")

      modalErr.show()
    })
}

closeSuccessButton.addEventListener("click", () => {
  modalSuccess.close()

  form.reset()
  form.classList.remove("none")
  article.classList.remove("none")
})
closeErrButton.addEventListener("click", () => {
  modalErr.close()

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

telefoneInput.addEventListener('input', function (event) {
  // Formata o valor e define no campo
  telefoneInput.value = formatarTelefone(event.target.value);
});