const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

const showLoader = () => {
    document.getElementById("loader").classList.remove("hidden");
    document.getElementById("video-container").classList.add("hidden");
}

const hideLoader = () => {
    document.getElementById("video-container").classList.remove("hidden");
    document.getElementById("loader").classList.add("hidden");
}
const loadVideos = (searchText = "") => {
    showLoader();
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById("all-btn").classList.add("active");
            displayVideos(data.videos)
        })
}

const loadByCategory = (id) => {
    showLoader()
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

    fetch(url).then(res => res.json())
        .then(data => {
            removeActiveClass()
            const clickedBtn = document.getElementById(`btn-${id}`)
            clickedBtn.classList.add("active");
            // console.log(clickedBtn)
            displayVideos(data.category)
        })
}

const loadVideoDetails = (videoId) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url).then(res => res.json())
        .then(data => displayVideoDetails(data.video))
}

const displayVideoDetails = (video) => {
    //console.log(video);
    document.getElementById("video_details").showModal()
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
    <div class = "card bg-base-100 shadow-sm">
        <figure>
        <img src = "${video.thumbnail}" alt = "Shoes"/>
        </figure> 
        <div class = "card-body">
        <h2 class = "card-title"> ${video.title} </h2> 
        <p> ${video.description} </p> 
        
        </div> 
        </div>
    `
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container")
    categories.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <button id = "btn-${item.category_id}"
        onclick = "loadByCategory(${item.category_id})"
        class = "btn btn-sm hover:bg-[#FF1F3D] hover:text-white"> ${
            item.category
        } </button>
        `
        categoryContainer.append(div);
    })
}

const displayVideos = (videos) => {
    //console.log(videos)
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = '';

    if (videos.length == 0) {
        videoContainer.innerHTML = `
        <div class = "col-span-full flex flex-col justify-center items-center py-20 gap-2">
            <img class = "w-[130px]"
        src = "./assets/Icon.png"
        alt = "">
            <h2 class = "text-xl font-bold" > Oops!!Sorry, There is no content here </h2> </div>
        `
        hideLoader()
        return;
    }

    videos.forEach(video => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100">
        <figure class="relative">
            <img class="w-full h-[200px] object-cover"
            src="${video.thumbnail}"
            alt="Shoes" />
            <span class="absolute bottom-2 right-2 text-sm text-white bg-black rounded px-2">3hrs 56 min ago</span>
        </figure>
        <div class="flex gap-3 px-0 py-5">
            <div class="profile">
                <div class="avatar">
                <div class = "ring-primary ring-offset-base-100 ring ring-offset-2 w-6 rounded-full">
                    <img
                    src="${video.authors[0].profile_picture}"
                    />
                </div>
                </div>
            </div>
            <div>
                <h3 class="text-xl font-bold">${video.title}</h3>
                <p class="text-sm text-gray-400 flex gap-1">
                ${video.authors[0].profile_name}
                ${video.authors[0].verified == true ? `<img class="w-5 h-5" src="https://img.icons8.com/?size=96&id=98A4yZTt9abw&format=png" alt="" />` : ``}
                </p>
                <p class="text-sm text-gray-400">${video.others.views} views</p>
            </div>
        </div>
        <button onclick=loadVideoDetails('${video.video_id}') class ="btn btn-block"> Show Details</button>
        </div>
        `
        videoContainer.appendChild(div);

    });
    hideLoader()
}

const removeActiveClass = () => {
    const activeBtns = document.getElementsByClassName("active");
    for (let btn of activeBtns) {
        btn.classList.remove("active")
    }
}

document.getElementById("input").addEventListener('keyup', (e) => {
    const input = e.target.value;
    //console.log(input);
    loadVideos(input);
})

loadCategories()