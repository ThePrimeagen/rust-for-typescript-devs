---
title: "The Basics: Syntax"
description: "An important second lesson"
---

I wanted to get this out of the way right away, lets do a quick tour-de-syntax

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
else
```

### If
```typescript
if (condition && second || this_one) {
    ...
} else if ...
else
```

```rust
if condition && second || this_one {
    ...
} else if ...
else
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
