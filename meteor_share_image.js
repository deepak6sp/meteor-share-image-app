Images = new Mongo.Collection("images");
//console.log(Images.find().count());


if (Meteor.isClient) {

  Template.image_show.helpers({
    images:Images.find()
  });

  Template.image_show.events({
    'click .delete-btn' :function(){
      var image_id = this._id;
      $("#"+image_id).hide('slow',function(){
        Images.remove({"_id":image_id})
      });   
    },
    'click .rate-image' : function(event){
      var rating = $(event.currentTarget).data('userrating');
      var image_id = this._id;
      console.log("rating is "+rating);
      console.log("image id is "+image_id);
      Images.update(
        {_id : image_id},
        {$set : {rating : rating}}
      );
    } 
    
  });

}

if (Meteor.isServer) {

  if (Images.find().count() == 0){
    Meteor.startup(function () {
    for (var i=1;i<23;i++){
      Images.insert ({
        img_src : "img_"+i+".jpg",
        img_alt : "this is img"+i+".jpg"
      });
    }
  });
  }  

} 
 