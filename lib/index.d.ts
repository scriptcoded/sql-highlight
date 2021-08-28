export interface highlightOptions {
  html?: boolean,
  classPrefix?: string,
  colors?: {
    keyword: string,
    function: string,
    number: string,
    string: string,
    special: string,
    bracket: string,
    clear: string
  }
}

declare module 'sql-highlight' {
  export function highlight(sqlString: string, options?:highlightOptions): string;
}