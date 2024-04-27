import { default as Document } from "foundry-vtt-types/common/abstract/document.js";

export interface KeywordListAdapter {
  sheet: DocumentSheet;
  document: Document;
  propertyPath: string;

  accessor: () => string[];
}

export class KeywordListHandler {
  public static register(
    html: JQuery<HTMLElement>,
    adapter: KeywordListAdapter
  ): void {
    if (!html) {
      throw new Error("HTMLElement cannot be null.");
    }

    if (!adapter) {
      throw new Error("Adapter cannot be null.");
    }

    // add new keyword
    html.on(
      "click",
      ".keyword-list .add-keyword",
      undefined,
      async (ev: JQuery.Event) => {
        await adapter.sheet.submit();

        const targetArray = adapter.accessor();
        if (!targetArray) {
          return;
        }

        targetArray.push("test");

        const patch: Record<string, unknown> = {};
        patch[adapter.propertyPath] = targetArray;

        await adapter.document.update(patch);
        adapter.sheet.render(false);
      }
    );

    // remove keyword
    html.on(
      "click",
      ".keyword-list .delete-keyword",
      undefined,
      async (ev: JQuery.Event) => {
        ev.preventDefault();

        await adapter.sheet.submit();

        const targetArray = adapter.accessor();
        if (!targetArray) {
          return;
        }

        const target = (ev as unknown as PointerEvent).currentTarget;
        if (!target) {
          return;
        }

        const strIdx = (target as HTMLElement).dataset?.index;
        if (!strIdx) {
          return;
        }

        const idx = parseInt(strIdx);
        if (typeof idx !== "number" || Number.isNaN(idx)) {
          return;
        }

        targetArray.splice(idx, 1);

        const patch: Record<string, unknown> = {};
        patch[adapter.propertyPath] = targetArray;

        await adapter.document.update(patch);
        adapter.sheet.render(false);
      }
    );
  }
}
