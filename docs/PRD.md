# Créer le dossier docs s'il n'existe pas
mkdir -p docs

# Créer le fichier avec cat (copie tout le contenu entre les EOF)
cat > docs/PRD.md << 'EOF'
# 📋 Product Requirements Document (PRD)

## TaskFlow Pro - Application de Gestion de Projets

---

# 1. Vue d'Ensemble

## 1.1 Résumé Exécutif

**TaskFlow Pro** est une application SaaS moderne de gestion de projets et de tâches conçue pour les équipes de 2 à 50 personnes. Elle combine la simplicité d'utilisation de Trello avec la puissance de Linear et la flexibilité de Notion.

| Attribut | Valeur |
|----------|--------|
| **Nom du produit** | TaskFlow Pro |
| **Version** | 1.0.0 |
| **Date** | Février 2025 |
| **Auteur** | Équipe Produit |
| **Statut** | En développement |

---

## 1.2 Vision Produit

> **"Permettre aux équipes de transformer leurs idées en actions concrètes, avec clarté et efficacité."**

TaskFlow Pro vise à devenir l'outil de référence pour les équipes qui cherchent un équilibre entre simplicité et fonctionnalités avancées, sans la complexité des outils enterprise.

---

## 1.3 Objectifs Stratégiques

| Objectif | Métrique de Succès | Timeline |
|----------|-------------------|----------|
| Acquisition utilisateurs | 1 000 utilisateurs actifs | Q2 2025 |
| Rétention | 40% DAU/MAU ratio | Q3 2025 |
| Conversion Freemium → Paid | 5% | Q3 2025 |
| NPS Score | > 50 | Q4 2025 |
| Temps moyen sur l'app | > 15 min/jour | Q2 2025 |

---

## 1.4 Proposition de Valeur Unique (UVP)

**Pour** les équipes produit, développement et marketing
**Qui** ont besoin de gérer leurs projets et tâches efficacement
**TaskFlow Pro** est une application de gestion de projets
**Qui** combine simplicité visuelle et fonctionnalités puissantes
**Contrairement à** Trello (trop simple), Jira (trop complexe), Notion (trop générique)
**Notre produit** offre le juste équilibre avec un Kanban intuitif, des automatisations intelligentes et une collaboration temps réel.

---

# 2. Personas Utilisateurs

## 2.1 Persona Principal : Sarah - Chef de Projet Tech

| Attribut | Détail |
|----------|--------|
| **Âge** | 32 ans |
| **Rôle** | Product Manager |
| **Entreprise** | Startup SaaS (25 employés) |
| **Expérience** | 5 ans en gestion de projet |
| **Outils actuels** | Trello, Slack, Google Docs |

### Objectifs
- Avoir une vue claire de l'avancement des projets
- Réduire les réunions de synchronisation
- Responsabiliser les membres de l'équipe

### Frustrations
- Trello manque de fonctionnalités avancées (rapports, dépendances)
- Jira est trop complexe pour son équipe
- Information dispersée entre plusieurs outils

### Citation
> *"J'ai besoin d'un outil que mon équipe va vraiment utiliser, pas d'une usine à gaz qu'ils vont éviter."*

---

## 2.2 Persona Secondaire : Marc - Développeur Senior

| Attribut | Détail |
|----------|--------|
| **Âge** | 28 ans |
| **Rôle** | Lead Developer |
| **Équipe** | 5 développeurs |
| **Outils actuels** | GitHub, Linear, VS Code |

### Objectifs
- Voir rapidement ses tâches assignées
- Lier les tâches aux commits/PR
- Minimiser le context switching

### Frustrations
- Trop de clics pour mettre à jour une tâche
- Pas d'intégration avec son workflow dev
- Notifications non pertinentes

### Citation
> *"Je veux passer mon temps à coder, pas à mettre à jour des tickets."*

---

## 2.3 Persona Tertiaire : Julie - Fondatrice

| Attribut | Détail |
|----------|--------|
| **Âge** | 38 ans |
| **Rôle** | CEO & Fondatrice |
| **Entreprise** | Agence digitale (12 employés) |
| **Préoccupations** | Vue d'ensemble, reporting, coûts |

### Objectifs
- Vue dashboard de tous les projets
- Rapports pour les clients
- Contrôler les coûts logiciels

