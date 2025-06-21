document.getElementById("formulaire").addEventListener("submit", async function(event) {
    event.preventDefault();

    const formulaire = event.target;

    const données = {
        prénom: formulaire.prénom.value,
        classe: formulaire.classe.value,
        comportement: formulaire.comportement.value,
        commentaire: formulaire.commentaire.value
    };

    try {
        // Afficher un message de chargement
        document.getElementById("résultat").innerText = "Génération en cours...";
        
        // URL sans accent
        const réponse = await fetch("https://n8n.srv765539.hstgr.cloud/webhook-test/generer-commentaire", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(données)
        });

        // Vérification du statut
        console.log("Statut de la réponse:", réponse.status);
        
        if (!réponse.ok) {
            throw new Error(`Erreur HTTP: ${réponse.status}`);
        }

        const résultat = await réponse.json();
        
        // Log pour le débogage
        console.log("Résultat complet:", résultat);

        // Vérification de la propriété commentaire
        if (résultat && résultat.commentaire !== undefined) {
            document.getElementById("résultat").innerText = résultat.commentaire;
        } else {
            console.error("La propriété commentaire est manquante:", résultat);
            document.getElementById("résultat").innerText = "Erreur: Commentaire non trouvé dans la réponse";
        }
    } catch (erreur) {
        console.error("Erreur lors de l'appel au webhook:", erreur);
        document.getElementById("résultat").innerText = "Erreur : " + erreur.message;
    }
});
