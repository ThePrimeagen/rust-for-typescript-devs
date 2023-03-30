---
title: "Introduction"
description: "The introduction to this course."
---

## Rust for TypeScript devs

i hope you are ready, we will be moving fast today.

<br />
<br />

#### **Schedule**

- Vector, the basic data structure
- Iterators
- Enums - Result / Option focus
- Traits
- Light touch on memory

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

## An ass out of you and i

**ASSUMPTION**

- I think you are a bad programmer
  - its ok, i am a bad programmer, too. everyone is, except John Carmack.
- You can program TypeScript with relative ease.
- You know types, maybe no wizard, but you know types.

```typescript
// I assume everyone here can easily read this and understand what is happening
// here just by type definitions
type Promiseable<T> = {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: any) => void;
};
type PromiseFactory<T> = () => Promiseable<T>;

function explodePromise<T>(): Promiseable<T> {
  // technically there would be some errors here, but just ignore that :)
  let resolve, reject;
  let promise = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });

  return {
    promise,
    resolve,
    reject,
  };
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

## Why Rust?

There are a bunch of reasons, practically speaking, but for me there are two
things that particularly speak to me.

<br />
<br />

#### **Ergonomics**

This seems like every tweeter thread is mentions something with developer
ergonomics. but what in the world are they always talking about?

For me, ergonomics is defined on two axes, one quickly being able to write
software with low unexpected behavior, and two, maintain software longer

<br />
<br />

#### **JavaScripts(TS) vs Rust design decisions**

- Specify Readonly vs Specify Mutability
- undefined/null vs Option
- errors being thrown vs being returned

<br />
<br />

#### **Skill gap**

Yes skill gap. What do i mean by this?

<br />
<br />

#### **JavaScript / TypeScript**

JavaScript itself is a rather simple language. To become proficient in it is
rather small task comparatively. The place you spend most of your time is
learning how to use libraries and dealing with oddities.

When it comes to TypeScript you have a very complex (intentional) typesystem
that isn't typesafe.

I find that it can be hard to refactor larger typescript libraries as their
typings become inherently complex

## <br />

<br />
<br />

#### **Rust**

There are many deep topics within the language itself that it takes
significantly more time to master each of these. To me this makes me excited
because there are a lot of ways you can improve how you write software

I have explicitly planned one such of these adventures to show some of the
power of knowing rusts std and traits

The language is simply deeper itself, not just use of libraries. You have
complete control over where and how memory is used, and this can lead to some
very cool things.

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

## Goals for today

My goal today is that you end with enough knowledge to be able to google your
way through a small to mid sized cli application in rust

#### **What we wont cover**

- Errors - creating your own types
- Wasm / UI
- async
- smart pointers and interior mutability
- lifetimes - WHY NOT??
- macros, both proc macros and declarative macros
  - these truly make rust amazing

```rust
// ------v that is a macro!!!
return view! {
    <div>
        <MyCustomComponent name="hello" />
    </div>
};
```

I want you to be able to _use_ rust. You can learn the deep concepts on your
own.

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

## Who am I?

I am best known for my role at TheStartup™, which is CEO, CEO, CEO, CEO, and
Chairmen of the board.

![Youtube](./images/youtube.png)
![Twitch](./images/twitch.png)

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
