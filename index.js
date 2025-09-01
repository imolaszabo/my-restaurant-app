import { menuArray } from "/data.js"

const menuSection = document.getElementById("menu-section")
const orderSummary = document.getElementById("order-summary")
const modal = document.getElementById("modal-div")
const userName = document.getElementById("user-name")
const cart = []
const inputs = document.querySelectorAll("input[required]")
let allFilled = true

document.addEventListener('click', function(e) {
    if (e.target.classList.contains("plus-btn")) {
        addItemToCart(menuArray[e.target.id])
    }
    else if (e.target.classList.contains("remove-btn")) {
        const id = e.target.dataset.id
        removeItemFromCart(id)
    }
    else if (e.target.id === "complete-order-btn") {
        modal.style.display = "flex"
    } else if (e.target.id === "pay-btn") {
        inputs.forEach(
            (input) => {
                if (!input.value.trim()) {
                    allFilled = false
                }
            }
        )
        if (allFilled) {
            e.preventDefault()
            handleFormData(userName.value)
            modal.style.display = "none"
        } else {
            alert("Please fill all fields!")
        }
    }
})


const addItemToCart = (item) => {
    cart.push(item)
    renderCart()
}

const removeItemFromCart = (id) => {
    const index = cart.findIndex(item => item.id == id)
    if (index !== -1) {
        cart.splice(index, 1)    
    }
    renderCart()
}

const renderCart = () => {
    let totalPrice = 0
    const summary = cart.map(purchasedItem => {
        totalPrice += purchasedItem.price
        return `
            <div class="cart">
                <div class="purchased-item">
                    <h1>${purchasedItem.name}</h1>
                    <button class="remove-btn" data-id="${purchasedItem.id}">remove</button>
                </div>
                <h2>$${purchasedItem.price}</h2>
            </div>
        `
    }).join('')
    
    orderSummary.innerHTML = `
        <div id="order-title"><h1>Your order</h1></div>
        ${summary}
        <div class="cart" id="total">
            <h1>Total price:</h1>
            <h2>$${totalPrice}</h2>
            
        </div>
        <button class="green-btn" id="complete-order-btn">Complete order</button>
    `
}


const renderMenu = (menu) => {
    menu.map( (menuItem) => {
        menuSection.innerHTML += 
            `<div class="menu-item">
                <h1 class="emoji-class">${menuItem.emoji}</h1>
                <div class="menu-item-details">
                    <h2>${menuItem.name}</h2>
                    <p class="ingredients">${[...menuItem.ingredients].join(", ")}</p>
                    <h3>$${menuItem.price}</h3>
                </div>
                <button class="plus-btn"id="${menuItem.id}">+</button>
            </div>`
    })
}

renderMenu(menuArray)

const handleFormData = (user) => {
    document.querySelector("form").reset();
    const thankYouMsg = document.getElementById("thank-you-message")
    cart.length = 0
    renderCart()
    orderSummary.innerHTML = ""
    thankYouMsg.style.display = "flex"
    thankYouMsg.innerHTML = `<h2>Thanks, ${user}! Your order is on it's way!</h2>`
}

