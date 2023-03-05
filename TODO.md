## Project learnings
Basic language run through
- basic differences
- Numbers
- String vs &str // partial ownership question, mention that
- Stack vs Heap
- Vector

## The big three to help understand rust
Iterator
- for_each
- map / collect
- filter
- sum
- count
- position

Options
- get(i) in vector

Results
- read file
- anyhow package
- explain why not thiserror

Read File filled with numbers and sum it
- results
- cargo add anyhow
- options
- parse
- turbofish

What if its a mix of numbers / strings (create array)
- options
- enum
- match
- if let
- parse

Start with FS read json, parse json, and print json
- show about errors
- talk about strings
- basic proc macro usage
- structs
- basics about iterators
- options

Basic Traits
- FromStr
- An example of TraitExt!
- your own iterator!
  - skip other
- your own collect!
  - Point object

### ownership
Lets talk about it!
- references vs values
- the examples from yt!

### Advanced
- iterator and ownership
- interion mutability
- sizing and passing traits

## Ordering
- Language run through.
* basic syntax

- Deeper language run through
  option
  unwrap
  unwrap_or
  match / if let
  errors
  enums

- value types
- some things we will use a lot #[derive(Debug)]

* read standard in and parse out only numbers
- pit stop on results
* read standard in and lets tokenize by whitespace and store strings and numbers
- pit stop on enums
- don't forget to talk about pattern match lifting
* read standard in and lets also have own defined item, Point
- pit stop on trait basics
- implement FromStr

- the borrow checker
* the yt examples
* simple example where "it looks" like we have multiple references that are
  mutable out at the same time.

- vectors
- iterators
* vector
* map
* flat_map
* filter
* filter_map
* collect

- graph problem
- JSON / CLI args
- struct
- proc macros
- Interior mutability
* mutable things... with many references
- rc and refcell

### Things to remember
An intro?
Why learn rust?
Mutability
