# 🏗️ Clean Architecture Generator
A VS Code extension that scaffolds Flutter projects following **Clean Architecture** principles.

<!-- SCREENSHOT -->

---

## ✨ Features

- **Clean Architecture Scaffolding**  
  Automatically generates folder structure based on Clean Architecture standards.

- **Separation of Concerns**  
  Divides code into **Presentation**, **Domain**, and **Data** layers for better scalability and maintainability.

- **Modular Folder Setup**  
  Creates essential folders such as `core/`, `config/`, and `features/`.

- **Service Locator Ready**  
  Integrates easily with the `get_it` package for dependency injection.

- **Command-Based Initialization**  
  Run a single command to scaffold your project structure.

---


## 🏛️ Architecture

### Folder Structure

```plaintext
lib/
└── app/
    ├── core/
    │   ├── errors/
    │   ├── network/
    │   ├── usecases/
    │   ├── utils/
    │   └── constants/
    ├── config/
    │   ├── routes/
    │   ├── theme/
    │   └── locales/
    └── features/
        └── feature_name/
            ├── data/
            │   ├── datasources/
            │   ├── models/
            │   └── repositories/
            ├── domain/
            │   ├── entities/
            │   ├── repositories/
            │   └── usecases/
            └── presentation/
                ├── blocs/
                ├── pages/
                └── widgets/
```

### Layer Breakdown

| Layer           | Purpose                                              | Examples                                |
|------------------|-------------------------------------------------------|------------------------------------------|
| **Core**         | Shared logic and utilities used across the app       | `errors/`, `network/`, `usecases/`, `utils/` |
| **Config**       | Global app configuration                             | `routes/`, `theme/`, `locales/`         |
| **Data**         | Handles data access from APIs, databases, etc.       | `datasources/`, `models/`, `repositories/` |
| **Domain**       | Business logic, abstract repositories, and entities  | `entities/`, `usecases/`, `repositories/` |
| **Presentation** | Manages UI, state, and user interaction              | `blocs/`, `pages/`, `widgets/`          |

> 📁 The structure ensures a modular, scalable, and maintainable Flutter project aligned with Clean Architecture principles.

---

## 📦 Dependencies

The following dependencies should be added to your `pubspec.yaml`:

```yaml
dependencies:
  get_it: ^X.X.X   # Replace with the latest version
  flutter:
    sdk: flutter
```

> 💡 Make sure to run `flutter pub get` after updating your YAML.

---

## 🛠️ Usage

To scaffold a clean architecture structure:

```bash
initCleanProject
```

You can run this from the Command Palette after installing the extension.

<!-- SCREENSHOT -->

---

## 📚 Resources

Here are some helpful links to understand and implement Clean Architecture in Flutter:

- 📖 [Flutter Clean Architecture Guide – Reso Coder](https://resocoder.com/flutter-clean-architecture-tdd/)
- 🧱 [Clean Architecture – Robert C. Martin (Uncle Bob)](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- 🧪 [Test-Driven Development in Flutter](https://flutter.dev/docs/cookbook/testing/unit/introduction)
- 🔧 [`get_it` Package on pub.dev](https://pub.dev/packages/get_it)
- 📦 [VS Code Extension Authoring Docs](https://code.visualstudio.com/api)

> 💡 These resources are great starting points if you’re new to Clean Architecture or want to improve your project structure.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).  
© 2025 Your Name or Organization
