# KeyPath

[`KeyPath`][KeyPath] is a feature of Swift that I have yet to see an exact
equivalent to in any other language. The closest I have seen are lenses, as
used in functional programming, but it's not quite the same. Swift's `KeyPath`
actually has dedicated syntax, and they work on all structs/classes as a
primitive operation. Very neat.

[KeyPath]: https://docs.swift.org/swift-book/documentation/the-swift-programming-language/expressions/#Key-Path-Expression

Languages with decent metaprogramming should be able to define an equivalent
to the `KeyPath`, such that there is "syntax" for creating one, and then they
can be applied to other values to access their properties. Bonus points if you
can write to the underlying value's properties via this `KeyPath` as well.
