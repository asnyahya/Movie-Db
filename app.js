$.ajax({
  url: 'http://www.omdbapi.com/?apikey=6dd6389&s=avengers',
  success: (result) => {
    const movie = result.Search;
    let card = '';
    movie.forEach((el) => {
      card += `<div class="col-md-4 my-3">
        <div class="card">
          <img
            src="${el.Poster}"
            class="card-img-top"
            alt="${el.Title}
          />
          <div class="card-body">
            <h5 class="card-title">${el.Title}</h5>
            <h6 class="card-subtitle mb-2 text-muted">${el.Year}</h6>
            <a
              href="#"
              class="btn btn-primary"
              >Show Details</a
            >
          </div>
        </div>
      </div>`;
    });
    $('.mov-container').html(card);
  },
  error: (err) => {
    console.log(err.responseText);
  },
});
