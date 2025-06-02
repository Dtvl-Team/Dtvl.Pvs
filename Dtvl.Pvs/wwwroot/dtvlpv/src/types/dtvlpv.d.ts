import { PathType, ApiCallback } from '@rugal.tu/vuemodel3';
type SidebarItemSet = {
    title: string;
    icon?: string;
    children?: SidebarItemSet[];
    href?: string | string[];
    show?: () => boolean;
    clicked?: Function;
};
type SidebarOption = {
    OpenMode?: 'current' | 'all' | 'single';
};
type DataTableHeader = {
    title?: string;
    align?: string;
    sortable?: boolean;
    key?: string;
    value?: string;
    width?: string;
};
type DataTableOption = {
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
type SendModalOption = ModalOption & {
    ApiKey?: string;
    BtnSend?: Function;
    BtnCancel?: Function;
    Title?: string;
    Arg?: any;
} & ApiCallback;
type SendModalStore = SendModalOption & CallingLockType;
type AlertOption = {
    IsShow?: boolean;
    Message?: string;
    ApiKey?: string;
    BtnOk?: Function;
    BtnCancel?: Function;
} & ApiCallback;
type AlertStore = AlertOption & CallingLockType;
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
    Format?: FormateFuncType | FormateFuncType[];
    Number?: boolean | InputNumberOption;
} | string;
type InputStore = {
    Value?: any;
    ReadOnly?: boolean | ((Store?: InputStore) => boolean);
    Secure?: {
        Securing: boolean;
    } & SecureOption;
    Number?: InputNumberOption;
    Formats: FormateFuncType[];
};
type InputNumberOption = {
    ThousandsSeparator?: boolean;
};
type FormateFuncType = (Value: string) => string;
type DateFormatOption = {
    Separator: string;
    YearCount?: number;
    MonthCount?: number;
    DayCount?: number;
};
type FormatStore = {
    AdDate: FormateFuncType;
    TwDate: FormateFuncType;
} | Record<string, FormateFuncType>;
type SelectOption = {
    Datas?: any[];
    ApiKey?: PathType;
    ItemName?: string | Function;
    ItemValue?: string;
    Store?: PathType;
    ReturnObject?: boolean;
    SelectedValue?: any;
    Multiple?: boolean;
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean);
    BindOnly?: boolean;
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
type ImageOption = {
    SrcUrl?: string;
    LazySrcUrl?: string;
    Src?: string;
    LazySrc?: string;
};
type PushAnimateOption = {
    PositionFrom: 'Left' | 'Right';
};
declare class DtvlPvIniter {
    protected $LoadingDelay: number;
    protected $AppStore: string;
    protected $PvStore: string;
    protected $ApiStore: string;
    protected $FormatStore: string;
    constructor();
    get Formats(): FormatStore;
    UseShowOnMounted(): this;
    protected $CreateDefaultFormat(): void;
    protected $CreateAdDateFormat(): void;
    protected $CreateTwDateFormat(): void;
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
    AddPv_Format(FormatKey: string, FormatFunc: FormateFuncType): this;
    CreateDateFormat(Option: DateFormatOption): FormateFuncType;
    GetFormat(FormatKey: string): FormateFuncType;
    AddPv_DatePicker(PvName: PathType, Option?: DatePickerOption): this;
    AddPv_Tabbed(PvName: PathType, Option?: TabbedOption): this;
    AddPv_Flex(PvName: PathType, Option: FlexOption): this;
    AddPv_ImageFlex(PvName: PathType, Option: ImageFlexOption): this;
    AddPv_Image(PvName: PathType, Option: ImageOption): this;
    AddPv_AnimatePush(PvName: PathType, Option: PushAnimateOption): void;
    Animate(PvName: PathType): void;
    protected RootPath(...PushPath: PathType[]): string[];
    protected ApiPath(...PushPath: PathType[]): string[];
    WatchApi(ApiKey: PathType, Status: string, Func: Function): void;
}
declare const DtvlPv: DtvlPvIniter;
declare const Formats: FormatStore;
export { DtvlPv, Formats, };
