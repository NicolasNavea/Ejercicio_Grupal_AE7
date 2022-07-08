$(document).ready(function(){
  Fancybox.bind("#gallery a", {
    groupAll : true, // Group all items
    on : {
      ready : (fancybox) => {
        console.log(`fancybox #${fancybox.id} is ready!`);
      }
    }
  });
});

$( function() {
  $( "#speed" ).selectmenu();

  $( "#files" ).selectmenu();

  $( "#number" )
    .selectmenu()
    .selectmenu( "menuWidget" )
      .addClass( "overflow" );

  $( "#salutation" ).selectmenu();
} );


