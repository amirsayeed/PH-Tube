const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res => res.json())
    .then(data => displayCategories(data.categories))
}

const displayCategories = (category) =>{
    console.log(category);
    const categoryContainer = document.getElementById("category-container")
    for(const item of category){
        const btn = document.createElement("button");
        btn.classList.add('btn')
        btn.innerText = item.category;
        categoryContainer.append(btn);
    }
}
loadCategories()