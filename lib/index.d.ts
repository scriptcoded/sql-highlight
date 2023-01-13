declare module 'sql-highlight' {
  export interface HighlightOptions {
    html?: boolean;
    htmlEscaper?: (str: string) => string
    classPrefix?: string;
    colors?: {
      keyword: string;
      function: string;
      number: string;
      string: string;
      special: string;
      bracket: string;
      clear: string;
    };
  }

  export interface Segment {
    name: string;
    content: string;
  }
  
  export function getSegments(sqlString: string): Array<Segment>;
  export function highlight(sqlString: string, options?: HighlightOptions): string;
}
