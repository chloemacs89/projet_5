# Application Web JustStreamIt

Projet de site web pour l'association JustStreamit :
  * Propose des films à regarder, par classement et par catégories. 
  * Pour le moment, les catégories proposées sont : 
	* Le meilleur film
	* Les 7 meilleurs films
	* Les meilleurs films de Science-Fiction
	* Les meilleurs films fantastiques
	* Les meilleurs films d'horreur
  * Les informations sont obtenues par requêtes à l'API OC-Movies
  
# API OC-Movies

L'API n'est pas encore en ligne. Il convient donc de l'utiliser localement à partir de son propre ordinateur. Pour utiliser lancer l'API, voici les étapes à suivre : 
  * `git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git`
  * Déplacer vous dans le répertoire : `cd ocmovies-api-en`
  * Créer l'environnement virtuel : `py -m venv env` sur windows, `python3 -m venv env` sur linux et MacOS
  * Activer l'environnement virtuel : `env/Scripts/activate` sur windows, `source env/bin/activate` sur Linux et MacOS
  * Installer les dépendances du projet : `pip install -r requirements.txt`
  * Créer la base de données : `python manage.py create_db`
  * Lancer le serveur : `python manage.py runserver`
  
Pour d'avantage d'informations sur le fonctionnement de l'API, référez-vous au README sur le dépôt Github du projet : <https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR>
	

