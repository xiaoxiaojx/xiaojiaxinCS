# This project is the development code of www.xiaojiaxin.com

* Now there is such a question, do you have an answer
```
/*
    如何改进这个方法不报错, 并且能检测传入属性的属性值是Function
    export function autoBindMethods<K extends string>(methods: K[], _self: { [key in K]: Function } | { [key: string]: any }): void {
        methods.forEach((method: K) => _self[method] = _self[method].bind(this));
        // error TS2536: Type 'K' cannot be used to index type '{ [key in K]: Function; } | { [key: string]: any; }'
    }
*/

export function autoBindMethods<T, K extends keyof T>(methods: K[], _self: T): void {
    methods.forEach((method: K) => _self[method] = (_self[method] as any).bind(this));
}
``` 
* 代码位置
[Quick View](https://github.com/xiaoxiaojx/xiaojiaxinCS/blob/master/Client/src/common/utils.ts)