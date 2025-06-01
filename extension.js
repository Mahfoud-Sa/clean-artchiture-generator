const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function activate(context) {
    console.log('Congratulations, your extension "clean-architecture-generator" is now active!');

    let initProjectDisposable = vscode.commands.registerCommand('clean-architecture-generator.initCleanProject', async function () {
        // Get workspace folder
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Please open a workspace first.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;

        // Show input box for project name
        const projectName = await vscode.window.showInputBox({
            prompt: 'Enter your project name',
            placeHolder: 'my_flutter_app',
            validateInput: text => {
                return text.match(/[^a-z0-9_]/) ? 'Only lowercase letters, numbers and underscores' : null;
            }
        });

        if (!projectName) {
            return;
        }

        try {
            // Create Clean Architecture folder structure inside lib folder
            const projectStructure = {
                'lib': {
                    'app': {
                        'core': {
                            'errors': [],
                            'network': [],
                            'usecases': [],
                            'utils': [],
                            'constants': []
                        },
                        'config': {
                            'routes': [],
                            'theme': [],
                            'locales': []
                        },
                        'features': {
                            'feature_name': {
                                'data': {
                                    'datasources': [],
                                    'models': [],
                                    'repositories': []
                                },
                                'domain': {
                                    'entities': [],
                                    'repositories': [],
                                    'usecases': []
                                },
                                'presentation': {
                                    'blocs': [],
                                    'pages': [],
                                    'widgets': []
                                }
                            }
                        }
                    }
                }
            };

            // Create folders recursively
            const createStructure = (basePath, structure) => {
                for (const [name, content] of Object.entries(structure)) {
                    const currentPath = path.join(basePath, name);
                    
                    if (typeof content === 'object' && !Array.isArray(content)) {
                        fs.mkdirSync(currentPath, { recursive: true });
                        createStructure(currentPath, content);
                    } else {
                        fs.mkdirSync(currentPath, { recursive: true });
                    }
                }
            };

            // Create files
            const createFiles = (basePath) => {
                // Create main.dart
                const mainDartPath = path.join(basePath, 'lib', 'main.dart');
                fs.writeFileSync(mainDartPath, `import 'package:flutter/material.dart';
import 'package:${projectName.toLowerCase()}/app/injection_container.dart' as di;

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await di.init();
  runApp(const ${projectName.charAt(0).toUpperCase() + projectName.slice(1)}());
}

class ${projectName.charAt(0).toUpperCase() + projectName.slice(1)} extends StatelessWidget {
  const ${projectName.charAt(0).toUpperCase() + projectName.slice(1)}({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: '${projectName}',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const Scaffold(
        body: Center(
          child: Text('Welcome to ${projectName}'),
        ),
      ),
    );
  }
}`);

                // Create injection_container.dart inside lib/app
                const injectionContainerPath = path.join(basePath, 'lib', 'app', 'injection_container.dart');
                fs.writeFileSync(injectionContainerPath, `import 'package:get_it/get_it.dart';

final sl = GetIt.instance;

Future<void> init() async {
  //! Features - feature_name
  // Bloc
  
  // Use cases
  
  // Repository
  
  // Data sources
  
  //! Core
  
  //! External
}`);

 
            };

            // Create the structure
            createStructure(rootPath, projectStructure);
            createFiles(rootPath);

            vscode.window.showInformationMessage(`Clean Architecture project '${projectName}' initialized successfully!`);
        } catch (error) {
            vscode.window.showErrorMessage(`Error creating project structure: ${error.message}`);
        }
    });

    context.subscriptions.push(initProjectDisposable);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};