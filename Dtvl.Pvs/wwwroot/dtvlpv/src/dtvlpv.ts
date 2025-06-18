import { Model, Queryer, PathType, ApiCallback } from '@rugal.tu/vuemodel3';

//#region Router Type
type SidebarItemSet = {
    title: string,
    icon?: string,
    children?: SidebarItemSet[],
    href?: string | string[],
    backToRoot?: boolean,
    show?: () => boolean,
    clicked?: Function,
};
type SidebarOption = {
    OpenMode?: 'current' | 'all' | 'single',
};
type SidebarItemData = SidebarItemSet & {
    id: string,
    parent?: SidebarItemData,
    children?: SidebarItemData[],
    isSelect?: boolean,
    query?: string | Record<string, any>,
}
type SidebarStore = {
    IsMobileOpen: boolean,
    IsShow: boolean,
    Source: SidebarItemData[],
    Current: SidebarItemData[],
    RouterList: SidebarItemData[],
    OpenIds: string[],
    Click: (Item: SidebarItemData, event: MouseEvent) => void,
    GroupClick: Function,
    MobileOpen: () => void,
    Show: (IsShow: boolean) => void,
} & SidebarOption;
//#endregion

//#region DataTable Type
type DataTableHeader = {
    title?: string,
    align?: string | {
        header?: string,
        content?: string,
    },
    sortable?: boolean,
    key?: string,
    value?: string,
    width?: string,
    minWidth?: string,
    maxWidth?: string,
    show?: boolean,
    nowrap?: boolean,
};
type DataTableOption = {
    Index?: boolean | DataTableIndexOption,
    Buttons?: boolean | DataTableHeader,
    Headers: DataTableHeader[],
    Datas?: any[],
    ApiKey?: string,
    Stripe?: boolean,
    Select?: {
        ItemValue: string,
        Store?: string,
        Mode?: 'single' | 'page' | 'all'
        ReturnObject?: boolean,
        RowClicked?: boolean,
        ShowCheckbox?: boolean,
        RowClass?: string,
    },
    Search?: boolean | string | {
        Store?: string,
        Query?: string,
    },
};
type DataTableIndexOption = DataTableHeader & {
    type?: 'Page' | 'Total',
    path?: string,
};
type DataTableStore = DataTableOption & {
    Index?: DataTableIndexOption,
    Buttons?: DataTableHeader,
    Selected: any[],
    Selectable?: boolean,
    Loading?: boolean,
    LoadingTime?: Date,
    IsSort?: Function,
    IsItemSelected?: Function,
    SelectItem?: Function,
    RowSelectClicked?: Function,
};
//#endregion

//#region Tree Type
type TreeOption = {
    openAll?: boolean,
    title: string,
    subTitle?: string,
    children?: string,
    icon?: string,
    datas: any[],
};
type TreeStore = {
    Option: TreeOption,
    Datas: any[],
};
//#endregion

//#region Modal Type
type ModalOption = {
    IsShow?: boolean,
};
type ModalStore = ModalOption;
type SendModalOption = ModalOption & {
    ApiKey?: string;
    BtnSend?: Function;
    BtnCancel?: Function;
    Title?: string;
    Arg?: any;
} & ApiCallback;
type SendModalStore = SendModalOption & CallingLockType;
type CallingLockType = {
    IsCalling?: boolean,
};
//#endregion

//#region Alert Type
type AlertOption = {
    IsShow?: boolean,
    Message?: string,
    ApiKey?: string;
    BtnOk?: Function,
    BtnCancel?: Function,
} & ApiCallback;
type AlertStore = AlertOption & CallingLockType;
//#endregion

//#region FilterCard Type
type FilterCardOption = {
    ApiKey?: string,
    BtnClear?: () => void,
    BtnSearch?: () => void,
};
type FilterCardStore = FilterCardOption;
//#endregion

//#region Input Type
type SecureOption = boolean | {
    SecureEye?: boolean,
    ShowingIcon?: string,
    HidingIcon?: string,
};
type InputOption = {
    Value?: any,
    Store?: PathType | {
        Path: PathType,
        IsItem?: boolean,
    },
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean),
    Secure?: SecureOption,
    Number?: boolean | InputNumberOption,
    Formats?: {
        Value?: FormateFuncType | FormateFuncType[],
        Display?: FormateFuncType | FormateFuncType[],
    } | FormateFuncType | FormateFuncType[],
} | string;
type InputStore = {
    Store: {
        Path: PathType,
        IsItem?: boolean,
    },
    Value?: any,
    ReadOnly?: boolean | ((Store?: InputStore) => boolean),
    Secure?: {
        Securing: boolean,
    } & SecureOption,
    Number?: InputNumberOption,
    Formats: {
        Value: FormateFuncType[],
        Display: FormateFuncType[],
    },
    OnFormatDisplay: Function,
    OnFormatValue: Function,
};
type InputNumberOption = {
    ThousandsSeparator?: boolean,
};
//#endregion

//#region Format Type
type FormateFuncType = (Value: string) => string;
type DateFormatOption = {
    Separator: string,
    YearCount?: number,
    MonthCount?: number,
    DayCount?: number,
};
type NumberFormatOption = {
    ThousandsSeparator?: boolean,
};
type FormatStore = {
    AdDate: FormateFuncType,
    TwDate: FormateFuncType,
    Number: FormateFuncType,
    NumberThousands: FormateFuncType,
} | Record<string, FormateFuncType>;
type DefaultFormatsType = {
    AdDate: string,
    TwDate: string,
    Number: string,
    NumberThousands: string,
};
//#endregion

//#region Select Type
type SelectOption = {
    Datas?: any[],
    ApiKey?: PathType,
    ItemName?: string | Function,
    ItemValue?: string,
    Store?: PathType | {
        Path: PathType,
        IsItem?: boolean,
    },
    SelectedValue?: any,
    ReturnObject?: boolean,
    Multiple?: boolean,
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean),
    OnChange?: Function | string,
};
type SelectStore = {
    Store: {
        Path: PathType,
        IsItem?: boolean,
    },
    IsInited: boolean,
    Loading?: boolean,
    LoadingTime?: Date,
    SelectedValue?: any,
    SelectedItem?: any,

    Datas?: any[],
    ApiKey?: PathType,
    ItemName?: string | Function,
    ItemValue?: string,
    ReturnObject?: boolean,
    Multiple?: boolean,
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean),
    OnChange?: Function | string,
};
//#endregion

//#region DatePicker Type
type DatePickerOption = {
    Store?: PathType,
    IsOpen?: boolean,
}
type DatePickerStore = DatePickerOption & {
}
//#endregion

//#region Tabbed Type
type TabbedOption = {
    Tabs: TabsOption[],
};
type TabsOption = {
    Id?: string,
    Title: string,
}
//#endregion

