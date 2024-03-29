# Rest-API-Tokenized-Text-Justification
Test suite à ma candidature pour un stage "Dev Backend Node.js"   
https://www.tictactrip.eu/   

# **Objectif**
Implémenter et déployer une API REST qui [justifie](https://fr.wikipedia.org/wiki/Justification_(typographie)) un texte passé en paramètre.   

## Contraintes
- La longueur des lignes du texte [justifié](https://fr.wikipedia.org/wiki/Justification_(typographie)) doit être de 80 caractères.   
- L’endpoint doit être de la forme /api/justify et doit retourner un texte justifié suite à une requête POST avec un body de ContentType text/plain   
- L’api doit utiliser un mécanisme d’authentification via token unique. En utilisant par exemple une endpoint api/token qui retourne un token d’une requête POST avec un json body {"email": "foo@bar.com"}.   
- Il doit y avoir un rate limit par token pour l’endpoint /api/justify, fixé à 80 000 mots par jour, si il y en a plus dans la journée il faut alors renvoyer une erreur 402 Payment Required.   
- Le code **doit être déployé** sur un url ou une ip public   
- Le code doit être rendu sur Github (ou gitlab)   
- Langage : Node.js → typescript   
- **PAS** d’usage de bibliothèque externe pour la justification   

## Exemples input / output
https://drive.google.com/drive/folders/1P8GFZBNVYM3KzE5TmJB1yLoecDBUqBc-   

## Process de recrutement chez Tictactrip :   
1. Exo de recrutement   
2. Selon profil, un appel    
2. Selon profil, 1 à 2 entretien.s (en visio ou sur site)   
https://www.tictactrip.eu/   
