Router.route('/', function () {
  this.render('Home', {
    data: function () {
      return {}
    }
  });
});


Books = new Mongo.Collection("books");

Books.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: "Title",
    max: 200
  },

  mainAuthor: {
    type: String,
    optional: true,
    label: function () {
      return "Main Authors";
    },
    autoform: {

      options: function () {
        // important having options as function because of Helpers
        return [
          {
            value: "dohomi", label: "Dohomi"
          },
          {
            value: "mxab", label: "Mxab"
          }]
      }
    }
  },
  authors: {
    type: [String],
    optional: true,
    label: function () {
      return "Authors";
    },
    autoform: {

      options: function () {
        // important having options as function because of Helpers
        return [
          {
            value: "dohomi", label: "Dohomi"
          },
          {
            value: "mxab", label: "Mxab"
          }]
      }
    }
  }
}));

if (Meteor.isClient) {
  // counter starts at 0


  Template.home.helpers({
    Books: function () {
      return Books
    },
    theBook : function(){
      return Books.findOne();
    }
  });

  Template.home.events({
    'form submit': function (e) {
      e.preventDefault();
    }
  });
}


if(Meteor.isServer){

  if(!Books.findOne()){
    Books.insert({title: "The Autoform", authors:["dohomi"]})
  }
}