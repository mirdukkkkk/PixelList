type ArrayElement<ArrayType extends readonly unknown[]> =
    ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export class PixelBaseCache<T extends Record<string, any>> {

    set<K extends keyof T>(prop: K, val: T[K]): T[K] {
        return (this as unknown as T)[prop] = val;
    }

    push<K extends keyof T>(arr: K, el: ArrayElement<T[K]>)  {
        if(!Array.isArray((this as unknown as T)[arr])) throw new TypeError(`You can push data only to arrays`);

        return (this as unknown as T)[arr].push(el);
    }
}