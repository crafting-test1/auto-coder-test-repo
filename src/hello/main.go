// Go Crafting Application Re-implementation
package main

import "fmt"

// Greeting represents a custom message to be displayed.
type Greeting struct {
	Message string
}

// NewGreeting creates a new Greeting with the given message.
func NewGreeting(message string) Greeting {
	return Greeting{Message: message}
}

// Display prints the Greeting's message to the console.
func (g Greeting) Display() {
	fmt.Println(g.Message)
}

func main() {
	greeting := NewGreeting("Hello, Crafting World!")
	greeting.Display()
}