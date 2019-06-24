# Workshop - Application mobile

### Installation de l'environnement NativeScript 

Nous allons procéder à l'installation de `NativeScript` pour cela suivez les instructions suivantes: https://docs.nativescript.org/start/ns-setup-linux.
Pour les personnes étant sur `Windows`, l'installation se trouve ici: https://docs.nativescript.org/angular/start/quick-setup

Vous pouvez utiliser l'IDE de votre choix pour le développement de l'application mobile, pour ma part je vous conseille `VSCode` en installant juste le module `NativeScript` et `nativescript-cli`

Vous avez plusieurs choix pour la création d'un projet, vous pouvez partir sur du `javascript`, `typescript`, `angular` ou `vue.js`.
Les commandes de création se trouvent ici: https://docs.nativescript.org/tooling/docs-cli/project/creation/create

Je vous conseille de partir sur un projet `typescript` pour commencer à comprendre les bases du framework: `$ tns create MyApp --ts`

Je vous conseille grandement de lire cette page de doc afin de vous familiariser avec la structure de votre application: https://docs.nativescript.org/core-concepts/project-structure

Pour tester votre application, vous avez plusieurs choix:
-   La commande `tns preview`, permet de générer un QR-Code, qui peut être scanné avec l'application mobile `NativeScript Playground` et votre application sera streamée directement en hot reload sur votre device. Cette méthode est limitée, car l'application `NativeScript Playground` dispose d'un nombre de plugin préinstallé limité, si vous voulez travailler avec des plugins spécifiques, il faudra utiliser les autres méthodes.
-   La commande `tns run android --bundle` afin d'exécuter l'application sur votre téléphone en hot reload, votre téléphone doit être branché en USB sur votre ordinateur, le mode développeur doit être activé (voir sur internet méthode d'activation qui est différente par device) et le débogage USB doit être activé aussi.
-   La commande `tns run android --emulator` qui permet de lancer directement sur un émulateur sur votre ordinateur mais qui doit avoir été installé au préalable. 

Pour effectuer l'installation d'un émulateur android: 
-   `cd $android_home/tools/bin`
-   `sdkmanager "system-images;android-23;google_apis;x86_64"`
-   `sdkmanager emulator`
-   `sdkmanager --licenses`
-   `avdmanager create avd -n MyEmulator -k "system-images;android-23;google_apis;x86_64"`

Si vous rencontrez des erreurs lors du démarrage du projet sur émulateur:
-   Essayez de lancer l'émulateur manuellement avec `emulator @MyEmulator` puis de lancer le projet nativescript.
-   Si une erreur qt apparait, lancez la commande `emulator @MyEmulator` dans `$android_home/tools/`
-   Pour ceux sur Windows qui ont une erreur d'hardware acceleration, installez [ceci](https://github.com/intel/haxm/releases)
-   Ensuite faire appel à vos camarades, google ou moi même :) 

### Matériel à apporter

-   Téléphone android (Deboggage USB et options développeurs activées)
-   Cable USB pour brancher le téléphone au PC 
-   Avoir déjà créer un projet nativescript vide et avoir réussi à le lancer sur son téléphone/émulateur

Le matériel est optionnel bien évidemment, l'émulateur peut faire l'affaire mais c'est toujours plus agréable de tester en live sur son téléphone.

### Les projets

Plusieurs projets sont mis à disposition afin de satisfaire tout le monde, choissisez celui qui vous plaît le mieux.

#### Projet Actualité

Ce projet consiste à réaliser une application contenant les pages suivantes:

-   Page de connexion.
-   Page d'inscription.
-   Page d'accueil avec affichage de nouveautés.
-   Page pour encoder une nouveauté

Vous trouverez les instructions de ce projet [ici](./Actualite/README.md)

#### Projet Pong

Ce projet consiste à réaliser un petit Pong.

Vous trouverez les instructions de ce projet [ici](./Pong/README.md)
