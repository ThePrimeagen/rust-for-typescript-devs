---
title: "Install Rust"
description: "Lets install rust and the typescript items"
---

### Basic setup
Lets setup a project to get ready to program in rust and typescript!

#### Directory
first lets create a directory to get everything setup in!

```bash
mkdir ~/personal/rust-typescript
cd ~/personal/rust-typescript
```

### TypeScript setup
This should be easy enough.  we will just use ts-node (feel free to use swc or
whatever you want)

```bash
npm init -y
npm install ts-node typescript @node/types
tsc --init
```

<br />

#### **Edit your tsconfig.json**
We want things to be strict, so don't forget to turn on all the things.

Here are my preferred settings
```json
"strict": true,
"noImplicitAny": true,
"strictNullChecks": true,
"strictFunctionTypes": true,
"strictBindCallApply": true,
"strictPropertyInitialization": true,
"noImplicitThis": true,
"useUnknownInCatchVariables": true,
"alwaysStrict": true,
"noUnusedLocals": true,
"noUnusedParameters": true,
"exactOptionalPropertyTypes": true,
"noImplicitReturns": true,
"noFallthroughCasesInSwitch": true,
"noUncheckedIndexedAccess": true,
"noImplicitOverride": true,
"noPropertyAccessFromIndexSignature": true,
```

(do it now yourself prime)

<br />

### Installing rust
For Mac/Linux/Linux like (wsl2)
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

#### **Initializing Rust**
```bash
cargo init
```

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

### For my VSCoders

This is probably the right article (i don't use vscode, no idea)
[Disable Inlay Hints, VSCode](https://code.visualstudio.com/updates/v1_67)

real talk, inlay hints in neovim are good, inlay hints in vscode are crazy.  It
makes programming really difficult, i would highly suggest turning them off

<br />

Copilot: You should always consider disabling it when you are learning
something new.  Copilot will give you the appearance of becoming better, but
the moment you turn it off, you will feel completely lost.

<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />
<br />

