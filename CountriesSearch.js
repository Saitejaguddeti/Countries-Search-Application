function displayCountries()
{

    let resultCountriesEl = document.getElementById("resultCountries");

    let spinnerEl = document.getElementById("spinner");
    let searchInputEl = document.getElementById("searchInput");
    
    let searchInputVal = "";
    let countriesList = [];
    
    function displayCountriesList(countries) {
    
        let countryCardContainer = document.createElement("div");
        countryCardContainer.classList.add("col-12", "col-md-6");
        let countryCard = document.createElement("div");
        countryCard.classList.add("country-card", "d-flex", "flex-row");
    
        let countryFlag = document.createElement("img");
        countryFlag.src = countries.flag;
        countryFlag.classList.add("country-flag");
        countryCard.appendChild(countryFlag);
    
        let countryNameEl = document.createElement("div");
        countryNameEl.classList.add("ml-3");
    
        let countryName = document.createElement("p");
        countryName.textContent = countries.name;
        countryName.classList.add("country-name");
        countryNameEl.appendChild(countryName);
    
        let population = document.createElement("p");
        population.textContent = countries.population;
        population.classList.add("country-population");
        countryNameEl.appendChild(population);
        countryCard.appendChild(countryNameEl);
    
    
    
        countryCardContainer.appendChild(countryCard);
        resultCountriesEl.appendChild(countryCardContainer);
    
    }
    
    function displaySearchResults() {
        resultCountriesEl.textContent = "";
        
        for (let country of countriesList) {
            let countryName = country.name;
            if (countryName.includes(searchInputVal)) {
                displayCountriesList(country);
            }
    
        }
    
    }
    
    
    function getCountries() {
        let url = "https://apis.ccbp.in/countries-data";
        let options = {
        method: "GET"
    };
    
        spinnerEl.classList.remove("d-none");
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinnerEl.classList.add("d-none");
                countriesList = jsonData;
                console.log(jsonData);
                displaySearchResults();
            });
    }
    
    function onChangeSearchInput(event) {
        searchInputVal = event.target.value;
        console.log(searchInputVal);
        displaySearchResults();
    }
    getCountries();
    searchInputEl.addEventListener("keyup", onChangeSearchInput);
}