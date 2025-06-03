import { Model, Queryer } from '@rugal.tu/vuemodel3';
//#endregion
class DtvlPvIniter {
    $LoadingDelay;
    $AppStore;
    $PvStore;
    $ApiStore;
    $FormatStore;
    constructor() {
        this.$LoadingDelay = 800;
        this.$AppStore = 'app';
        this.$ApiStore = 'api';
        this.$PvStore = 'pv';
        this.$FormatStore = 'pv._format';
        this.UseShowOnMounted();
        this.$CreateDefaultFormat();
    }
    get Formats() {
        return Model.GetStore(this.$FormatStore);
    }
    //#region App
    UseShowOnMounted() {
        Model.WithMounted(() => {
            let ShowItems = document.querySelectorAll('[class*="ShowOnMounted"]');
            for (let Item of ShowItems) {
                Item.classList.remove('ShowOnMounted');
            }
        });
        return this;
    }
    $CreateDefaultFormat() {
        Model.AddStore(this.$FormatStore, {});
        this.$CreateAdDateFormat();
        this.$CreateTwDateFormat();
    }
    $CreateAdDateFormat() {
        this.AddPv_Format('AdDate', this.CreateDateFormat({
            Separator: '/',
            YearCount: 4,
        }));
    }
    $CreateTwDateFormat() {
        this.AddPv_Format('TwDate', this.CreateDateFormat({
            Separator: '/',
            YearCount: 3,
        }));
    }
    //#endregion
    //#region Sidebar Method
    UseRouter(PvName, RouterData, Option) {
        let RouterDefaultStore = [this.$AppStore, 'Router'];
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    $InitSidebar(PvName, StorePath, RouterData, Option) {
        Option ??= {};
        Option.OpenMode ??= 'current';
        let RouterList = [];
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
        let CurrentRouters = [];
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
        let RouterStoreData = {
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
            GroupClick: (Item) => {
                let RouterStore = Model.GetStore([this.$AppStore, 'Router']);
                if (RouterStore == null)
                    return;
                if (RouterStore.OpenMode != 'single')
                    return;
                if (Item == null || Item.value == false)
                    return;
                RouterStore.OpenIds.splice(0, RouterStore.OpenIds.length);
            },
            MobileOpen: () => {
                let TargetPaths = Model.Paths(StorePath, 'IsMobileOpen');
                let IsSidebarOpen = Model.GetStore(TargetPaths);
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
    $CreateSidebar(Data, RouterList, Parent = null) {
        if (Data == null || Data.length == 0)
            return null;
        let Result = [];
        for (let Item of Data) {
            let NewRouter = {
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
    AddPv_Sidebar(PvName, RouterData, Option) {
        let RouterDefaultStore = this.RootPath(PvName);
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    $SetSidebarTreeCommand(PvName, StorePath) {
        Model.AddV_Bind(PvName, 'class', `[ ${StorePath}.IsShow ? 'Sidebar-Show' : 'Sidebar-Hide' ]`);
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
    AddPv_DataTable(PvName, Option) {
        Option.Datas ??= [];
        let TableStore = {
            ...Option,
            Selected: [],
        };
        let StorePath = Model.ToJoin(this.RootPath(PvName));
        Model.UpdateStore(StorePath, TableStore);
        TableStore.Buttons ??= {};
        if (TableStore.Buttons != null && TableStore.Buttons != false) {
            if (TableStore.Buttons == true) {
                TableStore.Buttons = {};
            }
            TableStore.Buttons.title ??= '';
            TableStore.Buttons.value ??= 'buttons';
            TableStore.Buttons.sortable ??= false;
            TableStore.Headers.push(TableStore.Buttons);
        }
        if (TableStore.ApiKey) {
            Model.AddV_Property(TableStore.ApiKey, {
                Target: `${StorePath}.Datas`,
            });
            this.WatchApi(TableStore.ApiKey, 'IsCalling', (Value) => {
                let Store = Model.GetStore(StorePath);
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
            Model.AddV_Tree(PvName, {
                'v-bind:loading': `${StorePath}.Loading`,
            });
        }
        if (TableStore.Select != null) {
            TableStore.Selectable = true;
            TableStore.Select.ReturnObject ??= false;
            TableStore.Select.Mode ??= 'all';
            TableStore.Select.RowClicked ??= true;
            if (TableStore.Select.RowClicked == true) {
                Model.AddV_On(PvName, 'click:row', (Event, Row) => {
                    let RowItem = Row.item;
                    let ValueItem = RowItem;
                    let Store = Model.GetStore(StorePath);
                    if (!Store.Select.ReturnObject)
                        ValueItem = ValueItem[Store.Select.ItemValue];
                    let IsSelected = Store.Selected.includes(ValueItem);
                    if (IsSelected) {
                        let SelectedIndex = Store.Selected.indexOf(ValueItem);
                        Store.Selected.splice(SelectedIndex, 1);
                    }
                    else
                        Store.Selected.push(ValueItem);
                });
            }
            Model.AddV_Tree(PvName, {
                'v-model': `${StorePath}.Selected`,
                'v-bind:show-select': `${StorePath}.Selectable`,
                'v-bind:item-value': `${StorePath}.Select.ItemValue`,
                'v-bind:return-object': `${StorePath}.Select.ReturnObject`,
                'v-bind:select-strategy': `${StorePath}.Select.Mode`,
            });
            if (TableStore.Select.Store != null) {
                Model.AddV_Property(`${StorePath}.Selected`, {
                    Target: TableStore.Select.Store,
                    Value: [],
                });
            }
        }
        this.$FillDataTableHeaders(TableStore.Headers);
        TableStore.Index ??= true;
        if (TableStore.Index != null && TableStore.Index != false) {
            if (TableStore.Index == true) {
                TableStore.Index = {
                    type: 'Total',
                };
            }
            TableStore.Index.type ??= 'Total';
            let IndexPath = null;
            switch (TableStore.Index.type) {
                case 'Page':
                    IndexPath = 'props.index + 1';
                    break;
                case 'Total':
                    IndexPath = 'props.internalItem.index + 1';
                    break;
                default:
                    break;
            }
            Model.AddV_Text(Model.Paths(PvName, 'IndexColumn'), IndexPath);
            TableStore.Index.title ??= '#';
            TableStore.Index.value ??= 'index';
            TableStore.Index.key ??= 'index';
            TableStore.Headers.unshift(TableStore.Index);
        }
        Model.AddV_Tree(PvName, {
            'v-bind:items': this.RootPath(PvName, 'Datas'),
            'v-bind:headers': this.RootPath(PvName, 'Headers'),
        });
        return this;
    }
    $FillDataTableHeaders(Headers) {
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
    //public AddPv_Tree(PvName: PathType, Option: TreeOption) {
    //    Option.openAll ??= true;
    //    Option.children ??= 'children';
    //    let StoreData: TreeStore = {
    //        Option: Option,
    //        Datas: [],
    //    };
    //    let PvNames = Model.Paths(PvName);
    //    Model.UpdateStore(PvName, StoreData)
    //        .AddV_For([...PvName, 'Datas'], `${PvName}.Datas`)
    //        .AddV_If([...PvName, 'Group'], `item.${Option.children} != null`)
    //        .AddV_Bind([...PvName, 'GroupItem'], `title`, `item.${Option.children}`)
    //        .AddV_For([...PvName, 'ChildrenItem'], `${PvName}.Datas`);
    //    return this;
    //}
    //#endregion
    //#region Modal
    AddPv_Modal(PvName, Option) {
        Option ??= {};
        Option.IsShow ??= false;
        Model.AddStore(PvName, {});
        Model.UpdateStore(this.RootPath(PvName), {
            IsShow: Option.IsShow,
        });
        Model.AddV_Tree(PvName, {
            'v-model': this.RootPath(PvName, 'IsShow'),
            ':Overlayer': {
                'v-on:click': (event) => {
                    let GetStore = Model.GetStore(this.RootPath(PvName));
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
    AddPv_SendModal(PvName, Option) {
        Option ??= {};
        this.AddPv_Modal(PvName, Option);
        Option.BtnCancel ??= () => {
            this.Modal(PvName, false);
        };
        Option.BtnSend ??= () => {
            let ModalStore = Model.GetStore(this.RootPath(PvName));
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
                    'v-on:click': (event) => {
                        let ModalStore = Model.GetStore(this.RootPath(PvName));
                        ModalStore.BtnSend(ModalStore, event);
                    },
                }
            });
        Model.AddV_Tree(PvName, {
            ':BtnCancel': {
                'v-on:click': (event) => {
                    let ModalStore = Model.GetStore(this.RootPath(PvName));
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
        let StoreData = {
            ...Option,
            IsCalling: false,
        };
        Model.UpdateStore(this.RootPath(PvName), StoreData)
            .AddStore(PvName, {});
        return this;
    }
    Modal(PvName, Option) {
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
    AddPv_Alert(PvName, Option) {
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
        let SetAlertStore = {
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
                'v-on:click': (event) => {
                    let AlertStore = Model.GetStore(this.RootPath(PvName));
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
                'v-on:click': (event) => {
                    let GetStore = Model.GetStore(this.RootPath(PvName));
                    if (GetStore.BtnCancel != null) {
                        GetStore.BtnCancel(GetStore, event);
                        return;
                    }
                    this.Alert(PvName, false);
                },
            },
            ':Overlayer': {
                'v-on:click': (event) => {
                    let GetStore = Model.GetStore(this.RootPath(PvName));
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
    Alert(PvName, Option) {
        if (typeof (Option) == 'boolean') {
            let GetStore = Model.GetStore(this.RootPath(PvName));
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
    AddPv_FilterCard(PvName, Option) {
        Option ??= {};
        let FullPath = Model.ToJoin(PvName);
        PvName = Model.Paths(PvName);
        Model.UpdateStore(PvName, {});
        Option.BtnClear ??= () => {
            Model.ClearStore(FullPath);
        };
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
    //#region Input, Select
    AddPv_Input(PvName, Option) {
        Option ??= {};
        if (typeof (Option) == 'string')
            Option = { Store: Option };
        Option.Store ??= Model.ToJoin(PvName);
        let PvStorePath = this.RootPath(PvName);
        let Store = {
            Formats: [],
        };
        Model.UpdateStore(PvStorePath, Store);
        if (Option.Store != null) {
            if (Option.BindOnly == true) {
                Model.AddV_Model(PvName, Option.Store);
            }
            else {
                let ValuePath = this.RootPath(PvName, 'Value');
                Model
                    .AddStore(ValuePath, null)
                    .AddStore(Option.Store, null)
                    .AddV_Model(PvName, ValuePath)
                    .AddV_Property(ValuePath, {
                    Target: Option.Store,
                });
                if (Option.Value != null)
                    Model.UpdateStore(ValuePath, Option.Value);
            }
        }
        if (Option.ReadOnly != null) {
            let ReadOnlyPath = null;
            if (typeof (Option.ReadOnly) == 'function') {
                Store.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = this.RootPath(PvName, `ReadOnly(${Model.ToJoin(PvStorePath)})`);
            }
            else if (typeof (Option.ReadOnly) == 'boolean') {
                Store.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = this.RootPath(PvName, 'ReadOnly');
            }
            else if (typeof (Option.ReadOnly == 'string')) {
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
        if (Option.Number != null && Option.Number != false) {
            if (Option.Number == true)
                Option.Number = { ThousandsSeparator: true };
            Store.Number = Option.Number;
            Store.Formats.push(Value => {
                if (Value == null || Value == '')
                    return Value;
                Value = Value.toString().replace(/[^0-9]/g, '');
                if (Value == '')
                    return Value;
                let InputStore = Model.GetStore(PvStorePath);
                if (InputStore.Number.ThousandsSeparator == true)
                    Value = Number(Value).toLocaleString();
                return Value;
            });
        }
        if (Option.Format != null) {
            if (Array.isArray(Option.Format))
                Store.Formats.push(...Option.Format);
            else
                Store.Formats.push(Option.Format);
        }
        if (Store.Formats.length > 0) {
            Model.AddV_Bind(PvName, 'rules', () => {
                let GetStore = Model.GetStore(PvStorePath);
                if (GetStore.Formats != null) {
                    let Value = GetStore.Value;
                    for (let Format of GetStore.Formats)
                        Value = Format(Value);
                    GetStore.Value = Value;
                }
            });
        }
        return this;
    }
    AddPv_Select(PvName, Option) {
        Option ??= {};
        Option.ReturnObject ??= false;
        Option.Multiple ??= false;
        Option.Datas ??= [];
        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        let PvStore = {
            IsInited: false,
            ...Option,
        };
        Model.UpdateStore(PvStorePath, PvStore);
        if (PvStore.Store != null) {
            if (Option.BindOnly == true) {
                Model.AddV_Model(PvName, Option.Store);
            }
            else {
                let SelectedItemPath = this.RootPath(PvName, 'SelectedItem');
                let SelectedValuePath = this.RootPath(PvName, 'SelectedValue');
                let ValuePath = Option.ReturnObject ? SelectedItemPath : SelectedValuePath;
                Model
                    .AddStore(ValuePath, null)
                    .AddStore(Option.Store, null)
                    .AddV_Model(PvName, `${PvStorePath}.SelectedValue`)
                    .AddV_Property(ValuePath, {
                    Target: Option.Store,
                })
                    .AddV_Property(SelectedItemPath, {
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
            }
        }
        if (PvStore.ApiKey) {
            Model.AddV_Property(`${PvStorePath}.Datas`, {
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
            this.WatchApi(Option.ApiKey, 'IsCalling', (Value) => {
                let Store = Model.GetStore(PvStorePath);
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
            Model.AddV_Tree(PvName, {
                'v-bind:loading': `${PvStorePath}.Loading`,
            });
        }
        if (PvStore.OnChange)
            Model.AddV_Tree(PvName, {
                'v-on:update:model-value': Option.OnChange,
            });
        if (PvStore.ReadOnly != null) {
            let ReadOnlyPath = null;
            if (typeof (Option.ReadOnly) == 'function') {
                PvStore.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = this.RootPath(PvName, `ReadOnly(${Model.ToJoin(PvStorePath)})`);
            }
            else if (typeof (Option.ReadOnly) == 'boolean') {
                PvStore.ReadOnly = Option.ReadOnly;
                ReadOnlyPath = this.RootPath(PvName, 'ReadOnly');
            }
            else if (typeof (Option.ReadOnly == 'string')) {
                ReadOnlyPath = Option.ReadOnly;
            }
            if (ReadOnlyPath != null) {
                Model.AddV_Bind(PvName, 'readonly', ReadOnlyPath);
                Model.AddV_Bind(PvName, 'clearable', `!${Model.ToJoin(ReadOnlyPath)}`);
            }
        }
        Model.AddV_Tree(PvName, {
            'v-bind:items': `${PvStorePath}.Datas`,
            'v-bind:item-title': `${PvStorePath}.ItemName`,
            'v-bind:item-value': `${PvStorePath}.ItemValue`,
            'v-bind:return-object': `false`,
            'v-bind:multiple': `${PvStore.Multiple}`,
        });
        return this;
    }
    //#endregion
    //#region Format
    AddPv_Format(FormatKey, FormatFunc) {
        let FormatStore = Model.GetStore(this.$FormatStore);
        FormatStore[FormatKey] = FormatFunc;
        return this;
    }
    CreateDateFormat(Option) {
        Option.YearCount ??= 4;
        Option.MonthCount ??= 2;
        Option.DayCount ??= 2;
        let DateFormat = Value => {
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
        };
        return DateFormat;
    }
    GetFormat(FormatKey) {
        let FormatStore = Model.GetStore(this.$FormatStore);
        let FormatResult = FormatStore[FormatKey];
        return FormatResult;
    }
    //#endregion
    //#region DatePicker
    AddPv_DatePicker(PvName, Option) {
        Option ??= {};
        Option.IsOpen ??= false;
        let Store = {
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
    //#region Tabbed
    AddPv_Tabbed(PvName, Option) {
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
    AddPv_Flex(PvName, Option) {
        let RootStorePath = Model.ToJoin(this.RootPath(PvName));
        Option.Datas ??= [];
        let RootStore = {
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
    AddPv_ImageFlex(PvName, Option) {
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
    AddPv_Image(PvName, Option) {
        let PvStorePath = Model.ToJoin(this.RootPath(PvName));
        let PvStore = {};
        Model.UpdateStore(PvStorePath, PvStore);
        if (Option.Src != null) {
            Model.AddV_Property([PvStorePath, 'Src'], {
                Target: Option.Src,
            });
        }
        else {
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
        }
        else {
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
    AddPv_AnimatePush(PvName, Option) {
        let StorePath = this.RootPath(PvName, 'Animate');
        Model.SetStore(StorePath, {
            IsRun: false,
        });
        Model.AddV_Watch([StorePath, 'IsRun'], (NewValue) => {
            if (NewValue) {
            }
        });
        Model.AddV_Tree(PvName, {});
    }
    Animate(PvName) {
        let StorePath = this.RootPath(PvName, 'Animate');
        let AnimateStore = Model.GetStore(StorePath, {
            CreateIfNull: true,
            DefaultValue: {
                IsRun: false,
            },
        });
        let IsRun = Model.GetStore([StorePath, 'IsRun']);
        IsRun = IsRun ? false : true;
        Model.UpdateStore([StorePath, ''], true);
    }
    //#endregion
    //#region Protect Process
    RootPath(...PushPath) {
        let RootPath = Model.Paths([this.$PvStore, PushPath]);
        return RootPath;
    }
    ApiPath(...PushPath) {
        let RootPath = Model.Paths([this.$ApiStore, PushPath]);
        return RootPath;
    }
    WatchApi(ApiKey, Status, Func) {
        let GetPath = Model.Paths(ApiKey).shift();
        GetPath = GetPath.split('.')[0];
        Model.AddV_Watch(this.ApiPath(GetPath, Status), Func);
    }
}
const DtvlPv = new DtvlPvIniter();
const Formats = DtvlPv.Formats;
window.DtvlPv = DtvlPv;
export { DtvlPv, Formats, };
//# sourceMappingURL=dtvlpv.js.map