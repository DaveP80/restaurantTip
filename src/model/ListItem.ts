export interface Item {
    id: string,
    item: number,
    checked: boolean,
}

export default class ListItem implements Item {
    constructor(
        private _id: string = '',
        private _item: number = 0,
        private _checked: boolean = false,)
    { }

    get id(): string {
        return this._id
    }

    set id(id: string) {
        this._id = id
        }
    get item(): number {
        return this._item
    }

    set item(item: number) {
        this._item = item
    }

    get checked(): boolean {
        return this._checked
    }

    set checked(checked: boolean) {
        this._checked = checked
    }

}