document.getElementById("submit-btn").addEventListener("click", function() {
    const userCode = document.getElementById("code-input").value.trim();
    const correctCode = `<!DOCTYPE html>
<html>
  <head>
    <title>Exemplo de HTML</title>
  </head>
  <body>
    <h1>Olá, mundo!</h1>
    <p>Aqui está um exemplo de código.</p>
  </body>
</html>`;

    if (userCode === correctCode) {
        document.getElementById("feedback").textContent = "Parabéns! Você corrigiu o código e passou para o próximo nível!";
        document.getElementById("feedback").style.color = "green";
        // Pode adicionar mais lógica para avançar para o próximo nível
    } else {
        document.getElementById("feedback").textContent = "Erro! Tente novamente.";
        document.getElementById("feedback").style.color = "red";
    }
});

