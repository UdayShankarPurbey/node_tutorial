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
  product(id: "4") {
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
mutation{
  createProduct(title: "test", category: "testing", price: 45.23, inStock: false) {
    title ,
    category,
    price,
    inStock,
  }
}
```

## Delete Product
```graphql 
mutation {
  deleteProduct(id: "4") 
}
```

## Update Product
```graphql 
mutation {
  updateProduct(id: "4" , category: "updates") {
    title,
    category,
    price,
    inStock
  }
}
```