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



## 🏛️ Architecture

### Folder Structure

```plaintext
lib/
├── config/
├── core/
│   └── services/
├── features/
│   └── <feature_name>/
│       ├── data/
│       ├── domain/
│       └── presentation/
└── main.dart
```

### Layer Breakdown

| Layer         | Purpose                                | Examples                          |
|---------------|-----------------------------------------|-----------------------------------|
| **Presentation** | Handles UI and user interaction         | `widgets/`, `screens/`, `blocs/`  |
| **Domain**       | Business logic and entities             | `usecases/`, `entities/`, `repos/`|
| **Data**         | Data handling (API, local DB, etc.)     | `datasources/`, `models/`         |

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
init
```

You can run this from the Command Palette after installing the extension.

<!-- SCREENSHOT -->

---

