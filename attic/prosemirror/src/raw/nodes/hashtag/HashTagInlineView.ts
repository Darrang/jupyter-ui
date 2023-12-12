/*
 * Copyright (c) 2022-2023 Datalayer Inc. All rights reserved.
 *
 * MIT License
 */

import { EditorView, NodeView } from "prosemirror-view";
import { Node } from "prosemirror-model";

import "./HashTagInlineView.css";

class HashTagInlineView implements NodeView {
  public dom: HTMLElement;
  constructor(node: Node, view: EditorView, getPos: () => number) {
    this.dom = document.createElement("hashtag");
    this.dom.textContent = '#' + node.textContent;
    this.dom.contentEditable = 'false';
  }
  selectNode() {
    this.dom.classList.add("ProseMirror-selectednode");
  }
  deselectNode() {
    this.dom.classList.remove("ProseMirror-selectednode");
  }
  ignoreMutation(m: MutationRecord | { type: 'selection'; target: Element; }) {
    return true;
  }
  stopEvent(e: Event) {
    return false;
  }
}

export default HashTagInlineView;
