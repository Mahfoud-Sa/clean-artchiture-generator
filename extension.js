const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

function showCustomPopup(context, projectName) {
    const panel = vscode.window.createWebviewPanel(
        'feedbackPopup',
        'Rate Your Experience',
        { viewColumn: vscode.ViewColumn.One, preserveFocus: true },
        {
            enableScripts: true,
            retainContextWhenHidden: true
        }
    );

    panel.webview.html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback</title>
    <style>
        body {
            font-family: var(--vscode-font-family);
            padding: 20px;
            text-align: center;
            background: var(--vscode-editor-background);
            color: var(--vscode-editor-foreground);
        }
        .popup-container {
            width: 350px;
            margin: 0 auto;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            background: var(--vscode-sideBar-background);
            border-top: 4px solid var(--vscode-button-background);
        }
        .success-icon {
            color: #4CAF50;
            font-size: 48px;
            margin-bottom: 16px;
        }
        .btn-comment {
            background: #FFC107;
            color: #000;
            padding: 10px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            font-weight: bold;
            transition: background 0.2s;
        }
        .btn-comment:hover {
            background: #FFD54F;
        }
        .btn-skip {
            background: transparent;
            color: var(--vscode-button-secondaryForeground);
            border: 1px solid var(--vscode-button-secondaryBackground);
            padding: 10px 16px;
            border-radius: 4px;
            cursor: pointer;
            width: 100%;
            margin-top: 10px;
            transition: background 0.2s;
        }
        .btn-skip:hover {
            background: var(--vscode-button-secondaryHoverBackground);
        }
        .project-name {
            color: var(--vscode-textPreformat-foreground);
            font-weight: bold;
            margin: 10px 0 20px;
        }
        .rating {
            display: flex;
            justify-content: center;
            margin: 20px 0;
        }
        .star {
            font-size: 24px;
            color: var(--vscode-descriptionForeground);
            cursor: pointer;
            margin: 0 5px;
            transition: color 0.2s;
        }
        .star:hover, .star.active {
            color: #FFC107;
        }
        textarea {
            width: 100%;
            min-height: 100px;
            padding: 10px;
            margin: 10px 0 5px;
            border: 1px solid var(--vscode-input-border);
            background: var(--vscode-input-background);
            color: var(--vscode-input-foreground);
            border-radius: 4px;
            resize: vertical;
            font-family: var(--vscode-font-family);
        }
        .error-message {
            color: #f44336;
            font-size: 12px;
            margin: 0 0 10px 0;
            text-align: left;
            display: none;
        }
        .required {
            color: #f44336;
        }
        .section-title {
            margin-bottom: 5px;
            text-align: left;
            font-weight: 500;
        }
        .button-group {
            display: flex;
            flex-direction: column;
            margin-top: 15px;
        }
    </style>
</head>
<body>
    <div class="popup-container">
        <div class="success-icon">✓</div>
        <h2>Project Created Successfully!</h2>
        <div class="project-name">${projectName}</div>
        
        <div class="section-title">How would you rate your experience? <span class="required">*</span></div>
        <div class="rating" id="rating">
            <div class="star" data-value="1">★</div>
            <div class="star" data-value="2">★</div>
            <div class="star" data-value="3">★</div>
            <div class="star" data-value="4">★</div>
            <div class="star" data-value="5">★</div>
        </div>
        <div id="rating-error" class="error-message">Please select a rating</div>
        
        <div class="section-title">Leave your comment <span class="required">*</span></div>
        <textarea id="feedback" placeholder="Your detailed feedback helps us improve..."></textarea>
        <div id="comment-error" class="error-message">Please enter your feedback</div>
        
        <div class="button-group">
            <button class="btn-comment" onclick="submitFeedback()">Leave Your Comment</button>
            <button class="btn-skip" onclick="skipFeedback()">Skip</button>
        </div>
    </div>

    <script>
        const vscode = acquireVsCodeApi();
        let selectedRating = 0;

        document.querySelectorAll('.star').forEach(star => {
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.getAttribute('data-value'));
                document.querySelectorAll('.star').forEach((s, index) => {
                    if (index < selectedRating) {
                        s.classList.add('active');
                    } else {
                        s.classList.remove('active');
                    }
                });
                document.getElementById('rating-error').style.display = 'none';
            });
        });

        function validateForm() {
            let isValid = true;
            
            if (selectedRating === 0) {
                document.getElementById('rating-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('rating-error').style.display = 'none';
            }
            
            const feedbackText = document.getElementById('feedback').value.trim();
            if (feedbackText === '') {
                document.getElementById('comment-error').style.display = 'block';
                isValid = false;
            } else {
                document.getElementById('comment-error').style.display = 'none';
            }
            
            return isValid;
        }

        function submitFeedback() {
            if (!validateForm()) {
                return;
            }
            
            const feedbackText = document.getElementById('feedback').value;
            vscode.postMessage({ 
                command: 'submitFeedback',
                rating: selectedRating,
                feedback: feedbackText
            });
        }

        function skipFeedback() {
            vscode.postMessage({ 
                command: 'skipFeedback'
            });
        }
    </script>
</body>
</html>`;

    panel.webview.onDidReceiveMessage(
        message => {
            switch (message.command) {
                case 'submitFeedback':
                    vscode.window.showInformationMessage(
                        `Thank you for your ${message.rating}-star rating and feedback!`
                    );
                    vscode.env.openExternal(vscode.Uri.parse(
                        'https://marketplace.visualstudio.com/items?itemName=Mahfoudbinsabbah.clean-architecture-generator-for-flutter&ssr=false#review-details'
                    ));
                    panel.dispose();
                    break;
                case 'skipFeedback':
                    panel.dispose();
                    break;
            }
        },
        undefined,
        context.subscriptions
    );
}

function activate(context) {
    console.log('Congratulations, your extension "clean-architecture-generator" is now active!');

    let initProjectDisposable = vscode.commands.registerCommand('clean-architecture-generator.initCleanProject', async function () {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        if (!workspaceFolders) {
            vscode.window.showErrorMessage('Please open a workspace first.');
            return;
        }

        const rootPath = workspaceFolders[0].uri.fsPath;

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
                },
                'assets': {
                    'images': {
                        'icons': [],
                        'gifs': []
                    },
                    'fonts': [],
                    'json': [],
                    'audio': []
                }
            };

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

                // Create injection_container.dart
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

                // Create pubspec.yaml
                const pubspecPath = path.join(basePath, 'pubspec.yaml');
                fs.writeFileSync(pubspecPath, `name: ${projectName.toLowerCase()}
description: A new Flutter project.

version: 1.0.0+1

environment:
  sdk: ">=3.0.0 <4.0.0"

dependencies:
  flutter:
    sdk: flutter
  get_it: ^7.6.4

dev_dependencies:
  flutter_test:
    sdk: flutter

flutter:
  uses-material-design: true
  
  assets:
    - assets/images/icons/
    - assets/images/gifs/
    - assets/fonts/
    - assets/json/
    - assets/audio/
`);


            };

            createStructure(rootPath, projectStructure);
            createFiles(rootPath);

            showCustomPopup(context, projectName);

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