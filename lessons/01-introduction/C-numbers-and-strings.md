---
title: "Rust Numbers and Strings"
description: "The part of javascript that is completely simplified"
---

### Are numbers that complex?
In rust they are more complicated because rust needs to know the _size_.

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

### Numbers in typescript!
```typescript
// We would call this an integer
4 // this... is technically a smi, but for your purpose, its a number
```

```typescript
// integer becomes a float auto_magically_ in js
4 / 3 = 1.3333333333333333
```

```typescript
// this is totally cool
4 * -1 = -4
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

### None of that was cool for rust
Rust you have to specify the types `<NUMBER>` = power of two

`i<NUMBER>` = an integer that can be negative or positive (signed)
`u<NUMBER>` = an integer that can be positive only (unsigned)
`f<NUMBER>` = a number that requires decimal point

```rust
4 / 3 = 1
```

```rust
// cannot divide {float} by {integer}
// yes... this is an error
4.0 / 3 = Nope
```

```rust
// 4 is an i32
4 * -1 = -4
```

```rust
// 4 is an i32
let foo = 4u32; // saying its a 4 that is a u32 (defining type)
foo * -1 // ERROR
```

If you have ever worked with any static language, this should be pretty
straight forward.

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

### The difference between String and &str
Yes, you will see there are two types of strings you commonly run into.  So
what are they?


#### String
* Well `String` is a heap allocated (heap may be a foreign word to you)
* String is mutable

#### &str
* this points to a sequence of utf-8 characters.  Its commonly called a slice.
  Its a view into a data structure
* its immutable
