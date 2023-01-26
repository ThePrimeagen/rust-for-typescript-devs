---
title: "Enums"
description: "An introduction into enums"
---

### Lets just jump right in.
The thing we will tackle first may seem like an odd thing to start with.

Remember, this isn't a course to teach you how to program, this is a course to
teach you how to program rust and assuming you have programming knowledge

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

### TypeScript
They are plain, and people hate them...

```typescript
enum Foo {
    Bar,
    Baz,
    Buz,
}

enum Foo2 {
    Bar2 = "Thing",
    Baz2 = "Thang",
    Buz2 = "Thung",
}

console.log("foo", Foo, "foo2", Foo2); // what does this do?

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

```typescript
foo {
  "0": "Bar",
  "1": "Baz",
  "2": "Buz",
  "Bar": 0,
  "Baz": 1,
  "Buz": 2
}

foo2 {
  "Bar2": "Thing",
  "Baz2": "Thang",
  "Buz2": "Thung"
}
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

```typescript
enum Foo {
    Bar,
    Baz,
    Buz,
}

function testFoo(_foo: Foo) {
}

testFoo(4);
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

### Reminder
TypeScript isn't necessarily typesafe.

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

### Rust
1. rust enums are like nothing you have ever seen
1. rust enums are like `type Foo = string | number` in typescript but not really
1. rust enums will blow your mind...

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

### Lets Program them,
I don't just want to show you, i want you to experience it for yourself

* basic definition
* basic usage
* impl
* adding types
* usage
* adding generics

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

