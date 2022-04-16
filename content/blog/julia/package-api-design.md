---
title: "API design: Using Julia interfaces"
date: "2022-04-16T22:12:03.284Z"
description: "A good API a package keeps the debugger away."
---

### What is an API?

Okay, maybe that's not why you visited this page, just jump directly to [Julia Interfaces](#julia-interfaces) .

### Interfaces

#### Package interfaces

Julia packages are defined as a collection of functions, abstract and non-abstract types which are made available (mostly via exports) to any dependent package. It is possible to have packages that just define a few abstract types and a few functions/properties over these abstract types and the user of the package is expected to write their own custom types conforming to the guidelines set by the package. These guidelines ensure that the user's custom types are usable with the functions supplied by the package and only the smallest subsection of code that must be user defined is allowed to be exposed. You might already guess the advantage behind this, yes lesser chances of bugs getting introduced just because the user forgot to read the docs properly. 

The package we consider for our discussion is :- [NetworkLayouts.jl](https://github.com/JuliaGraphs/NetworkLayout.jl). In fact this article was inspired by unique way the API for this package was designed.

Before that let's consider a simpler example.

Let's say we have a `struct` called `Ball` and you want this ball to be usable by a package which defines useful utilites for ball type objects. For all we know this could just be a coloring function for the ball. However, this coloring function would not be able to color our ball if it did not know the shape of the ball. So what the package creator could do is define a `shape` function on a abstract type which our ball must be a sub type of. Now, we can provide our own function as part of our user code to support the `shape` call made by the package coloring function. Thus we have successfully, restricted the user to just define a shape function and call it from our package code whenever necessary.

A simple code example for this would be
```julia
# Inside the coloring package

abstract type BallLike end

function coloring(bl::BallLike)
    shp = shape(a)
    # add coloring
end

function shape(a::A) end

# package code ends here
# user code below

struct Ball <: BallLike
end

function shape(b::Ball) 
    # return shape
end

b = B()
coloring(b)
```

#### Julia interfaces

To look at the actual page in the julia developer manuals, refer to the following [link](https://docs.julialang.org/en/v1/manual/interfaces/#man-interface-iteration). In short, Julia interfaces are a informal collection of functions which when supported (by your type) can unlock a wide suite of convenient functions. 

If you took a glance at the link above, you might notice that interfaces are very popular when it comes to adding support for iteration, indexing, broadcasting etc. for your package. These interfaces are decided by Julia `Base` and are arguably minimal to enable a whole lot of features for your package.


###### A dummy package inspired from NetworkLayout.jl

In a few words, this package is required in case you have a graph (or a adjacent matrix) and you wish to create a 2D representation of your graph. There are many options that this package provides to do so but we will not discuss that in this article. Our focus will be on the way the package was designed to make the addition of new network implementations as flexible as possible.

If we start to look into the module file, we will notice it defines a couple of abstract types and subtypes defined on them. We will also see some macros and functors (functions attached to a type).

Let's start by identifying what entails when we add a abstract type to a package. It means that we can define funtions with arguments of that type, attach functions to that type, create new abstract or non-abstract sub-types from that type or simply new types aggregating over that type.
Whew! that's a lot. 

```julia
abstract type A end

function forA(a::A) end

(attachedToA::A)() = someFuncDefinedSomewhere()

abstract type B <: A end

struct C <: A
end

struct D
    c::C
    a::A
end
```

Now, even this might not be enough, we may need to add another of abstract types sub-typed over A. Let's call it `subA`. This type might have some actual package code implemented for it not like the all-knowing mega type `A`. 

Below, we consider one such use case. Let's say we want to export a function which requires a user to define only a certain property (or a function) over its custom types. The property we consider below is **iterability** which can be enabled by supporting `Base.iterate()`. 

```julia
abstract type subA <: A end

function someFunc(sa::subA)
    iter = Base.iterate(sa)
    # do something useful with iter
end

# user code below
struct someType <: subA
end

#define someType with Base.iterate
function Base.iterate(st::someType)
    #do something
end
```

<!-- ##### Are we done?

Well no, unless we export `someFunc` noone can really use it outside of our package. So what do we do? Note that exporting `someFunc(::subA)` is useless since `subA` is an abstract type. We need to export the `someFunc` method (overloads in julia) defined over the user type `someType`. The problem is we don't know this type unless we let the user use the package which almost always happens after we have published the package. 

##### Macros to our rescue!
One of my favorite part of Julia is this beast called macro. They let you add code which can modify or create new code! How cool is that?!

We need to create only one macro for the user to use when they are defining their package. Let's call it `@addcall` (inspired from NetworksLayout.jl). If you are new to macros, reading up the developer manuals is the best place to know more about it.

```julia
macro addcall(expr::Expr)
    typedef = expr.args[2]
    name = typedef.args[1]
    fname = Symbol(lowercase(String(name)))
    return quote
        $(esc(expr))
        $(esc(fname))(g; kwargs...) = ($name(; kwargs...), g)
        export $(esc(fname))
    end
end
```

Now, we can export `@addcall` and let the user use it on their `struct` as follows
```julia
@addcall struct someType <: subA
end
```
This should automatically create and export `someFunc(::someType)` for anybody to use. Yes, now we are done! -->

Bravo! we have succesfully created a package that can define a very high level interface for users to extend to their free will without the possibility of many bugs getting added.