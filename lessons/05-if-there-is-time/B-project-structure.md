---
title: "Project Structure"
description: "How is rust code organized"
---

### There are lots of ways to organize your code
So i'll show you some of the ways to organize your code

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

### Cargo init
First lets just create an empty project

navigate to wherever you want to do this and create directory and `cargo init`
in it

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

### Let me create some files
lets create a module, lets go over things one at a time

* `src/my_mod.rs`
* `src/my_mod/foo.rs`
* `src/my_mod/mod.rs`

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

### Monorepos!
Yes rust has built in support of monorepos

* lets create small library that just prints "foo"
* upgrade our Cargo.toml to have `workspace` members and `dependency` foofoo

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

### Pretty rad?
* supports tests
* supports individual project building
* makes build times better

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

