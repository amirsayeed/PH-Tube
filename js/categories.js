const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

const loadVideos = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then(res => res.json())
    .then(data =>displayVideos(data.videos))
}


const displayCategories = (categories) =>{
    const categoryContainer = document.getElementById("category-container")
    categories.forEach((item)=>{
        const btn = document.createElement("button");
        btn.classList.add('btn')
        btn.innerText = item.category;
        categoryContainer.append(btn);
    })
}

const displayVideos = (videos) =>{
    const videoContainer = document.getElementById("video-container");
        
    videos.forEach(video => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card bg-base-100">
        <figure>
            <img class="w-full h-[200px] object-cover"
            src="${video.thumbnail}"
            alt="Shoes" />
        </figure>
        <div class="flex gap-3 px-0 py-5">
            <div class="profile">
                <div class="avatar">
                <div class="w-10 rounded-full">
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
        </div>
        `
        videoContainer.appendChild(div);
   
    });
    
}
loadCategories()
loadVideos()