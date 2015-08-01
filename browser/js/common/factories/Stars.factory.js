app.factory('Stars',function(){
  return {
    getNumber: function(num) {
        return new Array(Math.round(num));   
    },
    getNumberInverse: function(num) {
        return new Array(5-Math.round(num)); 
    }
  };
});