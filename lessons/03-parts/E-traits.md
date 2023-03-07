---
title: "Rust Traits"
description: "Perhaps one of the best things about rust"
---

### Traits, they are like interfaces
You can define most of rust's behavior, from addition, equality checks,
hashing, parsing strings, to being displayed via traits.

Traits are effectively Interfaces but how they are used are a bit different,
and how the language lets you specify them is different.

What traits allow you to do cannot be done in JS.  The language doesn't have the
ability to do the same thing.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### First, lets just start off with simple trait stuff
But lets do it in TypeScript first
Lets do the following:

* create type `Rectangle`, defined with `width`, `height`, `x`, and `y`.
* create type `Circle`, defined with `radius`, `x`, and `y`.

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

### Complete Code
```typescript
class Rectangle {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number) { }
}

class Circle {
    constructor(public x: number,
                public y: number,
                public radius: number) {}
}
```

We could use types here, but we are about to add methods which will make the
creation of these objects inefficient and frustrating.

Lets add an `Area` interface that defines an area method
* `interface Area`
  - `area(): number`
* add `area` to both `Circle` and `Rectangle`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code
```typescript
interface Area {
    area(): number;
}

class Rectangle implements Area {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number) { }

    area(): number {
        return this.width * this.height;
    }
}

class Circle {
    constructor(public x: number,
                public y: number,
                public radius: number) {}

    area(): number {
        return this.radius * this.radius * Math.PI;
    }
}
```

Lets make some observations.
1. When you define `Area` interface, you get to state methods / properties you
   require

1. When implementing an interface, it must be done on the object definition at
   the time of declaration.  This is a very important point.

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

### Lets see how rusts does this.
first, lets implement the structs `Rectangle` and `Cicle`.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code

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

Now create & implement the `Area` trait.
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

### Complete Code

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

### Lets... try something else
Lets use this `Area` trait/interface, but lets make a very small change.

Lets move the definition to another file.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code

src/main.rs
```rust
pub mod shapes;
```

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

src/bin/test.rs
```rust
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

### Now do you see?
trust me, you don't. Lets make this even better.  This small change makes a lot
of things possible.  Watch this, i can `impl Area` on any type, even types I
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

### Complete Code
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

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### It gets even better
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

### Lets go back to our main file and just type this.

```rust
fn main() {
    println!("area: {}", 6.9.area());
}
```
Why does this error?  Didn't we implement `Area` for `f64`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Traits must be imported to work
This means there is no global polyfills...  In JavaScript you edit the
`prototype` and now you have this function, but it exists for the whole project

In Rust, its only for files that import the trait

```typescript
> Number.prototype.area = function() { return this * this; }
[Function (anonymous)]

> (5).area()
25
```

So lets fix the error in rust

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Tell me that is not cool.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Lets organize our files a bit more
Lets create the following structure in our code base, and then move the
contents of `shapes.rs` into `shapes/mod.rs`

`mod.rs` is effectively the same thing as `index.ts`

#### TypeScript
```
src/
  shapes/
    index.ts
  index.ts
```

#### Rust
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

### Lets further break up the rust files
```
src/
  shapes/
    mod.rs
    rect.rs
    circle.rs
    area.rs
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

### This is annoying to type

```rust
mod shapes;

use shapes::Rectangle;

fn main() {
    let rect = Rectangle {
        height: 10f64,
        width: 10f64,
        x: 0f64,
        y: 0f64,
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

### Lets implement the `default` method
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

### Complete Code

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

### I just want....
to print out the rectangle now... but i don't want `Debug` print out, i want my
_own_ printout!

I want this...
```rust
use shapes::rect::Rectangle;

mod shapes;

fn main() {
    let rect = Rectangle::default();

    println!("{}", rect);
}
```

Can someone tell me what error do you see?

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Ok... so implement display?
Lets try it out!

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code

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
            "Rectangle {{ x: {}, y: {}, width: {}, height: {} }}",
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

### Can we do this in TypeScript?

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code

src/shapes/index.ts
```typescript
export class Rectangle implements Area {
    constructor(
        public x: number,
        public y: number,
        public width: number,
        public height: number) { }

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

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Now its time to take it to the next level
Lets make some things that are a bit... useless, but they show off how to use
rust and that is what we are going for

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Iterator
An iterator isn't just something we interact with, its something we can also
use!

Lets talk about iterators (whiteboard)
Lets implement an iterator for `Rectangle`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code
Why are we getting a borrow checker issue?

src/main.rs
```rust
use shapes::rect::Rectangle;

mod shapes;

fn main() {
    let rect = Rectangle::default();

    for point in rect {
        println!("({}, {})", point.0, point.1);
    }

    println!("{}", rect);
}
```

src/shapes/rect.rs
```rust
pub struct RectIter {
    points: [(f64, f64); 4],
    idx: usize,
}

impl Iterator for RectIter {
    type Item = (f64, f64);

    fn next(&mut self) -> Option<Self::Item> {
        if self.idx >= self.points.len() {
            return None;
        }

        let point = self.points[self.idx];
        self.idx += 1;

        return Some(point);
    }
}

impl IntoIterator for &Rectangle {
    type Item = (f64, f64);

    type IntoIter = RectIter;

    fn into_iter(self) -> Self::IntoIter {
        return RectIter {
            points: [
                (self.x, self.y),
                (self.x + self.width, self.y),
                (self.x, self.y + self.height),
                (self.x + self.width, self.y + self.height),
            ],
            idx: 0,
        }
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

### IntoIterator
It _consumes_ the thing you give it.  We need to give it something to consume
that wont consume our original struct!

* we want to be able to consume, if we choose (think of `Vec`)
* we want to be able to not consume

So what do we do?
(make simple fix)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### I hate duplicating code
* lets implement a constructor
* lets do it the trait way

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code
Never sleep on the `From<T>` trait.  It allows you to hide complicated code and
it relies on built in behavior.

```rust
pub struct RectIter {
    points: [(f64, f64); 4],
    idx: usize,
}

impl From<&Rectangle> for RectIter {
    fn from(rect: &Rectangle) -> Self {
        return RectIter {
            points: [
                (rect.x, rect.y),
                (rect.x + rect.width, rect.y),
                (rect.x, rect.y + rect.height),
                (rect.x + rect.width, rect.y + rect.height),
            ],
            idx: 0,
        }
    }
}

impl IntoIterator for Rectangle {
    type Item = (f64, f64);

