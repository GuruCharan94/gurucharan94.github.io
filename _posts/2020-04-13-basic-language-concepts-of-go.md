---
title: "Let's Go - Part 2 : Basic Concepts of the Go Programming Language"
date: 2020-04-15
header:
  teaser: "/assets/images/golang.png"
  thumbnail: "/assets/images/golang.png"
  og_image: "/assets/images/golang.png"
categories:
- go
tags:
- go
excerpt: "This blog post contains the basic concepts and building blocks of the GO language such as Packages, DataTypes, Constants, Variables and Functions."
---

This is part 2 of a [multi-part series of blog posts on learning Go](https://www.gurucharan.in/lets-go/).

This blog post covers the basic concepts of the GO language and covers Packages, DataTypes, Constants, Variables and Functions.

## Package

- Every Go program is made up of packages. Programs start running in package main.

- The code sample below imports the `fmt` and `math/rand` packages into a parenthesized, "factored" import statement.

- By convention, the package name is the same as the last element of the import path. For instance, the `math/rand` package comprises files that begin with the statement package rand.

- In Go, a name is exported if it begins with a capital letter. From the `math` package, pi is not exported but PI is.

```go

package main

import (
  "fmt"
  "math/rand"
)

func main() {
  fmt.Println(math.pi) // Throws Error as pi is not exported
  
  fmt.Println(math.Pi) // Works Fine

}

```

## Data Types

The following are Go's basic data types.

```go

bool

string

int  int8  int16  int32  int64
uint uint8 uint16 uint32 uint64 uintptr

byte // alias for uint8

float32 float64

complex64 complex128

```

## Variables

- The `var` statement declares variables and the data type is specified after the name.

- The `var` may be "factored" into blocks, as with import statements.

- Inside a function, the `:= ` short assignment statement can be used in place of a var declaration with implicit type. Outside a function, `:=` construct is not available.

Variables declared without an explicit initial value are given their zero value.

The zero value is

- 0 for numeric types,
- false for the boolean type, and
- "" (the empty string) for strings.

```go

package main

var (
  ToBe   bool // Set to it's zero value
  MaxInt uint64     = 1<<64 - 1
  z      complex128 = cmplx.Sqrt(-5 + 12i)
)

var a,b int // Set to their zero value

func main() {
  i:= 20
  fmt.Println(i, a, b, ToBe, z, MaxInt)
}

```

## Constants

- Constants are declared but with the const keyword. They can also be "factored" into blocks, as with import statements.

- Constants can be character, string, boolean, or numeric values.

- Constants cannot be declared using the := syntax.

```go

package main

import "fmt"

const(
  x = "Hello"
)

func main() {
  var integer1 int = 52
  integer1 = 30

  const Pi = 3.14
  Pi = 1.22 // This fails as you cannot reassign a value to a constant
  
  fmt.Println(Pi);
  fmt.Println(x);
  fmt.Println(integer1);
}

```

## Functions

- A function can take zero or more arguments and that the type comes after the argument name.

- When two or more consecutive named function parameters share a type, you can omit the type from all but the last.

- A function can return any number of results.

```go

package main

import "fmt"

func add(x int, y int) int { // type comes after the argument
  return x + y
}

func subtract(x , y int) int { // the type of x is omitted
  return x - y
}

func divide(x , y int) (int, int) { // the function returns multiple results
  return x /y , x%y
}

func main() {
  fmt.Println(add(42, 13))
  fmt.Println(subtract(42, 13))
  fmt.Println(divide(42, 13))
}
```

In this blog post we looked at some of the basics concepts of the GO programming language such as Packages, DataTypes, Constants, Variables and Functions. In the next one, we will look at more concepts of the language such as

- Conditionals
- Loops
- Switches and
- Defers
