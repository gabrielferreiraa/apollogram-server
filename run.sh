TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmZmVmNmI5MzNjZmFmMDAzYjljMzY2YyIsImlhdCI6MTYxMDU0ODM0OSwiZXhwIjoxNjEwNTkxNTQ5fQ.GcD6ESE0MvLsdq3HuTDNVWdMNCCRV9_oy0Y6FEyUrO0"
HOST="http://localhost:9000"

echo '[query] users'
QUERY_USERS=$(
    curl --silent --request POST \
        --url $HOST/graphql \
        --header "Authorization: ${TOKEN}" \
        --header 'Content-Type: application/json' \
        --data '{"query":"query {\n  users {\n    id\n    name\n    email\n    picture\n    posts {\n      id\n      title\n    }\n  }\n}"}'
)

echo $QUERY_USERS | jq

echo '[query] posts'
QUERY_POSTS=$(
    curl --silent --request POST \
        --url $HOST/graphql \
        --header "Authorization: ${TOKEN}" \
        --header 'Content-Type: application/json' \
        --data '{"query":"query {\n  posts {\n    id\n    title\n    content\n    user {\n      name\n    }\n  }\n}"}'
)

echo $QUERY_POSTS | jq
