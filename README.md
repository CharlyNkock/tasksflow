# TaskFlow

TaskFlow est un projet Django de gestion de tâches, conçu pour organiser les tâches d'un utilisateur avec un système simple et extensible.

## ✨ Fonctionnalités

- Création de tâches
- Association des tâches à un utilisateur
- Statut de complétion
- Date de création et de mise à jour
- Base de données SQLite pour le développement
- Préparation pour une extension API avec Django REST Framework

## 🧱 Stack technique

- Python 3
- Django
- Django REST Framework
- SQLite

## 📁 Structure du projet

```bash
tasksflow/
├── manage.py
├── .gitignore
├── README.md
├── taskflow_backend/
│   ├── __init__.py
│   ├── asgi.py
│   ├── settings.py
│   ├── urls.py
│   └── wsgi.py
├── tasks/
│   ├── __init__.py
│   ├── admin.py
│   ├── apps.py
│   ├── migrations/
│   ├── models.py
│   ├── tests.py
│   └── views.py
└── .venv/              # environnement virtuel local
```

## ⚙️ Prérequis

- Python 3.10 ou supérieur
- pip
- Git

## 🚀 Installation

1. Ouvrir un terminal dans le dossier du projet :

```bash
cd G:\Projet\portfolio\tasksflow
```

2. Créer un environnement virtuel :

```bash
python -m venv .venv
```

3. Activer l'environnement virtuel :

Sous Windows PowerShell :

```bash
.\.venv\Scripts\Activate.ps1
```

4. Installer les dépendances :

```bash
pip install django djangorestframework
```

## 🏃 Lancer le projet

1. Appliquer les migrations :

```bash
python manage.py migrate
```

2. Démarrer le serveur de développement :

```bash
python manage.py runserver
```

3. Ouvrir l'application dans le navigateur :

```text
http://127.0.0.1:8000/
```

## 🗃️ Modèle principal

Le projet contient un modèle `Task` dans le fichier `tasks/models.py` avec les champs suivants :

- `owner` : utilisateur propriétaire de la tâche
- `title` : titre de la tâche
- `description` : description détaillée
- `completed` : statut de validation
- `created_at` : date de création
- `updated_at` : date de modification

## 🧪 Créer un superutilisateur

Pour accéder à l’interface d’administration Django :

```bash
python manage.py createsuperuser
```

Puis ouvrir :

```text
http://127.0.0.1:8000/admin/
```

## 📌 Prochaines étapes possibles

- Ajouter les vues CRUD pour les tâches
- Créer des endpoints API REST
- Ajouter l’authentification utilisateur
- Ajouter des filtres par statut et date
- Mettre en place un frontend simple

## 📝 Licence

Ce projet est fourni à des fins de développement et de démonstration.
