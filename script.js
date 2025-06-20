document.getElementById("formulaire").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = e.target;
  const data = {
    prenom: form.prenom.value,
    classe: form.classe.value,
    comportement: form.comportement.value,
    commentaire: form.commentaire.value,
  };

  try {
    const response = await fetch("https://n8n.srv765539.hstgr.cloud/webhook/générer-commentaire", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("resultat").innerText = result.commentaire || "Aucun commentaire généré";
  } catch (error) {
    document.getElementById("resultat").innerText = "Erreur : " + error.message;
  }
});
