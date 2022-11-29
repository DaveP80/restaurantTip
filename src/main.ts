import './css/style.css'
import FullList from './model/FullList'
import ListItem from './model/ListItem'
import ListTemplate from './templates/ListTemplate'

const initApp = (): void => {
    const fullList = FullList.instance
    const template = ListTemplate.instance

    class Signature {
        dl: HTMLElement

        static instance: Signature = new Signature()

        constructor() {
            this.dl = document.getElementById("signoff") as HTMLElement
        }

        clear(): void {
            this.dl.innerHTML = ''
        }

        render(): void {
            const signature = document.createElement("dt") as HTMLDListElement
            signature.className = "credit"
            signature.textContent = "dev; dave p"
            this.dl.append(signature)
        }

       
    }

    const itemEntryForm = document.getElementById("itemEntryForm") as HTMLFormElement
    itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
        event.preventDefault()
        
        const input = document.getElementById("newItem") as HTMLInputElement
        const newEntryNum: number | null = parseFloat(input.value.trim())
        if (!newEntryNum) return

        const itemId: number = fullList.list.length
            ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
            : 1

        const newItem = new ListItem(itemId.toString(), parseFloat((newEntryNum * .20).toFixed(2)))

            let count: boolean = false   
                fullList.list.forEach(n => {

                    if (n.item == parseFloat((newEntryNum * .20).toFixed(2))) {

                        console.log("matching")
                        count=true

                    } 

                })

        if (!count) {
            fullList.addItem(newItem)
            template.render(fullList)
        } else {
            return
        }
        
    })

    const clearItems = document.getElementById("clearItemsButton") as
        HTMLButtonElement

    clearItems.addEventListener('click', (): void => {
        fullList.clearList()
        template.clear()
    })

    const navigate = document.getElementById("gotosrc") as
        HTMLButtonElement

    navigate.addEventListener('click', (): void => {
        fullList.clearList()
        template.clear()

        const signature = Signature.instance
        signature.render()
        const clearItems = document.getElementById("clearItemsButton") as
            HTMLButtonElement

        clearItems.addEventListener('click', (): void => {
            signature.clear()
        })

        const controlInput = document.getElementById("itemEntryForm") as HTMLFormElement
        controlInput.addEventListener("submit", (): void => {
            signature.clear()
        })
    })

    fullList.load()
    template.render(fullList)
}

document.addEventListener("DOMContentLoaded", initApp)