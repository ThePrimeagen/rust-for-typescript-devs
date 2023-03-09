---
title: "Rust Traits"
description: "Perhaps one of the best things about rust"
---

### Check point
We have talked about:
* Iterators
* Enums
    - Options
    - Results
* Borrow Checker

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

### Traits, they are like interfaces
You can define most of rust's behavior, from addition, equality checks,
hashing, parsing strings, to being displayed via traits.

Traits are effectively Interfaces but how they are used are a bit different,
and how the language lets you specify them is different.

What traits allow you to do cannot be directly done in JS.  The language
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

### Complete Code

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

So lets fix the error in rust, lets import `Area`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
(we are not done yet...)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

### Lets create a Rectangle!
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

### This is annoying to type

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

### The point's are _in_ the Rectangle?
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

### Ok... so implement display?
Lets try it out!

I'll give you one moment.  Btw, its `std::fmt::Display`.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
create!

Lets talk about how iterators are implemented (whiteboard)

Lets implement an iterator for `Rectangle`.  It will iterate over the four
points

src/shapes/rect.rs
* struct `RectIter` with a `points: Vec<(f64, f64)>` and `idx: usize`
* implement `Iterator` for `RectIter`
* implement `IntoIterator` for `Rectangle`

src/main.rs
* create a rect
* iterate over a rect `for point in rect` printing out each point
* print out the entire rectangle via the `Display` trait

I'll give you a moment to try it a bit yourself

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
    points: Vec<(f64, f64)>,
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

impl IntoIterator for Rectangle {
    type Item = (f64, f64);

    type IntoIter = RectIter;