### Frustrations
- Payer par utilisateur devient cher
- Pas de vue consolidée multi-projets
- Exports limités pour les clients

### Citation
> *"J'ai besoin de voir en 30 secondes si on est dans les temps sur tous nos projets."*

---

# 3. Analyse de Marché

## 3.1 Landscape Concurrentiel

                Complexité
                    ↑
                    │
       Jira ●       │       ● Monday.com
                    │
    ──────────●─────┼──────────────────→ Prix
          Linear    │           ● Asana
                    │
       ● Trello     │    ● Notion
                    │
          ★ TaskFlow Pro (cible)
                    │
                Simplicité


---

## 3.2 Analyse SWOT

| Forces | Faiblesses |
|--------|------------|
| ✅ UX moderne et intuitive | ❌ Nouveau sur le marché |
| ✅ Stack technique moderne | ❌ Pas encore d'intégrations |
| ✅ Prix compétitif | ❌ Équipe réduite |
| ✅ Performance rapide | ❌ Pas de mobile natif |

| Opportunités | Menaces |
|--------------|---------|
| 📈 Marché en croissance | ⚠️ Concurrents établis |
| 📈 Remote work permanent | ⚠️ Consolidation du marché |
| 📈 Fatigue des outils complexes | ⚠️ IA générative (nouveaux entrants) |
| 📈 Demande d'outils intégrés | ⚠️ Budget IT réduit |

---

## 3.3 Différenciateurs Clés

| Feature | Trello | Jira | Linear | Notion | **TaskFlow Pro** |
|---------|--------|------|--------|--------|------------------|
| Kanban intuitif | ✅ | ⚠️ | ✅ | ⚠️ | ✅ |
| Rapports avancés | ❌ | ✅ | ✅ | ❌ | ✅ |
| Temps réel | ⚠️ | ❌ | ✅ | ⚠️ | ✅ |
| Automatisations | ⚠️ | ✅ | ✅ | ❌ | ✅ |
| Multi-langue | ⚠️ | ✅ | ❌ | ⚠️ | ✅ |
| Prix accessible | ✅ | ❌ | ⚠️ | ✅ | ✅ |
| Onboarding < 5 min | ✅ | ❌ | ⚠️ | ⚠️ | ✅ |

---

# 4. Fonctionnalités Produit

## 4.1 Vue d'Ensemble des Epics
┌─────────────────────────────────────────────────────────────────┐
│ TaskFlow Pro │
├──────────────┬──────────────┬──────────────┬───────────────────┤
│ 🔐 Auth │ 📁 Projects │ 📋 Tasks │ 👥 Team │
├──────────────┼──────────────┼──────────────┼───────────────────┤
│ ⚙️ Settings │ 📊 Reports │ 🔔 Notifs │ 🔗 Integrations│
├──────────────┼──────────────┼──────────────┼───────────────────┤
│ 🔍 Search │ 📱 Mobile │ 🤖 Automations│ 💳 Billing │
└──────────────┴──────────────┴──────────────┴───────────────────┘


---

## 4.2 Prioritisation MoSCoW

### 🔴 MUST HAVE (MVP - Phase 1)

| ID | Feature | Description | Story Points |
|----|---------|-------------|--------------|
| F-001 | Authentification | Email/password + OAuth (Google, GitHub) | 8 |
| F-002 | Gestion des projets | CRUD projets avec couleur, icône, description | 5 |
| F-003 | Board Kanban | Colonnes personnalisables, drag & drop | 13 |
| F-004 | Gestion des tâches | CRUD tâches, priorité, deadline, assignation | 8 |
| F-005 | Gestion d'équipe | Invitations, rôles (Owner, Admin, Member, Viewer) | 8 |
| F-006 | Profil utilisateur | Modifier profil, avatar, préférences | 3 |
| F-007 | Multi-langue | Français, Anglais, Espagnol | 5 |
| F-008 | Thème sombre | Toggle light/dark mode | 2 |
| **Total** | | | **52 SP** |

---

### 🟡 SHOULD HAVE (Phase 2)

