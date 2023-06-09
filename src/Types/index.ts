export interface ISection {
    id: number;
    itemNo?: number;
    description?: string,
    unit?: string,
    qty?: number,
    rate?: number,
    amount?: number
}

export interface IInputSection {
    itemNo?: number;
    description?: string,
    unit?: string,
    qty?: number,
    rate?: number,
    amount?: number
}

export interface IEditSectionProps {
    section: IInputSection,
    visible: boolean,
    onCancel: () => void,
    onSave: (section: IInputSection) => void
}