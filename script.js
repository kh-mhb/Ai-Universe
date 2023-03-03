let loadItems = async (itemsDetails) => {
    toggleSpinner(true);

    let url = `https://openapi.programming-hero.com/api/ai/tools`;

    let res = await fetch(url);
    let data = await res.json();

    displayItems(data.data.tools);

}

let displayItems = (allInfo) => {
    // console.log(allInfo);
    let itemContainer = document.getElementById('item-container');
    // allInfo = allInfo.slice(0, 6);
    let showAll = document.getElementById('show-all');
    // if (allInfo.length > 6) {
    //     allInfo = allInfo.slice(0, 6);
    //     showAll.classList.remove('d-none');
    // }
    // else {
    //     showAll.classList.add('d-none');
    // }

    allInfo.forEach(infoView => {
        console.log(infoView);
        let infoViewDiv = document.createElement("div");

        infoViewDiv.classList.add('col');
        let liEle = '';
        infoView.features.map(e => liEle += `<li>${e}</li>`)
        console.log(liEle)
        infoViewDiv.innerHTML =
            `  <div class="card h-100">
     <img src="${infoView.image}" class="card-img-top" alt="...">
     <div class="card-body">
         <h5 class="card-title">Features</h5>
         <ol>
 ${liEle}

         </ol>

     </div>
     <div class="card-footer">
     <div class="row">
     <div class="col-md-6">
       
        <div class="d-inline">
    
        <p class="fw-bold fs-6 mt-2">${infoView.name} </p>
        <p id="current-time" ><i class="fa-regular fa-calendar me-1"></i>${infoView.published_in} </p>
        </div>
     </div>
     <div class="col-md-6 mt-2 ">
     <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
     <i class="fa-solid fa-arrow-right"></i>
 </button>
     </div>
 </div>
      
     </div>
 </div>
      `;
        itemContainer.appendChild(infoViewDiv);

    })
    toggleSpinner(false);

}

let getCurrentTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // Note that getMonth() returns a zero-based index
    const day = now.getDate();
    // console.log(` ${hours}:${minutes}:${seconds}`);
    let finaltime = ` ${day}:${month}:${year}`;
    // let finalTimeString = finaltime.toString();
    console.log(typeof finaltime);
    return finaltime;

}
let finaltime = getCurrentTime();
console.log(finaltime)

let toggleSpinner = isLoading => {
    let spinnerSection = document.getElementById('loader');
    if (isLoading) {
        spinnerSection.classList.remove('d-none');
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}
// show all button
document.getElementById('show-all').addEventListener('click', function () {

    loadItems();
    // let hideItem = document.getElementsById('for-hide');
    // hideItem.classList.add('d-none');




})
// let showAll = () => {
//     loadItems();
//     let btnShowAll = document.getElementById('show-all');
//     btnShowAll.classList.add = 'd-none';

// }



loadItems();