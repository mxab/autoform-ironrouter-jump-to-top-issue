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
    'submit form': function (e) {
      e.preventDefault();
      console.log("submit event prevented");
      return false;
    }
  });
}
if(Meteor.isServer){

  if(!Books.findOne()){
    Books.insert({title: "The Autoform", authors:["dohomi"]})
  }
}