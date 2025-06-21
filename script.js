document.getElementById("formulaire").addEventListener("submit", async function(event) {
    event.preventDefault();
    
    // Récupérer les valeurs directement par leur ID
    const données = {
        prénom: document.getElementById("prenom").value,
        classe: document.getElementById("classe").value,
        comportement: document.getElementById("comportement").value,
        commentaire: document.getElementById("commentaire").value
    };
    
    console.log("Données envoyées:", données);
    
    try {
        // Afficher un message de chargement
        document.getElementById("resultat").innerText = "Génération en cours...";
        
        // Utilisation d'un proxy CORS pour contourner les restrictions
        const proxyUrl = "https://corsproxy.io/?";
        const targetUrl = "https://n8n.srv765539.hstgr.cloud/webhook-test/generer-commentaire";
        
        const réponse = await fetch(proxyUrl + encodeURIComponent(targetUrl), {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(données)
        });
        
        console.log("Statut de la réponse:", réponse.status);
        
        if (!réponse.ok) {
            throw new Error(`Erreur HTTP: ${réponse.status}`);
        }
        
        const résultat = await réponse.json();
        console.log("Résultat complet:", résultat);
        
        // Vérification de la propriété commentaire
        if (résultat && résultat.commentaire !== undefined) {
            document.getElementById("resultat").innerText = résultat.commentaire;
        } else {
            console.error("La propriété commentaire est manquante:", résultat);
            document.getElementById("resultat").innerText = "Erreur: Commentaire non trouvé dans la réponse";
        }
    } catch (erreur) {
        console.error("Erreur lors de l'appel au webhook:", erreur);
        document.getElementById("resultat").innerText = "Erreur : " + erreur.message;
    }
});
