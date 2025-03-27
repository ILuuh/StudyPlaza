const novidade_ul = document.querySelector('.novidade_ul')

let xAtual = 0

function scrollHorizontal(x) {
    novidade_ul.scrollBy(xAtual + x*2, 0)

    xAtual = x
}
