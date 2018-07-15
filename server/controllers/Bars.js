const Bar = require('../models/bar');

function addBarToDb(bars, success) {
  var prom = function findBars(bar) {
    return Bar.findOne({id: bar.id}, function (err, foundBar) {
      if (foundBar === null) {
        new Bar({
          id: bar.id
        }).save()
      }
    })
  }

  Promise.all(bars.map(prom)).then(function (findResult) {
    Bar.find({}).then((foundBars) => {
      bars.map((yelpBar) => {
        foundBars.map((dbBar) => {
          if (yelpBar.id === dbBar.id) {
            yelpBar.going = dbBar.going
          }
        })
      })
      return success(bars)
    })
  })
}

module.exports = addBarToDb