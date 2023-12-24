export function Post(props) {
    console.log(props)
    return (
        <div>
            <h1>Post!</h1>
            <h1>{props.author}</h1>
        </div>
    )
}