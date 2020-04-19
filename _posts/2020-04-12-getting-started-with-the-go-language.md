---
title: "Let's Go - Part 1 : Getting Started with the Go Programming Language"
date: 2020-04-12
header:
  teaser: "/assets/images/golang.png"
  thumbnail: "/assets/images/golang.png"
  og_image: "/assets/images/golang.png"
categories:
- go
tags:
- go
excerpt: "In this blog post, we look at what is the Go programming language, installing the Go binaries and running a simple 'Hello World' program in Go."
---

This is part 1 of a [multi-part series of blog posts on learning Go](https://www.gurucharan.in/lets-go/).

In this blog post, we looked at what is the Go programming languages, installing the Go binaries and running a simple "Hello World" program in Go.

## The Go Programming Language

An internet search on Go will lead you the [official documentation on Go](https://golang.org/doc/) that states

> Go is expressive, concise, clean, and efficient. Its concurrency mechanisms make it easy to write programs that get the most out of multicore and networked machines, while its novel type system enables flexible and modular program construction. Go compiles quickly to machine code yet has the convenience of garbage collection and the power of run-time reflection. It's a fast, statically typed, compiled language that feels like a dynamically typed, interpreted language.

It looks like Go's strongest features are

- Concurrency
- Smaller Footprint
- Run-time Reflection
- Garbage Collection

There may be a lot to unpack here. I will not be doing that here because I don't need these features now. I want to install Go successfully and get to "Hello, World !". Let's do that now and leave the advance bits for later.

If you want to use an online playground to practice Go, you can do so at [the Go playground](https://play.golang.org/)

## Installation of Go

You can [download Go from the downloads page](https://golang.org/dl/). I have a Windows 10 machine and will download the Go binaries for windows. The installation was fairly simple. Next, Next, Accept the terms and conditions that I carefully spent 5 hours reading 🤣 and Finish. I see that Go is installed in `C:\Go`.

Next, I open a PowerShell window and type 'go' and see the below output. Go is installed successfully. As of writing, I have the `1.14.2` version of Go installed.

```powershell
Go is a tool for managing Go source code.

Usage:

        go <command> [arguments]

The commands are:

        bug         start a bug report
        build       compile packages and dependencies
        clean       remove object files and cached files
        doc         show documentation for package or symbol
        env         print Go environment information
        fix         update packages to use new APIs
        fmt         gofmt (reformat) package sources
        generate    generate Go files by processing source
        get         add dependencies to current module and install them
        install     compile and install packages and dependencies
        list        list packages or modules
        mod         module maintenance
        run         compile and run Go program
        test        test packages
        tool        run specified go tool
        version     print Go version
        vet         report likely mistakes in packages

Use "go help <command>" for more information about a command.

Additional help topics:

        buildmode   build modes
        c           calling between Go and C
        cache       build and test caching
        environment environment variables
        filetype    file types
        go.mod      the go.mod file
        gopath      GOPATH environment variable
        gopath-get  legacy GOPATH go get
        goproxy     module proxy protocol
        importpath  import path syntax
        modules     modules, module versions, and more
        module-get  module-aware go get
        module-auth module authentication using go.sum
        module-private module configuration for non-public modules
        packages    package lists and patterns
        testflag    testing flags
        testfunc    testing functions

Use "go help <topic>" for more information about that topic.
```

## Hello World in Go

I fired up VS Code and pasted the "Hello World" program from the docs.

```go

package main

import "fmt"

func main() {
  fmt.Printf("hello, world\n")
}
```

You can build it with the Go tool by running `go build <filename>.go`. This creates a `<filename>.exe` in the same folder from where the command was run. Running `<filename>.exe` prints hello world on the console. For more details on the build command in Go, run `go help build`.

In this blog post, we looked at what is the Go programming languages, installing the Go binaries and running a simple "Hello World" program in Go. But I don't really know what is happening in the program. In the next part, we will hopefully get to know more about the important concepts of the language and perhaps words like  `package`,  `import` and others will make more sense then.
