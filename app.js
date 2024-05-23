const searchBtn = document.querySelector('.search-button');
searchBtn.addEventListener('click', async function () {
  try {
    const inputKeyword = document.querySelector('.input-keyword');
    const movie = await getMovie(inputKeyword.value);
    updateUI(movie);
  } catch (err) {
    alert(err);
  }
});

function getMovie(keyword) {
  return fetch('http://www.omdbapi.com/?apikey=6dd6389&s=' + keyword)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .then((response) => {
      if (response.Response === 'False') {
        throw new Error(response.Error);
      }
      return response.Search;
    });
}

function updateUI(movie) {
  let card = '';
  movie.forEach((el) => (card += cardBox(el)));
  const movContainer = document.querySelector('.mov-container');
  movContainer.innerHTML = card;
}

document.addEventListener('click', async function (e) {
  try {
    if (e.target.classList.contains('mov-detail-button')) {
      const imdbid = e.target.dataset.imdbid;
      const movDetail = await getShowDetail(imdbid);
      uiDetail(movDetail);
    }
  } catch (err) {
    console.log(err);
  }
});

function getShowDetail(imdbid) {
  return fetch('http://www.omdbapi.com/?apikey=6dd6389&i=' + imdbid)
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.responseText);
      }
      return response.json();
    })
    .then((el) => el);
}

function uiDetail(el) {
  const showDetails = showDetail(el);
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = showDetails;
}

function cardBox(el) {
  return `<div class="col-md-4 my-3">
            <div class="card">
              <img
                src="${el.Poster}"
                class="card-img-top"
                alt="${el.Title}"
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
