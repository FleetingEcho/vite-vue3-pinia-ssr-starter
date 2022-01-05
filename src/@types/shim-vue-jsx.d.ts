export interface VueSlots<T = any> {
  [name: string]: (payload?: T) => JSX.Element | null
}

export declare type VueModel =
  | string
  | number
  | boolean
  | bigint
  | null
  | undefined
  | symbol
  | Record<string, unknown>
  | [unknown, string]

interface JsxComponentCustomProps {
  vShow?: boolean
  vSlots?: VueSlots
  vModel?: VueModel
  vModels?: VueModel[]
  vHtml?: string | JSX.Element | null
}