| ID | Feature | Description | Story Points |
|----|---------|-------------|--------------|
| F-009 | Commentaires | Commentaires sur les tâches avec mentions @user | 8 |
| F-010 | Notifications | In-app + email pour événements importants | 8 |
| F-011 | Recherche globale | Command palette (⌘K) pour recherche rapide | 5 |
| F-012 | Filtres avancés | Filtrer par statut, priorité, assigné, date | 5 |
| F-013 | Vue liste des tâches | Alternative au Kanban, vue tableau | 5 |
| F-014 | Sous-tâches | Tâches imbriquées avec progression | 5 |
| F-015 | Checklists | Liste de cases à cocher dans une tâche | 3 |
| F-016 | Labels/Tags | Étiquettes personnalisables par projet | 3 |
| F-017 | Pièces jointes | Upload de fichiers (images, docs) | 5 |
| F-018 | Historique d'activité | Audit log des actions sur un projet | 5 |
| **Total** | | | **52 SP** |

---

### 🟢 COULD HAVE (Phase 3)

| ID | Feature | Description | Story Points |
|----|---------|-------------|--------------|
| F-019 | Vue Calendrier | Affichage des deadlines sur calendrier | 8 |
| F-020 | Rapports basiques | Graphiques de progression, vélocité | 8 |
| F-021 | Templates de projet | Modèles préconfigurés (Sprint, Marketing, etc.) | 5 |
| F-022 | Intégration GitHub | Lier commits/PR aux tâches | 8 |
| F-023 | Intégration Slack | Notifications dans Slack | 5 |
| F-024 | Time tracking | Timer intégré par tâche | 8 |
| F-025 | Export CSV/PDF | Exporter les données du projet | 3 |
| F-026 | Duplicer projet | Cloner un projet existant | 3 |
| F-027 | Archivage | Archiver projets et tâches terminés | 2 |
| F-028 | Mode offline (PWA) | Fonctionnement basique sans connexion | 8 |
| **Total** | | | **58 SP** |

---

### ⚪ WON'T HAVE (Future)

| ID | Feature | Description |
|----|---------|-------------|
| F-029 | Vue Gantt | Timeline avec dépendances |
| F-030 | Goals/OKRs | Objectifs d'équipe avec key results |
| F-031 | Ressources & Capacité | Planification de charge |
| F-032 | API Publique | REST/GraphQL pour intégrations tierces |
| F-033 | White-labeling | Custom branding pour entreprises |
| F-034 | SSO Enterprise | SAML, LDAP |
| F-035 | Multi-workspace | Plusieurs espaces de travail |
| F-036 | App mobile native | iOS et Android |

---

## 4.3 User Stories Détaillées

### Epic : Authentification (F-001)

