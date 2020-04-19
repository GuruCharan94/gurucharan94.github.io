---
title: "Let's Go - Part 3 : Basic Concepts of the Go Programming Language (Contd.)"
date: 2020-04-15
header:
  teaser: "/assets/images/golang.png"
  thumbnail: "/assets/images/golang.png"
  og_image: "/assets/images/golang.png"
categories:
- go
tags:
- go
excerpt: ""
---

In this post, we will understand how to control the flow of code with if conditionals, for loops, switches and defers.

## Loops in Go

- Go has only one looping construct, the `for` loop. The basic for loop has three components separated by semicolons.

  - the init statement: executed before the first iteration
  - the condition expression: evaluated before every iteration and loop exits once this is false
  - the post statement: executed at the end of every iteration

- The init and post statements are optional. When they are omitted, go's for loop becomes a `while` loop.

- There are no parentheses surrounding the three components of the for statement and the braces { } are always required.

```go
package main

import "fmt"

func main() {
  
  for i := 0; i < 10; i++ {
    fmt.Println(i) // Prints 0,1, 2 up to 9
  }
  
  sum := 1
  for sum < 1000 {
    sum += sum
    fmt.Println(sum) // Prints 2,4,8,16,32,64,128... 1024
  }
}

```

## If

- The `if` statement need not be surrounded by parentheses ( ) but the braces { } are required.

- The else part is optional and can also contain an `if` statement.

- The `if` can start with a short statement to execute before the condition. The variables inside the short statement are also available inside any of the else blocks.

```go

package main

import (
  "fmt"
)

func oddoreven(x int) {

  // A simple if else statement
  if x%2 == 0 {
    fmt.Println("Even")
  } else {
    fmt.Println("Odd")
  }
}

func oddoreven2(x int) string {

  if y:=x%2; y == 0 { // y:=x%2 is the short statement before the condition
    return fmt.Sprintf("%d is even \n" , y) // y is available here
  } else {
    return fmt.Sprintf("%d is odd \n", y) // y is also available here
  }
}

func main() {
  
  oddoreven(33)

  fmt.Println(
    oddoreven2(1),
    oddoreven2(10),
  )

}

```

## Switch

- A switch statement is a shorter way to write a sequence of if-else statements.

- It evaluates cases from top to bottom, runs the first case whose value is equal to the condition expression and stops thereby not running the following cases . In effect, the `break` statement that is used in certain other languages is not needed.

```go

package main

import (
  "fmt"
  "runtime"
)

func main() {

  switch os := runtime.GOOS; os {
  case "darwin":
    fmt.Println("OS X.")
  case "linux":
    fmt.Println("Linux.")
  default:
    fmt.Printf("%s.\n", os)
  }
}

```

## Defer

- A defer statement defers the execution of a function until the surrounding function returns with 3 simple rules
  
  1. A deferred function's arguments are evaluated when the defer statement is evaluated.
  2. Deferred function calls are executed in Last In First Out order after the surrounding function returns.
  3. Deferred functions may read and assign to the returning function's named return values.

You can read more about `defer` and additional concepts like `panic` and `recover` [from this blog post](https://blog.golang.org/defer-panic-and-recover)

In this post, we looked at how to control the flow of code with if conditionals, for loops, switches and defers.
