import { PathType, ApiCallback } from '@rugal.tu/vuemodel3';
export type RouterDataParam = {
    title: string;
    icon?: string;
    children?: RouterDataParam[];
    href?: string;
    show?: () => boolean;
};
export type RouterOption = {
    openAll?: boolean;
};
export type DataTableHeader = {
    title?: string;
    align?: string;
    sortable?: boolean;
    key?: string;
    value?: string;
    width?: string;
};
export type DataTableOption = {
    HasIndex?: boolean;
    HasButton?: boolean;
    ButtonHeader?: DataTableHeader;
    Headers: DataTableHeader[];
    Datas?: any[];
    ApiKey?: string;
};
export type TreeOption = {
    openAll?: boolean;
    title: string;
    subTitle?: string;
    children?: string;
    icon?: string;
    datas: any[];
};
type ModalOption = {
    IsShow?: boolean;
};
type CallingLockType = {
    IsCalling: boolean;
};
export type SendModalOption = ModalOption & {
    ApiKey?: string;
    BtnSend?: Function;
    BtnCancel?: Function;
    Title?: string;
    Arg?: any;
} & ApiCallback;
export type SendModalStore = SendModalOption & CallingLockType;
export type AlertOption = {
    IsShow?: boolean;
    Message?: string;
    ApiKey?: string;
    BtnOk?: Function;
    BtnCancel?: Function;
} & ApiCallback;
export type AlertStore = AlertOption & CallingLockType;
type FilterCardOption = {
    Store?: PathType;
    ApiKey?: string;
    BtnClear?: () => void;
    BtnSearch?: () => void;
};
type InputOption = {
    Store?: PathType;
};
export type SelectOption = {
    ValueStore?: PathType;
    Datas?: any[];
    ApiKey?: PathType;
    ItemName?: string;
    ItemValue?: string;
    ReturnObject?: boolean;
    Selected?: any;
    SelectedValue?: any;
    Multiple?: boolean;
    OnChange?: Function | string;
};
type DatePickerOption = {
    ValueStore?: string;
    IsOpen?: boolean;
};
declare class DtvlPvIniter {
    protected $PvStore: string;
    constructor();
    UseRouter(SidebarData?: RouterDataParam[], Option?: RouterOption): this;
    private $InitRouter;
    private $CreateRouter;
    AddPv_DataTable(PvName: PathType, Option: DataTableOption): this;
    private $FillDataTableHeaders;
    AddPv_Tree(PvName: PathType, Option: TreeOption): this;
    AddPv_Modal(PvName: PathType, Option?: ModalOption): this;
    AddPv_SendModal(PvName: PathType, Option?: SendModalOption): this;
    Modal(PvName: PathType, Option: boolean | SendModalStore): this;
    AddPv_Alert(PvName: PathType, Option?: AlertOption): this;
    Alert(PvName: PathType, Option: boolean | AlertStore): this;
    AddPv_FilterCard(PvName: PathType, Option?: FilterCardOption): this;
    AddPv_Input(PvName: PathType, Option?: InputOption): this;
    AddPv_Select(PvName: PathType, Option?: SelectOption): this;
    AddPv_DatePicker(PvName: PathType, Option?: DatePickerOption): this;
    protected RootPath(...PushPath: PathType[]): string[];
}
declare const DtvlPv: DtvlPvIniter;
export { DtvlPv };