```gherkin
Feature: Authentification utilisateur

  Scenario: Inscription avec email
    Given je suis sur la page d'inscription
    When je remplis le formulaire avec nom, email et mot de passe
    And je clique sur "S'inscrire"
    Then mon compte est créé
    And je suis redirigé vers le dashboard
    And je reçois un email de bienvenue

  Scenario: Connexion avec Google
    Given je suis sur la page de connexion
    When je clique sur "Continuer avec Google"
    And je m'authentifie sur Google
    Then je suis connecté à TaskFlow Pro
    And je suis redirigé vers le dashboard

  Scenario: Mot de passe oublié
    Given je suis sur la page de connexion
    When je clique sur "Mot de passe oublié"
    And je saisis mon email
    Then je reçois un email avec un lien de réinitialisation
    And le lien expire après 24 heures

  Scenario: Protection des routes
    Given je ne suis pas connecté
    When j'essaie d'accéder au dashboard
    Then je suis redirigé vers la page de connexion
    And l'URL de callback est sauvegardée

Feature: Board Kanban

  Scenario: Créer une colonne
    Given je suis sur le board d'un projet
    When je clique sur "Ajouter une colonne"
    And je saisis le nom "En test"
    And je choisis la couleur violet
    Then la colonne apparaît à droite du board
    And elle est vide

  Scenario: Déplacer une tâche entre colonnes
    Given j'ai une tâche "Implémenter login" dans "À faire"
    When je glisse la tâche vers "En cours"
    Then la tâche apparaît dans "En cours"
    And elle disparaît de "À faire"
    And le compteur des colonnes est mis à jour
    And l'historique enregistre le déplacement

  Scenario: Réordonner les tâches
    Given j'ai 3 tâches dans la colonne "À faire"
    When je glisse la 3ème tâche en 1ère position
    Then l'ordre est mis à jour
    And les positions sont recalculées

  Scenario: Réordonner les colonnes
    Given j'ai les colonnes "À faire", "En cours", "Terminé"
    When je glisse "En cours" avant "À faire"
    Then l'ordre devient "En cours", "À faire", "Terminé"

Feature: Gestion des tâches

  Scenario: Créer une tâche
    Given je suis sur le board d'un projet
    When je clique sur "+" dans une colonne
    And je remplis le titre "Corriger le bug #123"
    And je sélectionne la priorité "Haute"
    And je définis la deadline au "15/03/2025"
    And j'assigne la tâche à "Marc"
    And je clique sur "Créer"
    Then la tâche apparaît dans la colonne
    And Marc reçoit une notification

  Scenario: Marquer une tâche comme terminée
    Given j'ai une tâche "Écrire documentation"
    When je coche la case de la tâche
    Then la tâche passe en statut "Terminé"
    And elle est barrée visuellement
    And le compteur de progression est mis à jour

  Scenario: Filtrer les tâches
    Given j'ai 10 tâches avec différentes priorités
    When je sélectionne le filtre "Priorité: Urgente"
    Then seules les tâches urgentes sont affichées
    And un badge indique le filtre actif

4.4 Critères d'Acceptation Généraux
Performance
 Temps de chargement initial < 3 secondes
 Time to Interactive < 5 secondes
 Drag & drop fluide (60 fps)
 Pas de lag visible sur les actions utilisateur
Accessibilité
 Score Lighthouse Accessibility > 90
 Navigation clavier complète
 Contraste WCAG AA
 Support lecteur d'écran
Sécurité
 Authentification sécurisée (JWT)
 Protection CSRF
 Validation des inputs côté serveur
 Permissions vérifiées sur chaque action
Compatibilité
 Chrome, Firefox, Safari, Edge (2 dernières versions)
 Responsive (mobile, tablet, desktop)
 Fonctionne en mode sombre et clair

5. Architecture Technique
5.1 Stack Technologique
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND                                 │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 15 (App Router)  │  React 19  │  TypeScript 5          │
├─────────────────────────────────────────────────────────────────┤
│  Tailwind CSS  │  shadcn/ui  │  Framer Motion                   │
├─────────────────────────────────────────────────────────────────┤
│  Zustand (State)  │  React Hook Form  │  Zod (Validation)       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         BACKEND                                  │
├─────────────────────────────────────────────────────────────────┤
│  Next.js API Routes  │  Server Actions  │  NextAuth.js v5       │
├─────────────────────────────────────────────────────────────────┤
│  Prisma ORM  │  PostgreSQL  │  Redis (cache)                    │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      INFRASTRUCTURE                              │
├─────────────────────────────────────────────────────────────────┤
│  Vercel (Hosting)  │  Neon/PlanetScale (DB)  │  Cloudinary      │
├─────────────────────────────────────────────────────────────────┤
│  Pusher (Realtime)  │  Resend (Email)  │  Sentry (Monitoring)   │
└─────────────────────────────────────────────────────────────────┘

5.2 Modèle de Données
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    User      │────<│ProjectMember │>────│   Project    │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id           │     │ id           │     │ id           │
│ name         │     │ userId       │     │ name         │
│ email        │     │ projectId    │     │ description  │
│ password     │     │ role         │     │ color        │
│ image        │     │ joinedAt     │     │ icon         │
│ locale       │     └──────────────┘     │ ownerId      │
└──────────────┘                          │ isArchived   │
       │                                  └──────────────┘
       │                                         │
       ▼                                         ▼
┌──────────────┐                          ┌──────────────┐
│   Comment    │                          │    Board     │
├──────────────┤                          ├──────────────┤
│ id           │                          │ id           │
│ content      │                          │ name         │
│ taskId       │                          │ projectId    │
│ authorId     │                          └──────────────┘
└──────────────┘                                 │
                                                 ▼
                                          ┌──────────────┐
                                          │   Column     │
                                          ├──────────────┤
                                          │ id           │
                                          │ name         │
                                          │ position     │
                                          │ color        │
                                          │ boardId      │
                                          └──────────────┘
                                                 │
                                                 ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│   Checklist  │────<│    Task      │>────│    Label     │
├──────────────┤     ├──────────────┤     ├──────────────┤
│ id           │     │ id           │     │ id           │
│ title        │     │ title        │     │ name         │
│ done         │     │ description  │     │ color        │
│ taskId       │     │ priority     │     └──────────────┘
└──────────────┘     │ status       │
                     │ position     │
                     │ dueDate      │
                     │ columnId     │
                     │ assigneeId   │
                     └──────────────┘

5.3 Diagramme de Flux
Création d'une tâche
┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐    ┌─────────┐
│  User   │───>│   UI    │───>│  Store  │───>│   API   │───>│   DB    │
└─────────┘    └─────────┘    └─────────┘    └─────────┘    └─────────┘
     │              │              │              │              │
     │  1. Click    │              │              │              │
     │  "Add Task"  │              │              │              │
     │──────────────>              │              │              │
     │              │              │              │              │
     │  2. Open     │              │              │              │
     │  Modal       │              │              │              │
     │<──────────────              │              │              │
     │              │              │              │              │
     │  3. Fill     │              │              │              │
     │  Form        │              │              │              │
     │──────────────>              │              │              │
     │              │              │              │              │
     │              │  4. Optimistic              │              │
     │              │  Update      │              │              │
     │              │──────────────>              │              │
     │              │              │              │              │
     │              │              │  5. POST     │              │
     │              │              │  /api/tasks  │              │
     │              │              │──────────────>              │
     │              │              │              │              │
     │              │              │              │  6. INSERT   │
     │              │              │              │──────────────>
     │              │              │              │              │
     │              │              │              │  7. Return   │
     │              │              │              │<──────────────
     │              │              │              │              │
     │              │              │  8. Confirm  │              │
     │              │              │<──────────────              │
     │              │              │              │              │
     │              │  9. Update   │              │              │
     │              │  UI          │              │              │
     │              │<──────────────              │              │
     │              │              │              │              │
     │  10. Show    │              │              │              │
     │  Toast       │              │              │              │
     │<──────────────              │              │              │

6. Design & UX
6.1 Principes de Design
Principe	Description
Clarté	L'information importante est immédiatement visible
Efficacité	Minimum de clics pour accomplir une tâche
Cohérence	Patterns UI répétés et prévisibles
Feedback	Chaque action utilisateur a une réponse visuelle
Accessibilité	Utilisable par tous, clavier et lecteur d'écran
6.2 Design System
Couleurs
  Primary:     #6366f1 (Indigo)
  Secondary:   #8b5cf6 (Violet)
  Success:     #10b981 (Emerald)
  Warning:     #f59e0b (Amber)
  Danger:      #ef4444 (Red)
  Neutral:     #64748b (Slate)

  Background:  #ffffff (Light) / #0f172a (Dark)
  Surface:     #f8fafc (Light) / #1e293b (Dark)
  Border:      #e2e8f0 (Light) / #334155 (Dark)

Typographie
Font Family:  Inter (sans-serif)
Headings:     font-weight: 700
Body:         font-weight: 400
Small:        font-weight: 500

Sizes:
- H1: 2.25rem (36px)
- H2: 1.875rem (30px)
- H3: 1.5rem (24px)
- Body: 1rem (16px)
- Small: 0.875rem (14px)
- Tiny: 0.75rem (12px)

Espacements
  Base unit: 4px

  xs:  4px   (0.25rem)
  sm:  8px   (0.5rem)
  md:  16px  (1rem)
  lg:  24px  (1.5rem)
  xl:  32px  (2rem)
  2xl: 48px  (3rem)

Composants Clés
Composant	Usage
Button	Actions principales et secondaires
Card	Conteneurs de contenu
Input	Saisie de texte
Select	Sélection parmi des options
Modal	Actions contextuelles
Toast	Notifications temporaires
Badge	Indicateurs de statut
Avatar	Représentation utilisateur

6.3 Wireframes Clés
Dashboard

┌─────────────────────────────────────────────────────────────────┐
│ ┌─────┐  TaskFlow Pro          🔍 Search...    🌙 🌐 👤        │
│ │ ≡   │                                                         │
├─────────────────────────────────────────────────────────────────┤
│ │     │                                                         │
│ │  📊 │  Dashboard                              [+ New Project] │
│ │  📁 │  ─────────────────────────────────────────────────────  │
│ │  📋 │                                                         │
│ │  👥 │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│ │  ⚙️ │  │ Total   │ │ Active  │ │ Done    │ │ Overdue │       │
│ │     │  │   12    │ │    5    │ │    7    │ │    2    │       │
│ ├─────┤  └─────────┘ └─────────┘ └─────────┘ └─────────┘       │
│ │ FAV │                                                         │
│ │ ─── │  Recent Projects                                        │
│ │ 🚀  │  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│ │ 💼  │  │ ■ Project A  │ │ ■ Project B  │ │ ■ Project C  │    │
│ │     │  │ Description  │ │ Description  │ │ Description  │    │
│ │     │  │ ⭐ 📋 5      │ │ 📋 8         │ │ ⭐ 📋 3      │    │
│ │     │  └──────────────┘ └──────────────┘ └──────────────┘    │
│ │     │                                                         │
└─────────────────────────────────────────────────────────────────┘

Kanban Board
┌─────────────────────────────────────────────────────────────────┐
│ ┌─────┐  TaskFlow Pro          🔍 Search...    🌙 🌐 👤        │
│ │ ≡   │                                                         │
├─────────────────────────────────────────────────────────────────┤
│ │     │                                                         │
│ │  📊 │  🚀 Project Name                       [Filter] [+ Add] │
│ │  📁 │  ─────────────────────────────────────────────────────  │
│ │  📋 │                                                         │
│ │  👥 │  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐       │
│ │  ⚙️ │  │ ● To Do (4) │ │ ● Doing (2) │ │ ● Done (6)  │       │
│ │     │  ├─────────────┤ ├─────────────┤ ├─────────────┤       │
│ │     │  │ ┌─────────┐ │ │ ┌─────────┐ │ │ ┌─────────┐ │       │
│ │     │  │ │ Task 1  │ │ │ │ Task 5  │ │ │ │ Task 7  │ │       │
│ │     │  │ │ 🔴 High │ │ │ │ 🟡 Med  │ │ │ │ ✓ Done  │ │       │
│ │     │  │ └─────────┘ │ │ └─────────┘ │ │ └─────────┘ │       │
│ │     │  │ ┌─────────┐ │ │ ┌─────────┐ │ │ ┌─────────┐ │       │
│ │     │  │ │ Task 2  │ │ │ │ Task 6  │ │ │ │ Task 8  │ │       │
│ │     │  │ │ 🟡 Med  │ │ │ │ 🔴 Urg  │ │ │ │ ✓ Done  │ │       │
│ │     │  │ └─────────┘ │ │ └─────────┘ │ │ └─────────┘ │       │
│ │     │  │ ┌─────────┐ │ │             │ │             │       │
│ │     │  │ │ Task 3  │ │ │             │ │             │       │
│ │     │  │ │ 🟢 Low  │ │ │             │ │             │       │
│ │     │  │ └─────────┘ │ │             │ │             │       │
│ │     │  │             │ │             │ │             │       │
│ │     │  │ [+ Add]     │ │ [+ Add]     │ │ [+ Add]     │       │
│ │     │  └─────────────┘ └─────────────┘ └─────────────┘       │
│ │     │                                                         │
└─────────────────────────────────────────────────────────────────┘

7. Métriques & Analytics
7.1 KPIs Produit
Métrique	Définition	Objectif
DAU	Utilisateurs actifs quotidiens	500
WAU	Utilisateurs actifs hebdomadaires	800
MAU	Utilisateurs actifs mensuels	1000
DAU/MAU	Stickiness ratio	> 40%
Retention D7	% utilisateurs actifs après 7 jours	> 30%
Retention D30	% utilisateurs actifs après 30 jours	> 20%

7.2 KPIs Business
Métrique	Définition	Objectif
MRR	Revenu mensuel récurrent	$10k
Churn	Taux d'attrition mensuel	< 5%
LTV	Lifetime Value par client	> $200
CAC	Coût d'acquisition client	< $50
LTV/CAC	Ratio de rentabilité	> 4
NPS	Net Promoter Score	> 50

7.3 Events à Tracker
Catégorie	Event	Propriétés
Auth	user_signed_up	method, referrer
Auth	user_logged_in	method
Project	project_created	template_used
Project	project_archived	task_count
Task	task_created	priority, has_deadline
Task	task_completed	time_to_complete
Task	task_moved	from_column, to_column
Team	member_invited	role
Engagement	feature_used	feature_name

8. Roadmap
8.1 Timeline par Phases

         Q1 2025              Q2 2025              Q3 2025              Q4 2025
    ┌───────────────────┬───────────────────┬───────────────────┬───────────────────┐
    │     PHASE 1       │     PHASE 2       │     PHASE 3       │     PHASE 4       │
    │   MVP Launch      │   Growth          │   Scale           │   Enterprise      │
    ├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
    │ • Auth            │ • Commentaires    │ • Vue Calendrier  │ • API Publique    │
    │ • Projects        │ • Notifications   │ • Rapports        │ • SSO Enterprise  │
    │ • Kanban          │ • Recherche ⌘K    │ • Intégrations    │ • Multi-workspace │
    │ • Tasks           │ • Filtres         │ • Time tracking   │ • White-label     │
    │ • Team            │ • Sous-tâches     │ • Templates       │ • SLA             │
    │ • i18n            │ • Pièces jointes  │ • PWA/Mobile      │ • On-premise      │
    ├───────────────────┼───────────────────┼───────────────────┼───────────────────┤
    │ 🎯 1000 signups   │ 🎯 500 DAU        │ 🎯 $10k MRR       │ 🎯 Enterprise     │
    │ 🎯 Product Hunt   │ 🎯 5% conversion  │ 🎯 NPS > 50       │    deals          │
    └───────────────────┴───────────────────┴───────────────────┴───────────────────┘

    8.2 Milestones
Milestone	Date	Livrables
Alpha	15 Feb 2025	Core features, équipe interne
Beta Privée	1 Mar 2025	50 beta testers, feedback
Beta Publique	15 Mar 2025	500 utilisateurs, stabilité
Launch v1.0	1 Apr 2025	Product Hunt, marketing
v1.1	1 May 2025	Commentaires, notifications
v1.2	1 Jun 2025	Recherche, intégrations
v2.0	1 Sep 2025	Rapports, calendrier

9. Risques & Mitigation
Risque	Probabilité	Impact	Mitigation
Retard de développement	Moyenne	Élevé	Sprints courts, MVP minimal
Adoption faible	Moyenne	Élevé	Beta testers, feedback early
Performance issues	Faible	Élevé	Monitoring, tests de charge
Sécurité	Faible	Critique	Audit, bonnes pratiques
Concurrence	Élevée	Moyen	Différenciation UX, niche
Coûts infrastructure	Faible	Moyen	Serverless, scaling auto

10. Équipe & Ressources
10.1 Équipe Requise
Rôle	Responsabilités	Allocation
Product Manager	Vision, roadmap, priorisation	100%
Lead Developer	Architecture, code review	100%
Frontend Dev	UI/UX, React, Next.js	100%
Backend Dev	API, DB, infrastructure	100%
Designer	UI design, user research	50%
QA	Tests, qualité	50%

10.2 Budget Estimé
Catégorie	Mensuel	Annuel
Infrastructure (Vercel, DB, etc.)	$200	$2,400
Services tiers (Email, Monitoring)	$100	$1,200
Outils (Figma, GitHub, etc.)	$50	$600
Marketing initial	$500	$6,000
Total	$850	$10,200

11. Annexes
11.1 Glossaire
Terme	Définition
Board	Tableau Kanban contenant des colonnes et tâches
Column	Liste verticale de tâches dans un board
Sprint	Itération de développement (1-2 semaines)
Story Point	Unité de mesure de complexité
MVP	Minimum Viable Product
DAU/MAU	Daily/Monthly Active Users
MRR	Monthly Recurring Revenue
Churn	Taux d'attrition des utilisateurs

11.2 Références
Linear - Inspiration UX
Notion - Flexibilité
Trello - Simplicité
Jira - Features enterprise
11.3 Changelog
Version	Date	Auteur	Modifications
0.1	01/02/2025	PM	Création initiale
0.2	03/02/2025	PM	Ajout personas et user stories
1.0	05/02/2025	PM	Version finale pour review


