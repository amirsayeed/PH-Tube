const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
        .then(res => res.json())
        .then(data => displayCategories(data.categories))
}

const loadVideos = () => {
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
        .then(res => res.json())
        .then(data => displayVideos(data.videos))
}

const loadByCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`

    fetch(url).then(res => res.json())
        .then(data => displayVideos(data.category))
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("category-container")
    categories.forEach((item) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <button onclick = "loadByCategory(${item.category_id})"
        class = "btn btn-sm hover:bg-[#FF1F3D] hover:text-white"> ${
            item.category
        } </button>
        `
        categoryContainer.append(div);
    })
}

const displayVideos = (videos) => {
    console.log(videos)
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = '';

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
        </div>
        `
        videoContainer.appendChild(div);

    });

}


loadCategories()