const validate = (event) => {
  const inputElement = event.target;
  console.log(inputElement);
  inputElement.classList.add("signup__field__input--error");

  const errorDisplayElement = inputElement.parentElement.getElementsByClassName(
    "signup__field__error"
  )[0];
  errorDisplayElement.innerHTML = "Sample Error";
};

const inputElements = document.getElementsByClassName("signup__field__input");

for (const input of inputElements) {
  input.onblur = validate;
}
