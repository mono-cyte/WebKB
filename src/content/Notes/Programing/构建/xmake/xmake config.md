---
title: xmake config
aliases:
categories:
tags:
---

# xmake config

`xmake f [options]`
## Common Options

| Option                              | Description                                                                         |
| ----------------------------------- | ----------------------------------------------------------------------------------- |
| `-q`<br>`--quiet`                   | Quiet operation.                                                                    |
| `-y`<br>`--yes`                     | Input "yes" by default if user confirmation is needed.                              |
| `--confirm=CONFIRM`                 | Input a predefined result for user confirmation (`yes`, `no`, `def`).               |
| `-v`<br>`--verbose`                 | Print verbose information.                                                          |
| `--root`                            | Allow running Xmake as root.                                                        |
| `-D`<br>`--diagnosis`               | Print diagnosis information (e.g., `xmake -vD` for full details).                   |
| `-h`<br>`--help`                    | Print help message and exit.                                                        |
| `-F FILE`<br>`--file=FILE`          | Use a specific `xmake.lua` file.                                                    |
| `-P PROJECT`<br>`--project=PROJECT` | Change to the given project directory (priority: argument > env var > current dir). |


## Command Options (Config)

| Option                     | Description                                                                       |
| -------------------------- | --------------------------------------------------------------------------------- |
| `-c`<br>`--clean`          | Clean cached user configs and detection cache.                                    |
| `--check`                  | Ignore detection cache and force re-check (retains user configs).                 |
| `--export=EXPORT`          | Export current configuration to a file (e.g., `--export=build/config.txt`).       |
| `--import=IMPORT`          | Import configs from a file (e.g., `--import=build/config.txt`).                   |
| `--menu`                   | Configure project via menu-driven UI.                                             |
| `-p PLAT`<br>`--plat=PLAT` | Target platform (default: `auto`). Supported: `android`, `linux`, `windows`, etc. |
| `-a ARCH`<br>`--arch=ARCH` | Target architecture (default: `auto`). Platform-specific options listed.          |
| `-m MODE`<br>`--mode=MODE` | Compilation mode (default: `auto`). Options: `debug`, `release`.                  |
| `-k KIND`<br>`--kind=KIND` | Target kind (default: `static`). Options: `static`, `shared`, `binary`.           |
| `--host=HOST`              | Set host environment (default: `windows`).                                        |
| `--policies=POLICIES`      | Set project policies (e.g., `--policies=package.fetch_only`).                     |



## Package Configuration

|Option|Description|
|---|---|
|`--require=REQUIRE`|Require all dependent packages? (`yes`/`no`).|
|`--pkg_searchdirs=PKG_SEARCHDIRS`|Search directories for remote packages (e.g., `/dir1;/dir2`).|



## Cross-Compilation Configuration

| Option                                                                                     | Description                                                              |
| ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------ |
| `--cross=CROSS`                                                                            | Cross-toolchain prefix (e.g., `arm-linux-androideabi-`).                 |
| `--target_os=TARGET_OS`                                                                    | Target OS for cross-compilation.                                         |
| `--bin=BIN`                                                                                | Cross-toolchain bin directory (e.g., `sdk/bin`).                         |
| `--sdk=SDK`                                                                                | Cross-SDK directory (e.g., `sdk/lib`, `sdk/include`).                    |
| `--toolchain=TOOLCHAIN`                                                                    | Toolchain name (e.g., `clang`; use `xmake show -l toolchains` for list). |
| `--toolchain_host=TOOLCHAIN_HOST`                                                          | Host toolchain name for building packages.                               |
| `--runtimes=RUNTIMES`                                                                      | Compiler runtime libraries (e.g., `MT`, `c++_static`).                   |
| **Compiler/Linker Flags**                                                                  |                                                                          |
| `--cc=CC`<br>`--cflags=CFLAGS`                                                             | C compiler and flags.                                                    |
| `--cxx=CXX`<br>`--cxxflags=CXXFLAGS`                                                       | C++ compiler and flags.                                                  |
| `--ld=LD`<br>`--ldflags=LDFLAGS`                                                           | Linker and flags.                                                        |
| `--as=AS`<br>`--asflags=ASFLAGS`                                                           | Assembler and flags.                                                     |
| _Similar flags for other languages: `--fc` (Fortran), `--rc` (Rust), `--dc` (Dlang), etc._ |                                                                          |




## Platform-Specific Configurations

### Android

|Option|Description|
|---|---|
|`--ndk=NDK`|NDK directory.|
|`--ndk_sdkver=NDK_SDKVER`|NDK SDK version (default: `auto`).|
|`--android_sdk=ANDROID_SDK`|Android SDK directory.|
|`--build_toolver=BUILD_TOOLVER`|Android SDK build tool version.|
|`--ndk_stdcxx=[y|n]`|Use stdc++ for NDK (default: `y`).|
|`--ndk_cxxstl=NDK_CXXSTL`|stdc++ STL library (deprecated; use `--runtimes`).|

### CUDA

|Option|Description|
|---|---|
|`--cuda=CUDA`|CUDA SDK directory (default: `auto`).|
|`--cu-ccbin=CU-CCBIN`|CUDA host C++ compiler.|

### Qt

|Option|Description|
|---|---|
|`--qt=QT`|Qt SDK directory (default: `auto`).|
|`--qt_host=QT_HOST`|Qt host SDK directory (default: `auto`).|
|`--qt_sdkver=QT_SDKVER`|Qt SDK version (default: `auto`).|

### Vcpkg / MingW / Emscripten

|Option|Description|
|---|---|
|`--vcpkg=VCPKG`|Vcpkg directory (default: `auto`).|
|`--mingw=MINGW`|MingW SDK directory.|
|`--emsdk=EMSDK`|Emscripten SDK directory.|

### Visual Studio

|Option|Description|
|---|---|
|`--vs=VS`|Visual Studio version (e.g., `2017`; default: `auto`).|
|`--vs_toolset=VS_TOOLSET`|VS toolset version (e.g., `14.0`).|
|`--vs_sdkver=VS_SDKVER`|Windows SDK version (e.g., `10.0.15063.0`).|
|`--vs_runtime=VS_RUNTIME`|Runtime library (deprecated; use `--runtimes`). Options: `MT`, `MD`, etc.|

### WDK

|Option|Description|
|---|---|
|`--wdk=WDK`|WDK directory (default: `auto`).|
|`--wdk_sdkver=WDK_SDKVER`|WDK version (default: `auto`).|
|`--wdk_winver=WDK_WINVER`|Windows version (e.g., `win10`, `win7`; default: `auto`).|