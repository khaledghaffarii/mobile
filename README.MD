# Projet E-Commerce

Ce projet est une application de commerce électronique développée en React Native. Il permet aux utilisateurs de parcourir une liste de produits, d'afficher les détails d'un produit, de les ajouter au panier et de passer une commande.

## Instructions d'installation et de lancement

### Prérequis

- Node.js et npm installés localement
- React Native CLI installé localement
- Un émulateur Android ou iOS configuré ou un appareil mobile connecté

### Étapes d'installation

1. Clonez ce dépôt sur votre machine locale.
2. Accédez au répertoire du projet dans votre terminal.
3. Exécutez `npm install` pour installer toutes les dépendances.

### Exécution de l'application

1. Pour exécuter l'application sur un émulateur Android, exécutez `npx react-native run-android`.
2. Pour exécuter l'application sur un émulateur iOS, exécutez `npx react-native run-ios`.
3. Pour exécuter l'application sur un appareil mobile connecté, assurez-vous que l'appareil est connecté via USB et exécutez `npx react-native run-android` ou `npx react-native run-ios` selon votre appareil.

## Technologies utilisées

- React Native
- TypeScript
- Redux (pour la gestion de l'état global)
- React Navigation (pour la navigation entre les écrans)
- Axios (pour les requêtes HTTP)
- ESLint et Prettier (pour le linting et le formatage du code)

## Structure du code

Le code est organisé selon la structure suivante :

- `context/` : Contextes React pour la gestion de l'état global
- `navigation/` : Configuration de la navigation entre les écrans
- `screens/` : Écrans de l'application
- `services/` : Services pour les requêtes HTTP et autres fonctions utilitaires
- `types/` : Définitions de types TypeScript
- `utils/` : Fonctions utilitaires
