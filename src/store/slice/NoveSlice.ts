import { createSlice } from '@reduxjs/toolkit'

export const novelSlice = createSlice({
  name: 'novel',
  initialState: {
    contentMD: '# Hello World \n\nThis is a markdown editor\n\n## Heading 2\n\n### Heading 3\n\n# Heading 1\n\n## Heading 2\n\n### Heading 3\n\n**Bold**\n\n*Italic*\n\n~~Strikethrough~~\n\n[Link](https://www.google.com)\n\n- List item 1\n- List item 2\n- List item 3\n\n1. Numbered list item 1\n2. Numbered list item 2\n3. Numbered list item 3\n\n> Blockquote\n\n```javascript\nconst code = "Hello World"\nconsole.log(code)\n```\n\n![Image](https://via.placeholder.com/150)\n\n # Hello World',
  },
  reducers: {
    updateContentMD: (state, action) => {
      state.contentMD = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { updateContentMD } = novelSlice.actions

export default novelSlice.reducer