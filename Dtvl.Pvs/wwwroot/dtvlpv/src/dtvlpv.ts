import { Model, Queryer, PathType, ApiCallback } from '@rugal.tu/vuemodel3';

//#region Router Type
export type SidebarItemSet = {
    title: string,
    icon?: string,
    children?: SidebarItemSet[],
    href?: string,
    show?: () => boolean,
    clicked?: Function,
};
export type SidebarOption = {
    openAll?: boolean,
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
    List: SidebarItemData[],
    Datas: SidebarItemData[],
    Current: SidebarItemData[],
    OpenIds: string[],
    Click: (Item: SidebarItemData, event: MouseEvent) => void,
    MobileOpen: () => void,
    Show: (IsShow: boolean) => void,
};
//#endregion

//#region DataTable Type
export type DataTableHeader = {
    title?: string,
    align?: string,
    sortable?: boolean,
    key?: string,
    value?: string,
    width?: string,
};
export type DataTableOption = {
    Index?: boolean | DataTableIndexOption,
    HasButton?: boolean,
    ButtonHeader?: DataTableHeader,
    Headers: DataTableHeader[],
    Datas?: any[],
    ApiKey?: string,
};
type DataTableIndexOption = {
    Type: 'Page' | 'Total',
};
type DataTableStore = DataTableOption & {

};
//#endregion

