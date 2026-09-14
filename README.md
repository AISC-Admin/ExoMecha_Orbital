# ExoMecha -- TITAN ORBITAL (site fusionne)

Site web statique bilingue (FR/EN) presentant le projet TITAN ORBITAL
d'ExoMecha, avec deux outils interactifs integres :

- **Cartographie du consortium** -- globe 3D des 22 structures juridiques
  du consortium et de leurs relations, avec module de valorisation.
- **Deploiement satellite** -- virtualisation 3D des deux hypotheses
  d'architecture orbitale (MEO pur 35 satellites / GEO + MEO reduit).

Design derive du systeme graphique du site A.I.S.C Space Exploration
Technologies (meme feuille de style, meme structure de header/footer,
mêmes composants), etendu avec quelques composants propres a ce site
(cartes d'outils, panneau d'integration des outils, notice de langue).

## Structure du projet

```
exomecha-site/
  index.html              Accueil (FR)
  cartographie.html       Page outil "Cartographie" (FR)
  satellites.html         Page outil "Satellites" (FR)
  en/
    index.html            Accueil (EN)
    cartography.html      Page outil "Corporate Mapping" (EN)
    satellites.html       Page outil "Satellite Deployment" (EN)
  apps/
    cartographie-app.html Application interactive de cartographie (FR uniquement)
    satellites-app.html   Application interactive de deploiement satellite (FR uniquement)
  assets/
    css/style.css         Feuille de style du site (systeme AISC + composants ajoutes)
    js/script.js          Script global (menu, scroll, animations, annee du footer)
    fonts/nasalizationrg.otf
    img/                  Visuels (hero, sections, logo/favicon)
  vercel.json
  .gitignore
  README.md
```

## Convention bilingue

Les pages FR sont a la racine du site ; leur equivalent EN vit dans le
dossier `en/`, avec les memes noms de fichiers autant que possible (a
l'exception de `cartographie.html` -> `en/cartography.html`, pour garder
une URL anglaise idiomatique). Les deux dossiers ne dupliquent pas les
ressources (`apps/`, `assets/`) : les pages `en/*.html` y referencent les
memes fichiers via des chemins relatifs (`../assets/...`, `../apps/...`).

Important : les deux outils interactifs embarques (`apps/cartographie-app.html`
et `apps/satellites-app.html`) restent pour l'instant en francais uniquement
-- ce sont des applications denses en donnees juridiques/techniques, et
seule l'interface du site (navigation, textes de presentation, accueil)
est traduite. Chaque page outil affiche une notice le signalant en clair.

## Deploiement

### Via GitHub + Vercel (recommande)

1. Creer un nouveau depot GitHub et y pousser le contenu de ce dossier :

   ```bash
   git init
   git add .
   git commit -m "Site TITAN ORBITAL -- version initiale"
   git branch -M main
   git remote add origin <url-de-votre-depot>
   git push -u origin main
   ```

2. Sur [vercel.com](https://vercel.com), choisir "Add New... -> Project",
   importer le depot GitHub. Aucune configuration de build n'est
   necessaire : c'est un site 100% statique (Framework Preset : "Other").
3. Vercel deploie automatiquement `index.html` a la racine et sert
   `en/` sous `/en/`. Le fichier `vercel.json` active des URLs "propres"
   (`/cartographie` au lieu de `/cartographie.html`).

### Deploiement manuel rapide (sans GitHub)

Avec la [CLI Vercel](https://vercel.com/docs/cli) installee :

```bash
cd exomecha-site
vercel --prod
```

## Mise a jour du contenu

Toutes les pages HTML de ce site sont generees a partir d'un script Python
(`build_exomecha_site.py`, non inclus dans ce depot de deploiement) afin de
garder les versions FR et EN synchronisees. Pour modifier durablement le
texte du site, il est preferable d'editer ce script cote generation plutot
que les fichiers HTML directement, afin d'eviter que les deux langues ne
divergent au fil des mises a jour.

## Notes

- Ce site est un document de travail interne prepare pour la revue du
  consortium et la revue du Pr. Ambrosini sur l'architecture orbitale
  (voir la note de bas de page du site).
- Les deux applications interactives utilisent des donnees issues des
  scripts de simulation orbitale et de la cartographie juridique du
  consortium ; elles sont a jour a la date de generation du site.
