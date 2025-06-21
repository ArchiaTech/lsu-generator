document.obtenirElementById("formulaire").ajouterEventListener("soumettre", async et => {
    et.empêcherDefault();

    constante formulaire = et.cible;

    constante données = {
        prénom: formulaire.prénom.valeur,
        classe: formulaire.classe.valeur,
        comportement: formulaire.comportement.valeur,
        commentaire: formulaire.commentaire.valeur,
    };

    essayer {
        constante réponse = attendre aller chercher("https://n8n.srv765539.hstgr.cloud/webhook/générer-commentaire", {
            méthode: "POST",
            en-têtes: {
                "Type de contenu": "application/json"
            },
            corps: JSON.chaîne de caractères(données)
        });

        constante résultat = attendre réponse.json();
        document.obtenirElementById("résultat").Texte intérieur = résultat.commentaire;
    } attraper (erreur) {
        document.obtenirElementById("résultat").Texte intérieur = "Erreur : " + erreur;
    }
});