    fn into_iter(self) -> Self::IntoIter {
        return RectIter {
            points: vec![
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

Lets do a quick example in main with `Vec` and a `for` loop to show the
consuming vs non consuming.

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

### Complete Code

```rust
impl IntoIterator for Rectangle {
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

### I hate duplicating code
Notice that they are the _same_ code, just different types.  One is the _value_
`Rectangle` and the other is a reference to `Rectangle`

* lets implement a constructor
* lets do it the trait way (`From`)

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
            points: vec![
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

### What about our own traits?
Lets create our own amazing trait!

Lets talk about collisions (don't worry we will stay out of complicated math)

* One side note, our collision system is _SUPER FLAWED_ but enough to make it
  easy to test and show off some _really_ cool features.  So just deal with it
  my game programmers that are in the audience.

* its Not really collision, its more checking to see if any `point` exists
  within

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

* implement trait `Collidable<T>` with fn `collide(&self, &T)` and
  `collides(&self, &[T])`

* implement `contains_point` for `Rectangle` and `Circle`
* implement `Collidable<Rectangle>` for `Rectangle`
* implement `Collidable<Circle>` for `Rectangle`
* implement `Collidable<Circle>` for `Circle`
* implement `Collidable<Rectangle>` for `Circle`

we are only looking for `point` inclusion

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
    pub fn contains_point(&self, (x, y): (f64, f64)) -> bool {
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
    pub fn contains_point(&self, (x, y): (f64, f64)) -> bool {
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
        return false;
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

### Is the code a bit... similar and... ugly?
Circular references??  Repetitive???  This just isn't the way.  If only there
was something we could do...  wait... could traits help?  how serendipitous!

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
* create a `PointIter` that has a `Vec<(f64, f64)>` and `idx`
* create a convenient method to take Vec<(f64, f64)> and convert it `into`
  `PointIter`
* implement `Iterator` for `PointIter`
* create a `Points` trait that has one method, `points`, that returns an
  `PointIter`
* create a `Contains` trait that has one method, `contains_point`, that returns
  `bool` if the point is contained within the geometry
* all of this in `src/shapes/collisions.rs`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

impl From<Vec<(f64, f64)>> for PointIter {
    fn from(value: Vec<(f64, f64)>) -> Self {
        return PointIter {
            points: value,
            idx: 0,
        };
    }
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
implementation.  This allows us to define a generic implemenation over generic
trait combinations!!!

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

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
Well, now we need to rework our `Rectangle` and `Circle` implementation a bit.

* We don't need `RectIter`, we have `PointIter` now.  So everything associated
  with `RectIter`, including `Rectangle` `IntoIterator` can be removed
* implement `Points` for `Rectangle`
* implement `Contains` for `Rectangle`
  - we already have that implemented on the `Rectangle` `impl`
* implement `Points` for `Circle`
* implement `Contains` for `Circle`
  - we already have that implemented on the `Circle` `impl`

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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

src/shapes/circle.rs
```rust
impl Contains for Circle {
    fn contains_point(&self, (x, y): (f64, f64)) -> bool {
        let dx = self.x - x;
        let dy = self.y - y;

        return dx * dx + dy * dy <= self.radius * self.radius;
    }
}

impl Points for Circle {
    fn points(&self) -> super::collisions::PointIter {
        return vec![
            (self.x, self.y),
        ].into();
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

### Lets try it out in our main file
* create 2 `Rectangle`s
* create 2 `Circle`s
* test "`Collision`s"

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### Why doesn't this work?

src/main.rs
```rust
mod shapes;

use shapes::{circle::Circle, collisions::Collidable};

use crate::shapes::rect::Rectangle;

fn main() {
    let rect = Rectangle::default();
    let rect2 = Rectangle::default();

    let circ = Circle {
        radius: 3.0,
        x: 1.0,
        y: 1.0,
    };

    let circ2 = Circle {
        radius: 2.0,
        x: 1.0,
        y: 1.0,
    };

    rect.collide(&rect2);
    circ.collide(&circ2);
    circ.collide(&rect);
}
```

Lets go look at our `Collidable` definition, perhaps we can see something wrong

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
impl<T, V> Collidable<T> for V
where T: Points,
      V: Contains
{
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

### That ... was a lot
Questions?

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>

### What if we wanted to read our shapes from a file?
`FromStr` allows for a `&str` to become a `Type` through the method `parse`

You may remember from earlier, this code

```rust
// -------v
let foo: usize = "5".parse(); // <-- parse infers the usize parse due to type
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

### Before we implement a FromStr for both Circle and Rect
Whenever i deal with errors in small applications, at this point I just default
to using the `anyhow` crate.  It makes working with errors very simple.

execute `cargo add anyhow`
```bash
➜  rust-typescript git:(master) ✗ cargo add anyhow
    Updating crates.io index
      Adding anyhow (workspace) to dependencies.
             Features as of v1.0.68:
             + std
             - backtrace
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

### Ok, lets use Anyhow and FromStr
We will implement a `Circle` and `Rectangle` parse

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
impl FromStr for Rectangle {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let parts: Vec<&str> = s.split(" ").collect();
        if parts.len() != 4 {
            return Err(anyhow::anyhow!("Invalid number of parts"));
        }

        return Ok(Rectangle {
            x: parts[0].parse()?,
            y: parts[1].parse()?,
            width: parts[2].parse()?,
            height: parts[3].parse()?,
        });
    }
}
```

src/shapes/circle.rs
```rust
impl FromStr for Circle {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let parts: Vec<&str> = s.split(" ").collect();
        if parts.len() != 3 {
            return Err(anyhow::anyhow!("Invalid number of parts"));
        }

        return Ok(Circle {
            x: parts[0].parse()?,
            y: parts[1].parse()?,
            radius: parts[2].parse()?,
        });
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

### Lets create a file!
We will use this file, parse out the contents, build our circle and rects, and
test to see if any circles intesect our rect (though... its not a good
formula).

<proj>/shapes
```bash
rect 0 0 10 20
circle 12 20 1 1
circle 0 20 4 4
rect 10 10 10 10
```

Requires
* reading a file (we have done)
* create an enum to store either a `Circle` or `Rect` in
* read each line and perhaps use `split_once` (recommend using pattern matching)
* find any _adjancent_ collision

You have done most of this so far throughout the day, lets see if you can do
this by yourself.

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
<br/>
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
mod shapes;

use std::{str::FromStr, fmt::Display};

use anyhow::Result;
use shapes::{rect::Rectangle, circle::Circle, collisions::{Points, Contains, Collidable}};

enum Shape {
    Rect(Rectangle),
    Circ(Circle),
}

impl FromStr for Shape {
    type Err = anyhow::Error;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        let (shape, data) = s.split_once(" ")
            .ok_or(anyhow::anyhow!("Invalid shape"))?;

        match shape {
            "circle" => return Ok(Shape::Circ(data.parse()?)),
            "rect" => return Ok(Shape::Rect(data.parse()?)),
            _ => return Err(anyhow::anyhow!("Invalid shape"))
        }
    }
}

impl Points for Shape {
    fn points(&self) -> shapes::collisions::PointIter {
        match self {
            Shape::Rect(rect) => return rect.points(),
            Shape::Circ(circ) => return circ.points(),
        }
    }
}

impl Contains for Shape {
    fn contains_point(&self, point: (f64, f64)) -> bool {
        match self {
            Shape::Rect(rect) => return rect.contains_point(point),
            Shape::Circ(circ) => return circ.contains_point(point),
        }
    }
}

impl Display for Shape {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Shape::Rect(rect) => return write!(f, "{}", rect),
            Shape::Circ(circ) => return write!(f, "{}", circ),
        }
    }
}

fn main() -> Result<()> {
    let file = std::fs::read_to_string("shapes")?;
    let shapes = file
        .lines()
        .filter_map(|line| line.parse().ok())
        .collect::<Vec<Shape>>();

    let collisions: Vec<(&Shape, &Shape)> = shapes
        .iter()
        .skip(1)
        .zip(shapes.iter().take(shapes.len() - 1))
        .filter(|(a, b)| a.collide(b))
        .collect();

    for (a, b) in collisions {
        println!("Collision: {} {}", a, b);
    }

    return Ok(());
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

