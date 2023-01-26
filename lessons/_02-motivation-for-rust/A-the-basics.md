---
title: "The Basics: Syntax"
description: "An important second lesson"
---

ASSUMPTION: I think you are a good programmer who can program TypeScript with
relative ease.  You know types, maybe no wizard, but you know types.

I wanted to get this out of the way right away, lets do a quick tour-de-syntax

### Variable
```typescript
const foo = 5; // sort of constant
let foo = 5; // definitely not constant
const foo = [] as const; // const pointer to a constant..
```

```rust
let foo = 5; // constant
let mut foo = 5; // mutable
```

#### Shadowing
```typescript
const foo = [...];
const foo = someMethod(foo);
```

```rust
let foo = [...];
let foo = someMethod(foo); // YA! perfectly fine
```

### If
```typescript
if (condition && second || this_one) {
    ...
} else if ...
else
```

```rust
if condition && second || this_one { // rust will warn you
    ...
} else if ...
else ...
```

### Loops
### For
```typescript
for (let i = 0; i < 10; ++i) {
    // ...
}
```

```rust
for i in 0..10 {
}

// inclusive (includes 10)
for i in 0..=10 {
}
```

### While
```typescript
while (true) {
    // ...
}
```

```rust
while true {
}
```

### For ever?
```typescript
for (;;) { // while (true) {
    // ...
}
```

```rust
loop {
}
```

### Collections?
```typescript
for (const [key, value] of Object.entries(obj)) {
    // ...
}
for (const value of [1, 2, 3]) {
    // ...
}
for (const idx in [1, 2, 3]) {
    // ...
}

// array#map // copies
// array#filter // copies
// array#forEach // iterates
// array#reduce // always a bad decision
// map#forEach // weird interface

```

#### Iterators
(white board explanation)

```rust
for x in &some_array {
    // x will be each item of an array
}

vec![1, 2, 3]
    .iter()
    .map(...)
    // HUGE AMOUNT OF THINGS HERE
    // you can create your own...
    .collect::<Vec<_>>();
```

### Functions

```typescript
function foo() {
}
```

```rust
fn foo() {
}
```

#### Parameters
```typescript
function foo(arg1: number, arg2: number) {
}
```

```rust
fn foo(arg1: f64, arg2: f64) {
    // numbers can be a bit complicated
}
```

#### Return
This is interesting in typescript.  You may have to change some habbits
```typescript
// The return type is based on the code below
// function foo(): number {
function foo() {
    return 5;
}
```

```rust
fn foo() -> usize {
    return 5;
}
```

### Class and Methods
This one is where the truest magic happens

```typescript
class Foo {
    properties...

    constructor() { ... }

    methods...

    static methods

    private methods

    protected methods // if you use this i'll fire you
}
```

Pay real close attention
```rust

struct Foo {
    properties ...
    pub properties ...
}

impl Foo {
    // these are both static methods
    fn this() // available usage within the file
    pub fn this() // available usage within the file

    // you should be able to understand this before the end
    // of the day..
    //
    // and all of this can add pub
    // these are instance methods
    fn this(&self)...
    fn this(&mut self)...
    fn this(self)...
}
```

* What stuck out to you?

#### Interfaces
```typescript
interface Foo {
    properties: type; //gross
    method(): retType;
}

interface Foo {
    hey_another_method(); // i feel many things about this
}
```

again, look for something special here
```rust
trait Foo {
    // no properties
    fn method(&self) -> retType;
}

impl Foo for MyStruct {
    ...
}
```

* traits compose
this may not sound big, but its AMAZING
effectively prevents the need for inheritance

* there are some trait rules as well, we will go over them

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
