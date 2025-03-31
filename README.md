# CESI Eats
## Introduction
Le présent projet représente bien plus qu'une simple initiative technologique : c'est une opportunité unique de mettre en pratique l'ensemble des compétences que vous avez acquises au cours de vos années d'études en informatique en école d'ingénieurs. Cette entreprise ambitieuse vise à concevoir, réaliser, déployer, tester et utiliser une plateforme logicielle distribuée, destinée à révolutionner l'univers de la restauration en ligne.

Au cœur de cette plateforme se trouve une mission cruciale : rassembler et traiter les offres commerciales du domaine de la restauration. Cette plateforme propose une variété de services destinés à différents profils d'utilisateurs :

- des utilisateurs finaux à la recherche d'une livraison de repas,

- des restaurateurs désireux de rejoindre une nouvelle sphère de clientèle,

- les livreurs,

- le service commercial.

La plateforme joue le rôle de pivot technique pour la gestion fluide des flux de travail. Elle se présente comme un guichet unique pour une expérience culinaire personnalisée, offrant une gamme de services diversifiés qui s'adaptent aux besoins variés de chaque type d'utilisateur.

L'ampleur de ce projet constitue un challenge technique : il est le point d'aboutissement de vos études en informatique et incarne une simulation fidèle des défis auxquels vous pourriez être confrontés dans le monde professionnel. Comme dans une véritable entreprise, vous disposerez d'un ensemble de connaissances, mais pas de toutes, ce qui vous obligera à relever des défis jusqu'alors inconnus. Cette approche vous offre l'opportunité d'appliquer l'ensemble de vos acquis, des premières notions apprises en première année aux concepts avancés maîtrisés en quatrième année.

Le cahier des charges de ce projet comporte des sections bien définies, mais également des parties moins explicitement décrites, reflétant ainsi les conditions réalistes d'un projet d'entreprise. Votre tâche consistera à scruter ce cahier des charges avec minutie, à identifier les zones d'incertitude et à élaborer des solutions pour les résoudre. En somme, ce projet vous invite à plonger dans le monde complexe et passionnant de l'ingénierie logicielle, en unifiant l'ensemble de vos connaissances pour donner vie à une plateforme innovante et apte à transformer la manière dont le monde aborde la restauration en ligne.

# Convention de nommage
## Issues GitHub

Pour garder une cohérence avec la convention de commit, les issues seront nommées selon le format suivant :

```
<type>/<scope> - <titre>
```

### Exemples :
- feat/home - Ajouter un composant de recherche sur la page d'accueil  
- fix/auth - Corriger le bug de token invalide  
- docs/readme - Mettre à jour les instructions d'installation  

### Types acceptés :
- feat : Ajout de nouvelles fonctionnalités
- fix : Correction de bugs
- docs : Documentation uniquement
- style : Modification de style (CSS, formatage, etc.)
- refactor : Modification du code qui n'apporte pas de nouvelles fonctionnalités ni de corrections de bugs
- test : Ajout ou modification de tests
- chore : Maintenance du projet, configurations, etc.

---

## Commit
Convention Angular :
```
<numero de l'issues>: <message>
```
En anglais

### Exemple :
- 321: add search bar to homepage
- 058: handle invalid token error

---


## Branches GitHub

Les branches seront nommées en fonction de l'issue correspondante et respecteront le format suivant :

```
<initiales du dev>-<numéro-d'issue>
```

### Exemples :
- ET-320
- AM-069
