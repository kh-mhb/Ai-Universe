let loadItems = async (dataLimit) => {
    toggleSpinner(true);
    // processSearch(6);

    let url = `https://openapi.programming-hero.com/api/ai/tools`;

    let res = await fetch(url);
    let data = await res.json();

    displayItems(data.data.tools, dataLimit);

}

let displayItems = (allInfo, dataLimit) => {
    // console.log(allInfo);
    let itemContainer = document.getElementById('item-container');
    // allInfo = allInfo.slice(0, 6);
    let showAll = document.getElementById('show-all');
    // process search.......have to edit
    // if (dataLimit && allInfo.length > 6) {
    //     allInfo = allInfo.slice(0, 6);
    //     showAll.classList.remove('d-none');
    // }
    // else {
    //     showAll.classList.add('d-none');
    // }

    allInfo.forEach(infoView => {
        // console.log(infoView.id);
        let infoViewDiv = document.createElement("div");

        infoViewDiv.classList.add('col');
        let liEle = '';
        infoView.features.map(e => liEle += `<li>${e}</li>`)
        // console.log(liEle)
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
     <button onclick="loadTheId('${infoView.id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
    const month = now.getMonth() + 1;
    const day = now.getDate();

    let finaltime = ` ${day}:${month}:${year}`;


    return finaltime;

}
let finaltime = getCurrentTime();


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
let loadTheId = async (id) => {
    let url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    let res = await fetch(url);
    let data = await res.json();
    displayModalData(data.data);
    // console.log(id);

}
let displayModalData = modalInfo => {
    let modalShortInfo = document.getElementById('modal-short-info');
    modalShortInfo.innerText = modalInfo.description;
    // let modalImage = document.getElementById('modal-image');
    // ModalImage.innerText = modalImage.logo;

    let modalDiv11 = document.getElementById('modal-div-1-1');
    modalDiv11.innerText = modalInfo?.pricing[0]?.price ? modalInfo.pricing[0].price : "Free Of Cost";

    let modalDiv12 = document.getElementById('modal-div-1-2');
    modalDiv12.innerText = modalInfo.pricing[0].plan;
    let modalDiv21 = document.getElementById('modal-div-2-1');
    modalDiv21.innerText = modalInfo.pricing[1].price ? modalInfo.pricing[1].price : "Free Of Costs"
    let modalDiv22 = document.getElementById('modal-div-2-2');
    modalDiv22.innerText = modalInfo.pricing[1].plan;
    let modalDiv31 = document.getElementById('modal-div-3-1');
    modalDiv31.innerText = modalInfo.pricing[2].price ? modalInfo.pricing[2].price : "Free Of Costs"
    let modalDiv32 = document.getElementById('modal-div-3-2');


    modalDiv32.innerText = modalInfo.pricing[2].plan ? modalInfo.pricing[2].plan : " ";

    let item1 = document.getElementById("item-1");
    item1.innerText = modalInfo.integrations[0];
    let item2 = document.getElementById("item-2");
    item2.innerText = modalInfo.integrations[1] ? modalInfo.integrations[1] : "No More Data Found";
    let item3 = document.getElementById("item-3");
    item3.innerText = modalInfo.integrations[2] ? modalInfo.integrations[2] : "No More Data Found";

    let feature1 = document.getElementById("feature-1");
    feature1.innerText = modalInfo.features[1].feature_name;
    let feature2 = document.getElementById("feature-2");
    feature2.innerText = modalInfo.features[2].feature_name;
    let feature3 = document.getElementById("feature-3");
    feature3.innerText = modalInfo.features[3].feature_name;

    let modalQuestion = document.getElementById('modal-q');
    modalQuestion.innerText = modalInfo.input_output_examples[0].input;
    let modalAns = document.getElementById("modal-ans");
    modalAns.innerText = modalInfo.input_output_examples[0].output;
    document.getElementById('modal-image').setAttribute('src', `${modalInfo.image_link[0]}`)
    let modalTittle = document.getElementById('exampleModalLabel');
    modalTittle.innerText = modalInfo.tool_name;


    if (modalInfo?.accuracy?.score) {
        let score = modalInfo?.accuracy?.score * 100
        let modalPicDiv = document.getElementById('modal-pic-div')
        modalPicDiv.innerHTML += ` <div id="accuracy"
        class="position-absolute top-0 badge  bg-danger end-0  text-center  m-2">
        <p>${score} % accuracy</p>
    </div>`
        // acuEle

    }



}
let processSearch = (dataLimit) => {
    loadItems(dataLimit);

}

document.getElementById('btn-show-all').addEventListener('click', function () {
    processSearch();
}
)


loadItems();