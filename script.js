document.getElementById("formulaire").addEventListener("submit", async function(event) {
  event.preventDefault();

  const donnees = {
    prenom: document.getElementById("prenom").value,
    classe: document.getElementById("classe").value,
    comportement: document.getElementById("comportement").value,
    commentaire: document.getElementById("commentaire").value,
  };

  console.log("Données envoyées :", donnees);

  try {
    document.getElementById("resultat").innerText = "Génération en cours...";

    const proxyUrl = "https://corsproxy.io/?";
    const urlCible = "https://n8n.srv765539.hstgr.cloud/webhook/generer-commentaire";

    const response = await fetch(proxyUrl + encodeURIComponent(urlCible), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(donnees)
    });

    if (!response.ok) throw new Error("Erreur HTTP : " + response.status);

    const result = await response.json();
    document.getElementById("resultat").innerText = result.commentaire ?? "Erreur : Commentaire non trouvé";
  } catch (err) {
    console.error("Erreur :", err);
    document.getElementById("resultat").innerText = "Erreur : " + err.message;
  }
});
