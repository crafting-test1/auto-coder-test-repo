# myapp
def my_rack_app
  [200, { "Content-Type" => "text/html" }, ["Hello world!"]]
end

run my_rack_app
