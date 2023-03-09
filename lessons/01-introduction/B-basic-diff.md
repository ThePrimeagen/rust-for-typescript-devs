---
title: "The Basics: Syntax"
description: "An important second lesson"
---

### The Basics
remember my **ASSUMPTIONS**?  Time to make good on that...

<br />

We are going to spend a short period of time just going over differences
between the two languages and some specific rust only features.

<br />

So there is going to be no programming, its meant to get you familiar with
words and ideas.

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

### Variable
```typescript
const foo = 5; // sort of constant
let foo = 5; // definitely not constant
const foo = [] as const; // const pointer to a constant..
                         // i understand if you don't c the joke
```

```rust
let foo = 5; // constant
let mut foo = 5; // mutable
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

#### Shadowing
```typescript
const foo = [...];
const foo = someMethod(foo);
```

```rust
let foo = [...];  // I am of Type A
let foo = someMethod(foo); // I am of Type B - YA! perfectly fine
```

#### Why though?
One thing that makes shadowing amazing is that you can change types.

```typescript
let foo = get_file(args); // FileHandle
let foo = read_file(foo); // String
let foo = tokenize_and_do_things_to_string(foo); // Vec<String>
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

#### Rust

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

### Closures
```typescript
(x) => {
    return x;
}

// or auto return x + 1 like
(x) => x + 1
```

```rust
|x| {
    return x;
}

|x| x + 1
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

    // public instance methods
    pub fn this(self)...
}
```

* What stuck out to you?

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
this may not sound big, but its AMAZING effectively prevents the need for
inheritance

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