//#region Flex Type
type FlexOption = {
    ApiKey?: PathType,
    Datas?: any[],
};
type FlexStore = {

} & FlexOption;
//#endregion

//#region ImageFilex Type
type ImageFlexOption = {
    ApiKey?: PathType,
    Datas?: any[],
    ItemSrc: string,
};
type ImageFlexStore = {} & FlexOption;
//#endregion

//#region Image Type
type ImageOption = {
    SrcUrl?: string,
    LazySrcUrl?: string,
    Src?: string,
    LazySrc?: string,
};
type ImageStore = {
    Src?: string,
    LazySrc?: string,
}
//#endregion

//#region Animation
type PushAnimateOption = {
    PositionFrom: 'Left' | 'Right',
};
type AnimateStore = {
    IsRun: boolean,
    Width?: number,
    Height?: number,
};
//#endregion
class DtvlPvIniter {
    protected $LoadingDelay: number;
    protected $AppStore: string;
    protected $PvStore: string;
    protected $ApiStore: string;
    protected $FormatStore: string;
    protected $FormatKeys: DefaultFormatsType;
    constructor() {
        this.$LoadingDelay = 800;
        this.$AppStore = 'app';
        this.$ApiStore = 'api';
        this.$PvStore = 'pv';
        this.$FormatStore = 'pv._format';

        this.UseShowOnMounted();
        this.$CreateDefaultFormat();
    }

    //#region public Property 
    public get Formats() {
        return Model.GetStore<FormatStore>(this.$FormatStore);
    }
    public get RouterStore() {
        return Model.GetStore<SidebarStore>([this.$AppStore, 'Router']);
    }
    public get RouterPaths() {
        let Current = this.RouterStore?.Current;
        return Current;
    }
    public get Router() {
        let Paths = this.RouterPaths;
        if (Paths == null && Paths.length == 0)
            return null;

        return Paths[Paths.length - 1];
    }
    //#endregion

    //#region App
    public UseShowOnMounted() {
        Model.WithMounted(() => {
            let ShowItems = document.querySelectorAll('[class*="ShowOnMounted"]');
            for (let Item of ShowItems) {
                Item.classList.remove('ShowOnMounted');
            }
        });
        return this;
    }
    public Pv<TStore = any>(PvName: PathType) {
        return Model.GetStore<TStore>(['pv', PvName]);
    }
    protected $CreateDefaultFormat() {
        this.$FormatKeys = {
            AdDate: 'AdDate',
            TwDate: 'TwDate',
            Number: 'Number',
            NumberThousands: 'NumberThousands',
        };
        Model.AddStore(this.$FormatStore, {});
        this.$CreateAdDateFormat();
        this.$CreateTwDateFormat();
        this.$CreateNumberFormat();
        this.$CreateNumberThousandsFormat();
    }
    protected $CreateAdDateFormat() {
        this.AddPv_Format(this.$FormatKeys.AdDate, this.CreateDateFormat({
            Separator: '/',
            YearCount: 4,
        }));
    }
    protected $CreateTwDateFormat() {
        this.AddPv_Format(this.$FormatKeys.TwDate, this.CreateDateFormat({
            Separator: '/',
            YearCount: 3,
        }));
    }
    protected $CreateNumberFormat() {
        this.AddPv_Format(this.$FormatKeys.Number, (Value) => {
            if (Value == null || Value == '')
                return Value;
            Value = Value.toString().replace(/[^0-9]/g, '');
            return Value;
        });
    }
    protected $CreateNumberThousandsFormat() {
        this.AddPv_Format(this.$FormatKeys.NumberThousands, (Value) => {
            Value = this.Formats.Number(Value);
            if (Value == null || Value == '')
                return Value;
            Value = Number(Value).toLocaleString();
            return Value;
        });
    }
    //#endregion