//#region Tree Type
export type TreeOption = {
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
type CallingLockType = {
    IsCalling?: boolean,
};
export type SendModalOption = ModalOption & {
    ApiKey?: string;
    BtnSend?: Function;
    BtnCancel?: Function;
    Title?: string;
    Arg?: any;
} & ApiCallback;
export type SendModalStore = SendModalOption & CallingLockType;
//#endregion

//#region Alert Type
export type AlertOption = {
    IsShow?: boolean,
    Message?: string,
    ApiKey?: string;
    BtnOk?: Function,
    BtnCancel?: Function,
} & ApiCallback;
export type AlertStore = AlertOption & CallingLockType;
//#endregion

//#region FilterCard Type
type FilterCardOption = {
    Store?: PathType,
    ApiKey?: string,
    BtnClear?: () => void,
    BtnSearch?: () => void,
};
//#endregion

//#region Input Type
type SecureOption = boolean | {
    SecureEye?: boolean,
    ShowingIcon?: string,
    HidingIcon?: string,
};
type InputOption = {
    Store?: PathType,
    ReadOnly?: boolean | string | ((Store?: InputStore) => boolean),
    Secure?: SecureOption,
};
type InputStore = {
    Value?: any,
    ReadOnly?: boolean | ((Store?: InputStore) => boolean),
    Clearable?: boolean | ((Store?: InputStore) => boolean),
    Secure?: {
        Securing: boolean,
    } & SecureOption,
}
//#endregion

//#region Select Type
export type SelectOption = {
    ValueStore?: PathType,
    Datas?: any[],
    ApiKey?: PathType,
    ItemName?: string,
    ItemValue?: string,
    ReturnObject?: boolean,
    Selected?: any,
    SelectedValue?: any,
    Multiple?: boolean,
    OnChange?: Function | string,
};
type SelectStore = SelectOption & {
    IsInited: boolean,
};
//#endregion

//#region DatePicker
type DatePickerOption = {
    ValueStore?: string,
    IsOpen?: boolean,
}
type DatePickerStore = DatePickerOption & {
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
    protected $PvStore: string;
    constructor() {
        this.$PvStore = 'pv';
    }

    //#region Sidebar Method
    public UseRouter(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption) {
        let RouterDefaultStore = 'App.Router';
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    private $InitSidebar(PvName: PathType, StorePath: PathType, RouterData: SidebarItemSet[], Option: SidebarOption) {
        Option ??= {};

        let RouterList: SidebarItemData[] = [];
        let RouterDatas = this.$CreateSidebar(RouterData, RouterList);

        let CurrentPath = document.location.pathname;
        let FindRouter = RouterList.find(Item =>
            Item.href != null && Item.href.toLowerCase() == CurrentPath.toLowerCase());

        let CurrentRouter: SidebarItemData[] = [];
        if (FindRouter != null) {
            if (FindRouter != null) {
                while (FindRouter) {
                    CurrentRouter.push(FindRouter);
                    FindRouter = FindRouter.parent;
                }
                CurrentRouter = CurrentRouter.reverse();
            }
            CurrentRouter.forEach(Item => Item.isSelect = true);
        }

        let OpenRotuer = Option.openAll ? RouterList : CurrentRouter;
        let RouterStoreData: SidebarStore = {
            IsMobileOpen: false,
            IsShow: true,
            List: RouterList,
            Datas: RouterDatas,
            Current: CurrentRouter,
            OpenIds: OpenRotuer.map(Item => Item.id),
            Click: (Item, event) => {
                if (Item == null)
                    return;

                let GoPath = Item.href;
                if (GoPath == null)
                    return;

                let HasCtrlKey = event.ctrlKey;
                if (HasCtrlKey) {
                    Model.NavigateBlank(GoPath);
                    return;
                }

                if (GoPath == CurrentPath)
                    return;

                Model.NavigateTo(GoPath);
            },
            MobileOpen: () => {
                let TargetPaths = Model.Paths(StorePath, 'IsMobileOpen');
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
            }
            NewRouter.show ??= () => true;
            NewRouter.children = this.$CreateSidebar(Item.children, RouterList, NewRouter);
            RouterList.push(NewRouter);
            Result.push(NewRouter);
        }
        return Result;
    }

    public AddPv_Sidebar(PvName: PathType, RouterData?: SidebarItemSet[], Option?: SidebarOption) {
        let RouterDefaultStore = this.RootPath(PvName);
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    private $SetSidebarTreeCommand(PvName: PathType, StorePath: string) {

        Model.AddV_Bind(PvName, 'class', `[ ${StorePath}.IsShow ? 'Sidebar-Show' : 'Sidebar-Hide' ]`,);

        let SidebarTreePath = Model.Paths(PvName, 'SidebarTree');
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
            'v-bind:items': `${StorePath}?.Datas ?? []`,
            'v-on:update:activated': `${StorePath}?.Click`,
            'v-model:opened': `${StorePath}.OpenIds`,
            ':SidebarContent': {
                'v-for': `${StorePath}?.Datas ?? []`,
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
    public AddPv_DataTable(PvName: PathType, Option: DataTableOption) {

        Option.Index ??= true;
        Option.HasButton ??= true;
        Option.Datas ??= [];

        let TableStore: DataTableStore = {
            ...Option,
        };

        Model.UpdateStore(this.RootPath(PvName), TableStore)

        if (TableStore.HasButton) {
            TableStore.ButtonHeader ??= {};
            TableStore.ButtonHeader.title ??= '';
            TableStore.ButtonHeader.value ??= 'buttons';
            TableStore.Headers.push(TableStore.ButtonHeader);
        }

        if (TableStore.ApiKey) {
            Model.AddV_Property(TableStore.ApiKey, {
                Target: this.RootPath(PvName, 'Datas'),
            });
        }

        this.$FillDataTableHeaders(TableStore.Headers);

        if (TableStore.Index != null && TableStore.Index != false) {
            if (typeof (TableStore.Index) == 'boolean') {
                TableStore.Index = {
                    Type: 'Total',
                };
            }

            let IndexPath = null;
            switch (TableStore.Index.Type) {
                case 'Page':
                    IndexPath = 'props.index + 1';
                    break;
                case 'Total':
                    IndexPath = 'props.internalItem.index + 1';
                    break;
                default:
                    break;
            }
            if (IndexPath != null) {
                Model.AddV_Text(Model.Paths(PvName, 'IndexColumn'), IndexPath)
                TableStore.Headers.unshift({
                    title: '#',
                    value: 'index',
                });
            }
        }


        Model.AddV_Tree(PvName, {
            "v-bind:items": this.RootPath(PvName, 'Datas'),
            'v-bind:headers': this.RootPath(PvName, 'Headers'),
        });

        return this;
    }
    private $FillDataTableHeaders(Headers: DataTableHeader[]) {

        let HasAnyPx = false;
        for (let Item of Headers) {
            Item.align ??= 'start';
            Item.key ??= Item.value;
            Item.value ??= Item.key;

            let GetWidth = Item.width;
            if (GetWidth == null)
                continue;

            if (GetWidth.includes('px'))
                HasAnyPx = true;
        }

        return;

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
    //#endregion

    //#region Tree
    public AddPv_Tree(PvName: PathType, Option: TreeOption) {
        Option.openAll ??= true;
        Option.children ??= 'children';

        let StoreData: TreeStore = {
            Option: Option,
            Datas: [],
        };

        let PvNames = Model.Paths(PvName);
        Model.UpdateStore(PvName, StoreData)
            .AddV_For([...PvName, 'Datas'], `${PvName}.Datas`)
            .AddV_If([...PvName, 'Group'], `item.${Option.children} != null`)
            .AddV_Bind([...PvName, 'GroupItem'], `title`, `item.${Option.children}`)
            .AddV_For([...PvName, 'ChildrenItem'], `${PvName}.Datas`);

        return this;
    }
    //#endregion

    //#region Modal
    public AddPv_Modal(PvName: PathType, Option?: ModalOption) {
        Option ??= {};
        Option.IsShow ??= false;

        Model.UpdateStore(this.RootPath(PvName), {
            IsShow: Option.IsShow,
        });
        Model.AddV_Tree(PvName, {
            'v-model': this.RootPath(PvName, 'IsShow'),
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
                "v-on:click": (event: any) => {
                    let ModalStore = Model.GetStore<SendModalStore>(this.RootPath(PvName));
                    ModalStore.BtnCancel(ModalStore, event);
                }
            },
            ':Title': {
                "v-text": this.RootPath(PvName, 'Title'),
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
    //#endregion

    //#region Alert
    public AddPv_Alert(PvName: PathType, Option?: AlertOption) {
        Option ??= {};
        Option.IsShow ??= false;

        if (Option.Message == null) {
            Queryer.Init();
            Queryer.Using(Model.Paths(PvName, 'Message'), ({ QueryNodes }) => {
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
    //#endregion

    //#region Card
    public AddPv_FilterCard(PvName: PathType, Option?: FilterCardOption) {
        Option ??= {};
        Option.Store ??= PvName;

        let FullPath = Model.ToJoin(PvName);
        PvName = Model.Paths(PvName);

        Model.UpdateStore(PvName, {});
        Option.BtnClear ??= () => {
            Model.ClearStore(FullPath);
        }

        Model.AddV_Click(Model.Paths(PvName, 'BtnClear'), Option.BtnClear);

        if (Option.ApiKey != null) {
            Option.BtnSearch ??= () => {
                Model.ApiCall(Option.ApiKey);
            };
        }

        if (Option.BtnSearch != null)
            Model.AddV_Click(Model.Paths(PvName, 'BtnSearch'), Option.BtnSearch);

        return this;
    }
    //#endregion

    //#region Input
    public AddPv_Input(PvName: PathType, Option?: InputOption) {
        Option ??= {};
        Option.Store ??= Model.ToJoin(PvName);

        let PvStorePath = this.RootPath(PvName);
        let Store: InputStore = {
            Clearable: true,
        };
        Model.UpdateStore(PvStorePath, Store);

        let ValuePath = this.RootPath(PvName, 'Value');
        Model.AddV_Model(PvName, ValuePath)
            .AddV_Property(ValuePath, {
                Target: Option.Store,
            });

        if (Option.ReadOnly != null) {
            let ReadOnlyPath = null;
            if (typeof (Option.ReadOnly) == 'function') {
                Store.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = this.RootPath(PvName, `ReadOnly(${Model.ToJoin(PvStorePath)})`);
            }
            else if (typeof (Option.ReadOnly) == 'boolean') {
                Store.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = this.RootPath(PvName, 'ReadOnly');
                if (Option.ReadOnly == true) {
                    Store.Clearable = false;
                    Model.AddV_Bind(PvName, 'clearable', this.RootPath(PvName, 'Clearable'));
                }
            } else if (typeof (Option.ReadOnly == 'string')) {
                ReadOnlyPath = Option.ReadOnly;
            }

            if (ReadOnlyPath != null)
                Model.AddV_Bind(PvName, 'readonly', ReadOnlyPath);
        }
        if (Option.Secure != null) {
            if (typeof (Option.Secure) == 'boolean') {
                Option.Secure = {
                    SecureEye: true,
                };
            }
            Option.Secure.HidingIcon ??= 'fa-solid fa-eye';
            Option.Secure.ShowingIcon ??= 'fa-solid fa-eye-slash';
            Store.Secure = {
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

        return this;
    }
    //#endregion

    //#region Select
    public AddPv_Select(PvName: PathType, Option?: SelectOption) {
        Option ??= {};
        Option.ReturnObject ??= false;
        Option.Multiple ??= false;
        Option.Datas ??= [];

        let Store: SelectStore = {
            IsInited: false,
            ...Option,
        };
        Model.UpdateStore(this.RootPath(PvName), Store);

        let SelectedItemPath = this.RootPath(PvName, 'SelectedItem');
        let SelectedValuePath = this.RootPath(PvName, 'SelectedValue');

        if (Option.ValueStore) {
            let Target = Option.ReturnObject ? SelectedItemPath : SelectedValuePath;
            Model.AddV_Property(Option.ValueStore, {
                Target,
            });
        }

        Model.AddV_Property(SelectedItemPath, {
            get() {
                let SelectedValue = this.SelectedValue;
                if (SelectedValue == null)
                    return null;

                let Datas = this.Datas;
                if (!Array.isArray(Datas))
                    return null;

                if (Array.isArray(SelectedValue)) {
                    if (Datas == null)
                        return null;

                    let GetItems = SelectedValue
                        .map(Value => Datas.find(Item => Item[this.ItemValue]) == Value)
                        .filter(Item => Item != null);

                    return GetItems;
                }

                return Datas.find(Item => Item[this.ItemValue] == SelectedValue);
            },
            set(Value) {

                if (!Value) {
                    this.SelectedValue = null;
                    return;
                }

                let Datas = this.Datas;
                if (!Array.isArray(Datas))
                    return null;

                if (Array.isArray(Value)) {
                    let AllValues = Datas.map(Item => Item[this.ItemValue]);
                    let SetValues = Value.map(Item => Item[this.ItemValue]);
                    SetValues = SetValues.filter(Item => AllValues.includes(Item));
                    this.SelectedValue = SetValues;
                    return;
                }

                this.SelectedValue = Value[this.ItemValue];
            }
        });
        if (Option.ApiKey) {
            Model.AddV_Property(this.RootPath(PvName, 'Datas'), {
                Target: Option.ApiKey,
                Value: Option.Datas,
                get() {
                    let GetDatas = this.$get('Datas');
                    if (GetDatas == null)
                        return [];

                    if (!Array.isArray(GetDatas))
                        return [];

                    if (GetDatas.length == 0) {
                        if (this.IsInited) {
                            this.SelectedValue = null;
                        }
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
        }

        if (Option.OnChange)
            Model.AddV_Tree(PvName, {
                'v-on:update:model-value': Option.OnChange,
            });


        Model.AddV_Tree(PvName, {
            'v-bind:items': this.RootPath(PvName, 'Datas'),
            'v-bind:item-title': this.RootPath(PvName, 'ItemName'),
            'v-bind:item-value': this.RootPath(PvName, 'ItemValue'),
            'v-model': this.RootPath(PvName, 'SelectedValue'),
            'v-bind:return-object': `false`,
            'v-bind:multiple': `${Option.Multiple}`,
        });

        return this;
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

        if (Store.ValueStore) {
            Model.AddV_Property(Store.ValueStore, {
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
                    Queryer.Using(Model.Paths(PvName, 'Input'), ({ QueryNodes }) => {
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
    //#endregion
}

const DtvlPv = new DtvlPvIniter();
(window as any).DtvlPv = DtvlPv;
export {
    DtvlPv
};
