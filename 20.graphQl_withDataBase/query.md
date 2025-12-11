# GraphQl Query

## Get All Products

```graphql
query Products {
  products {
    id
    category
    title
    price
    inStock
  }
}
```

## Get Product By Id

```graphql
query {
  product(id: "67dd5463df6de7402302c16e") {
    id
    category
    title
    price
    inStock
  }
}
```

## Add Product

```graphql
mutation {
  createProduct(title: "test", category: "testing", price: 45.23, inStock: false) {
    title
    category
    price
    inStock
  }
}
```

## Delete Product

```graphql
mutation {
  deleteProduct(id: "67dd5463df6de7402302c16e")
}
```

## Update Product

```graphql
mutation {
  updateProduct(id: "67dd5449df6de7402302c16c", category: "check_testing") {
    title
    category
    price
    inStock
  }
}
```
