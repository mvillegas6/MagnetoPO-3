const Options = document.querySelectorAll('.mainAnchor');

for(let op of Options){
    op.addEventListener('click', () => {
        const sibling = op.nextElementSibling;
        if(sibling.classList.contains('d-none')){
            sibling.classList.remove('d-none');
        }else{
            sibling.classList.add('d-none');
        }
    })
}