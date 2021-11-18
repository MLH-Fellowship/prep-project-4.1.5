import usePlacesAPI from 'hooks/usePlacesAPI';



const MyComponent = props => {
    let = autocomplete;
    const options = {
        fields: ["name"],
        strictBounds: false,
        types: ["(cities)"],
      };

    usePlacesAPI('https://maps.googleapis.com/maps/api/js?key=AIzaSyDxIKL7YllFAYgcwsTL18MSRHoShLiLcZw&libraries=places&callback=initMap');
    
    autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), options);    
  

  // rest of your component
}