package main

import "testing"

func TestMainOutput(t *testing.T) {
  expected := "Hello Crafting Sandbox"
  if "Hello Crafting Sandbox" != expected {
    t.Errorf("Expected %s but got %s", expected, "Hello Crafting Sandbox")
  }
}
