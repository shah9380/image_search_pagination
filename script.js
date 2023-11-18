document.addEventListener('DOMContentLoaded',()=>{
    const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

        const myform = document.querySelector("form");
        const searchInput = document.getElementById("search-input");
        const imageContainer = document.getElementById("search-results");
        const showMoreButton = document.getElementById("show-more-button");

        let inputData = "";
        let page = 1;
        async function searchImages(){
            inputData = searchInput.value;
            const apiUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

            const response =await fetch(apiUrl);
            const data = await response.json();
            if(page === 1){
                imageContainer.innerHTML = "";
            }
            const results = data.results;
            results.map((result)=>{
                const card = document.createElement('div');
                card.classList.add('search-card');
                const image = document.createElement('img');
                image.src = result.urls.small;
                image.alt = result.alt_description;
                const imageLinkBox = document.createElement('a');
                imageLinkBox.href = result.links.html;
                imageLinkBox.target = '_blank';
                imageLinkBox.textContent = result.alt_description;

                card.append(image,imageLinkBox);
                imageContainer.appendChild(card);
            });
            page++;
            
            if(page>1){
                if(inputData === ""){
                    showMoreButton.style.display= 'none';
                    imageContainer.innerHTML = `<p>Kindly search some value<p>`;
                }else{
                    showMoreButton.style.display = "block";
                }   
                
            }
        }

        myform.addEventListener("submit",(event)=>{
            event.preventDefault();
            page = 1;
            searchImages();
        })
        showMoreButton.addEventListener('click',()=>{
            searchImages();
        });
});