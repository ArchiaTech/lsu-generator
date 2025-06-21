document.obtenirElementById("formulaire").ajouterEventListener("soumettre", asynchrone et => {
    et.empêcherDefault();

    constante formulaire = et.cible;

    constante données = {
        prénom: formulaire.prénom.valeur,
        classe: formulaire.classe.valeur,
        comportement: formulaire.comportement.valeur,
        commentaire: formulaire.commentaire.valeur,
    };

    essayer {
        // Afficher un message de chargement
        document.obtenirElementById("résultat").Texte intérieur = "Génération en cours...";
        
        // URL modifiée pour correspondre exactement à celle configurée dans n8n (sans accent)
        constante réponse = attendre aller chercher("https://n8n.srv765539.hstgr.cloud/webhook-test/generer-commentaire", {
            méthode: "POST",
            en-têtes: {
                "Type de contenu": "application/json"
            },
            corps: JSON.chaîne de caractères(données)
        });

        // Vérification explicite du statut de la réponse
        console.log("Statut de la réponse:", réponse.statut);
        
        si (!réponse.d'accord) {
            lancer nouveau Erreur(`Erreur HTTP: ${réponse.statut}`);
        }

        constante résultat = attendre réponse.json();
        
        // Logs pour comprendre la structure de la réponse
        console.log("Résultat complet reçu:", résultat);

        // Vérification de l'existence de la propriété commentaire
        si (résultat && résultat.commentaire !== undefined) {
            document.obtenirElementById("résultat").Texte intérieur = résultat.commentaire;
        } else {
            console.erreur("La propriété commentaire est manquante dans:", résultat);
            document.obtenirElementById("résultat").Texte intérieur = "Erreur: Commentaire non trouvé dans la réponse";
        }
    } attraper (erreur) {
        console.erreur("Erreur lors de l'appel au webhook:", erreur);
        document.obtenirElementById("résultat").Texte intérieur = "Erreur : " + erreur.message;
    }
});