    //#region Sidebar Method
    public UseRouter(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption) {
        let RouterDefaultStore = [this.$AppStore, 'Router'];
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    private $InitSidebar(PvName: PathType, StorePath: PathType, RouterData: SidebarItemSet[], Option: SidebarOption) {
        Option ??= {};
        Option.OpenMode ??= 'current';

        let RouterList: SidebarItemData[] = [];
        let RouterDatas = this.$CreateSidebar(RouterData, RouterList);

        let CurrentPath = document.location.pathname;
        let FindCurrentRouter = RouterList.find(Item => {
            if (Item.href == null)
                return false;

            if (typeof (Item.href) == 'string')
                return Item.href.toLowerCase() == CurrentPath.toLowerCase();

            let GetHref = Item.href.find(Val => Val.toLowerCase() == CurrentPath.toLowerCase());
            return GetHref != null;
        });

        let CurrentRouters: SidebarItemData[] = [];
        if (FindCurrentRouter != null) {
            if (FindCurrentRouter != null) {
                while (FindCurrentRouter) {
                    CurrentRouters.push(FindCurrentRouter);
                    FindCurrentRouter = FindCurrentRouter.parent;
                }
                CurrentRouters = CurrentRouters.reverse();
            }
            CurrentRouters.forEach(Item => Item.isSelect = true);
        }

        let OpenRotuer = CurrentRouters;
        if (Option.OpenMode == 'all')
            OpenRotuer = RouterList;

        let RouterStoreData: SidebarStore = {
            OpenMode: Option.OpenMode,
            IsMobileOpen: false,
            IsShow: true,
            Source: RouterDatas,
            Current: CurrentRouters,
            RouterList: RouterList,
            OpenIds: OpenRotuer.map(Item => Item.id),
            Click: (Item, event) => {
                if (Item == null)
                    return;

                if (Item.backToRoot == true) {
                    Model.NavigateToRoot();
                    return;
                }

                let GoPath = Item.href;
                if (GoPath == null)
                    return;

                if (Array.isArray(GoPath) && GoPath.length > 0)
                    GoPath = GoPath[0];

                let HasCtrlKey = event.ctrlKey;
                if (HasCtrlKey) {
                    Model.NavigateBlank(GoPath);
                    return;
                }

                if (GoPath == CurrentPath)
                    return;

                Model.NavigateTo(GoPath);
            },
            GroupClick: (Item: any) => {

                let RouterStore = Model.GetStore<SidebarStore>([this.$AppStore, 'Router']);
                if (RouterStore == null)
                    return;

                if (RouterStore.OpenMode != 'single')
                    return;

                if (Item == null || Item.value == false)
                    return;

                RouterStore.OpenIds.splice(0, RouterStore.OpenIds.length);
            },
            MobileOpen: () => {
                let TargetPaths = [StorePath, 'IsMobileOpen'];
                let IsSidebarOpen = Model.GetStore<boolean>(TargetPaths);
                IsSidebarOpen = !IsSidebarOpen;
                Model.UpdateStore(TargetPaths, IsSidebarOpen);
            },
            Show: (IsShow) => {
                RouterStoreData.IsShow = IsShow;
                Model.ForceUpdate();
            }
        };
        Model.UpdateStore(StorePath, RouterStoreData);
        this.$SetSidebarTreeCommand(PvName, Model.ToJoin(StorePath));
    }
    private $CreateSidebar(Data: SidebarItemSet[], RouterList: SidebarItemData[], Parent: SidebarItemData = null): SidebarItemData[] {
        if (Data == null || Data.length == 0)
            return null;

        let Result: SidebarItemData[] = [];
        for (let Item of Data) {
            let NewRouter: SidebarItemData = {
                ...Item,
                id: Model.GenerateId(),
                parent: Parent,
                children: null,
            };
            NewRouter.show ??= () => true;
            NewRouter.children = this.$CreateSidebar(Item.children, RouterList, NewRouter);
            RouterList.push(NewRouter);
            Result.push(NewRouter);
        }
        return Result;
    }

    public GetSidebar(PvName: PathType) {
        return this.Pv<SidebarStore>(PvName);
    }
    public AddPv_Sidebar(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption) {
        let RouterDefaultStore = this.RootPath(PvName);
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    private $SetSidebarTreeCommand(PvName: PathType, StorePath: string) {

        Model.AddV_Bind(PvName, 'class', `[ ${StorePath}.IsShow ? 'Sidebar-Show' : 'Sidebar-Hide' ]`,);

        let SidebarTreePath = [PvName, 'SidebarTree'];
        let ItemBaseCommand = {
            'v-on:click': `${StorePath}.Click(item, $event)`,
            'v-bind:value': 'item.id',
            'v-bind:title': 'item.title',
            ':ItemIcon': {
                'v-if': 'item.icon',
                'v-bind:class': 'item.icon',
            }
        };
        Model.AddV_Tree(SidebarTreePath, {
            'v-bind:items': `${StorePath}?.Source ?? []`,
            'v-on:update:activated': `${StorePath}?.Click`,
            'v-on:click:open': `${StorePath}?.GroupClick`,
            'v-model:opened': `${StorePath}.OpenIds`,
            ':SidebarContent': {
                'v-for': `${StorePath}?.Source ?? []`,
            },
            ':SidebarGroup': {
                'v-if': 'item.children && item.children.length > 0 && item.children.every(val => val.show && val.show())',
                'v-bind:value': 'item.id',
                ':SidebarGroupItem': {
                    ...ItemBaseCommand,
                },
                ':GroupChildren': {
                    'v-for': 'item.children',
                    ':ChildrenItem': {
                        'v-if': 'item.show()',
                        'v-bind:class': '{ SidebarSelect: item.isSelect }',
                        ...ItemBaseCommand,
                    },
                }
            },
            ':SingleGroup': {
                'v-else': null,
                'v-bind:class': '{ SidebarSelect: item.isSelect }',
                ...ItemBaseCommand,
            },
        }, { UseDeepQuery: true });
    }
    //#endregion

    //#region DataTable
    public GetDataTable(PvName: PathType) {
        return this.Pv<DataTableStore>(PvName);
    }
    public AddPv_DataTable(PvName: PathType, Option: DataTableOption) {

        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        let PvStore: DataTableStore = {
            ...Option,
            Selected: [],
        };
        Model.UpdateStore(PvStorePath, PvStore);
        PvStore.Buttons ??= {};
        PvStore.Datas ??= [];
        PvStore.Stripe ??= true;
        PvStore.Loading ??= false;
        PvStore.Index ??= true;

        if (PvStore.Buttons != null && PvStore.Buttons != false) {
            if (PvStore.Buttons == true) {
                PvStore.Buttons = {};
            }
            PvStore.Buttons.title ??= '';
            PvStore.Buttons.value ??= 'buttons';
            PvStore.Buttons.sortable ??= false;
            PvStore.Headers.push(PvStore.Buttons);
        }
        if (PvStore.ApiKey) {
            Model.AddV_Property(PvStore.ApiKey, {
                Target: [PvStorePath, 'Datas'],
            });

            this.WatchApi(PvStore.ApiKey, 'IsCalling', (Value: boolean) => {
                let Store = Model.GetStore<DataTableStore>(PvStorePath);
                if (Value == true) {
                    Store.Loading = Value;
                    Store.LoadingTime = new Date();
                }
                else {
                    let TimeDiff = 0;
                    if (Store.LoadingTime != null)
                        TimeDiff = new Date().getTime() - Store.LoadingTime.getTime();

                    if (TimeDiff >= this.$LoadingDelay)
                        Store.Loading = false;
                    else {
                        setTimeout(() => {
                            Store.Loading = false;
                        }, this.$LoadingDelay - TimeDiff);
                    }
                }
            });
        }
        if (PvStore.Index != null && PvStore.Index != false) {
            if (PvStore.Index == true) {
                PvStore.Index = {
                    type: 'Total',
                };
            }
            PvStore.Index.type ??= 'Total';
            PvStore.Index.title ??= '#';
            PvStore.Index.value ??= 'index';
            PvStore.Index.key ??= 'index';
            PvStore.Index.align ??= 'center';
            PvStore.Index.sortable = false;
            PvStore.Index.nowrap = true;
            switch (PvStore.Index.type) {
                case 'Page':
                    PvStore.Index.path = 'props.index + 1';
                    break;
                case 'Total':
                    PvStore.Index.path = 'props.internalItem.index + 1';
                    break;
            }
            PvStore.Headers.unshift(PvStore.Index);
        }
        if (PvStore.Select) {
            PvStore.Selectable = true;
            PvStore.Select.ReturnObject ??= true;
            PvStore.Select.Mode ??= 'all';
            PvStore.Select.RowClicked ??= true;
            PvStore.Select.ShowCheckbox ??= true;

            PvStore.IsItemSelected = (item: any) => {
                if (!PvStore.Select.ReturnObject)
                    item = item[PvStore.Select.ItemValue];
                let IsSelected = PvStore.Selected.includes(item);
                return IsSelected;
            };
            PvStore.SelectItem = (item: any) => {
                if (!PvStore.Select.ReturnObject)
                    item = item[PvStore.Select.ItemValue];

                let IsSelected = PvStore.Selected.includes(item);
                if (IsSelected) {
                    let SelectedIndex = PvStore.Selected.indexOf(item);
                    PvStore.Selected.splice(SelectedIndex, 1);
                }
                else
                    PvStore.Selected.push(item);
            };
            PvStore.RowSelectClicked = (event: Event, toggle: Function, item: any) => {
                let Target = event.target as HTMLElement;
                let TargetTag = Target.tagName.toLowerCase();
                if (TargetTag != 'button') {
                    toggle(item);
                }
            };
            PvStore.Headers.unshift({
                value: 'data-table-select',
                key: 'data-table-select',
                maxWidth: '60px',
                width: '60px',
                show: PvStore.Select.ShowCheckbox,
            });

            Model.AddV_Tree(PvName, {
                'v-model': [PvStorePath, 'Selected'],
                'v-bind:show-select': [PvStorePath, 'Selectable'],
                'v-bind:item-value': [PvStorePath, 'Select', 'ItemValue'],
                'v-bind:return-object': [PvStorePath, 'Select', 'ReturnObject'],
                'v-bind:select-strategy': [PvStorePath, 'Select', 'Mode'],
                'v-bind:row-props': [PvStorePath, 'RowProps'],
            });

            if (PvStore.Select.Store != null) {
                Model.AddV_Property([PvStorePath, 'Selected'], {
                    Target: PvStore.Select.Store,
                    Value: [],
                });
            }
        }
        if (PvStore.Search != false) {
            if (typeof PvStore.Search == 'string')
                PvStore.Search = { Store: PvStore.Search, };
            else if (typeof PvStore.Search == 'boolean')
                PvStore.Search = {};
        }

        this.$FillDataTableHeaders(PvStore.Headers);

        Model.AddV_Tree(PvName, {
            'v-bind:items': [PvStorePath, 'Datas'],
            'v-bind:headers': [PvStorePath, 'Headers'],
            'v-bind:loading': [PvStorePath, 'Loading'],
            'v-bind:search': [PvStorePath, 'Search', 'Query'],
            ':SearchArea': {
                'v-if': (PvStore.Search != false).toString(),
                ':Search': Paths => {
                    DtvlPv.AddPv_Input(Paths, {
                        Store: [PvStorePath, 'Search', 'Query'],
                    });
                }
            },
        });

        this.$BuildDefaultDataTable(PvName, PvStore);
        return this;
    }
    private $FillDataTableHeaders(Headers: DataTableHeader[]) {
        for (let Item of Headers) {
            Item.align ??= 'start';
            Item.key ??= Item.value;
            Item.value ??= Item.key;
            Item.width ??= Item.minWidth;
            Item.minWidth ??= Item.width;
            Item.show ??= true;

            if (typeof Item.align == 'string') {
                Item.align = {
                    header: Item.align,
                    content: Item.align,
                };
            }
            Item.align.header ??= 'start';
            Item.align.content ??= 'start';
        }
        //if (HasAnyPx)
        //    Headers.forEach(Item => Item.width ??= 'auto');
        //else {
        //    let TotalPersent = 0;
        //    let RemainColumn = 0;
        //    for (let Item of Headers) {
        //        let Width = Item.width;
        //        if (Width == null) {
        //            RemainColumn++;
        //            continue;
        //        }
        //        TotalPersent += parseInt(Width);
        //    }
        //    if (RemainColumn != 0) {
        //        let AvgColumnWidth = ((100 - TotalPersent) / RemainColumn).toFixed(2);
        //        Headers.filter(Item => Item.width == null)
        //            .forEach(Item => Item['width'] = `${AvgColumnWidth}%`);
        //    }
        //}
    }
    private $BuildDefaultDataTable(PvName: PathType, PvStore: DataTableStore) {
        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        PvStore.IsSort = (Props: any, Column: DataTableHeader, Order: string) => {
            if (Column.sortable == false)
                return false;

            if (Props.sortBy.length == 0)
                return false;

            let Sort = Props.sortBy[0];
            if (Sort.key == Column.key && Sort.order == Order)
                return true;

            return false;
        };

        let ItemRowClass: string[] = [
            `'DataTable-Stripe': ${PvStorePath}.Stripe == true && props.index % 2 == 1`,
        ];

        if (PvStore.Select != null) {
            ItemRowClass.push(`Pointer: ${PvStore.Select.RowClicked ?? false}`);
            ItemRowClass.push(`'DataTable-Select': ${PvStorePath}.IsItemSelected(props.item) == true`);

            if (PvStore.Select.RowClass != null) {
                for (let Item of PvStore.Select.RowClass.split(' '))
                    ItemRowClass.push(`'${Item}': ${PvStorePath}.IsItemSelected(props.item) == true`);
            }
        }

        Model.AddV_Tree(PvName, {
            ':Headers': {
                ':Cell': {
                    'v-for': 'col in props.columns.filter(item => item.show)',
                    'v-bind:style': `{
                         width: col.width,
                         'min-width': col.minWidth,
                         'max-width': col.maxWidth,
                         'text-wrap': col.nowrap,
                         'text-align': col.align.header,
                    }`,
                    'v-bind:class': '{ Pointer: col.sortable }',
                    ':SelectColumn': {
                        'v-if': `col.value == 'data-table-select' && ${PvStorePath}.Select.Mode != 'single'`,
                        ':Checkbox': {
                            'v-on:click': 'props.selectAll(!props.allSelected)',
                            'v-bind:indeterminate': 'props.someSelected && props.allSelected == false',
                            'v-model': 'props.allSelected',
                        },
                    },
                    ':TitleColumn': {
                        'v-else': null,
                        'v-on:click': '() => col.sortable ? props.toggleSort(col) : null',
                        ':Title': {
                            'v-text': 'col.title',
                        },
                        ':AscIcon': {
                            'v-if': `${PvStorePath}.IsSort(props, col, 'asc')`,
                        },
                        ':DescIcon': {
                            'v-if': `${PvStorePath}.IsSort(props, col, 'desc')`,
                        },
                    },
                },
            },
            ':Items': {
                ':Row': {
                    'v-bind:class': `{ ${ItemRowClass.join(',')} }`,
                    ':Cell': {
                        'v-for': '(col, index) in props.columns.filter(item => item.show)',
                        'v-bind:style': `{ 
                            width: col.width,
                            'min-width': col.minWidth,
                            'max-width': col.maxWidth,
                            'text-wrap': col.nowrap ? 'nowrap' : 'wrap',
                            'text-align': col.align.content,
                        }`,
                        ':SelectColumn': {
                            'v-if': `col.value == 'data-table-select' && ${PvStorePath}.Select?.ShowCheckbox == true`,
                            ':Checkbox': {
                                'v-model': `${PvStorePath}.Selected`,
                                using: Paths => {
                                    if (PvStore.Select) {
                                        Model.AddV_Tree(Paths, {
                                            'v-bind:value': `${PvStore.Select.ReturnObject} ? props.item : props.item['${PvStore.Select.ItemValue}']`,
                                        });
                                    }
                                },
                            },
                        },
                        ':IndexColumn': {
                            'v-else-if': `col.value == 'index'`,
                            'v-text': PvStore.Index.path,
                        },
                        ':ButtonsColumn': {
                            'v-else-if': `col.value == 'buttons'`,
                            'v-bind:class': `{
                                'flex-nowrap': ${PvStore.Buttons.nowrap} ? 'flex-nowrap' : '',
                            }`
                        },
                        ':TextColumn': {
                            'v-else': null,
                            'v-text': 'item[col.value]',
                        },
                    },
                    using: Paths => {
                        if (PvStore.Select) {
                            Model.AddV_Tree(Paths, {
                                'v-on:click': `${PvStorePath}.RowSelectClicked($event, props.toggleSelect, {
                                    value: ${PvStore.Select.ReturnObject} ? props.item : props.item['${PvStore.Select.ItemValue}'],
                                })`,
                            });
                        }
                    }
                }
            },
        })
    }
    //#endregion

    //#region Modal
    public AddPv_Modal(PvName: PathType, Option?: ModalOption) {
        Option ??= {};
        Option.IsShow ??= false;

        Model.AddStore(PvName, {});

        let PvStorePath = this.RootPath(PvName);
        let PvStore: ModalStore = {
            ...Option,
        };
        Model.UpdateStore(PvStorePath, PvStore)
            .AddV_Tree(PvName, {
                'v-model': [PvStorePath, 'IsShow'],
                ':Overlayer': {
                    'v-on:click': (event: any) => {
                        let GetStore = Model.GetStore<AlertStore>(PvStorePath);
                        if (GetStore.BtnCancel != null) {
                            GetStore.BtnCancel(GetStore, event);
                            return;
                        }
                        this.Modal(PvName, false);
                    }
                }
            });

        return this;
    }
    public AddPv_SendModal(PvName: PathType, Option?: SendModalOption) {
        Option ??= {};

        this.AddPv_Modal(PvName, Option);
        Option.BtnCancel ??= () => {
            this.Modal(PvName, false);
        };
        Option.BtnSend ??= () => {
            let ModalStore = Model.GetStore<SendModalStore>(this.RootPath(PvName));
            if (ModalStore.IsCalling == true)
                return;

            ModalStore.IsCalling = true;
            if (ModalStore.ApiKey) {
                Model.ApiCall(ModalStore.ApiKey, {
                    OnCalling: ModalStore.OnCalling,
                    OnSuccess: ModalStore.OnSuccess,
                    OnError: ModalStore.OnError,
                    OnComplete: () => {
                        ModalStore.OnComplete?.call(this);
                        ModalStore.IsCalling = false;
                    },
                });
            }
        };

        if (Option.BtnSend)
            Model.AddV_Tree(PvName, {
                ':BtnSend': {
                    'v-on:click': (event: any) => {
                        let ModalStore = Model.GetStore<SendModalStore>(this.RootPath(PvName));
                        ModalStore.BtnSend(ModalStore, event);
                    },
                }
            });

        Model.AddV_Tree(PvName, {
            ':BtnCancel': {
                'v-on:click': (event: any) => {
                    let ModalStore = Model.GetStore<SendModalStore>(this.RootPath(PvName));
                    ModalStore.BtnCancel(ModalStore, event);
                }
            },
            ':Title': {
                'v-text': this.RootPath(PvName, 'Title'),
            },
        });

        if (!Option.Title) {
            Queryer.Using(this.RootPath(PvName, 'Title'), ({ QueryNodes }) => {
                QueryNodes.forEach(NodeItem => {
                    Option.Title = NodeItem.Dom.textContent.trim();
                });
            });
        }

        let StoreData: SendModalStore = {
            ...Option,
            IsCalling: false,
        };
        Model.UpdateStore(this.RootPath(PvName), StoreData);
        return this;
    }
    public Modal(PvName: PathType, Option: boolean | SendModalStore) {
        if (typeof (Option) == 'boolean') {
            Model.UpdateStore(this.RootPath(PvName, 'IsShow'), Option);
            return this;
        }
        if (Option.IsShow == null)
            Option.IsShow = true;
        Model.UpdateStore(this.RootPath(PvName), Option);
        return this;
    }
    public GetModal(PvName: PathType) {
        return this.Pv<ModalStore>(PvName);
    }
    public GetSendModal(PvName: PathType) {
        return this.Pv<SendModalStore>(PvName);
    }
    //#endregion

    //#region Alert
    public AddPv_Alert(PvName: PathType, Option?: AlertOption) {
        Option ??= {};
        Option.IsShow ??= false;

        if (Option.Message == null) {
            Queryer.Init();
            Queryer.Using([PvName, 'Message'], ({ QueryNodes }) => {
                QueryNodes.forEach(NodeItem => {
                    Option.Message = NodeItem.Dom.textContent.trim();
                });
            });
        }

        let SetAlertStore: AlertStore = {
            BtnCancel: Option.BtnCancel,
            IsShow: Option.IsShow,
            Message: Option.Message,
            BtnOk: Option.BtnOk,
            IsCalling: false,
        };

        Model
            .UpdateStore(this.RootPath(PvName), SetAlertStore)
            .AddV_Tree(PvName, {
                'v-model': this.RootPath(PvName, 'IsShow'),
                ':Message': {
                    'v-text': this.RootPath(PvName, 'Message')
                },
                ':BtnOk': {
                    'v-on:click': (event: any) => {
                        let AlertStore = Model.GetStore<AlertStore>(this.RootPath(PvName));
                        if (AlertStore.BtnOk != null) {
                            AlertStore.BtnOk(AlertStore, event);
                            return;
                        }

                        if (AlertStore.ApiKey != null) {
                            if (AlertStore.IsCalling)
                                return;

                            AlertStore.IsCalling = true;
                            Model.ApiCall(AlertStore.ApiKey, {
                                OnCalling: AlertStore.OnCalling,
                                OnSuccess: AlertStore.OnSuccess,
                                OnError: AlertStore.OnError,
                                OnComplete: () => {
                                    AlertStore.OnComplete?.call(this);
                                    AlertStore.IsCalling = false;
                                },
                            });
                        }
                        else
                            this.Alert(PvName, false);
                    },
                },
                ':BtnCancel': {
                    'v-on:click': (event: any) => {
                        let GetStore = Model.GetStore<AlertStore>(this.RootPath(PvName));
                        if (GetStore.BtnCancel != null) {
                            GetStore.BtnCancel(GetStore, event);
                            return;
                        }
                        this.Alert(PvName, false);
                    },
                },
                ':Overlayer': {
                    'v-on:click': (event: any) => {
                        let GetStore = Model.GetStore<AlertStore>(this.RootPath(PvName));
                        if (GetStore.BtnCancel != null) {
                            GetStore.BtnCancel(GetStore, event);
                            return;
                        }
                        this.Alert(PvName, false);
                    }
                }
            });

        return this;
    }
    public Alert(PvName: PathType, Option: boolean | AlertStore) {
        if (typeof (Option) == 'boolean') {
            let GetStore = Model.GetStore<AlertStore>(this.RootPath(PvName));
            Option = {
                IsShow: Option,
                IsCalling: GetStore.IsCalling,
            };
        }
        if (Option.IsShow == null)
            Option.IsShow = true;
        Model.UpdateStore(this.RootPath(PvName), Option);
        return this;
    }
    public GetAlert(PvName: PathType) {
        return this.Pv<AlertStore>(PvName);
    }
    //#endregion

    //#region Card
    public AddPv_FilterCard(PvName: PathType, Option?: FilterCardOption) {
        Option ??= {};

        let PvStorePath = this.RootPath(PvName);
        let PvStore: FilterCardStore = {
            ...Option
        };
        Model.AddStore(PvName, {});

        PvStore.BtnClear ??= () => {
            Model.ClearStore(PvName);
        };
        Model.AddV_Click([PvName, 'BtnClear'], [PvStorePath, 'BtnClear']);

        if (PvStore.ApiKey != null) {
            PvStore.BtnSearch ??= () => {
                Model.ApiCall(Option.ApiKey);
            };
        }
        if (PvStore.BtnSearch != null)
            Model.AddV_Click([PvName, 'BtnSearch'], [PvStorePath, 'BtnSearch']);

        Model.UpdateStore(PvStorePath, PvStore);
        return this;
    }
    //#endregion

    //#region Input, Select
    public GetInput(PvName: PathType) {
        return this.Pv<InputStore>(PvName);
    }
    public GetSelect(PvName: PathType) {
        return this.Pv<SelectStore>(PvName);
    }
    public AddPv_Input(PvName: PathType, Option?: InputOption) {
        Option ??= {};
        if (typeof (Option) == 'string')
            Option = { Store: Option };

        Option.Store ??= Model.ToJoin(PvName);
        if (Array.isArray(Option.Store) || typeof Option.Store == 'string') {
            Option.Store = {
                Path: Option.Store,
                IsItem: false,
            };
        }
        Option.Store.Path = Model.ToJoin(Option.Store.Path);

        let PvStore: InputStore = {
            Store: Option.Store,
            Value: Option.Value,
            Formats: {
                Value: [],
                Display: [],
            },
            OnFormatDisplay: (Value: any) => {
                let PvStore = Model.GetStore<InputStore>(PvStorePath);
                for (let Format of PvStore.Formats.Display)
                    Value = Format?.call(this, Value);
                return Value;
            },
            OnFormatValue: (Value: any) => {
                let PvStore = Model.GetStore<InputStore>(PvStorePath);
                for (let Format of PvStore.Formats.Value)
                    Value = Format?.call(this, Value);
                return Value;
            },
        };
        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        Model.UpdateStore(PvStorePath, PvStore)
            .AddV_Tree(PvName, {
                'v-model': `${Option.Store.Path}`,
                'v-bind:model-value': `${PvStorePath}.OnFormatDisplay(${Option.Store.Path} = ${PvStorePath}.OnFormatValue(${Option.Store.Path}))`,
                //'v-on:update:model-value': `value => ${Option.Store.Path} = ${PvStorePath}.OnFormatValue(value)`,
                //'v-on:input': `value => ${Option.Store.Path} = ${PvStorePath}.OnFormatValue(value)`,
                //'v-bind:value': `${PvStorePath}.OnFormatDisplay(${Option.Store.Path}, ${Option.Store.Path} = ${PvStorePath}.OnFormatValue(${Option.Store.Path}))`,
            });

        if (Option.Store.IsItem != true) {
            Model.AddStore(Option.Store.Path, null)
                .AddV_Property([PvStorePath, 'Value'], {
                    Target: Option.Store.Path,
                });
        }

        if (Option.ReadOnly != null) {
            let ReadOnlyPath = null;
            if (typeof (Option.ReadOnly) == 'function') {
                PvStore.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = this.RootPath(PvName, `ReadOnly(${Model.ToJoin(PvStorePath)})`);
            }
            else if (typeof (Option.ReadOnly) == 'boolean') {
                PvStore.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = this.RootPath(PvName, 'ReadOnly');
            } else if (typeof (Option.ReadOnly == 'string')) {
                ReadOnlyPath = Option.ReadOnly;
            }

            if (ReadOnlyPath != null) {
                Model.AddV_Bind(PvName, 'readonly', ReadOnlyPath);
                Model.AddV_Bind(PvName, 'clearable', `!${Model.ToJoin(ReadOnlyPath)}`);
            }
        }
        if (Option.Secure != null) {
            if (typeof (Option.Secure) == 'boolean') {
                Option.Secure = {
                    SecureEye: true,
                };
            }
            Option.Secure.HidingIcon ??= 'fa-solid fa-eye';
            Option.Secure.ShowingIcon ??= 'fa-solid fa-eye-slash';
            PvStore.Secure = {
                Securing: true,
                ...Option.Secure,
            };
            let SecureStorePath = this.RootPath(PvName, 'Secure');
            let SecuringPath = Model.ToJoin([SecureStorePath, 'Securing'], '.');
            let HidingIconPath = Model.ToJoin([SecureStorePath, 'HidingIcon'], '.');
            let ShowingIconPath = Model.ToJoin([SecureStorePath, 'ShowingIcon'], '.');
            Model.AddV_Tree(PvName, {
                ':HidingSecure': {
                    'v-show': `${SecuringPath} == true`,
                    'v-on:click': () => {
                        Model.UpdateStore(SecuringPath, false);
                    },
                    ':Icon': {
                        'v-bind:class': HidingIconPath,
                    },
                },
                ':ShowingSecure': {
                    'v-show': `${SecuringPath} == false`,
                    'v-on:click': () => {
                        Model.UpdateStore(SecuringPath, true);
                    },
                    ':Icon': {
                        'v-bind:class': ShowingIconPath,
                    },
                },
                'v-bind:type': `${SecuringPath} ? 'password' : 'text' `,
            });
        }
        if (Option.Number != null && Option.Number != false) {
            if (Option.Number == true)
                Option.Number = { ThousandsSeparator: true };

            PvStore.Number = Option.Number;
            PvStore.Formats.Value.push(this.Formats.Number);
            if (Option.Number.ThousandsSeparator == true)
                PvStore.Formats.Display.push(this.Formats.NumberThousands);
            else
                PvStore.Formats.Display.push(this.Formats.Number);
            Model.AddV_Bind(PvName, 'inputmode', `'numeric'`);
        }
        if (Option.Formats != null) {
            if (Array.isArray(Option.Formats) || typeof (Option.Formats) == 'function') {
                Option.Formats = {
                    Value: Option.Formats,
                    Display: Option.Formats,
                }
            }
            if (!Array.isArray(Option.Formats.Display))
                Option.Formats.Display = [Option.Formats.Display];
            if (!Array.isArray(Option.Formats.Value))
                Option.Formats.Value = [Option.Formats.Value];
            PvStore.Formats.Display.push(...Option.Formats.Display);
            PvStore.Formats.Value.push(...Option.Formats.Value);
        }

        return this;
    }
    public AddPv_Select(PvName: PathType, Option?: SelectOption) {
        Option ??= {};
        Option.ReturnObject ??= false;
        Option.Multiple ??= false;
        Option.Datas ??= [];
        Option.Store ??= Model.ToJoin(PvName);
        if (Array.isArray(Option.Store) || typeof Option.Store == 'string') {
            Option.Store = {
                Path: Option.Store,
                IsItem: false,
            };
        }

        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        let PvStore: SelectStore = {
            IsInited: false,
            Store: Option.Store,
            Datas: Option.Datas,
            ApiKey: Option.ApiKey,
            ItemName: Option.ItemName,
            ItemValue: Option.ItemValue,
            ReturnObject: Option.ReturnObject,
            Multiple: Option.Multiple,
            ReadOnly: Option.ReadOnly,
            OnChange: Option.OnChange,
        };
        Model.UpdateStore(PvStorePath, PvStore);

        if (PvStore.Store.IsItem == true) {
            Model.AddV_Model(PvName, Option.Store.Path);
        }
        else {
            Model.AddStore(PvStore.Store.Path, null)
                .AddV_Model(PvName, [PvStorePath, 'SelectedItem'])
                .AddV_Property([PvStorePath, 'SelectedItem'], {
                    Bind: [PvStore.ReturnObject == true ? PvStore.Store.Path : null],
                    set(Value) {
                        this.$set('SelectedItem', Value);
                        if (!Value) {
                            this.SelectedValue = null;
                            return;
                        }

                        let SetSelectedValue = null;
                        let TargetField = this.ItemValue ?? this.ItemName;
                        if (TargetField == null)
                            SetSelectedValue = Value;
                        else {
                            if (Array.isArray(Value))
                                SetSelectedValue = Value.map(Item => Item[TargetField]);
                            else
                                SetSelectedValue = Value[this.ItemValue];
                        }

                        if (SetSelectedValue != null && SetSelectedValue != this.$get('SelectedValue')) {
                            this.SelectedValue = SetSelectedValue;
                        }
                    }
                })
                .AddV_Property([PvStorePath, 'SelectedValue'], {
                    Bind: [PvStore.ReturnObject == false ? PvStore.Store.Path : null],
                    set(Value: any) {
                        this.$set('SelectedValue', Value);
                        let SetSelectedItem = this.Datas.find((Item: any) => Item[this.ItemValue] == Value);
                        if (this.SelectedItem != SetSelectedItem)
                            this.SelectedItem = SetSelectedItem;
                    },
                });

            PvStore.ReturnObject = true;
        }

        if (PvStore.ApiKey) {
            Model.AddV_Property([PvStorePath, 'Datas'], {
                Target: Option.ApiKey,
                Value: Option.Datas,
                get() {
                    let GetDatas = this.$get('Datas');
                    if (GetDatas == null)
                        return [];

                    if (!Array.isArray(GetDatas))
                        return [];

                    if (GetDatas.length == 0) {
                        if (this.IsInited)
                            this.SelectedValue = null;
                        return [];
                    }

                    if (!this.IsInited)
                        this.IsInited = true;

                    let QueryDatas = GetDatas;
                    if (Option.ItemValue)
                        QueryDatas = QueryDatas.map(Item => Item[Option.ItemValue]);

                    let SelectedValue = this.SelectedValue;
                    if (SelectedValue == null)
                        return GetDatas;

                    if (!Array.isArray(SelectedValue)) {
                        if (!QueryDatas.includes(SelectedValue))
                            this.SelectedValue = null;
                    }
                    else {
                        for (let Item of SelectedValue) {
                            if (!QueryDatas.includes(Item)) {
                                this.SelectedValue = null;
                                break;
                            }
                        }
                    }
                    return GetDatas;
                }
            });

            this.WatchApi(Option.ApiKey, 'IsCalling', (Value: boolean) => {
                let Store = Model.GetStore<SelectStore>(PvStorePath);
                if (Value == true) {
                    Store.Loading = Value;
                    Store.LoadingTime = new Date();
                }
                else {
                    let TimeDiff = 0;
                    if (Store.LoadingTime != null)
                        TimeDiff = new Date().getTime() - Store.LoadingTime.getTime();

                    if (TimeDiff >= this.$LoadingDelay)
                        Store.Loading = false;
                    else {
                        setTimeout(() => {
                            Store.Loading = false;
                        }, this.$LoadingDelay - TimeDiff);
                    }
                }
            });
            Model.AddV_Bind(PvName, 'loading', [PvStorePath, 'Loading']);
        }
        if (PvStore.OnChange)
            Model.AddV_On(PvName, 'update:model-value', Option.OnChange);

        if (PvStore.ReadOnly != null) {
            let ReadOnlyPath = null;
            if (typeof (Option.ReadOnly) == 'function') {
                PvStore.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = [PvStorePath, `ReadOnly(${Model.ToJoin(PvStorePath)})`];
            }
            else if (typeof (Option.ReadOnly) == 'boolean') {
                PvStore.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = [PvStorePath, `ReadOnly`];
            } else if (typeof (Option.ReadOnly == 'string')) {
                ReadOnlyPath = Option.ReadOnly;
            }

            if (ReadOnlyPath != null) {
                Model.AddV_Bind(PvName, 'readonly', ReadOnlyPath)
                    .AddV_Bind(PvName, 'clearable', `!${Model.ToJoin(ReadOnlyPath)}`);
            }
        }

        Model.AddV_Tree(PvName, {
            'v-bind:items': [PvStorePath, 'Datas'],
            'v-bind:item-title': [PvStorePath, 'ItemName'],
            'v-bind:item-value': [PvStorePath, 'ItemValue'],
            'v-bind:return-object': `${PvStore.ReturnObject}`,
            'v-bind:multiple': `${PvStore.Multiple}`,
        });

        return this;
    }
    //#endregion

    //#region Format
    public AddPv_Format(FormatKey: string, FormatFunc: FormateFuncType) {
        let FormatStore = Model.GetStore<Record<string, FormateFuncType>>(this.$FormatStore);
        FormatStore[FormatKey] = FormatFunc;
        return this;
    }
    public CreateDateFormat(Option: DateFormatOption) {
        Option.YearCount ??= 4;
        Option.MonthCount ??= 2;
        Option.DayCount ??= 2;
        let DateFormat: FormateFuncType = Value => {
            if (Value == null || Value == '')
                return Value;

            let AllNumber = Value.toString().match(/\d+/g);
            if (AllNumber == null)
                return null;

            let FullValue = AllNumber.join('');
            let Year = FullValue.slice(0, Option.YearCount);

            let MonthEnd = Option.YearCount + Option.MonthCount;
            let Month = FullValue.slice(Option.YearCount, MonthEnd);

            let DayEnd = MonthEnd + Option.DayCount;
            let Day = FullValue.slice(MonthEnd, DayEnd);
            let FullDate = [Year, Month, Day].join(Option.Separator);
            let ReplaceReg = `[${Option.Separator}]+$`;
            let Result = FullDate.replace(new RegExp(ReplaceReg), '');
            return Result;
        }
        return DateFormat;
    }
    public GetFormat(FormatKey: string) {
        let FormatStore = Model.GetStore<Record<string, FormateFuncType>>(this.$FormatStore);
        let FormatResult = FormatStore[FormatKey];
        return FormatResult;
    }
    //#endregion

    //#region DatePicker
    public AddPv_DatePicker(PvName: PathType, Option?: DatePickerOption) {
        Option ??= {};
        Option.IsOpen ??= false;

        let Store: DatePickerStore = {
            ...Option,
        };
        Model.UpdateStore(PvName, Store);

        if (Store.Store) {
            Model.AddV_Property(Store.Store, {
                Target: this.RootPath(PvName, 'Date'),
                get() {
                    let PickerStore = Model.GetStore(DtvlPv.RootPath(PvName));
                    return PickerStore['Date'];
                },
                set(Value) {
                    let PickerStore = Model.GetStore(DtvlPv.RootPath(PvName));
                    PickerStore['Date'] = Value;
                }
            });
        }

        Model.AddV_Property(this.RootPath(PvName, 'Selected'), {
            set(Value) {
                this.$set('Selected', Value);
            }
        });

        Model.AddV_Property(this.RootPath(PvName, 'Date'), {
            get() {
                let Selected = this.Selected;
                if (Selected == null) {
                    if (this.IsOpen)
                        return ' ';

                    Queryer.Init(true);
                    Queryer.Using([PvName, 'Input'], ({ QueryNodes }) => {
                        QueryNodes.forEach(NodeItem => {
                            NodeItem.Dom.blur();
                        });
                    });
                    return null;
                }
                return Model.ToDateText(Selected);
            },
            set(Value) {
                if (Value)
                    this.Selected = new Date(Value);
                else
                    this.Selected = null;
            }
        });
        Model.AddV_Tree(PvName, {
            'v-model': this.RootPath(PvName, 'IsOpen'),
            ':Input': {
                'v-model': this.RootPath(PvName, 'Date'),
                'v-on:click:clear': () => {
                    let FindStore = Model.GetStore(this.RootPath(PvName));
                    if (FindStore) {
                        FindStore.Selected = null;
                    }
                },
            },
            ':DatePicker': {
                'v-model': this.RootPath(PvName, 'Selected'),
            },
        });
        return this;
    }
    //#endregion

    //#region Tabbed
    public AddPv_Tabbed(PvName: PathType, Option?: TabbedOption) {
        let TabbedPath = Model.ToJoin(this.RootPath(PvName));
        Model.AddV_Tree(PvName, {
            ':Tabs': {
                'v-model': `${TabbedPath}.Value`,
            },
            ':Contents': {
                'v-model': `${TabbedPath}.Value`,
            }
        });
        return this;
    }
    //#endregion

    //#region Flex
    public AddPv_Flex(PvName: PathType, Option: FlexOption) {
        let RootStorePath = Model.ToJoin(this.RootPath(PvName));

        Option.Datas ??= [];
        let RootStore: FlexStore = {
            ...Option,
        };
        Model.UpdateStore(RootStorePath, RootStore);

        if (RootStore.ApiKey != null) {
            Model.AddV_Property(this.RootPath(PvName, 'Datas'), {
                Target: Option.ApiKey,
                Value: Option.Datas,
            });
        }

        Model
            .AddV_Tree(PvName, {
                ':Items': {
                    'v-for': `${RootStorePath}.Datas`,
                },
            });

        return this;
    }
    public AddPv_ImageFlex(PvName: PathType, Option: ImageFlexOption) {
        this.AddPv_Flex(PvName, Option);
        let BindSrc = Option.ItemSrc;
        if (Option.ItemSrc == null || Option.ItemSrc == '.' || Option.ItemSrc == '')
            BindSrc = 'item';
        else if (!Option.ItemSrc.includes('item.')) {
            BindSrc = `item.${Option.ItemSrc}`;
        }

        Model.AddV_Tree(PvName, {
            ':Items': {
                ':Images': {
                    'v-bind:src': BindSrc,
                }
            },
        });
        return this;
    }
    //#endregion

    //#region Image
    public AddPv_Image(PvName: PathType, Option: ImageOption) {

        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        let PvStore: ImageStore = {};
        Model.UpdateStore(PvStorePath, PvStore);

        if (Option.Src != null) {
            Model.AddV_Property([PvStorePath, 'Src'], {
                Target: Option.Src,
            });
        } else {
            PvStore.Src = Option.SrcUrl;
        }

        if (Option.LazySrc == null && Option.LazySrcUrl == null) {
            Model.AddV_Property([PvStorePath, 'LazySrc'], {
                Target: [PvStorePath, 'Src'],
            });
        }
        else if (Option.LazySrc != null) {
            Model.AddV_Property([PvStorePath, 'LazySrc'], {
                Target: Option.LazySrc,
            });
        } else {
            PvStore.LazySrc = Option.LazySrcUrl;
        }

        Model.AddV_Tree(PvName, {
            'v-bind:src': [PvStorePath, 'Src'],
            'v-bind:lazy-src': [PvStorePath, 'LazySrc'],
        });

        return this;
    }
    //#endregion

    //#region Collapse


    //#endregion

    //#region Animate
    public AddPv_AnimatePush(PvName: PathType, Option: PushAnimateOption) {
        let StorePath = this.RootPath(PvName, 'Animate');

        Model.SetStore<AnimateStore>(StorePath, {
            IsRun: false,
        });
        Model.AddV_Watch([StorePath, 'IsRun'], (NewValue: boolean) => {
            if (NewValue) {

            }
        });
        Model.AddV_Tree(PvName, {

        });
    }
    public Animate(PvName: PathType) {
        let StorePath = this.RootPath(PvName, 'Animate');
        let AnimateStore = Model.GetStore<AnimateStore>(StorePath, {
            CreateIfNull: true,
            DefaultValue: {
                IsRun: false,
            },
        });
        let IsRun = Model.GetStore<boolean>([StorePath, 'IsRun']);
        IsRun = IsRun ? false : true;
        Model.UpdateStore([StorePath, ''], true);
    }
    //#endregion

    //#region Protect Process
    protected RootPath(...PushPath: PathType[]): string[] {
        let RootPath = Model.Paths([this.$PvStore, PushPath]);
        return RootPath;
    }
    protected ApiPath(...PushPath: PathType[]): string[] {
        let RootPath = Model.Paths([this.$ApiStore, PushPath]);
        return RootPath;
    }
    public WatchApi(ApiKey: PathType, Status: string, Func: Function) {
        let GetPath = Model.Paths(ApiKey).shift();
        GetPath = GetPath.split('.')[0];
        Model.AddV_Watch(this.ApiPath(GetPath, Status), Func);
    }
    //#endregion
}

const DtvlPv = new DtvlPvIniter();
const Formats = DtvlPv.Formats;
(window as any).DtvlPv = DtvlPv;
export {
    DtvlPv,
    Formats,
};
