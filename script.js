document.getElementById("formulaire").addEventListener("soumettre", async et => {
    et.preventDefault();

    const formulaire = et.cible;

    const données = {
        prénom: formulaire.prénom.valeur,
        classe: formulaire.classe.valeur,
        comportement: formulaire.comportement.valeur,
        commentaire: formulaire.commentaire.valeur,
    };

    try {
        // URL modifiée pour correspondre exactement à celle configurée dans n8n
        const réponse = await fetch("https://n8n.srv765539.hstgr.cloud/webhook-test/générer-commentaire", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(données)
        });

        if (!réponse.ok) {
            throw new Error(`Erreur HTTP: ${réponse.status}`);
        }

        const résultat = await réponse.json();
        document.getElementById("résultat").innerText = résultat.commentaire;
    } catch (erreur) {
        console.error("Erreur lors de l'appel au webhook:", erreur);
        document.getElementById("résultat").innerText = "Erreur : " + erreur.message;
    }
});
