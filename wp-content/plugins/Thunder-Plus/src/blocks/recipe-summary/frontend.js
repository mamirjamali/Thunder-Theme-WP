import Rating from '@mui/material/Rating/index.js'
import { render, useState } from '@wordpress/element'
import apiFetch from "@wordpress/api-fetch"

function RecipeRating(props){
    const [avgRating, setAvgRating] = useState(props.avgRating)
    const [permission, setPermission]= useState(props.loggedIn)
    return(
        <Rating
         value={avgRating}
         precision={0.5}
         onChange={async(event, rating) => {
            if(!permission){
                return alert("You have already rated this recipe or you may need to log in.")
            }

            setPermission(false)

            const response = await apiFetch({
                //example.com/wp-json/thp/v1/rate
                path: 'thp/v1/rate',
                method: 'POST',
                data:{
                    postID: props.postID,
                    rating
                }
            })
            console.log(response)
            if(response.status == 2){
                setAvgRating(response.rating)
            }
         }}
        />
    )
}

document.addEventListener('DOMContentLoaded', ()=>{
    const block = document.querySelector("#recipe-rating")
    const postId = parseInt(block.dataset.postId)
    const avgRsting = parseFloat(block.dataset.avgRating)
    const loggedIn = !!block.dataset.loggedIn

    render(
    <RecipeRating
      postID={postId}
      avgRating={avgRsting}
      loggedIn={loggedIn}
    />,
     block)
})