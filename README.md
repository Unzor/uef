# uef
Universal Executable Format

# Usage
From command line:
```
uef -r demo.uef
```
From API:
```js
const { UEF } = require("uef-js");
// Execute YAML program
UEF.run(`- Windows: 
  - echo "is Windows"
- MacOS:
  - echo "is MacOS"
- Linux:
  - echo "is Linux"`);
// Execute .uef file
UEF.execUEF("/path/to/file.uef");
```

# Creating a .uef file
To create a .uef file, create a folder, add a file named "universal_executable.yml", and paste this and modify it to your likings:
```yaml
- Windows: 
  - echo "is Windows"
- MacOS:
  - echo "is MacOS"
- Linux:
  - echo "is Linux"
```
Now add whatever files you want, create a .zip file, and move those files there. Now rename the .zip file to .uef, and now you have made your first UEF program!
