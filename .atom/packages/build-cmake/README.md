# CMake build system for Atom

## Dependencies
This package requires the [atom-build](https://github.com/noseglid/atom-build) to be installed.

## Preview
![preview](https://cloud.githubusercontent.com/assets/6578840/26652684/991b5b84-4605-11e7-80be-ac90e393fda8.gif)

## Configuration

### Default Configuration

By default four different build configurations are supported, Debug, Release, RelWithDebInfo, and MinSizeRel all using the default CMake generator for you platform. Basic default generation and build settings such as build location, cmake arguments, and build tool arguments can be configured in the project settings, for more advanced configuration see the Custom Configuration section.

### Custom Configuration
Custom configuration options can be defined in a file called CMakeSettings.json at the root of your project folder. The name and schema of this file was intentionally created to match [Visual Studio 15 2017](https://blogs.msdn.microsoft.com/vcblog/2016/10/05/cmake-support-in-visual-studio/#configure-cmake)'s implementation.

Here is an example CMakeSettings.json file.
```JSON
{
  "configurations": [
    {
      "name": "Debug",
      "generator": "Unix Makefiles",
      "configurationType" : "Debug",
      "buildRoot":  "${projectDir}/build/${name}",
      "cmakeCommandArgs":  "",
      "buildCommandArgs": "",
      "ctestCommandArgs":  "",
      "variables": [{
        "name": "TEST_VAR",
        "value": "ON"
        }]
    },
    {
      "name": "Release",
      "generator": "Unix Makefiles",
      "configurationType" : "Release",
      "buildRoot": "${projectDir}/build/${name}",
      "cmakeCommandArgs": "",
      "buildCommandArgs": "",
      "ctestCommandArgs": ""
    }
  ]
}
```
A configuration is an JSON object containing the fields.
  * **name**:

  A *string* that describes the current configuration.
  * **generator**:

  A *string* containing one of the CMake generators to use for the current configuration.
  * **configurationType**:

  A *string* with one of the values; Debug, Release, RelWithDebInfo, or MinSizeRel.
  * **buildRoot**:

  A *string* containing the build location for the current configuration, this field supports variable replacement.
  * **cmakeCommandArgs**:

  A *string* of extra arguments to pass to CMake, this field supports variable replacement.
  * **buildCommandArgs**:

  A *string* of extra arguments to pass to the build tool, this field supports variable replacement.
  * **ctestCommandArgs**:

  This *string* value is ignored for now.

  * **variables**:

  A *list* of objects that define a variable to be passed to CMake equivalent to -Dname=value.

### Variable Replacement
The following variable substitutions will be made on the configuration fields that are marked as supporting variable replacement.

* `${projectFile}` - The path of the root CMakeLists.txt file.
* `${projectDir}` - The current project directory.
* `${thisFile}` - The path to the CMakeSettings.json file if one exits.
* `${name}` - The name of this configuration.
* `${generator}` - Then CMake generator used for this configuration.
* `${TMPDIR}` - The operating system's default temp directory.
* `${PROJECT_DIR}` - The current project directory.
* `${PROJECT_DIRNAME}` - The current project directory name.
