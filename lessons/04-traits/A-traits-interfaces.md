---
title: "Traits vs Interfaces"
---

## Check point

We have talked about:

- Iterators
- Enums
  - Options
  - Results
- Borrow Checker

We another big concept we need to go over to "complete" our tour of rust

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Traits, they are like interfaces

You can define most of rust's behavior, from addition, equality checks,
hashing, parsing strings, to being displayed via traits.

Traits are effectively Interfaces but how they are used are a bit different,
and how the language lets you specify them is different.

What traits allow you to do cannot be directly done in JS. The language
doesn't have the ability to do the same thing.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## First, lets just start off with simple trait stuff

But lets do it in TypeScript first
Lets do the following:

- create type `Rectangle`, defined with `width`, `height`, `x`, and `y`.
- create type `Circle`, defined with `radius`, `x`, and `y`.

we will be adding methods to `Rectangle` and `Circle` so it is easiest just to
make them classes

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

```typescript
class Rectangle {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}
}

class Circle {
  constructor(public x: number, public y: number, public radius: number) {}
}
```

We could use types here, but we are about to add methods which will make the
creation of these objects inefficient and frustrating.

Lets add an `Area` interface that defines an area method

- `interface Area`
  - `area(): number`
- add `area` to both `Circle` and `Rectangle`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

```typescript
interface Area {
  area(): number;
}

// added Area for fun
class Rectangle implements Area {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  area(): number {
    return this.width * this.height;
  }
}

class Circle {
  constructor(public x: number, public y: number, public radius: number) {}

  area(): number {
    return this.radius * this.radius * Math.PI;
  }
}
```

Lets make some observations.

1. When you define `Area` interface, you get to state methods / properties you
   require

1. When implementing an interface, it must be done on the object definition at
   the time of declaration. This is a very important point.

What does this mean?

```typescript
class Rectangle { // i declare rect
    ...
    area() { // i must also declare the interfaces i implement
        ...
    }
}
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Lets see how rusts does this.

first, lets implement the structs `Rectangle` and `Cicle`.

```rust
x: f64
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

```rust
struct Rectangle {
    x: f64,
    y: f64,
    width: f64,
    height: f64,
}

struct Circle {
    x: f64,
    y: f64,
    radius: f64,
}

fn main() { }
```

Now create & implement the `Area` trait. Then in main function create a
`Circle` and a `Rectangle` and get its area.

(i'll help)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

```rust
use std::f64::consts::PI;

trait Area {
    fn area(&self) -> f64;
}

impl Area for Rectangle {
    fn area(&self) -> f64 {
        return self.width * self.height;
    }
}

impl Area for Circle {
    fn area(&self) -> f64 {
        return self.radius * self.radius * PI
    }
}

fn main() {

    let circle = Circle {
        x: 0f64, y: 0f64,
        radius: 4f64,
    };

    let rect = Rectangle {
        x: 0f64, y: 0f64,
        width: 2f64,
        height: 8f64,
    };

    println!("area: {}", rect.area());
    println!("area: {}", circle.area());

}
```

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Lets... try something else

Lets use this `Area` trait/interface, but lets make a very small change.

Lets move the `Rect` and `Circle` definition to another file, `src/shapes.rs`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

## Complete Code

src/shapes.rs

```rust
pub struct Rectangle {
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
}

pub struct Circle {
    pub x: f64,
    pub y: f64,
    pub radius: f64,
}
```

src/main.rs

```rust
mod shapes

use std::f64::consts::PI;

use rust::shapes::{Rectangle, Circle};

trait Area {
    fn area(&self) -> f64;
}

impl Area for Rectangle {
    fn area(&self) -> f64 {
        return self.width * self.height;
    }
}

impl Area for Circle {
    fn area(&self) -> f64 {
        return self.radius * self.radius * PI
    }
}

fn main() {

    let circle = Circle {
        x: 0f64, y: 0f64,
        radius: 4f64,
    };

    let rect = Rectangle {
        x: 0f64, y: 0f64,
        width: 2f64,
        height: 8f64,
    };

    println!("area: {}", rect.area());
    println!("area: {}", circle.area());

}
```
