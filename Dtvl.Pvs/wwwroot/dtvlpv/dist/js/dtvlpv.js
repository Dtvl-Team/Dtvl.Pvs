import { Model, Queryer } from '@rugal.tu/vuemodel3';
//#endregion
class DtvlPvIniter {
    $PvStore;
    constructor() {
        this.$PvStore = 'pv';
    }
    //#region Sidebar Method
    UseRouter(PvName, RouterData, Option) {
        let RouterDefaultStore = 'App.Router';
        this.$InitSidebar(PvName, RouterDefaultStore, RouterData, Option);
        return this;
    }
    $InitSidebar(PvName, StorePath, RouterData, Option) {
        Option ??= {};
        let RouterList = [];
        let RouterDatas = this.$CreateSidebar(RouterData, RouterList);
        let CurrentPath = document.location.pathname;
        let FindRouter = RouterList.find(Item => Item.href != null && Item.href.toLowerCase() == CurrentPath.toLowerCase());
        let CurrentRouter = [];
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
        let RouterStoreData = {
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
            'v-bind:items': `${StorePath}?.Datas ?? []`,
            'v-on:update:activated': `${StorePath}?.Click`,
            'v-model:opened': `${StorePath}.OpenIds`,
            ':SidebarContent': {
                'v-for': `${StorePath}?.Datas ?? []`,
                ':SidebarItem': {
                    'v-if': 'item.show()',
                    ':SidebarGroup': {
                        'v-if': 'item.children && item.children.length > 0',
                        'v-bind:value': 'item.id',
                        ':SidebarGroupItem': {
                            ...ItemBaseCommand,
                        },
                        ':SidebarGroupChildren': {
                            'v-for': 'item.children',
                            ':SidebarGroupChildrenItem': {
                                'v-if': 'item.show()',
                                'v-bind:class': '{ SidebarSelect: item.isSelect }',
                                ...ItemBaseCommand,
                            },
                        }
                    },
                    ':SidebarSingleItem': {
                        'v-if': 'item.children == null || item.children.length == 0',
                        'v-bind:class': '{ SidebarSelect: item.isSelect }',
                        ...ItemBaseCommand,
                    },
                }
            }
        });
    }
    //#endregion
    //#region DataTable
    AddPv_DataTable(PvName, Option) {
        Option.HasIndex ??= true;
        Option.HasButton ??= true;
        Option.Datas ??= [];
        let TableStore = {
            ...Option,
        };
        Model.UpdateStore(this.RootPath(PvName), TableStore);
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
        if (TableStore.HasIndex)
            TableStore.Headers.unshift({
                title: '#',
                value: 'index',
            });
        Model.AddV_Tree(PvName, {
            "v-bind:items": this.RootPath(PvName, 'Datas'),
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
    AddPv_Tree(PvName, Option) {
        Option.openAll ??= true;
        Option.children ??= 'children';
        let StoreData = {
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
    AddPv_Modal(PvName, Option) {
        Option ??= {};
        Option.IsShow ??= false;
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
                "v-on:click": (event) => {
                    let ModalStore = Model.GetStore(this.RootPath(PvName));
                    ModalStore.BtnCancel(ModalStore, event);
                }
            },
            ':Title': {
                "v-text": this.RootPath(PvName, 'Title'),
            },
        });
        if (!Option.Title) {
            Queryer.Using(this.RootPath(PvName, 'Title'), ({ Dom }) => {
                Option.Title = Dom.textContent.trim();
            });
        }
        let StoreData = {
            ...Option,
            IsCalling: false,
        };
        Model.UpdateStore(this.RootPath(PvName), StoreData);
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
            Queryer.Using(Model.Paths(PvName, 'Message'), ({ Dom }) => {
                Option.Message = Dom.textContent.trim();
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
        Option.Store ??= PvName;
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
    //#region Input
    AddPv_Input(PvName, Option) {
        Option ??= {};
        Option.Store ??= Model.ToJoin(PvName);
        Model.AddV_Model(PvName, Option.Store);
        if (Option.ReadOnly != null) {
            if (typeof (Option.ReadOnly) == 'function') {
                Model.AddV_Function(`Func_${Model.ToJoin(PvName)}_ReadOnly`, Option.ReadOnly);
            }
            else {
                let Clearable = typeof (Option.ReadOnly) == 'boolean' ?
                    (!Option.ReadOnly).toString() : `!${Option.ReadOnly}`;
                Model.AddV_Bind(PvName, 'readonly', Option.ReadOnly.toString());
                Model.AddV_Bind(PvName, 'clearable', Clearable);
            }
        }
        return this;
    }
    //#endregion
    //#region Select
    AddPv_Select(PvName, Option) {
        Option ??= {};
        Option.ReturnObject ??= false;
        Option.Multiple ??= false;
        Option.Datas ??= [];
        let Store = {
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
    AddPv_DatePicker(PvName, Option) {
        Option ??= {};
        Option.IsOpen ??= false;
        let Store = {
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
                    Queryer.Using(Model.Paths(PvName, 'Input'), ({ Dom }) => {
                        Dom.blur();
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
}
const DtvlPv = new DtvlPvIniter();
window.DtvlPv = DtvlPv;
export { DtvlPv };
//# sourceMappingURL=dtvlpv.js.map