$('.search-button').on('click', function () {
  $.ajax({
    url:
      'http://www.omdbapi.com/?apikey=6dd6389&s=' + $('.input-keyword').val(),
    success: (result) => {
      const movie = result.Search;
      let card = '';
      movie.forEach((el) => {
        card += cardBox(el);
      });
      $('.mov-container').html(card);
      $('.mov-detail-button').on('click', function () {
        $.ajax({
          url:
            'http://www.omdbapi.com/?apikey=6dd6389&i=' +
            $(this).data('imdbid'),
          success: (el) => {
            const movDetail = showDetail(el);

            $('.modal-body').html(movDetail);
          },
        });
      });
    },
    error: (err) => {
      console.log(err.responseText);
    },
  });
});

function cardBox(el) {
  return `<div class="col-md-4 my-3">
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
                  class="btn btn-primary mov-detail-button" data-bs-toggle="modal" data-bs-target="#movDetail" data-imdbid="${el.imdbID}">Show Details</a
                > 
              </div>
            </div>
          </div>`;
}

function showDetail(el) {
  return `<div class="container-fluid">
            <div class="row">
              <div class="col-md-3">
                <img
                  src="${el.Poster}"
                  alt="${el.Title}"
                  class="img-fluid"
                />
              </div>
              <div class="col-md">
                <ul class="list-group">
                  <li class="list-group-item"><h4>${el.Title} (${el.Year})</h4></li>
                  <li class="list-group-item"><strong>Genre: </strong>${el.Genre}</li>
                  <li class="list-group-item"><strong>Director: </strong>${el.Director}</li>
                  <li class="list-group-item"><strong>Actors: </strong>${el.Actors}</li>
                  <li class="list-group-item">
                    <strong>Plot: </strong><br />${el.Plot}
                  </li>
                </ul>
              </div>
            </div>
          </div>`;
}
