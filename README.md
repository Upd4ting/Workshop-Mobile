# Workshop - Application mobile

### Installation de l'environnement NativeScript 

WARNING: Les personnes sous MAC, je leurs conseille vivement d'emprunter un ordinateur ubuntu de becode pour ce workshop, non pas que je ne serais pas vous aider le jour même à corriger les erreurs qu'il pourrait y avoir mais qu'il y a beaucoup de choses à télécharger et que sa vous ferait perdre beaucoup de temps. 

#### Linux 

WARNING: `$USER` est à chaque fois à remplacer par votre nom d'utilisateur

-	Activer la technologie de virtualisation dans le bios
	Aller dans le bios
	Avancé
	Configuration des périphériques
	Cocher "Technologie de virtualisation"
	Redémarrer le PC
-	`sudo apt-get install nodejs`
-	`sudo apt-get install lib32z1 lib32ncurses5 libbz2-1.0:i386 libstdc++6:i386`
-	`sudo apt-get install g++`
-	`sudo apt-get install openjdk-8-jdk`
-	Il nous faut maintenant mettre la variable d'environnement JAVA_HOME
	Ouvrir `./bashrc`
	Ajouter cette ligne: `export JAVA_HOME=$(update-alternatives --query javac | sed -n -e 's/Best: (.)/bin/javac/\1/p')`
	Ensuite téléchargez ce fichier: https://www27.zippyshare.com/v/uHpKn0TX/file.html
	On extrait le zip et on move le dossier tools dans `/usr/lib/android/sdk`
	Clique droit sur le fichier, extraire ici
	On créer le dossier `/android/sdk` avec la commande `sudo mkdir -p /usr/lib/android/sdk`
	On move le dossier `tools` dedans  en faisant `sudo mv ./tools/ /usr/lib/android/sdk`
	On ouvre le `.bashrc` et on y ajoute les lignes suivantes:
	`export ANDROID_HOME="/usr/lib/android/sdk/"`
	`export PATH="${PATH}:${ANDROID_HOME}tools/bin/"`
	On redémarre le terminal
-	`sudo $ANDROID_HOME/tools/bin/sdkmanager "tools" "emulator" "platform-tools" "platforms;android-28" "build-tools;28.0.3" "extras;android;m2repository" "extras;google;m2repository"`
-	`sudo $ANDROID_HOME/tools/bin/sdkmanager "system-images;android-23;google_apis;x86_64"`
-	`sudo $ANDROID_HOME/tools/bin/sdkmanager emulator`
-	`sudo $ANDROID_HOME/tools/bin/sdkmanager --licenses`
-	`avdmanager create avd -n MyEmulator -k "system-images;android-23;google_apis;x86_64"`
-	`sudo npm install nativescript -g`
-	On redémarre le terminal
-	On effectue `tns doctor` et si on voit "No issues detected" c'est bon
-	Ensuite effectuer la commande suivante: `sudo chown -R becode: /dev/kvm`
-	`sudo chown -R becode: /home/$USER/.android/`
-	`$ANDROID_HOME/tools/emulator @MyEmulator`
-	Ensuite on coupe l'émulateur
-	`sudo chown -R becode: /home/$USER/.emulator_console_auth_token`
-	Si l'émulateur s'est lancé sans erreur, tout est bon
-	On créer déjà un projet avec la commande `tns create app --ts`
-	Ensuite `cd app/`
-	`tns run android --emulator` et on laisse tout le building se faire et télécharger ce qu'il faut
On est bon pour le workshop

#### Windows

-	Exécuter ceci dans un cmd en mode administrateur `@powershell -NoProfile -ExecutionPolicy Bypass -Command "iex ((new-object net.webclient).DownloadString('https://www.nativescript.org/setup/win'))"`
-	On effectue `tns doctor` et si on voit "No issues detected" c'est bon