    type IntoIter = RectIter;

    fn into_iter(self) -> Self::IntoIter {
        return (&self).into();
    }
}

impl IntoIterator for &Rectangle {
    type Item = (f64, f64);

    type IntoIter = RectIter;

    fn into_iter(self) -> Self::IntoIter {
        return self.into();
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

### Observations
There seems to be this way rust works which is

Library code -> trait implementations -> Application code interacts heavily
with standard methods

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### What about our own traits?
Lets create our own amazing trait!

Lets talk about collisions (don't worry we will stay out of complicated math)

```
src/
  shapes/
    collisions.rs
```

Don't forget to add it to `mod.rs`

```rust
pub mod collisions;
```

First lets white board our two algorithms for `Rectangle` and `Circle`

Also, i am going to shortcut the `Circle` collision algorithm because its easy
and `Circle` against `AABB` (`Rectangle`) is a complicated formula.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code

src/shapes/rect.rs
```rust
impl Rectangle {
    fn contains_point(&self, (x, y): (f64, f64)) -> bool {
        return x >= self.x && x <= self.x + self.width &&
            y >= self.y && y <= self.y + self.height;
    }
}

impl Collidable<Circle> for Rectangle {
    fn collide(&self, other: &Circle) -> bool {
        return other.collide(self);
    }
}

impl Collidable<Rectangle> for Rectangle {
    fn collide(&self, other: &Rectangle) -> bool {
        for point in other {
            if self.contains_point(point) {
                return true;
            }
        }
        return false;
    }
}
```

src/shapes/circle.rs
```rust
impl Circle {
    fn contains_point(&self, (x, y): (f64, f64)) -> bool {
        let dx = self.x - x;
        let dy = self.y - y;

        return dx * dx + dy * dy <= self.radius * self.radius;
    }
}

impl Collidable<Rectangle> for Circle {
    fn collide(&self, other: &Rectangle) -> bool {
        for point in other {
            if self.contains_point(point) {
                return true;
            }
        }
        return true;
    }
}

impl Collidable<Circle> for Circle {
    fn collide(&self, other: &Circle) -> bool {
        return self.contains_point((other.x, other.y)) ||
            other.contains_point((self.x, self.y));
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

### Is the code a bit... similar?
Lets pull out yet another trick with traits

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Lets try something different
* create a `Points` trait that has one method, `points`, that returns an
  `Iterator<Item = (f64, f64)>`

* create a `Contains` trait that has one method, `contains_point`, that returns
  `bool` if the point is contained within the geometry

* implement `Iterator` for `Points`, requires `PointIter` struct

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code

```rust
pub struct PointIter {
    points: Vec<(f64, f64)>,
    idx: usize,
}

impl Iterator for PointIter {
    type Item = (f64, f64);

    fn next(&mut self) -> Option<Self::Item> {
        if self.idx >= self.points.len() {
            return None;
        }

        let point = self.points[self.idx];
        self.idx += 1;

        return Some(point);
    }
}

pub trait Points {
    fn points(&self) -> PointIter;
}

pub trait Contains {
    fn contains_point(&self, point: (f64, f64)) -> bool;
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

### So why did we do this?
Lets relook at our `Collidable` implementation.  We can now do a "blanket"
implementation.  This allows us to define a generic implemenation using trait
combinations!!!

You> "i know all these words individually, but when you put them together like
that..."

Me> "Just watch (and program to get the most out of it)"

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code

```rust
impl<T> Collidable<T> for T where T: Contains + Points {
    fn collide(&self, other: &T) -> bool {
        for point in other.points() {
            if self.contains_point(point) {
                return true;
            }
        }
        return false;
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

### So what does this give us?
You are probably confused as to what this even means... Let me show you

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Complete Code

src/main.rs
```rust
fn main() {
    let rect = Rectangle::default();

    for point in rect.points() {
        println!("({}, {})", point.0, point.1);
    }

    let rect2 = Rectangle::default();

    println!("{}", rect.collide(&rect2));
}
```

src/shapes/rect.rs
```rust
impl Points for Rectangle {
    fn points(&self) -> super::collisions::PointIter {
        return super::collisions::PointIter {
            points: vec![
                (self.x, self.y),
                (self.x + self.width, self.y),
                (self.x, self.y + self.height),
                (self.x + self.width, self.y + self.height),
            ],
            idx: 0,
        };
    }
}

impl Contains for Rectangle {
    fn contains_point(&self, (x, y): (f64, f64)) -> bool {
        return x >= self.x && x <= self.x + self.width &&
            y >= self.y && y <= self.y + self.height;
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
