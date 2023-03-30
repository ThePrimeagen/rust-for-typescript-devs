---
title: "Reading Shapes from a File"
---

## What if we wanted to read our shapes from a file?

`FromStr` allows for a `&str` to become a `Type` through the method `parse`

You may remember from earlier, this code

```rust
// -------v
let foo: usize = "5".parse(); // <-- parse infers the usize parse
                              // due to type
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

## Before we implement a FromStr for both Circle and Rect

Whenever i deal with errors in small applications, at this point I just default
to using the `anyhow` crate. It makes working with errors very simple.

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

## Ok, lets use Anyhow and FromStr

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

## Complete Code

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

## Lets create a file!

We will use this file, parse out the contents, build our circle and rects, and
test to see if any circles intesect our rect (though... its not a good
formula).

<proj>/shapes

```bash
rect 0 0 10 20
circle 12 20 1
circle 0 20 4
rect 10 10 10 10
```

Requires

- reading a file (we have done)
- create an enum to store either a `Circle` or `Rect` in
- read each line and perhaps use `split_once` (recommend using pattern matching)
- find any _adjancent_ collision

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

## Complete Code

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
