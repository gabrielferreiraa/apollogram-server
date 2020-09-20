<h4 align="center">
    <img src="https://img2.pngio.com/nodejs-koa-png-300_160.png" width="150" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="https://webassets.mongodb.com/_com_assets/cms/MongoDB_Logo_FullColorBlack_RGB-4td3yuxzjs.png" width="250" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
    <img src="https://miro.medium.com/max/901/1*GkrYGz_r9W6AVgEloQpJFQ.png" width="200" />
    <br><br>
    Project to practice and learn GraphQL concepts
</h4>
<hr>

<p align="center">
    <a href="https://graphql-timeline-api.herokuapp.com/playground" target="_blank">Demo 👉 https://graphql-timeline-api.herokuapp.com/playground</a>
</p>


## Getting Started
```bash
# clone repo
$ git clone https://github.com/gabrielferreiraa/timeline-graphql-api.git
$ cd timeline-graphql-api

# install dependencies
$ yarn

# start project
$ yarn start
```
See graphql interface on localhost link: `http://localhost:9000/playground`

<hr />

## **TODO** 📝
- [ ] `UpdatePost` - mutation
- [ ] `DeletePost` - mutation
- [ ] `DeleteUser` - mutation 
- [ ] `getPostById` - query
- [ ] GraphQL improviments
- [ ] add tests

<hr />

## Queries 🔎
Simple documentation to see query structures

### **getAllUsers**
```gql
query {
    getAllUsers {
        id
        name
        email
    }
}
```

### **getUserByEmail**
```gql
query {
    getUserByEmail(
        email: "user@email.com"
    ) {
        id
        name
        email
    }
}
```

### **getAllPosts**
```gql
query {
    getAllPosts {
        id
        title
        content
        user {
            name
            email
        }
    }
}
```

<hr />

## Mutations ✏️
Simple documentation to see mutation structures

### **Auth**
```gql
mutation {
    Auth(
        email: "user@email.com"
        password: "1234"
    ) {
        token
        error
    }
}
```

### **CreateUser**
```gql
mutation {
    CreateUser(
        name: "Raul Gil",
        email: "raul@email.com",
        password: "1234"
    ) {
        id
        name
        email
    }
}
```

### **UpdateUser**
```gql
mutation {
    UpdateUser(
        name: "Raul Gil - Edited",
        email: "raul-edited@email.com"
    ) {
        name
        email
    }
}
```

### **CreatePost**
```gql
mutation {
    CreatePost(
        title: "Post Title"
        content: "Post Content"
    ) {
        title
        content
        user {
            name
            email
        }
    }
}
```   

## License
<a href="./LICENSE">MIT</a>