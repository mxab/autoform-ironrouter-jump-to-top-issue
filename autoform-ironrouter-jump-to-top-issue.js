Books = new Mongo.Collection("books");


if (Meteor.isClient) {
  // counter starts at 0


  Template.home.helpers({
    Books: function () {
      return Books
    },
    theBook: function () {
      return Books.findOne();
    },
    allAuthors: function () {
      return [
        {value: "dohomi", label: "Dohomi"},
        {value: "mxab", label: "MxAb"}
      ]
    },
    isSelected: function () {
      var book = Books.findOne("sample");
      if (book) {


        var authorsOfTheBook = book.authors;

        var selectedCheck = authorsOfTheBook && authorsOfTheBook.length && $.inArray(this.value, authorsOfTheBook);
        console.log("is selected", this, selectedCheck);

        return selectedCheck && selectedCheck >=0;
      }
    }
  });

  Template.home.events({
    'submit form': function (e) {
      e.preventDefault();
      console.log("submit event prevented");

      var $form = $(e.target).closest("form");
      var title = $form.find("[name=title]").val();
      var authors = $form.find("[name=authors]").val();

      var update = {};
      if (title) {
        update["$set"] = update["$set"] || {};
        update["$set"]["title"] = title;
      } else {
        update["$unset"] = update["$unset"] || {};
        update["$unset"]["title"] = "";
      }
      if (authors && authors.length) {
        update["$set"] = update["$set"] || {};
        update["$set"]["authors"] = authors;
      } else {
        update["$unset"] = update["$unset"] || {};
        update["$unset"]["authors"] = authors

      }
      Books.update("sample", update);

      return false;
    }
  });
}
if (Meteor.isServer) {

  if (!Books.findOne()) {
    Books.insert({_id:"sample", title: "The Autoform", authors: ["dohomi"]})
  }
}