const yelp = require('yelp-fusion');

require('dotenv').load();
const apiKey = process.env.API_KEY;

const searchRequest = location => {
  return {
    categories: 'bars',
    location: location,
    limit: 5
  };
};

function yelpSearch(location, success, error) {
  const client = yelp.client(apiKey);

  client
    .search(searchRequest(location))
    .then(response => {
      const firstResult = response.jsonBody.businesses[1];
      const relevantBars = relevantInfo(response.jsonBody.businesses);
      return relevantBars;
    })
    .then(bars => {
      function sleeper(ms) {
        return function(x) {
          return new Promise(resolve => setTimeout(() => resolve(x), ms));
        };
      }
      var fn = function getReview(bar) {
        return client.reviews(bar.id).then(response => {
          return response.jsonBody.reviews[0].text;
        }).catch(e => {
          return error(e);
        });
      };
      var actions = bars.map(fn);
      var results = Promise.all(actions);
      results.then(reviews => {
        reviews.forEach(function(review, index) {
          bars[index].review = review;
        });
        return success(bars);
      });
    })
    .catch(e => {
      return error(e);
    });
}

function relevantInfo(bars) {
  return bars.map(bar => {
    return {
      id: bar.id,
      name: bar.name,
      photo: bar.image_url,
      url: bar.url,
      going: 0
    };
  });
}

module.exports = yelpSearch;
