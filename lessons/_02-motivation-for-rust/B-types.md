---
title: "The Basics: Syntax"
description: "An important second lesson"
---

### Basic Types
In rust, you can allocate on the heap or the stack.

this may be a new concept for those with just typescript experience.  So what
is the heap vs the stack?

** Do the drawings on the xp-pen! **

---

### Type comparison
### Numbers
```typescript
const foo = 5; // what is this type?
```

```rust
let foo = 5; // what type is this?
```

** numbers are a bit more confusing in rust (sort of) **

### Strings
```typescript
const foo = "a string!";
```

```rust
let foo = "a string!"; //well... its not a string technically
let foo = String::from("a string...?");
```

** white board **

### Arrays
```typescript
const foo = []; // Array!
```

```rust
let foo = vec![]; // A vector!  which is closer to what a javascript array is (heap allocated)
let foo: [u8; 5] = [0u8; 5]; // a 0 filled, 5 byte array (stack allocated)
```

### Maps / Sets
```typescript
const foo = new Map();
const bar = new Set();
```

```rust
// Must be included up at the top of file, they are not included by default
let foo: HashMap<String, usize> = HashMap::new();
let bar: HashSet<String> = HashSet::new();
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
