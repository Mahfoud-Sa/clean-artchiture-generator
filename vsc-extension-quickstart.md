# 🏗️ Clean Architecture Generator

A **VS Code extension** that scaffolds Flutter projects following **Clean Architecture** principles.

---

## 🚀 How to Use

To scaffold a clean architecture Flutter project using this extension, follow these steps:

1. **Open your VS Code Command Palette**  
   - Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)

2. **Run the Command**  
   Type and select:
   ```bash
   initCleanProject
   ```

3. **Choose a Project Name**  
   You'll be prompted to enter your app name. This name will be used as the root class for the generated structure.

4. **Folder Structure Generated Automatically**  
   Once confirmed, the extension will automatically scaffold the entire **Clean Architecture** folder structure for you:
   - `core/`, `config/`, `features/`, etc.
   - Organized into **data**, **domain**, and **presentation** layers under each feature.

> ✅ You're now ready to start building your Flutter app with a solid clean architecture foundation!

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

> 📁 This structure promotes modularity, scalability, and maintainability by aligning with Clean Architecture principles.

---

## 📦 Dependencies

Make sure to add the following to your `pubspec.yaml`:

```yaml
dependencies:
  get_it: ^<latest_version>   # Check https://pub.dev/packages/get_it for the latest
  flutter:
    sdk: flutter
```

> 💡 Don’t forget to run `flutter pub get` after saving the file.

---

## 🌟 Source Code & Star the Repo

📂 You can explore the source code or contribute here:  
🔗 **[GitHub Repository](https://github.com/Mahfoud-Sa/clean-artchiture-generator)**

⭐ If you find this extension useful, **please star the repo** and share it with others to support the project!
you can always be contributed on this repo, we always can see your updates.
---

## 👨‍💻 About the Developer

 **[Your Name]**  
🔗 [www.linkedin.com/in/mahfoud-sa]  
📫 For feedback or collaboration: [binsabbah2013@gmail.com]

> I created this extension to simplify project setup and promote clean architecture practices in Flutter. Feel free to reach out or contribute!

---

## 📚 Resources

- 📖 [Flutter Clean Architecture Guide – Reso Coder](https://resocoder.com/flutter-clean-architecture-tdd/)
- 🧱 [Clean Architecture – Robert C. Martin (Uncle Bob)](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- 🔧 [`get_it` Package on pub.dev](https://pub.dev/packages/get_it)

