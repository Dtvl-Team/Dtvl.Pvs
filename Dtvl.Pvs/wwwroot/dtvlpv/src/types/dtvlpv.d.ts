import { PathType, ApiCallback } from '@rugal.tu/vuemodel3';
export type SidebarItemSet = {
    title: string;
    icon?: string;
    children?: SidebarItemSet[];
    href?: string | string[];
    show?: () => boolean;
    clicked?: Function;
};
export type SidebarOption = {
    OpenMode?: 'current' | 'all' | 'single';
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
    Index?: boolean | DataTableIndexOption;
    Buttons?: boolean | DataTableHeader;
    Headers: DataTableHeader[];
    Datas?: any[];
    ApiKey?: string;
    Select?: {
        ItemValue: string;
        Store?: string;
        ReturnObject?: boolean;
        Mode?: 'single' | 'page' | 'all';
        RowClicked?: boolean;
    };
};
type DataTableIndexOption = DataTableHeader & {
    type?: 'Page' | 'Total';
};
type ModalOption = {
    IsShow?: boolean;
};
type CallingLockType = {
    IsCalling?: boolean;
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
    ApiKey?: string;
    BtnClear?: () => void;
    BtnSearch?: () => void;
};
type SecureOption = boolean | {
    SecureEye?: boolean;
    ShowingIcon?: string;
    HidingIcon?: string;
};
type InputOption = {
    Store?: PathType;
    Value?: any;
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean);
    Secure?: SecureOption;
    BindOnly?: boolean;
} | string;
type InputStore = {
    Value?: any;
    ReadOnly?: boolean | ((Store?: InputStore) => boolean);
    Secure?: {
        Securing: boolean;
    } & SecureOption;
};
export type SelectOption = {
    Datas?: any[];
    ApiKey?: PathType;
    ItemName?: string;
    ItemValue?: string;
    Store?: PathType;
    ReturnObject?: boolean;
    SelectedValue?: any;
    Multiple?: boolean;
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean);
    OnChange?: Function | string;
};
type DatePickerOption = {
    Store?: PathType;
    IsOpen?: boolean;
};
type TabbedOption = {
    Tabs: TabsOption[];
};
type TabsOption = {
    Id?: string;
    Title: string;
};
type FlexOption = {
    ApiKey?: PathType;
    Datas?: any[];
};
type ImageFlexOption = {
    ApiKey?: PathType;
    Datas?: any[];
    ItemSrc: string;
};
type PushAnimateOption = {
    PositionFrom: 'Left' | 'Right';
};
declare class DtvlPvIniter {
    protected $AppStore: string;
    protected $PvStore: string;
    protected $ApiStore: string;
    protected $LoadingDelay: number;
    constructor();
    UseShowOnMounted(): this;
    UseRouter(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption): this;
    private $InitSidebar;
    private $CreateSidebar;
    AddPv_Sidebar(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption): this;
    private $SetSidebarTreeCommand;
    AddPv_DataTable(PvName: PathType, Option: DataTableOption): this;
    private $FillDataTableHeaders;
    AddPv_Modal(PvName: PathType, Option?: ModalOption): this;
    AddPv_SendModal(PvName: PathType, Option?: SendModalOption): this;
    Modal(PvName: PathType, Option: boolean | SendModalStore): this;
    AddPv_Alert(PvName: PathType, Option?: AlertOption): this;
    Alert(PvName: PathType, Option: boolean | AlertStore): this;
    AddPv_FilterCard(PvName: PathType, Option?: FilterCardOption): this;
    AddPv_Input(PvName: PathType, Option?: InputOption): this;
    AddPv_Select(PvName: PathType, Option?: SelectOption): this;
    AddPv_DatePicker(PvName: PathType, Option?: DatePickerOption): this;
    AddPv_Tabbed(PvName: PathType, Option?: TabbedOption): this;
    AddPv_Flex(PvName: PathType, Option: FlexOption): this;
    AddPv_ImageFlex(PvName: PathType, Option: ImageFlexOption): this;
    AddPv_AnimatePush(PvName: PathType, Option: PushAnimateOption): void;
    Animate(PvName: PathType): void;
    protected RootPath(...PushPath: PathType[]): string[];
    protected ApiPath(...PushPath: PathType[]): string[];
    WatchApi(ApiKey: PathType, Status: string, Func: Function): void;
}
declare const DtvlPv: DtvlPvIniter;
export { DtvlPv };
