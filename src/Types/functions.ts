import { IInputSection, ISection } from ".";

export function isItem(item?: ISection | IInputSection) {
    if (!item) return false;
    if (item.qty == null && item.rate == null && item.unit == null) {
        return false;
    }
    return true;
}