Pour effectuer l'installation d'un émulateur android: 
-   `cd $ANDROID_HOME/tools/bin` Il faut remplacer $ANDROID_HOME par le path ou les tools java ce sont installé
-   `sdkmanager "system-images;android-23;google_apis;x86_64"`
-   `sdkmanager emulator`
-   `sdkmanager --licenses`
-   `avdmanager create avd -n MyEmulator -k "system-images;android-23;google_apis;x86_64"`
-	`cd $ANDROID_HOME/tools/`
-	`emulator @MyEmulator`
-	Si l'émulateur se lance correctement c'est bon, si vous avez une erreur d'hardware acceleration, installer [ceci](https://github.com/intel/haxm/releases)
-	On créer déjà un projet avec la commande `tns create app --ts`
-	Ensuite `cd app/`
-	`tns run android --emulator` et on laisse tout le building se faire et télécharger ce qu'il faut

#### MAC

ATTENTION, je n'ai pas de MAC donc je n'ai pas su essayé et voir les différentes erreurs que vous pouvez avoir sous MAC. Je veux bien les résoudre le jour même mais si ça ne fonctionne pas je vous recommande fortement de prendre un ordinateur ubuntu de becode car les download sont assez lourd et le faire le jour même lors du workshop va vous faire perdre enormément de temps

-	Exécuter ceci dans un cmd en mode administrateur `ruby -e "$(curl -fsSL https://www.nativescript.org/setup/mac)"`
-	On effectue `tns doctor` et si on voit "No issues detected" c'est bon

Pour effectuer l'installation d'un émulateur android: 
-   `cd $ANDROID_HOME/tools/bin` Il faut remplacer $ANDROID_HOME par le path ou les tools java ce sont installé
-   `sdkmanager "system-images;android-23;google_apis;x86_64"`
-   `sdkmanager emulator`
-   `sdkmanager --licenses`
-   `avdmanager create avd -n MyEmulator -k "system-images;android-23;google_apis;x86_64"`
-	`cd $ANDROID_HOME/tools/`
-	`emulator @MyEmulator`
-	Si l'émulateur se lance correctement c'est bon, si vous avez une erreur d'hardware acceleration, installer [ceci](https://github.com/intel/haxm/releases)
-	On créer déjà un projet avec la commande `tns create app --ts`
-	Ensuite `cd app/`
-	`tns run android --emulator` et on laisse tout le building se faire et télécharger ce qu'il faut

### Tester l'application

Pour tester votre application, vous avez plusieurs choix:
-   La commande `tns preview`, permet de générer un QR-Code, qui peut être scanner avec l'application mobile `NativeScript Playground` et votre application sera streamé directement en hot reload sur votre device. Cette méthode est limitée, car l'application `NativeScript Playground` dispose d'un nombre de plugin préinstallé limité, si vous voulez travailler avec des plugins spécifique, il faudra utiliser les autres méthodes.
-   La commande `tns run android --bundle` afin d'exécuter l'application sur votre téléphone en hot reload, votre téléphone doit être branché en USB sur votre ordinateur, le mode développeur doit être activé (voir sur internet méthode d'activation qui est différentes par device) et le débogage USB doit être activé aussi.
-   La commande `tns run android --emulator` qui permet de lancer directement sur un émulateur sur votre ordinateur mais qui doit avoir été installé au préalable. 

### Matériel à apporter

-   Téléphone android (Deboggage USB et options développeurs activées)
-   Cable USB pour brancher le téléphone au PC 
-   Avoir déjà créer un projet nativescript vide et avoir réussi à le lancer sur son téléphone/émulateur

Le matériel est optionnel bien évidemment, l'émulateur peut faire l'affaire mais c'est toujours plus agréable de tester en live sur son téléphone.

### Les projets

Plusieurs projets sont mit à disposition afin de satisfaire tout le monde, choissisez celui qui vous plaît le mieux.

#### Projet Actualité

Ce projet consiste à réaliser une application contenant les pages suivantes:

-   Page de connexion.
-   Page d'inscription.
-   Page d'accueil avec affichage de nouveautés.
-   Page pour encoder une nouveauté

Vous retrouverez les instructions de ce projet [ici](./Actualite/README.md)

#### Projet Pong

Ce projet consiste à réaliser un petit Pong.

Vous retrouverez les instructions de ce projet [ici](./Pong/README.md)
