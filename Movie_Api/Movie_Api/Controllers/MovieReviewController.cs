using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Movie_Api.Model;

namespace Movie_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MovieReviewController : ControllerBase
    {
        private static List<MovieReviewModel> reviews = new List<MovieReviewModel> {
                new MovieReviewModel{Id =1,MovieName="KGF",ReviewComments="Good"},
                new MovieReviewModel{Id =2,MovieName="Vikram",ReviewComments="Thriller"}
            };
        [HttpGet]
        public async Task<ActionResult<List<MovieReviewModel>>> Get()
        {
            return Ok(reviews);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<MovieReviewModel>> Get(int id)
        {
            var review = reviews.Find(i => i.Id == id);
            if(review ==null)
            {
                return BadRequest("Movie not found");
            }
            return Ok(review);
        }
        [HttpPost]
        public async Task<ActionResult<List<MovieReviewModel>>> AddReview(MovieReviewModel review)
        {
            reviews.Add(review);
            return Ok(reviews);
        }
        [HttpPut("{id}")]
        public async Task<ActionResult<List<MovieReviewModel>>> UpdateReview(int id,MovieReviewModel review)
        {
            var reviewUpdate = reviews.Find(i => i.Id == id);
            if (reviewUpdate == null)
            {
                return BadRequest("Movie not found");
            }
            reviewUpdate.Id = review.Id;
            reviewUpdate.MovieName = review.MovieName;
            reviewUpdate.ReviewComments = review.ReviewComments;

            return Ok(reviews);
        }
        [HttpDelete("{id}")]
        public async Task<ActionResult<MovieReviewModel>> deleteReview(int id)
        {
            var review = reviews.Find(i => i.Id == id);
            if (review == null)
            {
                return BadRequest("Movie not found");
            }
            reviews.Remove(review);
            return Ok(reviews);
        }
    }
}
