<script>
  // @ts-nocheck

  import Quill from "quill"
  import "quill/dist/quill.snow.css"

  import { onMount } from "svelte"

  export let height, width
  let quill
  let options = {
    modules: {
      toolbar: [
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ font: [] }],
        ["bold", "italic", "underline", "strike"],
        ["blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        [{ direction: "rtl" }][({ color: [] }, { background: [] })],
        [{ align: [] }],
        ["clean"],
      ],
    },

    placeholder: "Start typing...",
    theme: "snow",
  }

  export let textData = {
    delta: {},
    text: "",
    justHtml: "",
  }

  onMount(() => {
    quill = new Quill("#editor", options)
  })

  export const GetText = () => {
    textData.delta = quill.getContents()
    textData.text = quill.getText()
    textData.justHtml = quill.root.innerHTML
  }

  export const SetText = () => {
    quill.setContents(textData.delta)
  }

  $: cssVarStyles = `height:${height};width:${width}`

  $: textData.text.length > 0 ? SetText() : null
</script>

<div class="canvas_main" style={cssVarStyles}>
  <div class="editor" id="editor" />
</div>

<style>
  .editor {
    position: relative;
    border-radius: 15px;
    border-top: 1px solid var(--grey5) !important;
    height: 280px;
  }
</style>
