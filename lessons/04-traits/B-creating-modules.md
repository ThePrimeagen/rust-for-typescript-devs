---
title: "Creating Modules"
---

## Now do you see?

trust me, you don't. Lets make this even better. This small change makes a lot
of things possible. Watch this, i can `impl Area` on any type, even types I
don't own, like a `f64`.

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

woah...

```rust
impl Area for f64 {
    fn area(&self) -> f64 {
        return self * self;
    }
}

fn main() {
    println!("area: {}", 6.9.area());
}
```

WAIT, THIS IS DANGEROUS, THESE ARE POLYFILLS!!! GLOBAL STATE CHANGE IS BAD!!!

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

## It gets even better

Let's move `Area` trait and trait implementations into `shapes.rs`

```rust
use std::f64::consts::PI;

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

pub trait Area {
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

impl Area for f64 {
    fn area(&self) -> f64 {
        return self * self;
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

## Lets go back to our main file and just type this.

```rust
fn main() {
    println!("area: {}", 6.9.area());
}
```

Why does this error? Didn't we implement `Area` for `f64`

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

## BIG TAKE AWAY 1.

**Traits must be imported to work**

This means there is no global polyfills... In JavaScript you edit the
`prototype` and now you have this function, but it exists for the whole project

In Rust, its only for files that import the trait

```typescript
> Number.prototype.area = function() { return this * this; }
[Function (anonymous)]

> (5).area()
25
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

## Tell me that is not cool.

(we are not done yet...)

**i must fail to succeed**

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

## Lets organize our files a bit more

Lets create the following structure in our code base, and then move the
contents of `shapes.rs` into `shapes/mod.rs`

`mod.rs` is effectively the same thing as `index.ts`

### TypeScript

```
src/
  shapes/
    index.ts
  index.ts
```

### Rust

```
src/
  shapes/
    mod.rs
  main.rs
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

## Lets further break up the rust files

Move each related code to each file

```
src/
  shapes/
    mod.rs
    rect.rs
    circle.rs
    area.rs
  main.rs
```

mod.rs

```
pub mod rect;
pub mod circle;
pub mod area;
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

## Lets create a Rectangle!

To prove we have everything working, lets create a `Rectangle` in our main
file.

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

## This is annoying to type

```rust
mod shapes;

use shapes::rect::Rectangle;

fn main() {
    let rect = Rectangle {
        height: 10.0,
        width: 10.0,
        x: 0.0,
        y: 0.0,
    };
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

## Lets implement the `default` method

This also allows us to have some amazing other integrations, but for now its
nice to just have a way to create the default rectangle and circle.

(to the code)

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

src/shapes/rect.rs

```rust
use super::area::Area;

pub struct Rectangle {
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
}

impl Area for Rectangle {
    fn area(&self) -> f64 {
        return self.width * self.height;
    }
}

impl Default for Rectangle {
    fn default() -> Self {
        return Rectangle {
            x: 0f64,
            y: 0f64,
            width: 10f64,
            height: 10f64,
        };
    }
}
```

src/main.rs

```rust
use shapes::rect::Rectangle;

mod shapes;

fn main() {
    let rect = Rectangle::default();
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

## The point's are _in_ the Rectangle?

I want to be able to print out the rectangle now... but i don't want `Debug`
print out, i want my _own_ printout!

I want this...

```rust
use shapes::rect::Rectangle;

mod shapes;

fn main() {
    let rect = Rectangle::default();

    println!("{}", rect);
}
```

Lets type this in, and see if someone can tell me what the error is.

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

## Ok... so implement display?

Lets try it out!

I'll give you one moment. Btw, its `std::fmt::Display`.

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
use std::fmt::Display;

use super::area::Area;

pub struct Rectangle {
    pub x: f64,
    pub y: f64,
    pub width: f64,
    pub height: f64,
}

impl Area for Rectangle {
    fn area(&self) -> f64 {
        return self.width * self.height;
    }
}

impl Default for Rectangle {
    fn default() -> Self {
        return Rectangle {
            x: 0f64,
            y: 0f64,
            width: 10f64,
            height: 10f64,
        };
    }
}

impl Display for Rectangle {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        return write!(
            f,
            "Rectangle({}, {}), {}x{}",
            self.x, self.y, self.width, self.height
        );
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

## Can we do this in TypeScript?

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

src/shapes/index.ts

```typescript
export class Rectangle implements Area {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  area(): number {
    return this.width * this.height;
  }

  toString(): string {
    return `Rectangle(${this.x}, ${this.y}, ${this.width}, ${this.height})`;
  }
}
```

src/index.ts

```typescript
import { Rectangle } from "./shapes";

let rect = new Rectangle(5, 5, 10, 20);

console.log(`${rect}`);
```
